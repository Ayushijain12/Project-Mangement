import React from 'react';
import { Field } from 'formik';
import { TextField } from '@mui/material';

const TextFieldComponent = ({ name, label, type = 'text', required, ...props }) => (
    <Field
        name={name}
        as={TextField}
        label={
            <>
                {label}
                {required && <span style={{ color: 'red' }}>*</span>}
            </>
        }
        type={type}
        variant="outlined"
        fullWidth
        margin="normal"
        helperText={(props.touched[name] && props.errors[name]) || ''}
        error={props.touched[name] && Boolean(props.errors[name])}
        {...props}
    />
);

export default TextFieldComponent;
