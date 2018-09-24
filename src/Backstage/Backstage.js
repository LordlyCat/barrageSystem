import React, {
	Component
} from 'react';

import './Backstage.css';
import logo from '../img/logo.png';
import iconManage from '../img/management.png';
import iconActivity from '../img/activity.png';
// import iconDelete from '../img/deleteWord.png';
// import iconTop from '../img/topIcon.png';
// import iconMoving from '../img/movingIcon.png';
// import iconBottom from '../img/bottomIcon.png';
// import iconColor from '../img/colorIcon.png';
import BarrageManage from './barrageManage/barrageManage.js';
import UserManage from './userManage/userManage.js';
import RedEnvelope from './redEnvelope/redEnvelope.js';
import Random from './random/random.js';

class Backstage extends Component {
	constructor() {
		super();
		this.board = [<UserManage />, <BarrageManage />, <RedEnvelope />, <Random />];
		this.state = {
			show: this.board[1],
			active: [0, 1, 0, 0]
		}
	}

	changeBoard(index) {
		console.log(index);
		let active = this.state.active;
		for (var i = 0; i < active.length; i++) {
			if (i === index) {
				active[i] = 1;
			} else {
				active[i] = 0;
			}
		}

		this.setState({
			show: this.board[index],
			active: active
		})
	}

	render() {
		let styleArr = this.state.active.map((ele, index) => {
			let obj = {}
			if (ele === 1) {
				obj.background = 'rgb(255, 181, 53)';
				obj.color = 'white';
			} else {
				obj.background = 'white';
				obj.color = 'gray';
			}
			return obj;
		})
		return (
			<div className="wrapper">
				<div className="headerWrapper">
					<div className="header">
						<img src={logo} alt="" className="logo"/>
						<div className="quit">
							退出
						</div>
						<p className="welcom">
							您好，Administrator
						</p>
					</div>
				</div>
				<div className="main">
					<div className="functionBar">
						<div className="manageWrapper">
							<div className="manage">
								<div className="title">
									<img src={iconManage} alt="" className="icon"/>
									<span>管理</span>
								</div>
								<div className="selection" style={styleArr[0]} onClick={this.changeBoard.bind(this, 0)}>
									<p className="first">用户管理</p>
								</div>
								<div className="selection second" style={styleArr[1]} onClick={this.changeBoard.bind(this, 1)}>
									<p>弹幕管理</p>
								</div>
							</div>
						</div>
						<div className="activityWrapper">
							<div className="activity">
								<div className="title">
									<img src={iconActivity} alt="" className="icon"/>
									<span>互动</span>
								</div>
								<div className="selection" style={styleArr[2]} onClick={this.changeBoard.bind(this, 2)}>
									<p className="first">红包弹幕</p>
								</div>
								<div className="selection second" style={styleArr[3]} onClick={this.changeBoard.bind(this, 3)}>
									<p>随机弹幕</p>
								</div>
							</div>
						</div>
					</div>

					<div className="board">
						{this.state.show}
					</div>

					</div>
			</div>
		)
	}
}
//<UserManage />
//<BarrageManage />
//<RedEnvelope />
//<Random />


export default Backstage;