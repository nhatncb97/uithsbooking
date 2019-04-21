import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'component/main/shared/form/BwmInput';
import { BwmResError } from 'component/main/shared/form/BwmResError';
import { validate } from 'component/main/shared/form/validators';
import { Link } from "react-router-dom"
const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <React.Fragment>
      <BwmResError errors={errors} />
      <form onSubmit={handleSubmit(submitCb)}>
        <Field
          name="email"
          type="email"
          label='Email'
          className="field__input a-field__input"
          id='email'
          component={BwmInput}
        // validate={[required]}
        />
        <br />
        <br />
        <Field
          name="password"
          type="password"
          label='Password'
          className="field__input a-field__input"
          component={BwmInput}
        // validate={[required, minLength4]}
        />
        <div className="checkbox checkb">
          <label><input type="checkbox" name="remember" /> Nhớ tên tài khoản</label>
          <Link to="/forgot_pass" className="btn btn-link"
          >Quên mật khẩu?</Link>
        </div>
        <br />

        <button type="submit" className="b b1 center_button" disabled={!valid || pristine || submitting}>
        {submitting ?
          <span>
            <i className="fa fa-spin fa-spinner"/> Đang đăng nhập...
          </span>
          :
          <span>Đăng nhập</span>
        }
      </button>
        {}
        <br />
        <br />
      </form>
    </React.Fragment>
  )
}

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm)
