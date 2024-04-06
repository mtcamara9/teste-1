import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://mellos.paulopeixoto.com/api';

const request = async (method, endpoint, params, token = null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;

    switch(method) {
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
        break;
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);
        break;
    }

    let headers = {'Content-Type': 'application/json'};
    if(token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let req = await fetch(fullUrl, { method, headers, body });
    let json = await req.json();
    return json;
}

export default {
    getToken: async () => {
        return await AsyncStorage.getItem('token');
    },
    validateToken: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/auth/validate', {}, token);
        return json;
    },
    login: async (cpf, password) => {
        let json = await request('post', '/auth/login', {cpf, password});
        return json;
    },
    logout: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/auth/logout', {}, token);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('property');
        return json;
    },
    register: async (nome, email, cpf, password, password_confirm) => {
        let json = await request('post', '/auth/register', {
            nome, email, cpf, password, password_confirm
        });
        return json;
    },
    getWall: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/mural', {}, token);
        return json;
    },
    getAvisosAll: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/eventos', {}, token);
        return json;
    },
    getEventoDia: async (date) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/eventos/geteventodia', {date}, token);
        return json;
    },
    likeWallPost: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/wall/${id}/like`, {}, token);
        return json;
    },
    getDocs: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/docs', {}, token);
        return json;
    },
    getBillets: async () => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request('get', '/billets', {
            property: property.id
        }, token);
        return json;
    },
    getMedicos: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/medicos', {}, token);
        return json;
    },
    addWarningFile: async (file) => {
        let token = await AsyncStorage.getItem('token');
        let formData = new FormData();
        formData.append('photo', {
            uri: file.uri,
            type: file.type,
            name: file.fileName
        });
        let req = await fetch(`${baseUrl}/warning/file`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        let json = await req.json();
        return json;
    },
    addMedico: async (NOME, TELEFONE, ENDERECO, BAIRRO, PRODUTO, HANDS_RECEB, CRM, ESPECIALIDADE, DIA, ID_PERIODO) => {
        var HANDS = false;
        if(HANDS_RECEB){
            HANDS = 1;
        }else{
            HANDS = 0;
        }
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/medico', {
            NOME,
            TELEFONE,
            ENDERECO,
            BAIRRO,
            PRODUTO,
            HANDS,
            CRM,
            ESPECIALIDADE,
            DIA,
            ID_PERIODO
        }, token);
        return json;
    },
    editMedico: async (NOME, TELEFONE, ENDERECO, BAIRRO, PRODUTO, HANDS_RECEB, CRM, ESPECIALIDADE, DIA, ID_PERIODO, id) => {
        var HANDS = false;
        if(HANDS_RECEB){
            HANDS = 1;
        }else{
            HANDS = 0;
        }
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/medico/edit/${id}`, {
            NOME,
            TELEFONE,
            ENDERECO,
            BAIRRO,
            PRODUTO,
            HANDS,
            CRM,
            ESPECIALIDADE,
            DIA,
            ID_PERIODO
        }, token);
        return json;
    },
    updateStars: async (id, stars, p) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/medico/stars/${id}`, {
           stars,
           p
        }, token);
        return json;
    },
    updateHands: async (id, HANDS) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/medico/hands/${id}`, {
            HANDS
        }, token);
        return json;
    },
    removeAvisoId: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/eventos/remove/${id}`, {}, token);
        return json;
    },
    removeMedicoId: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/medico/remove/${id}`, {}, token);
        return json;
    },
    handleRemoveAll: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/eventos/removeall`, {}, token);
        return json;
    },
    addAviso: async (COMENTARIO, DIA, HORA, TIPO_AVISO, ARQUIVO) => {
        let token = await AsyncStorage.getItem('token');
        let formData = new FormData();
        formData.append('COMENTARIO', COMENTARIO);
        formData.append('DIA', DIA);
        formData.append('HORA', HORA);
        formData.append('TIPO_AVISO', TIPO_AVISO);
        if(ARQUIVO.uri){
            formData.append('ARQUIVO', {
                uri: ARQUIVO.uri,
                type: ARQUIVO.type,
                name: ARQUIVO.name
            });
        }
        
        let req = await fetch(`${baseUrl}/evento`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        let json = await req.json();
        return json;
    },
    editAviso: async (COMENTARIO, DIA, HORA = '00:00:00', TIPO_AVISO, ARQUIVO, id) => {
        let token = await AsyncStorage.getItem('token');
        let formData = new FormData();
        formData.append('COMENTARIO', COMENTARIO);
        formData.append('DIA', DIA);
        formData.append('HORA', HORA);
        formData.append('TIPO_AVISO', TIPO_AVISO);
        if(ARQUIVO.uri !== undefined){
            formData.append('ARQUIVO', {
                uri: ARQUIVO.uri,
                type: ARQUIVO.type,
                name: ARQUIVO.name
            });
        }
        
        let req = await fetch(`${baseUrl}/evento/edit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        let json = await req.json();
        return json;
    },
    setComentario: async (ID_MEDICO, BODY) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/medico/comentario', {
            ID_MEDICO,
            BODY
        }, token);
        return json;
    },
    getReservations: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/reservations', {}, token);
        return json;
    },
    getDisabledDates: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/getdisableddates`, {}, token);
        return json;
    },
    getMedicosAgendamentos: async (date) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/getmedicosagendamentos`, {date}, token);
        return json;
    },
    getMedicoId: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/medico/${id}`, {}, token);
        return json;
    },
    getMyReservations: async () => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request('get', '/myreservations', {
            property: property.id
        }, token);
        return json;
    },
    removeReservation: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('delete', `/myreservations/${id}`, {}, token);
        return json;
    },
    getFoundAndLost: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/foundandlost`, {}, token);
        return json;
    },
    setRecovered: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('put', `/foundandlost/${id}`, {
            status: 'recovered'
        }, token);
        return json;
    },
    addLostItem: async (photo, description, where) => {
        let token = await AsyncStorage.getItem('token');
        let formData = new FormData();
        formData.append('description', description);
        formData.append('where', where);
        formData.append('photo', {
            uri: photo.uri,
            type: photo.type,
            name: photo.fileName
        });
        let req = await fetch(`${baseUrl}/foundandlost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        let json = await req.json();
        return json;
    },
    getUnitInfo: async () => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request('get', `/unit/${property.id}`, {}, token);
        return json;
    },
    getComentarioId: async (id) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/medico/comentario/get/${id}`, {}, token);
        return json;
    },
    postComentarioId: async (id, body) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/medico/comentario/update/${id}`, {body}, token);
        return json;
    },
    removeUnitItem: async (type, id) => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);

        let json = await request('post', `/unit/${property.id}/remove${type}`, {
            id
        }, token);
        return json;
    },
    addUnitItem: async (type, body) => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);

        let json = await request('post', `/unit/${property.id}/add${type}`, body, token);
        return json;
    },
    search: async (MedicoNome) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/search?q=${MedicoNome}`, {}, token);
        return json;
    }
};