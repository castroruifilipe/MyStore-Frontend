import axios from 'axios';

import { urlPromocoes } from '../../services';

export const getAllPromocoes = (token) =>
    axios.get(`${urlPromocoes}`,
        { headers: { 'Authorization': 'Bearer ' + token } });

export const getPromocao = (id, token) =>
    axios.get(`${urlPromocoes}/${id}`,
        { headers: { 'Authorization': 'Bearer ' + token } });

export const criarPromocao = (dados, token) =>
    axios.post(`${urlPromocoes}/criar`, dados,
        { headers: { 'Authorization': 'Bearer ' + token } }
    );
