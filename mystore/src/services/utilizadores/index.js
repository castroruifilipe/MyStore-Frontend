import axios from 'axios';

import { urlUtilizadores } from '../../services';

export const signup = (email, password, nome, role) =>
    axios.post(`${urlUtilizadores}/signup`, { email, password, nome, role });

export const signin = (email, password) =>
    axios.post(`${urlUtilizadores}/signin`, { email, password });