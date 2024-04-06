import React, { useState } from 'react';
import { Modal, Linking, Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';

const Box = styled.View`
    background-color: #FFF;
    border-width: 2px;
    border-color: #E8E9ED;
    border-radius: 20px;
    padding: 15px;
    margin-bottom: 10px;
`;

const HeaderArea = styled.View`
    flex-direction: row;
    align-items: center;
`;
const InfoArea = styled.View`
    margin-left: 15px;
    flex: 1;
`;
const Title = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000;
`;
const Date = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #9C9DB9;
`;

const Body = styled.Text`
    font-size: 15px;
    color: #000;
    margin: 15px 0;
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
const DownloadButton = styled.TouchableOpacity`
    width: 100%;
    align-items: flex-start;
`;

export default ({data}) => {

    const navigation = useNavigation();
    const route = useRoute();

    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    const openModal = (img) => {
        setModalImage(img);
        setShowModal(true);
    }

    const handleRemoveAviso = async () => {
        
        const result = await api.removeAvisoId(data.id);
            if(result.error === '') {
                alert('Aviso removido com sucesso!');
                navigation.reset({
                    routes:[{name: 'AvisoScreen'}]
                });
               
            } else {
                alert(result.error);
            }
    }

    const handleRemoveAvisoCert = () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este aviso?',
            [
                {text: 'Sim', onPress: handleRemoveAviso},
                {text: 'Não', onPress: null, style: 'cancel'}
            ]
        );
    }

    const handleView = async () => {
        
            const result = await api.getMedicoId(data.id);
            if(result.error === '') {
                navigation.navigate('ReservationMedico', {data: result});
            } else {
                alert(result.error);
            }
        
    }

    const handlEditAviso = () => {
        navigation.navigate('AvisoEditScreen', {data});
    }

    const openUrl = async() => {
        var url = `https://mellos.paulopeixoto.com/documentos/${data.ARQUIVO}`;
        await Linking.openURL(url)
        
      }

    return (
        <Box>
            <CloseButton onPress={handlEditAviso}>
            <Icon name="edit" size={30} color="#28A745" />
            </CloseButton>
            
            <HeaderArea>
                <Icon name="newspaper-o" size={30} color="#87CEFA" />
                <InfoArea>
                    <Title>Tipo: {data.TIPO_AVISO}</Title>
                    {data.TIPO_AVISO != 'Outros' && 
                    <Date>Data: {data.DIA} Hora: {data.HORA}</Date>
                    }
                </InfoArea>
            </HeaderArea>
            
            <Body>
                {data.COMENTARIO}
            </Body>
            {data.ARQUIVO !== null && 
            <DownloadButton onPress={openUrl}>
            <Icon name="download" size={30} color="#28A745" />
            </DownloadButton>
            }
            
            
            <CloseButton onPress={handleRemoveAvisoCert}>
            <Icon name="times" size={30} color="#DC3545" />
            </CloseButton>
        
        </Box>
    );
}