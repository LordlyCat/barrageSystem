import React, {
    Component
} from 'react';

import './barrageManage.css';
import iconDelete from '../../img/deleteWord.png';
import iconTop from '../../img/topIcon.png';
import iconMoving from '../../img/movingIcon.png';
import iconBottom from '../../img/bottomIcon.png';
import iconColor from '../../img/colorIcon.png';

import ajax from '../../ajax.js';

class BarrageManage extends Component {
    constructor() {
        super();
        this.state = {
            shieldWord: ''
        }
        this.openColors = this.openColors.bind(this);
        this.setShieldWord = this.setShieldWord.bind(this);
        this.getInput = this.getInput.bind(this);
    }
    openColors() {
        ajax({
            url: 'https://wx.yyeke.com/bigscreen/admin/commond',
            method: 'POST',
            data: `{
                "type": "server",
                "key": "colors",
                "value": "colors"
            }`,
            headers: {
                'Content-Type': 'raw',
                'jwt': localStorage.getItem('jwt')
            },
            success: (data) => {
                console.log('colors', data.response);
            }
        })
    }
    getInput(e) {
        console.log(e.target.value);
        this.setState({
            shieldWord: e.target.value
        })
    }
    setShieldWord() {
        ajax({
            async: true,
            method: 'POST',
            url: 'https://wx.yyeke.com/bigscreen/admin/sensitive/add',
            data: {
                word: this.state.shieldWord
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'jwt': localStorage.getItem('jwt')
            },
            success: (data) => {
                console.log('data', data.response);
            },
            error: (err) => {
                console.log('err:', err)
            }
        })
    }
    render() {
        return (
            <div className="barrageManage">
                <p className="title">弹幕管理</p>
                <div className="shield">
                    <p className="smallTitle">弹幕屏蔽</p>
                    <input type="text" placeholder="输入需要屏蔽的关键词" 
                    value={this.state.shieldWord}
                    onChange={this.getInput} />
                    <div className="add" onClick={this.setShieldWord}>确认添加</div>
                    <div className="keyword">
                        <p>屏蔽关键词：</p>
                        <span className="word">123 <img src={iconDelete} alt=""/></span>
                        <span className="word">哈哈哈 <img src={iconDelete} alt=""/></span>
                        <span className="word">123 <img src={iconDelete} alt=""/></span>
                        <span className="word">123 <img src={iconDelete} alt=""/></span>
                        <span className="word">123 <img src={iconDelete} alt=""/></span>
                        <span className="word">123 <img src={iconDelete} alt=""/></span>
                    </div>
                </div>

                <div className="setting">
                    <p className="smallTitle">弹幕设置</p>
                    <div className="inputWrapper">
                        <span>透明度</span> <input type="range" min="0" max="100" defaultValue="80" />
                    </div>
                    <div className="inputWrapper">
                        <span>速度</span> <input type="range" min="0" max="100" defaultValue="40" />
                    </div>

                    <div className="interval">
                        <span>弹幕间隔</span>
                        <select name="cars">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3" defaultValue="selected">3</option>
                            <option value="4">4</option>
                        </select>
                        <span>名</span>
                    </div>

                    <div className="interval">
                        <span>同屏显示数量</span>
                        <select name="cars">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3" defaultValue="selected">3</option>
                            <option value="4">4</option>
                        </select>
                        <span>条</span>
                    </div>

                    <div className="filter">
                        <p className="smallTitle">弹幕筛选</p>
                        <img src={iconTop} alt=""/>
                        <img src={iconMoving} alt=""/>
                        <img src={iconBottom} alt=""/>
                        <img src={iconColor} alt=""/>
                    </div>
                </div>

                <div className="save">保存</div>
                <div className="save" onClick={this.openColors} >彩弹</div>
            </div>
        )
    }
}

export default BarrageManage;