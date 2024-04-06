import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../services/api';

const StarArea = styled.View`
    flex-direction: row;
`;
const StarView = styled.TouchableOpacity``;
import StarFull from '../assets/star.svg';
//<Icon name="edit" size={30} color="#28A745" />
//<i class="fas fa-star"></i> preenchido
//<i class="far fa-star"></i> não preenchido



export default ({ stars, showNumber, id, P}) => {

    const [star, setStar] = useState([0, 0, 0, 0, 0]);
    useEffect(()=>{
        var count = [];
        var cond = true;
        for(q=1; q <= 5; q++){
            if(stars != '0'){
                if(cond){
                    if(q == stars){
                        count.push(1);
                        cond = false;
                    }else{
                        count.push(1);
                    }
                }else{
                    count.push(0);
                }
            }else{
                count.push(0);
            }
            
        }
        setStar(count);
    }, []);

    // if(stars == '0'){
    //     setStar([0, 0, 0, 0, 0]);
    // }else if(stars == '1'){
    //     setStar([1, 0, 0, 0, 0]);
    // }else if(stars == '2'){
    //     setStar([1, 1, 0, 0, 0]);
    // }else if(stars == '3'){
    //     setStar([1, 1, 1, 0, 0]);
    // }else if(stars == '4'){
    //     setStar([1, 1, 1, 1, 0]);
    // }else if(stars == '5'){
    //     setStar([1, 1, 1, 1, 1]);
    // }
    
    


    const handleStarPress = async (item) => {
        if(item == 0){
            setStar([1, 0, 0, 0, 0]);
            const result = await api.updateStars(id, '1', P);
        }else if(item == 1){
            setStar([1, 1, 0, 0, 0]);
            const result = await api.updateStars(id, '2', P);
        }else if(item == 2){
            setStar([1, 1, 1, 0, 0]);
            const result = await api.updateStars(id, '3', P);
        }else if(item == 3){
            setStar([1, 1, 1, 1, 0]);
            const result = await api.updateStars(id, '4', P);
        }else if(item == 4){
            setStar([1, 1, 1, 1, 1]);
            const result = await api.updateStars(id, '5', P);
        }else{
            setStar([0, 0, 0, 0, 0]);
            const result = await api.updateStars(id, '0', P);
        }

        
    }

    return (
        <StarArea>
            {star.map((i, k) => (
                <StarView key={k} onPress={()=>handleStarPress(k)}>
                    {i === 1 && <Icon name="star" size={30} color="#ffc107" />}
                    {i === 0 && <Icon name="star" size={30} color="#ccc" />}
                </StarView>
            ))}
        </StarArea>
    );
}