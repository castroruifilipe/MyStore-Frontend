import axios from 'axios';

import { urlProdutos } from '../../services';

export const getNovidades = (accessToken) =>
    axios.get(`${urlProdutos}/novidades`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });