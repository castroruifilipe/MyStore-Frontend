import axios from 'axios';

import { urlProdutos } from '../../services';

export const getProduto = (id) =>
    axios.get(`${urlProdutos}/${id}`);

export const getAllProdutos = () =>
    axios.get(`${urlProdutos}`)

export const getNovidades = (quantidade) =>
    axios.get(`${urlProdutos}/novidades/${quantidade}`);

export const getMaisVendidos = (quantidade) =>
    axios.get(`${urlProdutos}/maisVendidos/${quantidade}`);

export const getMaisVendidosDetail = (quantidade) =>
    axios.get(`${urlProdutos}/maisVendidosDetail/${quantidade}`);

export const getPromocoes = (quantidade) =>
    axios.get(`${urlProdutos}/emPromocao/${quantidade}`);

export const getRelacionados = (codigo, quantidade) =>
    axios.get(`${urlProdutos}/relacionados/${quantidade}`, { params: { codigo } })

export const getProdutos = (categoria, pagina, size) =>
    axios.get(`${urlProdutos}/categoria`, { params: { pagina, size, categoria } });

export const getProdutosProcuraCategoria = (categoria, value, pagina, size) =>
    axios.get(`${urlProdutos}/search/categoria`, { params: { value, categoria, pagina, size } })

export const getProdutosProcura = (value, pagina, size) =>
    axios.get(`${urlProdutos}/search`, { params: { value, pagina, size } })

export const editarProduto = (dados, token) =>
    axios.put(`${urlProdutos}/editar`, dados, {
        headers: { 'Authorization': 'Bearer ' + token }
    }
    );

export const criarProduto = (dados, token) =>
    axios.post(`${urlProdutos}/criar`, dados,
        { headers: { 'Authorization': 'Bearer ' + token } }
    );

export const removerProduto = (codigo, token) =>
    axios.delete(`${urlProdutos}/apagar`, {
        params: { codigo },
        headers: { 'Authorization': 'Bearer ' + token }
    });