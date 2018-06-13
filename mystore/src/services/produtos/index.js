import axios from 'axios';
import qs from 'querystring'

import { urlProdutos } from '../../services';

export const getNovidades = (accessToken) =>
    axios.get(`${urlProdutos}/novidades`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });

export const getProdutosPorCategoria = (accessToken, categoria, pagina, limit) =>
    axios.get(`${urlProdutos}/categorias?` + qs.stringify({ categoria, pagina, limit }), {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });
