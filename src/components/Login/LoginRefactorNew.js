import React from 'react';
import { withFormik } from 'formik';
import LoginForm from './LoginForm';
import Debug from './Debug';
// import {handleSubmitFunc} from './utilFunctions'

function MyForm({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    }) {
    return (
        
            <>
                <h2>¡Nos gustaría mantenernos en contacto! Te invitamos a completar tus datos</h2>
                <LoginForm
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    touched={touched}
                    values={values}
                />
            </>
    );
}

const LoginFormik = withFormik({
    mapPropsToValues: ({ initialValues }) => {
        return {
        ...initialValues,
        };
    },

    validate: (values, { validate }) =>
        Object.keys(values).reduce((errors, field) => {
        const error = validate[field](values[field]);
        return {
            ...errors,
            ...(error && { [field]: error }),
        };
        }, {}),

    handleSubmit: (values, { setSubmitting, props }) => {
        // alert(JSON.stringify(values, null, 2));
        // console.log(handleSubmit)
        // console.log(values)
        // handleSubmitFunc(values);
        props.handleSubmit(values)
        setSubmitting(false)
    },

    validateOnChange: true,

    displayName: 'LoginFormik',
})(MyForm);

export default LoginFormik;