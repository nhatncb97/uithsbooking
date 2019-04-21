import React, { Component } from 'react';
import NewPass from './change_new_password_form'
import { connect } from 'react-redux';
import * as actions from 'actions';

import { stat } from 'fs';
class reset_pass extends Component {
  constructor(props) {
    super(props);
    this.updatePass = this.updatePass.bind(this);
    this.state = {
      redirect: false,
      errors: ''
    }
  }
  updatePass(userData) {
    this.props.dispatch(actions.updatePass(userData))
    // .then(
    //   changed => this.setState({
    //     redirect: true
    //   }),
    //   detail => {
    //     console.log(detail)
    //     this.setState({
    //     errors: detail
    //   })}
    // )
  }
  // resetpass(userData) {
  //   const rsid = this.props.match.params.id;
  //   this.props.dispatch(actions.resetPass(userData, rsid))
  // }
  componentWillUpdate() {

  }
  render() {
    const { isUpdated, errors, isError } = this.props
    return (
      <main>
        <div className="container">
          <h3>Đổi mật khẩu</h3>
          <div className="col-lg-2">

          </div>
          <div className="col-lg-8 infobox scale-in-center">
            {
              isUpdated &&
              <div className='alert alert-success'>
                <p>Đã đổi mật khẩu thành công</p>
              </div>
            }
            {
              isError &&
              <div className='alert alert-danger'>
                <p>{errors.detail}</p>
              </div>
            }
            <NewPass submitCb={this.updatePass} errors={errors} />

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
    isUpdated: state.users.isUpdated,
    isError: state.users.isError
  }
}
export default connect(mapStateToProps)(reset_pass);