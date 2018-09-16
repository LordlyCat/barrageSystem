import React, {
	Component
} from 'react';
import colorImg from '../img/color.png';
import setImg from '../img/set.png';
import selected from '../img/selected.png';

import './Client.css';

class Client extends Component {
	constructor() {
		super();
		this.state = {
			textValue: '',
			length: 0,
			color: 'gray',
			cover: 'coverOn',
			tips: '',
			tipsClass: 'tipsOff'
		}
		//this.textValue = '';
		this.getInput = this.getInput.bind(this);
		this.sendBarrage = this.sendBarrage.bind(this);
		this.closeTips = this.closeTips.bind(this);
	}
	getInput(e) {
		if (e.target.value.length > 30) {
			this.setState({
				textValue: e.target.value,
				length: e.target.value.length,
				color: 'red'
			})
		} else {
			this.setState({
				textValue: e.target.value,
				length: e.target.value.length,
				color: 'gray'
			})
		}
		//this.textValue = e.target.value;
	}
	sendBarrage() {
		let regu = "^[ ]+$";
		let re = new RegExp(regu);
		if (this.state.textValue.length > 30) {
			this.setState({
				cover: 'coverOn',
				tips: '弹幕字数超出限制'
			})
		} else if (this.state.textValue.length == 0 || re.test(this.state.textValue)) {
			this.setState({
				cover: 'coverOn',
				tips: '发送内容不能为空'
			})
		} else {
			console.log(this.state.textValue);
			this.setState({
				textValue: '',
				length: 0,
				color: 'gray'
			})
		}
	}
	closeTips() {
		this.setState({
			cover: 'coverOff'
		})
	}
	render() {
		let styleColor = {
			color: this.state.color
		}
		// let styleCover = {
		// 	display: this.state.cover
		// }
		return (
			<div className="clientWrapper">
				<textarea placeholder="说出你想说的话..." value={this.state.textValue} onChange={this.getInput}></textarea>
				<p className="textLength"><span style={styleColor}>{this.state.length}</span>/30</p>
				<div className="fuctionBar">
					<img className="colorImg" src={colorImg} alt=""/>
					<img className="setImg" src={setImg} alt=""/>
					<button className="ripple" onClick={this.sendBarrage}>发送</button>
				</div>
				<div className={this.state.cover}>
					<div className={this.state.tipsClass}>
						<p>{this.state.tips}</p>
						<div className="back" onClick={this.closeTips}>知道了</div>
					</div>
					<div className="palette">
						<p className="title">弹幕颜色</p>
						<div className="colorSelect">
							<div className="color color_1"></div>
							<div className="color color_2"></div>
							<div className="color color_3"></div>
							<div className="color color_4"></div>
							<div className="color color_5"></div>
							<div className="color color_6"></div>
							<div className="color color_7"></div>
							<div className="color color_8"></div>
							<div className="color color_9"></div>
						</div>
						<div className="check">确认</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Client;