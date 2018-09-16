import React, {
    Component
} from 'react';

import './BigScreem.css';

let ctx;

class BigScreem extends Component {
    constructor() {
        super();
        this.myRef = React.createRef();
        this.width = window.screen.availWidth;
        this.height = window.innerHeight;
    }
    componentDidMount() {
        ctx = this.myRef.current.getContext('2d');
        let list = [];
        setInterval(() => {
            list.push(new Barrage("哈哈哈哈哈哈哈哈哈哈哈哈哈", 'white', 30, 'serif'));
        }, 1000);
        let go = () => {
            ctx.clearRect(0, 0, this.width, this.height);
            console.log(list.length)
            for (var i = 0; i < list.length; i++) {
                if (list[i].lifeState === 'died') {
                    list.splice(i, 1);
                }
                this.moving(list[i]);
            }
            window.requestAnimationFrame(go);
        }
        go();
    }
    moving(barrage) {
        barrage.draw();
        barrage.x -= barrage.text.length / 6 + 3; //弹幕移动速度
    }
    render() {
        return (
            <canvas id="stage" ref={this.myRef} width={this.width} height={this.height}></canvas>
        )
    }
}

class Barrage {
    constructor(text, color, fontSize, fontFamily, position) {
        this.text = text;
        this.color = color;
        this.timestamp = '';
        this.fontSize = fontSize;
        this.font = this.fontSize + 'px serif';
        this.location = '';
        this.x = window.screen.availWidth;
        this.y = Math.random() * (window.innerHeight - 60) + this.fontSize;
        this.lifeState = 'alive';
        this.draw = this.draw.bind(this);
        this.destroyTimer();
    }
    draw() {
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

export default BigScreem;