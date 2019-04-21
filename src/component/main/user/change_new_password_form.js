import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'component/main/shared/form/BwmInput';
import { BwmResError } from 'component/main/shared/form/BwmResError';
import { validate } from 'component/main/shared/form/validators';

const newPassForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
    return (
        <React.Fragment>
            <BwmResError errors={errors} />

            <form onSubmit={handleSubmit(submitCb)}>
                <div className="form-group">
                    <Field
                        name="password"
                        type="password"
                        label='Mật Khẩu Cũ'
                        className='field__input a-field__input'
                        id='password'
                        component={BwmInput}
                    />
                    <Field
                        name="newPassword"
                        type="password"
                        label='Mật Khẩu Mới'
                        className='field__input a-field__input'
                        id='newPassword'
                        component={BwmInput}
                    />
                    <Field
                        name="newPasswordConfirmation"
                        type="password"
                        label="Xác Nhận Mật Khẩu Mới"
                        className='field__input a-field__input'
                        id='newPasswordConfirmation'
                        component={BwmInput}
                    />
                </div>

                <button className='b b1 center_button' type="submit" disabled={!valid || pristine || submitting}>
                    {submitting ?
                        <span>
                            <i className="fa fa-spin fa-spinner" /> Đang gửi...
                        </span>
                        :
                        <span>Gửi</span>
                    }
                </button>

            </form>
        </React.Fragment>
    )
}

export default reduxForm({
    form: 'newPassForm',
    //  validate
})(newPassForm)
