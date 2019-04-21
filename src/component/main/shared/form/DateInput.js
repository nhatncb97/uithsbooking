import React from 'react';

export const DateInput = ({
    input,
    label,
    id,
    name,
    // type,
    // symbol,
    className,
    meta: { touched, error, warning }
}) => (
        <div>
            <label>{label}</label>
            <input {...input} type="date" className={className} id={id} name={name} />
            {touched &&
                ((error && <div className="validation" style={{ display: 'block' }} >{error}</div>))}
        </div>
    )
