import React, {
    Component
} from 'react';

import './random.css';
import ajax from '../../ajax.js';

class Random extends Component {
    constructor() {
        super();
        this.showSlot = this.showSlot.bind(this);
        this.lottery = this.lottery.bind(this);
        this.show = false;

        this.state = {
            startBtn: '开始'
        }
    }
    showSlot() {
        let flag = null;
        if (this.show) {
            this.show = false;
            flag = false;
            this.setState({
                startBtn: '开始'
            })
        } else {
            this.show = true;
            flag = true;
            this.setState({
                startBtn: '结束'
            })
        }
        ajax({
            url: 'https://wx.idsbllp.cn/bigscreen/admin/commond',
            method: 'POST',
            data: {
                key: 'showSlot',
                value: flag
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'jwt': localStorage.getItem('jwt')
            },
            success: (data) => {
                console.log('showSlot', data.response);
            }
        })
    }
    lottery() {
        ajax({
            url: 'https://wx.idsbllp.cn/bigscreen/admin/commond',
            method: 'POST',
            data: {
                key: 'lottery',
                value: 'lottery'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'jwt': localStorage.getItem('jwt')
            },
            success: (data) => {
                console.log('lottery', data.response);
            }
        })
    }
    render() {
        return (
            <div className="random">
                <p className="title">随机弹幕</p>
                <div className="condition">
                    <p className="smallTitle">抽奖资格</p>
                    <span>至少发送</span>
                    <input type="text"/>
                    <span>条弹幕</span>
                </div>

                <div className="winning">
                    <p className="smallTitle">中奖观众</p>
                    <select name="cars">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" defaultValue="selected">3</option>
                        <option value="4">4</option>
                    </select>
                    <span>名</span>
                </div>

                <div className="prize">
                    <p className="smallTitle">奖品信息</p>
                    <input type="text" placeholder="不得超过十五个字" />
                </div>

                
                <div className="start solotBtn" onClick={this.showSlot} >{this.state.startBtn}</div>
                <div className="stop solotBtn" onClick={this.lottery} >抽奖</div>
                
            </div>
        )
    }
}

export default Random;