import React, { Component } from 'react';
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";

import { connect } from 'react-redux';

class Header extends Component {
    constructor() {
        super();

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
        this.props.history.push('/');
    }
    renderAuthButton(isAuth) {
        if (isAuth) {
            return <button onClick={this.handleLogout} style={{marginBottom:"5px"}} className=" b b1 na-sign-in"><i className="fa fa-sign-out" /> ĐĂNG XUẤT</button>
        }
        return (
            //Fragment trả về nhiều thành phần mà không cần thêm gì vào DOM
            <React.Fragment>
                <Link className="na-sign-in"  to="/login"><i className="fa fa-user" /> ĐĂNG NHẬP</Link>
                <a >/   </a>
                <Link className="na-sign-in" to="/register"> <i className="fa fa-key" /> ĐĂNG KÝ</Link>
            </React.Fragment>
        )
    }
    renderOwnerSection(isAuth) {
        if (isAuth) {
            return (
                <li className="dropdown"><a className="na-item dropdown-toggle" data-toggle="dropdown" href="#">THÀNH VIÊN<span className="caret" /></a>
                    <ul className="dropdown-menu">
                        <li><Link to="/user">TRANG CÁ NHÂN</Link></li>
                        <li><Link to="/list_book">DANH SÁCH NHÀ ĐẴ ĐẶT</Link></li>
                        <li><Link to="/rental/manage">DANH SÁCH NHÀ CHO THUÊ</Link></li>
                        <li><Link to="/create_rent">CHO THUÊ NHÀ</Link></li>
                    </ul>
                </li>
            )
        }
    }
    render() {
        const { username, isAuth } = this.props.auth;

        return (
            <div>
                <header >
                    <div className="container-fluid">
                        <Link className="na-brand" to="/"><span>U</span>IT HomeStay<i className="fa fa-home top_logo_home" aria-hidden="true" /></Link>
                        <div className="navbar-right mg-top-10">
                            {isAuth &&
                                <Link to='/user' style={{marginRight:"20px",fontSize:"20px"}} className='nav-item nav-link'>{username}</Link>
                            }
                            {this.renderAuthButton(isAuth)}
                        </div>
                    </div>
                    <nav className="navbar navbar-default na">
                        <div className="container">
                            <div className="row">
                                <div className="header_search">
                                    <form action="#" method="post">
                                        <input type="search" name="search" placeholder="Search here..." required=""/>
                                        <Link className="btn btn-block" to="/search"><i className="fa fa-search"/></Link>
                                    </form>
                                </div>
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle na-toggle" data-toggle="collapse" data-target="#myNavbar">
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                </div>

                                <div className="collapse navbar-collapse na-right" id="myNavbar">
                                    <ul className="nav navbar-nav ">
                                        <li><Link className="na-item " to="/booking_home">ĐẶT NHÀ</Link></li>
                                        <li><Link className="na-item" to="/">BLOG CHIA SẺ</Link></li>
                                    {this.renderOwnerSection(isAuth)}
                                    <li><Link className="na-item" to="/contact">LIÊN HỆ</Link></li>

                                    {/*<li><Link className="na-item" to="/payment">THANH TOÁN</Link></li>*/}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                </header>

            </div >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}
export default withRouter(connect(mapStateToProps)(Header));