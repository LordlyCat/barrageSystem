import React, {
    Component
} from 'react';

import './userManage.css';
import iconSearch from '../../img/searchIcon.png';
import iconTestHeader from '../../img/testHeader.png';
import blacklist from '../../img/blacklistIcon.png';
import moveout from '../../img/moveout.png';

class UserManage extends Component {
    render() {
        return (
            <div className="userManageWrapper">
                <p className="title">用户管理</p>
                <div className="userListManage">
                    <p className="smallTitle">用户列表</p>
                    <div className="search">
                        <input type="text" placeholder="昵称或微信号" />
                        <img src={iconSearch} alt=""/>
                    </div>
                    <div className="listContainer">
                        <div className="listWrapper">
                            <div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div>
                            <div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div>
                        </div>
                    </div>
                    <span>观众数量：157</span>
                    <span>弹幕数量：295</span>
                </div>

                <div className="userListManage">
                    <p className="smallTitle">黑名单</p>
                    <div className="search">
                        <input type="text" placeholder="昵称或微信号" />
                        <img src={iconSearch} alt=""/>
                    </div>
                    <div className="listContainer">
                        <div className="listWrapper">
                            <div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div>
                            <div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="userListManage">
                    <p className="smallTitle">中奖名单</p>
                    <div className="search">
                        <input type="text" placeholder="昵称或微信号" />
                        <img src={iconSearch} alt=""/>
                    </div>
                    <div className="listContainer">
                        <div className="listWrapper">
                            <div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div>
                            <div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div><div className="list">
                                <img src={iconTestHeader} alt="" className="headerImg"/>
                                <span>昵称：暗夜的萤火虫</span>
                                <span>微信号：18720867632</span>
                                <img src={blacklist} alt="" className="black"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="save">保存</div>
            </div>
        )
    }
}

export default UserManage;