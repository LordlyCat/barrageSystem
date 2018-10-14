import React, {
    Component
} from 'react';

import './redEnvelope.css';
import ajax from '../../ajax.js';


class RedEnvelope extends Component {
    constructor() {
        super();

        this.setPeopleNum = this.setPeopleNum.bind(this);
        this.setKeyWord = this.setKeyWord.bind(this);
        this.setDuration = this.setDuration.bind(this);
        this.sendRed = this.sendRed.bind(this);
        this.overOut = this.overOut.bind(this);
        this.next = this.next.bind(this);

        this.state = {
            peopleNum: 3,
            keyWord: '',
            duration: 40
        }
    }
    setPeopleNum(e) {
        this.setState({
            peopleNum: e.target.value
        })
    }
    setKeyWord(e) {
        this.setState({
            keyWord: e.target.value
        })
    }
    setDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    sendRed() {
        console.log(this.state);
        if (this.state.keyWord.length === 0) {
            alert('口令不能为空');
            return false;
        }
        let that = this;
        ajax({
            url: 'https://wx.idsbllp.cn/bigscreen/admin/gift/begin',
            method: 'POST',
            data: that.state,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'jwt': localStorage.getItem('jwt')
            },
            success: (data) => {
                console.log(data.response);
            }
        })
    }
    overOut() {
        ajax({
            url: 'https://wx.idsbllp.cn/bigscreen/admin/commond',
            method: 'POST',
            data: {
                key: 'redOver',
                value: 'redOver'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'jwt': localStorage.getItem('jwt')
            },
            success: (data) => {
                console.log('redOver', data.response);
            }
        })
    }
    next() {
        ajax({
            url: 'https://wx.idsbllp.cn/bigscreen/admin/commond',
            method: 'POST',
            data: {
                key: 'nextRed',
                value: 'nextRed'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'jwt': localStorage.getItem('jwt')
            },
            success: (data) => {
                console.log('nextRed', data.response);
            }
        })
    }
    render() {
        return (
            <div id="redWrapper">
                <p className="title">红包弹幕</p>
                <div className="setPassword">
                    <p className="smallTitle">设置口令</p>
                    <input type="text" placeholder="如“idsbYRX”(不得超过十五个字)" value={this.state.keyWord} onChange={this.setKeyWord} />
                </div>
                <div className="setTime">
                    <p className="smallTitle">设置持续时间</p>
                    <select name="cars" value={this.state.duration} onChange={this.setDuration}>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40" defaultValue="selected">{this.state.duration}</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                        <option value="80">80</option>
                    </select>
                    <span>秒</span>
                </div>

                <div className="setNumber">
                    <p className="smallTitle">设置红包数量</p>
                    <select name="cars" value={this.state.peopleNum} onChange={this.setPeopleNum}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" defaultValue="selected">{this.state.peopleNum}</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <span>个</span>
                </div>

                <div className="prize">
                    <p className="smallTitle">奖品信息</p>
                    <input type="text" placeholder="不得超过十五个字" />
                </div>

                <div className="stop" onClick={this.overOut} >停止</div>
                <div className="start" onClick={this.sendRed} >开始</div>

                <div className="start" onClick={this.next} >NEXT</div>
            </div>
        )
    }
}

export default RedEnvelope;