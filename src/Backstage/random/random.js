import React, {
	Component
} from 'react';

import './random.css';

class Random extends Component {
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

                <div className="stop">停止</div>
                <div className="start">开始</div>
    		</div>
		)
	}
}

export default Random;