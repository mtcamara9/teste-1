import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import ReservationItem from '../../components/ReservationItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Agendamentos Disponíveis'
        });
        getReservations();
    }, []);

    const getReservations = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getReservations();
        setLoading(false);
        if(result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
    }

    return (
        <C.Container>
            <C.Scroller contentContainerStyle={{paddingBottom: 40}}>
                <C.ButtonArea onPress={()=>navigation.navigate('ReservationMyScreen')}>
                    <C.ButtonText>Meus Agendamentos</C.ButtonText>
                </C.ButtonArea>

                <C.Title>Selecione um profissional</C.Title>

                {loading &&
                    <C.LoadingIcon size="large" color="#87CEFA" />
                }

                {!loading && list.length === 0 &&
                    <C.NoListArea>
                        <C.NoListText>Não há áreas disponíveis.</C.NoListText>
                    </C.NoListArea>
                }

                {list.map((item, index)=>(
                    <ReservationItem
                        key={index}
                        data={item}
                    />
                ))}
            </C.Scroller>
        </C.Container>
    );
}