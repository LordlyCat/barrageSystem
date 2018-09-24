import React, {
    Component
} from 'react';

import './redEnvelope.css';

class RedEnvelope extends Component {
    render() {
        return (
            <div className="redWrapper">
                <p className="title">红包弹幕</p>
                <div className="setPassword">
                    <p className="smallTitle">设置口令</p>
                    <input type="text" placeholder="如“idsbYRX”(不得超过十五个字)" />
                </div>
                <div className="setTime">
                    <p className="smallTitle">设置持续时间</p>
                    <select name="cars">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" defaultValue="selected">3</option>
                        <option value="4">4</option>
                    </select>
                    <span>秒</span>
                </div>

                <div className="setNumber">
                    <p className="smallTitle">设置红包数量</p>
                    <select name="cars">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" defaultValue="selected">3</option>
                        <option value="4">4</option>
                    </select>
                    <span>个</span>
                </div>

                <div className="prize">
                    <p className="smallTitle">奖品信息</p>
                    <input type="text" placeholder="不得超过十五个字" />
                </div>

                <div className="stop">停止</div>
                <div className="start">开始</div>
            </div>
        )
    }
}

export default RedEnvelope;