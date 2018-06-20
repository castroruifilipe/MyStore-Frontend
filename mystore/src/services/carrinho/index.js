import axios from 'axios';

import { urlCarrinho } from '../../services';

export const getCarrinho = () =>
    axios.get(`${urlCarrinho}`, {withCredentials: true});

export const addCarrinho = (codigo, quantidade) =>
    axios.put(`${urlCarrinho}/addProduto`, { codigo, quantidade }, {withCredentials: true});