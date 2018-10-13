import React, {
    Component
} from 'react';
import colorImg from '../img/color.png';
import setImg from '../img/set.png';
import selected from '../img/selected.png';
import topBarrage from '../img/topBarrage.png';
import movingBarrage from '../img/movingBarrage.png';
import bottomBarrage from '../img/bottomBarrage.png';
import ajax from '../ajax.js';

import './Client.css';

class Client extends Component {
    constructor() {
        super();
        this.barrageColor = '#fff';
        this.location = 0;
        this.state = {
            barrage: {
                text: '',
                color: this.barrageColor,
                location: 0
            },
            length: 0,
            selectedColor: ['selected', 'unselected', 'unselected', 'unselected',
                'unselected', 'unselected', 'unselected', 'unselected', 'unselected'
            ],
            l_color: 'gray',
            cover: 'coverOff',
            tips: '',
            tipsClass: 'tipsOff',
            palette: "paletteOff",
            positionSet: 'positionSetOff'
        }
        this.jwt;
        //this.textValue = '';
        this.getInput = this.getInput.bind(this);
        this.sendBarrage = this.sendBarrage.bind(this);
        this.closeCover = this.closeCover.bind(this);
    }
    componentWillMount() {
        if (window.location.hash.split('?')[1] == undefined) {
            window.location = 'https://wx.idsbllp.cn/bigscreen/barrageIndex';
            return false;
        }
        console.log(window.location.hash.split('?')[1].slice(2));
        this.jwt = window.location.hash.split('?')[1].slice(2);
        window.history.pushState({
            jwt: 'getted'
        }, 'client', '/#/client');
    }
    componentDidMount() {

    }
    getInput(e) {
        let barrage = this.state.barrage;
        barrage.text = e.target.value;
        if (e.target.value.length > 15) {
            this.setState({
                barrage: barrage,
                length: e.target.value.length,
                l_color: 'red'
            })
        } else {
            this.setState({
                barrage: barrage,
                length: e.target.value.length,
                l_color: 'gray'
            })
        }
        //this.textValue = e.target.value;
    }
    sendBarrage() {
        let barrage = this.state.barrage;
        barrage.color = this.barrageColor;
        barrage.location = this.location;
        let regu = "^[ ]+$";
        let re = new RegExp(regu);
        if (this.state.barrage.text.length > 15) {
            this.setState({
                cover: 'coverOn',
                tipsClass: 'tips',
                tips: '弹幕字数超出限制'
            })
        } else if (this.state.barrage.text.length === 0 || re.test(this.state.textValue)) {
            this.setState({
                cover: 'coverOn',
                tipsClass: 'tips',
                tips: '发送内容不能为空'
            })
        } else {
            console.log(barrage);
            let that = this;
            ajax({
                async: true,
                method: 'POST',
                url: 'https://wx.idsbllp.cn/bigscreen/send',
                data: {
                    ...that.state.barrage
                    // openid: 'testOpenid'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'jwt': that.jwt
                },
                success: (data) => {
                    console.log('data', data.response);
                    let resData = JSON.parse(data.response)
                    //console.log(JSON.parse(data.response).status);
                    if (resData.status === 403) {
                        alert("请使用微信打开");
                    } else if (resData.status == 401) {
                        //alert('每隔3s才可以发送下一条弹幕哦');
                        that.setState({
                            cover: 'coverOn',
                            tipsClass: 'tips',
                            tips: '每隔3s才可以发送下一条弹幕哦'
                        })
                    } else if (resData.status === 402) {
                        alert("登录过期，点击‘确认’重新登录");
                        window.location = 'https://wx.idsbllp.cn/bigscreen/barrageIndex';
                    }

                }
            })

            this.setState({
                barrage: {
                    text: ''
                },
                length: 0,
                l_color: 'gray'
            })
        }
    }
    closeCover() {
        this.setState({
            cover: 'coverOff',
            tipsClass: 'tipsOff',
            palette: "paletteOff",
            positionSet: "positionSetOff"
        })
    }
    openSetting(e) {
        if (e === 'color') {
            this.setState({
                cover: 'coverOn',
                tipsClass: 'tipsOff',
                palette: 'palette'
            })
        } else {
            this.setState({
                cover: 'coverOn',
                tipsClass: 'tipsOff',
                palette: 'paletteOff',
                positionSet: 'positionSet'
            })
        }
    }
    selectColor(color, index) {
        //console.log(color, index);
        this.barrageColor = color;
        let selectedColor = this.state.selectedColor;
        for (var i = 0; i < selectedColor.length; i++) {
            if (i === index) {
                selectedColor[i] = 'selected';
            } else {
                selectedColor[i] = 'unselected';
            }
        }
        this.setState({
            selectColor: selectedColor
        })
    }
    selectPosition(location) {
        this.location = location;

    }
    render() {
        let styleColor = {
            color: this.state.l_color
        }
        return (
            <div className="clientWrapper">
                <textarea placeholder="说出你想说的话..." value={this.state.barrage.text} onChange={this.getInput}></textarea>
                <p className="textLength"><span style={styleColor}>{this.state.length}</span>/15</p>
                <div className="fuctionBar">
                    <img className="colorImg" src={colorImg} onClick={this.openSetting.bind(this, 'color')} alt=""/>
                    <img className="setImg" src={setImg} onClick={this.openSetting.bind(this, 'position')} alt=""/>
                    <button className="ripple" onClick={this.sendBarrage}>发送</button>
                </div>
                <div className={this.state.cover}>
                    <div className={this.state.tipsClass}>
                        <p>{this.state.tips}</p>
                        <div className="back" onClick={this.closeCover}>知道了</div>
                    </div>
                    <div className={this.state.palette}>
                        <p className="title">弹幕颜色</p>
                        <div className="colorSelect">
                            <div className="color color_1" onClick={this.selectColor.bind(this, '#ffffff', 0)}>
                                <img className={this.state.selectedColor[0]} src={selected} alt=""/>
                            </div>
                            <div className="color color_2" onClick={this.selectColor.bind(this, '#0354CD', 1)}>
                                <img className={this.state.selectedColor[1]} src={selected} alt=""/>
                            </div>
                            <div className="color color_3" onClick={this.selectColor.bind(this, '#00D9AE', 2)}>
                                <img className={this.state.selectedColor[2]} src={selected} alt=""/>
                            </div>
                            <div className="color color_4" onClick={this.selectColor.bind(this, '#EE00A8', 3)}>
                                <img className={this.state.selectedColor[3]} src={selected} alt=""/>
                            </div>
                            <div className="color color_5" onClick={this.selectColor.bind(this, '#00B0EA', 4)}>
                                <img className={this.state.selectedColor[4]} src={selected} alt=""/>
                            </div>
                            <div className="color color_6" onClick={this.selectColor.bind(this, '#FFF428', 5)}>
                                <img className={this.state.selectedColor[5]} src={selected} alt=""/>
                            </div>
                            <div className="color color_7" onClick={this.selectColor.bind(this, '#FF5B3B', 6)}>
                                <img className={this.state.selectedColor[6]} src={selected} alt=""/>
                            </div>
                            <div className="color color_8" onClick={this.selectColor.bind(this, '#C03FF5', 7)}>
                                <img className={this.state.selectedColor[7]} src={selected} alt=""/>
                            </div>
                            <div className="color color_9" onClick={this.selectColor.bind(this, '#FFAB0A', 8)}>
                                <img className={this.state.selectedColor[8]} src={selected} alt=""/>
                            </div>
                        </div>
                        <div className="check" onClick={this.closeCover}>确认</div>
                    </div>
                    <div className={this.state.positionSet}>
                        <div className="positionSelect">
                            <img src={topBarrage} onClick={this.selectPosition.bind(this, 1)} alt=""/>
                            <img src={movingBarrage} onClick={this.selectPosition.bind(this, 0)} alt=""/>
                            <img src={bottomBarrage} onClick={this.selectPosition.bind(this, -1)} alt=""/>
                        </div>
                        <div className="check" onClick={this.closeCover}>确认</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Client;