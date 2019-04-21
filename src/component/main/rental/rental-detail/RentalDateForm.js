import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmResError } from 'component/main/shared/form/BwmResError';
import { DateInput } from 'component/main/shared/form/DateInput'
import { BwmSelect } from 'component/main/shared/form/BwmSelect'
import { bookValidate } from 'component/main/shared/form/validators'
const RentalDateForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
    return (
        <React.Fragment>
            <BwmResError errors={errors} />
            <form onSubmit={handleSubmit(submitCb)}>
                <Field
                    name="startAt"
                    label='Ngày đến'
                    className="form-control"
                    id='email'
                    component={DateInput}
                // validate={[required]}
                />

                <br />
                <Field
                    name="endAt"
                    label='Ngày đi'
                    className="form-control"
                    component={DateInput}
                />
                <br />
                <Field
                    name="guests"
                    label='Số người'
                    className="form-control"
                    options={['1', '2', '3', '4', '5', '6', '8', '9', '10']}
                    component={BwmSelect}
                />
                <button type="submit" className="b b1 center_button" disabled={!valid || pristine || submitting}>
                    {submitting ?
                        <span>
                            <i className="fa fa-spin fa-spinner" /> Đang đặt phòng...
                        </span>
                        :
                        <span>Đặt phòng</span>
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
    form: 'rentalDateForm',
    validate: bookValidate
})(RentalDateForm)
