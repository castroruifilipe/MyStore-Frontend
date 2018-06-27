import axios from 'axios';

import { urlPromocoes } from '../../services';

export const getAllPromocoes = (token) =>
    axios.get(`${urlPromocoes}`,
        { headers: { 'Authorization': 'Bearer ' + token } });

export const getPromocao = (id, token) =>
    axios.get(`${urlPromocoes}/${id}`,
        { headers: { 'Authorization': 'Bearer ' + token } });