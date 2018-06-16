import axios from 'axios';

import { urlUtilizadores } from '../../services';

export const signup = (email, password, nome, role) =>
    axios.post(`${urlUtilizadores}/signup`, { email, password, nome, role });

export const signin = (email, password) =>
    axios.post(`${urlUtilizadores}/signin`, { email, password });

export const editarDados = ( nome, email, telemovel, contribuinte, rua, localidade, codigoPostal, token  ) => {
    axios.put(`${urlUtilizadores}/editarDados`,{nome, email, telemovel, contribuinte, rua, localidade, codigoPostal},
            {headers : {'Authorization': 'Bearer ' + token }}
        );
}

export const alterarPassword = ( oldPassword, newPassword, token  ) => {
    axios.put(`${urlUtilizadores}/alterarPassword`,{oldPassword,newPassword},
            {headers : {'Authorization': 'Bearer ' + token }}
        );
}