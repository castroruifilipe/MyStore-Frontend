import axios from 'axios';

import { urlProdutos } from '../../services';

export const getProduto = (id) =>
    axios.get(`${urlProdutos}/${id}`);

export const getNovidades = (quantidade) =>
    axios.get(`${urlProdutos}/novidades/${quantidade}`);

export const getMaisVendidos = (quantidade) =>
    axios.get(`${urlProdutos}/maisVendidos/${quantidade}`);

export const getPromocoes = (quantidade) =>
    axios.get(`${urlProdutos}/promocoes/${quantidade}`);

export const getProdutos = (categoria, pagina, size) =>
    axios.get(`${urlProdutos}/categoria/${categoria}`, { params: { pagina, size } });