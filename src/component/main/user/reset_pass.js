import React, { Component } from 'react';
import ResetPass from './reset_pass_form'
import { connect } from 'react-redux';
import * as actions from 'actions';
import { stat } from 'fs';
class reset_pass extends Component {
    constructor(props) {
        super(props);
        this.resetpass = this.resetpass.bind(this);
    }

    resetpass(userData) {
        const rsid = this.props.match.params.id;
        this.props.dispatch(actions.resetPass(userData, rsid))
    }
    componentWillUpdate()
    {
    }
    render() {
        const { isReset, errors } = this.props
        return (
            <main>
                <div className="container">
                    <h3>Đổi mật khẩu</h3>
                    <div className="col-lg-2">

                    </div>
                    <div className="col-lg-8 infobox scale-in-center">
                        {

                            isReset &&
                            <div className='boxtrue'>
                                <p>Đã đổi mật khẩu thành công</p>
                            </div>
                        }
                        <ResetPass submitCb={this.resetpass} errors={errors} />

                    </div>
                    <div className="col-lg-2">

                    </div>

                </div>

            </main>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.users.errors,
        isReset: state.users.isReset
    }
}
export default connect(mapStateToProps)(reset_pass);