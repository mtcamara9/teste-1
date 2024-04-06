import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExpandIcon from '../assets/expand.svg';
import api from '../services/api';

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex:1;
    background-color: rgba(0,0,0, 0.5);
    justify-content: center;
`;

const ModalBody = styled.View`
    background-color: #87CEFA;
    background-color: rgba(0,0,0, 0.5);
    justify-content:center;
    align-items:center;
    flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
   
    
`;

const ModalItem = styled.View``;


const Field =  styled.TextInput`
    border-width: 1px;
    border-color: #CCC;
    background-color: #FFF;
    border-radius: 5px;
    color: #000;
    font-size: 15px;
    padding: 15px;
    margin-top: 15px;
    margin-bottom: 30px;
    
`;

const FinishButton = styled.TouchableOpacity`
    background-color: #79b9e1;
    height: 60px;
    justify-content: center;
    align-items: center;  
    border-radius: 10px;
    margin-bottom: 10px;
`;

const FinishButtonText = styled.Text`
    color: #FFFFFF;
    font-weight: bold;
    font-size: 17px;
    
`;
const Logo =  styled.Image`
width: 400px;
margin-left: auto;
margin-right: auto;
margin-bottom: 20px;
`;

export default ({ show, setShow}) => {
    const navigation = useNavigation();

   


    const handleCloseButton = () => {
        setShow(false);
    }

    
    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="hide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                    <Icon name="chevron-down" size={30} color="#fff" />
                    <Logo
                        source={require('../assets/melloinfo.jpg')}
                        resizeMode="contain"
                    />
                    </CloseButton>
                    
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}