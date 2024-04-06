import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import WallItem from '../../components/WallItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [wallList, setWallList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Avisos de hoje'
        });
        getWall();
    }, []);

    const getWall = async () => {
        setWallList([]);
        setLoading(true);
        let dateEl = new Date();
        let year = dateEl.getUTCFullYear();
        let month = dateEl.getUTCMonth() + 1;
        let day = dateEl.getUTCDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        var dataHoje = `${year}-${month}-${day}`;
        const result = await api.getEventoDia(dataHoje);
        setLoading(false);
        if(result.error === '') {
            setWallList(result.list);
        } else {
            alert(result.error);
        }
    }

    return (
        <C.Container>
            {!loading && wallList.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não há Avisos para hoje.</C.NoListText>
                </C.NoListArea>
            }
            <C.List
                data={wallList}
                onRefresh={getWall}
                refreshing={loading}
                renderItem={({item})=><WallItem data={item} />}
                keyExtractor={(item)=>item.id.toString()}
            />
        </C.Container>
    );
}