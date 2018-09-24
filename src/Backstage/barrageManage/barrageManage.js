import React, {
    Component
} from 'react';

import './barrageManage.css';
import iconDelete from '../../img/deleteWord.png';
import iconTop from '../../img/topIcon.png';
import iconMoving from '../../img/movingIcon.png';
import iconBottom from '../../img/bottomIcon.png';
import iconColor from '../../img/colorIcon.png';

class BarrageManage extends Component {
    render() {
        return (
            <div className="barrageManage">
                <p className="title">弹幕管理</p>
                <div className="shield">
                    <p className="smallTitle">弹幕屏蔽</p>
                    <input type="text" placeholder="输入需要屏蔽的关键词"/>
                    <div className="add">确认添加</div>
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
            </div>
        )
    }
}

export default BarrageManage;