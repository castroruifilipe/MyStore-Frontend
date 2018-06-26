import axios from 'axios';

import { urlUtilizadores } from '../../services';

export const signup = (email, password, nome, role) =>
    axios.post(`${urlUtilizadores}/signup`, { email, password, nome, role });

export const signin = (email, password) =>
    axios.post(`${urlUtilizadores}/signin`, { email, password });

export const getUser = (token) =>
    axios.get(`${urlUtilizadores}/dados`,
        { headers: { 'Authorization': 'Bearer ' + token } });

export const editarDados = (dados, token) =>
    axios.put(`${urlUtilizadores}/editarDados`, dados,
        { headers: { 'Authorization': 'Bearer ' + token } }
    );

export const alterarPassword = (oldPassword, newPassword, token) =>
    axios.put(`${urlUtilizadores}/alterarPassword`, { oldPassword, newPassword },
        { headers: { 'Authorization': 'Bearer ' + token } }
    );

export const getClientes = (token) =>
    axios.get(`${urlUtilizadores}/clientes`, { headers: { 'Authorization': 'Bearer ' + token } })

export const getCliente = (id, token) =>
    axios.get(`${urlUtilizadores}/clientes/${id}`, { headers: { 'Authorization': 'Bearer ' + token } })