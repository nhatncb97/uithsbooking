import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { BwmResError } from '../shared/form/BwmResError'
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import * as actions from 'actions';

class Login extends Component {
    constructor() {
        super();
        this.loginUser = this.loginUser.bind(this);
        this.state = {
            errors: []
        }
    }
    loginUser(userData) {
        this.props.dispatch(actions.login(userData))
            .then(
                ({ errors }) => {
                    this.setState({
                        errors: errors
                    })
                }
            )
            .catch(err => err)

    }
    render() {
        const { isAuth } = this.props.auth;
        const errors = this.state.errors;
        const { successRegister } = this.props.location.state || false;
        if (isAuth) {
            return <Redirect to={{ pathname: '/' }} />
        }

        return (
            <div>
                <div className="bg">
                    <img src="/img/bg.jpg" alt="bg" />
                </div>
                <div className="fg">
                    <div className="container">
                        <br />
                        <br />
                        <br />
                        <div className="dbox slide-in-bottom">
                            <h3 style={{ textAlign: "center" }}>Đăng nhập</h3>
                            <hr />
                            {
                                successRegister &&
                                <div className='boxtrue'>
                                    <p>Đăng ký thành công. Hãy đăng nhập ngay</p>
                                </div>
                            }
                            <br />
                            <LoginForm submitCb={this.loginUser} errors={errors} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Login);