import axios from 'axios';

import { urlEncomendas } from '../../services';

export const getUltimas = (quantidade) =>
    axios.get(`${urlEncomendas}/ultimas/${quantidade}`);

export const getEncomenda = (id, token) =>
    axios.get(`${urlEncomendas}/${id}`,
        { headers: { 'Authorization': 'Bearer ' + token } });

export const getEncomendas = (token) =>
    axios.get(`${urlEncomendas}`,
        { headers: { 'Authorization': 'Bearer ' + token } });

export const getEncomendasCliente = (token) =>
    axios.get(`${urlEncomendas}/cliente`,
        { headers: { 'Authorization': 'Bearer ' + token } });

export const checkout = (moradaEntrega, metodoPagamento, token) =>
    axios.post(`${urlEncomendas}/checkout`, { moradaEntrega, metodoPagamento }, {
        headers: { 'Authorization': 'Bearer ' + token },
        withCredentials: true
    });

export const alterarEstado = (id, estado, token) =>
    axios.put(`${urlEncomendas}/alterarEstado`, { id, estado }, {
        headers: { 'Authorization': 'Bearer ' + token },
    }
    );
