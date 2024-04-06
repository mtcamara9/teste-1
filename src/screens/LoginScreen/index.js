import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import InfoModal from '../../components/InfoModal';
export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLoginButton = async () => {
        if(cpf && password) {
            let result = await api.login(cpf, password);
           
            if(result.error === '') {
            
                dispatch({type: 'setToken', payload: {token: result.token}});
                dispatch({type: 'setUser', payload: {user: result.user}});

                navigation.reset({
                    index: 1,
                    routes:[{name: 'MainDrawer'}]
                });
            } else {
                alert(result.error);
            }
        } else {
            alert("Preencha os campos");
        }
    }

    const handleInfoChoose = () => {
        setShowModal(true);
    }

    const handleRegisterButton = () => {
        navigation.navigate('RegisterScreen');
    }

    return (
        <C.Container>
            <C.Logo
                source={require('../../assets/imgmello4.jpg')}
                resizeMode="contain"
            />

            <C.Field
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={t=>setCpf(t)}
            />
            <C.Field
                placeholder="Digite sua Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={t=>setPassword(t)}
            />

            <C.ButtonArea onPress={handleLoginButton}>
                <C.ButtonText>ENTRAR</C.ButtonText>
            </C.ButtonArea>

            <C.ButtonArea onPress={handleRegisterButton}>
                <C.ButtonText>CADASTRAR-SE</C.ButtonText>
            </C.ButtonArea>

            <C.Information onPress={()=>handleInfoChoose()}>
                <Icon name="info-circle" size={40} color="#28A745" />
                <C.InformationText>Conheça nosso App Mello's representações.</C.InformationText>
            </C.Information>
            <InfoModal 
                show={showModal}
                setShow={setShowModal}
            />
        </C.Container>
    );
}