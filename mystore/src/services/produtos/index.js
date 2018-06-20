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

export const getRelacionados = (codigo,quantidade) => 
    axios.get(`${urlProdutos}/relacionados/${quantidade}`,{params: {codigo}})

export const getProdutos = (categoria, pagina, size) =>
    axios.get(`${urlProdutos}/categoria`, { params: { pagina, size, categoria } });

export const getProdutosProcuraCategoria = (categoria, value) =>
    axios.get(`${urlProdutos}/search/categoria`, { params: { value, categoria } })

export const getProdutosProcura = (value) =>
    axios.get(`${urlProdutos}/search`, { params: { value } })