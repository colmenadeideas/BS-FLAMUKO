import {useDispatch} from 'react-redux'
import * as actions from '../Actions/sesionActions'

const nameValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === '') {
        return `El ${fieldName} es requerido`;
    }
    if (/[^a-zA-Z -]/.test(fieldValue)) {
        return 'Caracteres invalidos';
    }
    if (fieldValue.trim().length < 3) {
        return `El ${fieldName} necesita tener al menos 3 caracteres`;
    }
    return null;
};

const emailValidation = username => {
    if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        username,
        )
    ) {
        return null;
    }
    if (username.trim() === '') {
        return 'El correo electrónico es requerido';
    }
    return 'Por favor ingrese un correo electronico válido';
};

const phoneValidation = phone => {
    if (!phone) {
        return 'El numero de telefono es requerido';
    }
    return null;
};

export const validate = {
    name: name => nameValidation('nombre', name),
    username: emailValidation,
    phone: phoneValidation,
};

export const initialValues = {
    phone: null,
    username: '',
    name: '',
};
