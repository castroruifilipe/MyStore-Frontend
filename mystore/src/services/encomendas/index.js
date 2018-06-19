import axios from 'axios';

import { urlEncomendas } from '../../services';

export const getEncomenda = (id, token) =>
    axios.get(`${urlEncomendas}/${id}`,
        { headers: { 'Authorization': 'Bearer ' + token } });

export const getEncomendasCliente = (token) =>
    axios.get(`${urlEncomendas}/cliente`,
    { headers: { 'Authorization': 'Bearer ' + token } });