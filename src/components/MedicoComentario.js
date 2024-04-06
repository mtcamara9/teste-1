import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
const CloseButton = styled.TouchableOpacity`
    margin-left: 15px;
`;
export default ({data, setShowEdit, setComentarioEdit, setCarregarComentario}) => {

    const [likeCount, setLikeCount] = useState(data.likes);
    const [liked, setLiked] = useState(data.liked);

    const showTextDate = (date) => {
        let res = date.split(" ");
        let hora = res[1];
        var nData = res[0];
        var nData = nData.split("-");
        // let dateEl = new Date(res[0]);
        // let year = dateEl.getFullYear();
        // let month = dateEl.getMonth() + 1;
        // let day = dateEl.getDate();

        

        // month = month < 10 ? '0'+month : month;
        // day = day < 10 ? '0'+day : day;
        // return `${day}/${month}/${year} ${res[1]}`;

        return `${nData[2]}/${nData[1]}/${nData[0]} ${res[1]}`;
    }

    const handleShowModalEdit = () => {
        setCarregarComentario(true);
        setComentarioEdit(data.id.toString());
        setShowEdit(true);
    }

    return (
        <Box>
            <HeaderArea>
                
                <Icon name="newspaper-o" size={30} color="#87CEFA" />
                <InfoArea>
                    <Title>Comentário</Title>
                    <Date>{data.BODY}</Date>
                    <Date>{showTextDate(data.DATACRIACAO)}</Date>
                </InfoArea>
                <CloseButton onPress={handleShowModalEdit}>
                <Icon name="edit" size={30} color="#28A745" />
                </CloseButton>
            </HeaderArea>
        </Box>
    );
}