import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from 'component/main/shared/form/Input';

import { BwmResError } from 'component/main/shared/form/BwmResError';
import { BwmSelect } from 'component/main/shared/form/BwmSelect';
import { BwmTextArea } from 'component/main/shared/form/BwmTextArea';
import { updateUserValidate } from 'component/main/shared/form/validators';

const userContentForm = props => {
    console.log(props)
    const {username, email, address, phone, fullname, gender, description, initialValues} = props.user
    const { handleSubmit, pristine, submitting, submitCb, valid, errors, options, user } = props
    return (
        <form onSubmit={handleSubmit(submitCb)}>
            <div className="usercontent">
                <div className="row">
                    <div className="col-lg-6">
                        <br />
                        <Field
                            name="email"
                            type="email"
                            label='Email'
                            className='form-control'
                            id='email'
                            defaultValue={email}
                            component={Input}
                        />

                    </div>
                    <div className="col-lg-6">
                        <br />
                        <Field
                            name="fullname"
                            type="text"
                            label='Họ và tên'
                            className='form-control'
                            id='fullname'
                            defaultValue={fullname}
                            component={Input}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <br />
                        <Field
                            name="username"
                            type="text"
                            label='Username'
                            className='form-control'
                            id='password'
                            defaultValue={username}
                            component={Input}
                        />

                    </div>
                    <div className="col-lg-4">
                        <br />
                        <Field
                            name="phone"
                            type="tel"
                            label='Số điện thoại'
                            className='form-control'
                            id='phone'
                            defaultValue={phone}
                            component={Input}
                            // validate={[required, minLength4]}
                        />

                    </div>
                    <div className="col-lg-2">
                        <br />
                        <Field
                            name="gender"
                            // type="tel"
                            label='Giới tính'
                            className='form-control'
                            id='gender'
                            defaultValue={gender}
                            component={BwmSelect}
                            options={options}
                            defaultValue={gender}
                        >
                            {/* <option selected disabled hidden>Giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option> */}
                        </Field>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <br />
                        <Field
                            name="address"
                            type="text"
                            label='Địa chỉ'
                            className='form-control'
                            id='address'
                            defaultValue={address}
                            component={Input}
                        />
                        <br />
                        <label>Số nhà đã đặt</label>
                        <p style={{ marginLeft: "20px" }}>20 Nhà</p>
                        <br />
                        <label>Số nhà đã đăng</label>
                        <p style={{ marginLeft: "20px" }}>20 Nhà</p>
                    </div>
                    <div className="col-lg-6">
                        <br />
                        <Field
                            name="description"
                            type="text"
                            label='Mô tả bản thân'
                            className='form-control'
                            id='description'
                            defaultValue={description}
                            rows='8'
                            component={BwmTextArea}
                        />
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div>
                    <div className="col-lg-4">
                    </div>
                    <div className="col-lg-4">
                        <button type="submit" className="b b1 center_button" disabled={!valid||submitting}>Lưu thay đổi</button>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <br />
                <br />
            </div>
            {}
            {/* <BwmResError errors={errors} /> */}
        </form >
    )
}

export default reduxForm({
    form: 'userContentForm',
    enableReinitialize: true
    // validate: updateUserValidate
    
})(userContentForm)
