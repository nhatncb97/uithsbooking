import React, { Component } from 'react';
import {startSubmit, stopSubmit} from 'redux-form'
import RegisterForm from './RegisterForm';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from 'actions';

class Signup extends Component {
    constructor() {
        super();

        this.state = {
            errors: [],
            redirect: false
        }

        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(userData) {
        this.props.dispatch(startSubmit('registerForm'))
        actions.register(userData).then(
            registered => this.setState({ redirect: true },()=>this.props.dispatch(stopSubmit('registerForm'))),
            errors => {this.setState({ errors },()=>this.props.dispatch(stopSubmit('registerForm')))}
        );
    }
    render() {
        const { errors, redirect } = this.state;

        if (redirect) {
            return <Redirect to={{ pathname: '/login', state: { successRegister: true } }} />
        }
        return (
            <div>
                <div className="bg">
                    <img src="/img/bg.jpg" alt="bg"/>
                </div>
                <div className="container">

                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <div  className="dbox slide-in-bottom">
                            <h3 style={{textAlign:"center"}}>Đăng ký</h3>
                            <hr/>
                            <div>
                    <RegisterForm submitCb={this.registerUser} errors={errors} />
                    </div></div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(Signup);