import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'component/main/shared/form/BwmInput';
import { BwmResError } from 'component/main/shared/form/BwmResError';
import { validate } from 'component/main/shared/form/validators';
import ErrorBoundary from '../../../helpers/ErrorBoundary'

const ForgotForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
    return (
        <React.Fragment>
            <BwmResError errors={errors} />
            <form onSubmit={handleSubmit(submitCb)}>
                <div className="form-group">

                    <Field
                        name="email"
                        type="email"
                        label='Email'
                        className='field__input a-field__input'
                        id='email'
                        component={BwmInput}
                    /></div>

                <button className='b b1 center_button' type="submit" disabled={!valid || pristine || submitting}>
                    {submitting ?
                        <span>
                            <i className="fa fa-spin fa-spinner" /> Đang gửi...
          </span>
                        :
                        <span>Gửi</span>
                    }
                </button>

                <br />
                <br />

            </form>
        </React.Fragment>
    )
}

export default reduxForm({
    form: 'forgotForm',
    validate
})(ForgotForm)
