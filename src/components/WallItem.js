import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Modal, Linking } from 'react-native';

import api from '../services/api';

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

const FooterArea = styled.View`
    flex-direction: row;
    align-items: center;
`;
const LikeButton = styled.TouchableOpacity`
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
`;
const LikeText = styled.Text`
    margin-left: 5px;
    font-size: 13px;
    color: #9C9DB9;
`;
const DownloadButton = styled.TouchableOpacity`
    width: 100%;
    align-items: flex-start;
`;
export default ({data}) => {

    const [likeCount, setLikeCount] = useState(data.likes);
    const [liked, setLiked] = useState(data.liked);

    const handleLike = async () => {
        setLiked(!liked);
        const result = await api.likeWallPost(data.id);
        if(result.error === '') {
            setLikeCount( result.likes );
            setLiked( result.liked );
        } else {
            alert(result.error);
        }
    }
    const openUrl = async() => {
        var url = `https://mellos.paulopeixoto.com/documentos/${data.ARQUIVO}`;
        await Linking.openURL(url)
        
      }
    return (
        <Box>
            <HeaderArea>
                <Icon name="newspaper-o" size={30} color="#87CEFA" />
                <InfoArea>
                    <Title>Tipo: {data.TIPO_AVISO}</Title>
                    <Date>Data: {data.DIA} Hora: {data.HORA}</Date>
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
            
            
        </Box>
    );
}