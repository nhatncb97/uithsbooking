import { Field, reduxForm, FieldArray } from 'redux-form';
import { Input } from 'component/main/shared/form/Input';
import { BwmResError } from 'component/main/shared/form/BwmResError';
import { BwmSelect } from 'component/main/shared/form/BwmSelect';
import { Checkbox } from 'component/main/shared/form/Checkbox';
import { BwmTextArea } from 'component/main/shared/form/BwmTextArea';
import { validate } from 'component/main/shared/form/validators';
import React, { Component } from 'react';
import DropzoneUpload from '../../shared/form/DropzoneUpload';

class RentalCreateForm extends Component {
    render() {
        const { handleSubmit, pristine, submitting, submitCb, valid, errors, options, user } = this.props
        return (
            <React.Fragment>
                <form onSubmit={handleSubmit(submitCb)}>
                    <div className="usercontent">
                        <div className="row">
                            <div className="col-lg-6">
                                <Field
                                    name="title"
                                    type="text"
                                    label='Tiêu đề'
                                    className='form-control'
                                    id='title'
                                    component={Input}
                                />

                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <Field
                                            name="bedrooms"
                                            type="number"
                                            label='Số phòng ngủ'
                                            className='form-control'
                                            id='bedrooms'
                                            component={Input}
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <Field
                                            name="bathrooms"
                                            type="number"
                                            label='Số phòng tắm'
                                            className='form-control'
                                            id='bathrooms'
                                            component={Input}
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <Field
                                            name="people"
                                            type="number"
                                            label='Số người'
                                            className='form-control'
                                            id='people'
                                            component={Input}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <Field
                                    name="city"
                                    type="text"
                                    label='Tỉnh thành'
                                    className='form-control'
                                    id='city'
                                    component={Input}
                                />

                            </div>
                            <div className="col-lg-6">

                                <Field
                                    name="price"
                                    type="number"
                                    label='Giá'
                                    className='form-control'
                                    id='price'
                                    component={Input}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <Field
                                            name="address"
                                            type="text"
                                            label='Địa chỉ'
                                            className='form-control'
                                            id='address'
                                            component={Input}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <Field
                                            name="category"
                                            type="select"
                                            label='Loại hình'
                                            className='form-control'
                                            id='category'
                                            options={['Vila', 'Apartment']}
                                            component={BwmSelect}
                                        />
                                    </div>
                                </div>
                                <br />
                                <Field name="images" component={DropzoneUpload} />
                            </div>
                            <div className="col-lg-6">
                                <div className="col-lg-12"><label>Tiện ích</label></div>
                                <div className="col-lg-4">

                                    <Field
                                        name="isWifi"
                                        type="checkbox"
                                        label='Wifi'
                                        id='description'
                                        component={Checkbox}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <Field
                                        name="isTivi"
                                        type="checkbox"
                                        label='TV'
                                        id='TV'
                                        component={Checkbox}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <Field
                                        name="isFridge"
                                        type="checkbox"
                                        label='Tủ lạnh'
                                        id='isFirdge'
                                        component={Checkbox}
                                    />
                                </div>
                                <br />
                                <div className="col-lg-4">
                                    <Field
                                        name="isElevator"
                                        type="checkbox"
                                        label='Thang máy'
                                        id='isElevator'
                                        component={Checkbox}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <Field
                                        name="isWashing"
                                        type="checkbox"
                                        label='Máy giặt'
                                        id='description'
                                        component={Checkbox}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <Field
                                        name="isConditioner"
                                        type="checkbox"
                                        label='Máy điều hòa'
                                        id='isConditioner'
                                        component={Checkbox}
                                    />
                                </div>
                                <br />
                                <br />
                                <br />
                                <Field
                                    name="description"
                                    type="text"
                                    label='Giới thiệu chung'
                                    className='form-control'
                                    id='description'
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
                                <button type="submit" className="b b1 center_button" disabled={!valid || pristine || submitting}>
                                    {submitting ?
                                        <span>
                                            <i className="fa fa-spin fa-spinner" /> Đăng đăng tải...
                                         </span>
                                        :
                                        <span>Đăng tải</span>
                                    }</button>
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
            </React.Fragment>
        );
    }
}
export default reduxForm({
    form: 'rentalCreateForm'
})(RentalCreateForm)
