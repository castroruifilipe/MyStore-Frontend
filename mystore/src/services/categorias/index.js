import axios from 'axios';

import { urlCategorias } from '../../services';

export const getCategorias = () =>
    axios.get(`${urlCategorias}`);