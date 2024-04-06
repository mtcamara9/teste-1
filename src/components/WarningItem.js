import React, { useEffect, useState } from 'react';
import { Modal, View, Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import { useStateValue } from '../contexts/StateContext';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Switch, CheckBox } from 'react-native-elements';

import Stars from '../components/Stars';

const Box = styled.TouchableOpacity`
    background-color: #FFF;
    border-width: 2px;
    border-color: #E8E9ED;
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 10px;
`;
const Date = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #9C9DB9;
    margin-bottom: 10px;
`;
const Title = styled.Text`
    font-size: 15px;
    color: #000;
`;
const StatusArea = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
`;
const StatusText = styled.Text`
    font-size: 14px;
    color: #9C9DB9;
    margin-left: 10px;
`;

const PhotosArea = styled.View`
    flex-direction: row;
`;
const PhotoItem = styled.TouchableOpacity`
    margin-right: 10px;
`;
const PhotoImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 10px;
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: #000;
`;
const ModalImage = styled.Image`
    flex: 1;
`;
const ModalCloseButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 15px;
    right: 10px;
`;

const CloseButton = styled.TouchableOpacity`
    width: 100%;
    align-items: flex-end;
`;

const Periodo = styled.View`
        flex-direction: row;
        align-items: center;
        margin:10px 0px 10px 0px;
        
    `;
const PeriodoText = styled.Text`
        font-weight:bold;
        color: #9C9DB9;
        font-size: 15px;
        margin-right: 15px;
`;


export default ({data}) => {

    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    const [hands, setHands] = useState(false);

    const [p1, setP1] = useState(false);
    const [p2, setP2] = useState(false);
    const [p3, setP3] = useState(false);

    const openModal = (img) => {
        setModalImage(img);
        setShowModal(true);
    }

    const handleView = async () => {
        
            const result = await api.getMedicoId(data.id);
            if(result.error === '') {
                navigation.navigate('ReservationMedico', {data: result});
            } else {
                alert(result.error);
            }
        
    }

    const handleHandsPress = async () => {
        setHands(!hands);
        novohands = 0;
        if(!hands){
            novohands = 1;
        }
        const result = await api.updateHands(data.id, novohands);
        
    }
    
    const handleRemoveMedico = async () => {
        const result = await api.removeMedicoId(data.id);
            if(result.error === '') {
                alert('Médico removido com sucesso!');
                navigation.reset({
                    routes:[{name: 'WarningScreen'}]
                });
               
            } else {
                alert(result.error);
            }
    }

    const handleRemoveMedicoCert = () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este médico?',
            [
                {text: 'Sim', onPress: handleRemoveMedico},
                {text: 'Não', onPress: null, style: 'cancel'}
            ]
        );
    }

    const handlEditMedico = () => {
        navigation.navigate('WarningEditScreen', {data});
    }

    var array = data.ID_PERIODO.split('|');
    if(array.length > 4) {
        var novasegunda = array[0].split(',');
        var novaterca = array[1].split(',');
        var novaquarta = array[2].split(',');
        var novaquinta = array[3].split(',');
        var novasexta = array[4].split(',');
        var novasabado = array[5].split(',');
    }
    
    useEffect(()=>{
        if(data.PRODUTO != null){
            var produtoConsulta = data.PRODUTO.split(',');
            if ( produtoConsulta.includes('Ellansé') ){
                setP1(true);
            }
            if ( produtoConsulta.includes('Silhouette') ){
                setP2(true);
            }
            if ( produtoConsulta.includes('Perfechta') ){
                setP3(true);
            }
        }
        if(data.HANDS == '1'){
            setHands(true);
        }
    },[]);


    return (
        <Box onPress={handleView}>
           
            <CloseButton onPress={handlEditMedico}>
            <Icon name="edit" size={30} color="#28A745" />
            </CloseButton>
            <Periodo>
                <PeriodoText>Hands On ?</PeriodoText>   
                <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    thumbColor={hands ? "#0f0" : "#f4f3f4"}
                    onValueChange={handleHandsPress}
                    value={hands}
                /> 
            </Periodo>
            <View style={{flexDirection: 'column'}}>
                {p1 && 
                <>
                     <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Date style={{fontSize: 18, marginRight: 8}}>Ellansé</Date>
                    <Stars stars={data.STARS_P1} showNumber={true} id={data.id} P={1}/>
                    </View>
                </>                  
                }
                {p2 && 
                <>
                     <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>

                    <Date style={{fontSize: 18, marginRight: 8}}>Silhouette</Date>
                    <Stars stars={data.STARS_P2} showNumber={true} id={data.id} P={2}/>
                    </View>

                </>                  
                }
                {p3 && 
                <>
                     <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Date style={{fontSize: 18, marginRight: 8}}>Perfechta</Date>
                    <Stars stars={data.STARS_P3} showNumber={true} id={data.id} P={3}/>
                    </View>

                </>                  
                }
            </View>
            <Date>Nome: {data.NOME}</Date>
            <Date>Telefone: {data.TELEFONE}</Date>
            <Date>CRM: {data.CRM}</Date>
            <Date>Endereço: {data.ENDERECO}</Date>
            <Date>Bairro: {data.BAIRRO}</Date>
            <Date>Especialidade: {data.ESPECIALIDADE}</Date>
            <Date>Período de Atendimento: </Date>

            <View style={{flexDirection: 'row'}}>
            {array.length > 4 && novasegunda[0] == 1 &&
            <Date>Segunda-feira:</Date>
            }
            {array.length > 4 && novasegunda[1] == 1 &&
            <Date> ( Manhã ) </Date>
            }
            {array.length > 4 && novasegunda[2] == 1 &&
            <Date> ( Tarde ) </Date>
            }
            </View>

            <View style={{flexDirection: 'row'}}>
            {array.length > 4 && novaterca[0] == 1 &&
            <Date>Terça-feira:</Date>
            }
            {array.length > 4 && novaterca[1] == 1 &&
            <Date> ( Manhã ) </Date>
            }
            {array.length > 4 && novaterca[2] == 1 &&
            <Date> ( Tarde ) </Date>
            }
            </View>

            <View style={{flexDirection: 'row'}}>
            {array.length > 4 && novaquarta[0] == 1 &&
            <Date>Quarta-feira:</Date>
            }
            {array.length > 4 && novaquarta[1] == 1 &&
            <Date> ( Manhã ) </Date>
            }
            {array.length > 4 && novaquarta[2] == 1 &&
            <Date> ( Tarde ) </Date>
            }
            </View>

            <View style={{flexDirection: 'row'}}>
            {array.length > 4 && novaquinta[0] == 1 &&
            <Date>Quinta-feira:</Date>
            }
            {array.length > 4 && novaquinta[1] == 1 &&
            <Date> ( Manhã ) </Date>
            }
            {array.length > 4 && novaquinta[2] == 1 &&
            <Date> ( Tarde ) </Date>
            }
            </View>

            <View style={{flexDirection: 'row'}}>
            {array.length > 4 && novasexta[0] == 1 &&
            <Date>Sexta-feira:</Date>
            }
            {array.length > 4 && novasexta[1] == 1 &&
            <Date> ( Manhã ) </Date>
            }
            {array.length > 4 && novasexta[2] == 1 &&
            <Date> ( Tarde ) </Date>
            }
            </View>

            <View style={{flexDirection: 'row'}}>
            {array.length > 4 && novasabado[0] == 1 &&
            <Date>Sabado:</Date>
            }
            {array.length > 4 && novasabado[1] == 1 &&
            <Date> ( Manhã ) </Date>
            }
            {array.length > 4 && novasabado[2] == 1 &&
            <Date> ( Tarde ) </Date>
            }
            </View>
            <CloseButton onPress={handleRemoveMedicoCert}>
            <Icon name="times" size={30} color="#DC3545" />
            </CloseButton>
        </Box>
    );
}