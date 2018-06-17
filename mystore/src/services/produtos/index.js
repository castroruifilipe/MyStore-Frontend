import axios from 'axios';

import { urlProdutos } from '../../services';

export const getNovidades = (quantidade) =>
    axios.get(`${urlProdutos}/novidades/${quantidade}`);

export const getMaisVendidos = () =>
    axios.get(`${urlProdutos}/maisVendidos`);

export const getProdutos = (categoria, pagina, size) =>
    axios.get(`${urlProdutos}/categoria/${categoria}`, { params: { pagina, size } });