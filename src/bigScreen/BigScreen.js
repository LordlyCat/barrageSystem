import React, {
    Component
} from 'react';

import './BigScreen.css';
import ajax from '../ajax.js';
import redCover from '../img/redCover.png';

let ctx;
let websocket;

class BigScreen extends Component {
    constructor() {
        super();
        this.myRef = React.createRef();
        this.width = window.screen.availWidth;
        this.height = window.innerHeight;
        this.defaultAttributes = new DefaultAttributes(35, 'serif', 5, 1);
        this.lane = new Lane(Math.floor(this.height / this.defaultAttributes.getFontSize()));
        this.pushBarrageList = this.pushBarrageList.bind(this);
        this.reconnect = this.reconnect.bind(this);

        this.state = {
            ifSlot: false,
            ifRed: false,
            slotStart: false,
            redInfo: {
                keyWord: '',
                peopleNum: 1,
                duration: 30
            },
            redUser: [],
            redClose: false,
            nextRed: 0
        }

        this.list = [];
        this.colorsOpen = false;

    }
    componentDidMount() {
        //let defaultAttributes = new DefaultAttributes(30, 'serif', 5, 0.8);
        //let lane = new Lane(Math.floor(this.height / defaultAttributes.getFontSize()));
        //console.log(lane.useLane(), Math.floor(this.height / defaultAttributes.getFontSize()));
        //console.log(defaultAttributes.getOpacity());
        let list = [];

        websocket = new WebSocket('wss://wx.yyeke.com/bigscreennetty/screen');

        websocket.addEventListener('open', (event) => {
            console.log('wss', event);

            setInterval(() => {
                websocket.send('keepOnline');
                console.log('keepOnline');
            }, 29000)
        })

        websocket.addEventListener('error', (err) => {
            console.log('err', err);
            this.reconnect();
        })

        websocket.addEventListener('close', (e) => {
            console.log('close', e);
            this.reconnect();
        })

        websocket.addEventListener('message', (message) => {
            let data = JSON.parse(message.data);
            //console.log(data)

            switch (data.type) {
                case 'text':
                    this.pushBarrageList(data, list, lg);
                    break;
                case 'server':
                    console.log(data);
                    if (data.value === 'true') {
                        this.setState({
                            ifSlot: true
                        });
                    } else if (data.value === 'false') {
                        this.setState({
                            ifSlot: false
                        });
                    } else if (data.value === 'lottery') {
                        if (this.state.slotStart) {
                            this.setState({
                                slotStart: false
                            });
                        } else {

                            this.setState({
                                slotStart: true
                            });
                        }
                    } else if (data.value === 'redOver') {
                        this.setState({
                            redClose: true
                        })
                        setTimeout(() => {
                            this.setState({
                                ifRed: false,
                                redUser: ''
                            })
                        }, 6500)
                    } else if (data.value === 'colors') {
                        if (this.colorsOpen) {
                            this.colorsOpen = false;
                        } else {
                            this.colorsOpen = true;
                        }
                    } else if (data.value === 'nextRed') {
                        if (this.state.nextRed < this.state.redUser.length - 1) {
                            let next = ++this.state.nextRed;
                            this.setState({
                                nextRed: next
                            })
                        }

                    }
                    break;
                case 'gift':
                    console.log(data);
                    if (data.data) {
                        let arr = [];
                        for (var i = data.data.length - 1; i >= 0; i--) {
                            arr[i] = data.data[i].nickname
                        }
                        // arr[1] = '111';
                        // arr[2] = '222';
                        console.log('result', data.data);
                        console.log(typeof(data.data));
                        this.setState({
                            redUser: arr
                        })
                    } else {
                        console.log('redBegin');
                        if (!this.state.ifRed) {
                            this.setState({
                                ifRed: true,
                                redInfo: {
                                    keyWord: data.keyWord,
                                    peopleNum: data.peopleNum,
                                    duration: data.duration
                                }
                            })
                        }
                    }
                    break;
                default:
                    console.log('default', data);
                    break;
            }

        }, false)


        ctx = this.myRef.current.getContext('2d');

        let lg = ctx.createLinearGradient(0, 0, 1400, 500);
        lg.addColorStop(0.2, "pink");
        lg.addColorStop(0.30, "#0f0");
        lg.addColorStop(0.50, "orange");
        lg.addColorStop(0.8, "lightblue");
        lg.addColorStop(1, "red");

        // let n = 0;
        // setInterval(() => {
        //     list.push(new Barrage('红岩网校工作站年会', lg,
        //         this.defaultAttributes.getFontSize(), this.defaultAttributes.getFontFamily(),
        //         this.defaultAttributes.getSpeed(), this.defaultAttributes.getOpacity(),
        //         '',
        //         this.lane.useLane() * this.defaultAttributes.getFontSize()
        //     ));
        //     //n++;
        // }, 0);

        let go = () => {
            ctx.clearRect(0, 0, this.width, this.height);
            for (var i = 0; i < list.length; i++) {
                if (list[i].lifeState === 'died') {
                    //console.log('died');
                    list.splice(i, 1);
                }
                if (!list[i]) {
                    break;
                }
                //console.log(list[i])
                this.moving(list[i]);
            }
            window.requestAnimationFrame(go);
        }
        go();
    }
    reconnect() {
        // websocket = new WebSocket('wss://wx.yyeke.com/bigscreennetty/screen');
        // websocket.addEventListener('open', (event) => {
        //     console.log('rewss', event);
        // });

        // websocket.addEventListener('message', (message) => {
        //     let data = JSON.parse(message.data);
        //     console.log(data);
        //     switch (data.type) {
        //         case 'text':
        //             this.pushBarrageList(data, list);
        //             break;
        //         case 'server':
        //             if (data.value === 'true') {
        //                 this.setState({
        //                     ifSlot: true
        //                 });
        //             } else if (data.value === 'false') {
        //                 this.setState({
        //                     ifSlot: false
        //                 });
        //             } else if (data.value === 'lottery') {
        //                 if (this.state.slotStart) {
        //                     this.setState({
        //                         slotStart: false
        //                     });
        //                 } else {
        //                     this.setState({
        //                         slotStart: true
        //                     });
        //                 }
        //             }

        //             break;
        //         default:
        //             console.log('default', data);
        //             break;
        //     }

        // }, false)


    }
    moving(barrage) {
        barrage.draw();
        barrage.x -= barrage.text.length / 6 + barrage.speed; //弹幕移动速度
    }
    pushBarrageList(data, list, lg) {
        let that = this;
        if (this.colorsOpen) {
            data.color = lg;
        }
        if (data.text === '红岩网校工作站') {
            data.color = lg;
        }
        console.log(list.length)
        list.push(new Barrage(data.text, data.color,
            that.defaultAttributes.getFontSize(), that.defaultAttributes.getFontFamily(),
            that.defaultAttributes.getSpeed(), that.defaultAttributes.getOpacity(), '',
            that.lane.useLane() * that.defaultAttributes.getFontSize()));
    }
    render() {
        let slot = null;
        let red = null;
        if (this.state.ifSlot) {
            slot = <SlotMachine status={this.state.slotStart} />
        }

        if (this.state.ifRed) {
            red = <Red data={this.state.redInfo} 
            redUser={this.state.redUser} 
            redClose={this.state.redClose}
            nextRed={this.state.nextRed} />
        }

        return (
            <div>
                <canvas id="stage" ref={this.myRef} width={this.width} height={this.height}></canvas>
                {slot}
                {red}
            </div>
        )
    }
}

class DefaultAttributes {
    constructor(fontSize, fontFamily, speed, opacity) {
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.speed = speed;
        this.opacity = opacity;
    }
    setFontSize(fontSize) {
        this.fontSize = fontSize;
    }
    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    setOpacity(opacity) {
        this.opacity = opacity;
    }
    getFontSize() {
        return this.fontSize;
    }
    getFontFamily() {
        return this.fontFamily;
    }
    getSpeed() {
        return this.speed;
    }
    getOpacity() {
        return this.opacity;
    }
}


class BarrageAncester {
    constructor(text, color, fontSize, fontFamily, speed, opacity) {
        this.text = text;
        this.color = color;
        this.fontSize = fontSize;
        this.font = this.fontSize + 'px ' + fontFamily;
        this.speed = speed;
        this.opacity = opacity;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class Barrage {
    constructor(text, color, fontSize, fontFamily, speed, opacity, position, y) {
        //super(text, color, fontSize, fontFamily, speed, opacity);
        this.text = text;
        this.color = color;
        this.fontSize = fontSize;
        this.font = this.fontSize + 'px ' + fontFamily;
        this.speed = speed;
        this.opacity = opacity;

        this.timestamp = '';
        this.location = '';
        this.x = window.screen.availWidth;
        this.y = y; //Math.random() * (window.innerHeight - 60) + this.fontSize;
        this.lifeState = 'alive';
        //this.draw = this.draw.bind(this);
        this.destroyTimer();
    }
    draw() {
        // let lg = ctx.createLinearGradient(0, 0, 1400, 500);
        // lg.addColorStop(0.2, "pink");
        // lg.addColorStop(0.4, "#0f0");
        // lg.addColorStop(0.6, "orange");
        // lg.addColorStop(0.8, "lightblue");
        // lg.addColorStop(1, "red");

        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
    destroyTimer() {
        //20秒的存活期
        setTimeout(() => {
            this.lifeState = 'died'
        }, 20000)
    }
}

class Lane {
    constructor(length) {
        this.length = length;
        this.laneArr = new Array(length);
        this.last_1 = null;
        this.last_2 = null;
        this.last_3 = null;
        this.last_4 = null;
        this.last_5 = null;
    }
    useLane() {
        let arr = [];
        arr[0] = this.last_1;
        arr[1] = this.last_2;
        arr[2] = this.last_3;
        arr[3] = this.last_4;
        arr[4] = this.last_5;

        let num = Math.round(Math.random() * (this.length - 1)) + 1;
        while (num === this.last_1 ||
            num === this.last_2 ||
            num === this.last_3 ||
            num === this.last_4 ||
            num === this.last_5) {

            num = Math.round(Math.random() * (this.length - 1)) + 1;
        }
        this.last_1 = num;
        this.last_2 = arr[0];
        this.last_3 = arr[1];
        this.last_4 = arr[2];
        this.last_5 = arr[3];

        return num;
    }

}

class Tips extends Component {
    constructor(tip) {
        super();
        this.state = {
            tip: 'tip'
        }
    }

    render() {
        return (
            <div className="tipWrapper">

            </div>
        )
    }
}

class SlotMachine extends Component {
    constructor() {
        super();
        this.getUserList = this.getUserList.bind(this);
        // this.moving = this.moving.bind(this);
        // this.controller = this.controller.bind(this);
        // this.addMoveList = this.addMoveList.bind(this);
        this.begins = this.begins.bind(this);
        this.end = this.end.bind(this);

        this.userList = {};
        this.testData = ['暗夜的萤火虫行吧', '89347', 2, 3, 4, 5, 6, 7, 8, 9, 11, 23, 34, 45345, 234, 2342, 534, 134, 2000, 784, 5, 3, 2094, 546, 4, 452, 324545];

        this.beginFlag = true;
        this.moveList = [];

        this.state = {
            top: {
                top: '0vw'
            },
            list: [],
            user: '? ? ? ?',
            winnerStyle: {
                color: 'gray'
            }
        }

        this.beginTimer = null;

        // this.testList = [(<ul className="userList_1" style={this.state.top} ></ul>),
        //     (<ul className="userList_2" style={this.state.top} ></ul>),
        //     (<ul className="userList_3" style={this.state.top} ></ul>)
        // ]

        this.getUserList();
    }
    componentDidMount() {

    }
    getUserList() {
        let that = this;
        ajax({
            url: 'https://wx.yyeke.com/bigscreen/admin/getUserList',
            method: 'GET',
            data: {
                num: 0
            },
            headers: {},
            success: (data) => {
                console.log(JSON.parse(data.response));
                // that.setState({
                //     list: JSON.parse(data.response).data
                // })
                that.moveList = JSON.parse(data.response).data;
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    // moving(target) {
    //     // let breakFlag = false;
    //     // for (var i = 0; i < 3; i++) {

    //     // }
    //     // this.setState({
    //     //     top: {
    //     //         top: '-90vw'
    //     //     }
    //     // })
    //     this.addMoveList(0);
    //     this.addMoveList(1);
    //     this.addMoveList(2);



    // }
    // controller() {
    //     if (!this.begin) {
    //         this.moving(0)
    //     }
    // }
    // addMoveList(target) {
    //     let liArr = [];
    //     let className = 'userList_' + target;
    //     let r = Math.round(Math.random() * (this.testData.length - 10));
    //     for (let i = r; i < r + 10; i++) {
    //         liArr.push(<li className="user" key={i} >{this.testData[i]}</li>)
    //     }
    //     let newList = this.state.list;
    //     newList[target] = (<ul className={className} key={className} >{liArr}</ul>);

    //     this.setState({
    //         list: newList
    //     })
    //     console.log(target);

    // }

    componentDidUpdate() {
        // let targetNode = document.querySelector('.userList_0');
        // console.log(targetNode);
        // if (targetNode) {
        //     //targetNode.className = 'move';

        // }
    }

    componentWillReceiveProps() {
        this.begins()
    }

    begins() {
        if (this.beginFlag) {
            this.beginFlag = false;
            this.setState({
                winnerStyle: {
                    color: 'gray'
                }
            })
            console.log('begin');
        } else {
            this.beginFlag = true;
            clearInterval(this.beginTimer);
            this.end();
            return false;
        }

        //let that = this;
        let l = this.moveList.length;
        let r = Math.round(Math.random() * (l - 1))
        this.beginTimer = setInterval(() => {
            r = Math.round(Math.random() * (l - 1));
            //console.log(r);
            this.setState({
                user: this.moveList[r].nickname
            })
        }, 100);
    }

    end() {
        console.log('end');
        clearInterval(this.beginTimer);
        let stopT = 3000 //Math.round(Math.random() * 5000) + 3000;
        let l = this.moveList.length;

        this.beginTimer = setInterval(() => {
            let r = Math.round(Math.random() * (l - 1));
            console.log(r);
            this.setState({
                user: this.moveList[r].nickname
            })
        }, 900);

        let timerT = setTimeout(() => {
            //this.beginFlag = false;
            clearInterval(this.beginTimer);
            console.log('stopT', stopT)
            console.log('clear');
            setTimeout(() => {
                this.setState({
                    winnerStyle: {
                        color: 'rgb(255, 108, 63)'
                    }
                })
            }, 1000)
        }, stopT);
    }

    render() {
        //console.log(this.state.list.length);
        return (
            <div id="slotMachine">
                <div className="listWrapper">
                    <ul className="userList">
                        <li className="user" style={this.state.winnerStyle}>{this.state.user}</li>
                    </ul>
                </div>
            </div>
        )
    }
}

class Red extends Component {
    constructor(props) {
        super(props);
        this.openRed = this.openRed.bind(this);
        this.closeRed = this.closeRed.bind(this);
        this.out = this.out.bind(this);
        this.getIn = this.getIn.bind();
        this.checkIfOpen = this.checkIfOpen.bind(this);
        this.nextWinner = this.nextWinner.bind(this);

        this.state = {
            time: props.data.duration,
            open: false,
            showUser: ''
        }

        this.timer = null;

        this.uuu = [];
        this.has = 0;
    }

    componentDidMount() {

        let t = this.state.time;
        this.timer = setInterval(() => {
            this.checkIfOpen();
            if (t > 0) {
                t--;
            }
            this.setState({
                time: t
            })
        }, 1100);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        console.log('red_clear');
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.redUser.length > 0) {
            this.uuu = nextProps.redUser;
        }
        if (nextProps.redUser.length > 0 && !this.state.open && this.state.time === 0) {
            this.setState({
                open: true,
                showUser: nextProps.redUser[0]
            })
            this.uuu = nextProps.redUser;
            setTimeout(() => {
                this.openRed();
            }, 3000);
        } else if (nextProps.redClose) {
            this.closeRed()
        }

        if (nextProps.nextRed > 0 && this.has !== nextProps.nextRed) {
            this.nextWinner(nextProps.nextRed);
        }
    }
    checkIfOpen() {
        if (this.state.time === 0 && !this.state.open && this.props.redUser.length > 0) {
            console.log(this.uuu)
            this.setState({
                open: true,
                showUser: this.props.redUser[0]
            })
            this.uuu = this.props.redUser;
            setTimeout(() => {
                this.openRed();
            }, 3000);
        }
    }
    openRed() {
        let node = document.querySelector('.redClose');
        node.style.transform = 'rotateX(180deg)';
        setTimeout(() => {
            node.style.zIndex = '9';
            this.out()
        }, 3500)
    }
    closeRed() {
        this.getIn();
        let nodeRed = document.querySelector('.redClose');

        setTimeout(() => {
            nodeRed.style.transform = 'rotateX(0deg)';
            nodeRed.style.zIndex = '999999';
        }, 2500)

    }

    out() {
        let node = document.querySelector('.redUser');
        node.style.top = '-1.9vw';
    }

    getIn() {
        let node = document.querySelector('.redUser');
        node.style.top = '3.4vw';
    }

    nextWinner(index) {
        this.getIn();
        this.has = index;
        setTimeout(() => {
            this.setState({
                showUser: this.uuu[index]
            })
            this.out();
        }, 3000)
    }
    render() {
        return (
            <div className="redWrapper">
                <div className="redClose"></div>

                <div className="redUser">
                    <p>幸运用户</p>
                    <p>{this.state.showUser}</p>
                </div>

                <div className="redCoverWrapper">
                    <img className="redCover" src={redCover} alt=""/>
                </div>


                <p className="password" >{this.props.data.keyWord}</p>
                <div className="restTime">剩余时间<span>{this.state.time}</span>秒</div>

               
            </div>
        )
    }
}

export default BigScreen;