import React, { Component } from 'react';
import ForgotPass from './forgot_pass_form';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { stopSubmit, startSubmit } from "redux-form";

class ForgotPassword extends Component {
    constructor() {
        super();
        this.sendMail = this.sendMail.bind(this);
        this.state = {
            isLoading : false
        }
    }

    sendMail(userData) {
                
        this.props.dispatch(actions.sendMail(userData))
    }
    render() {
        const  {isSend, errors}  = this.props;
        // const sendSuccess = this.props.location.state || false;
        console.log(this.props);
        return (
            <div className="container">
                <div>
                    <h3>Quên mật khẩu</h3>
                </div>
                <div className="col-lg-2">

                </div>
                <div className="col-lg-8 infobox scale-in-center">

                    <div>
                        <p>Nhập email để chúng tôi có thể gửi thư xác nhận và giúp bạn khôi phục lại mật
                            khẩu</p>
                            { 
                                isSend &&
                                <div className='boxtrue'>
                                    <p>Hãy kiểm tra email của bạn</p>
                                </div>
                            }
                        <ForgotPass submitCb={this.sendMail} errors={errors}  />

                        {/* <div className="form-group">
                            <label htmlFor="email">Nhập lại email:</label>
                            <input onChange={this.handleChange} type="email" className="form-control" id="email"
                                placeholder="Nhập email" name="email" />
                        </div> */}
                    </div>
                    {/* <div className="">
                        <button onClick={this.forgotClick} type="button" className="btn btn-primary center_button"><a href="change_pwd.html"
                            style={{ color: 'white' }}>Gửi</a>
                        </button>
                    </div> */}
                </div>
                <div className="col-lg-2">

                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        errors: state.users.errors,
        isSend: state.users.isSend
    }
}

export default connect(mapStateToProps)(ForgotPassword);
