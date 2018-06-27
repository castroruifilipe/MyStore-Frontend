import axios from 'axios';

import { urlCategorias } from '../../services';

export const getCategorias = () =>
    axios.get(`${urlCategorias}`);

export const criarCategoria = (descricao, token) =>
    axios.post(`${urlCategorias}/criar`, { descricao },
        { headers: { 'Authorization': 'Bearer ' + token } })

export const deleteCategoria = (descricao, token) =>
    axios.delete(`${urlCategorias}/apagar`, {
        params: { descricao },
        headers: { 'Authorization': 'Bearer ' + token }
    });