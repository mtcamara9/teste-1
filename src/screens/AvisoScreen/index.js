import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import AvisoItem from '../../components/AvisoItem';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

   
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                headerTitle: 'Avisos',
                headerRight: () => (
                    <C.AddButton onPress={()=>navigation.navigate('AvisoAddScreen')}>
                        <Icon name="plus" size={24} color="#000" />
                    </C.AddButton>
                )
            });
            
        });
        
        getMedicos();
        return unsubscribe;
        
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            getMedicos();
            
        }, [])
    );

    const getMedicos = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getAvisosAll();
        setLoading(false);
        if(result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
    }

    const handleRemoveAll = async () => {
        const result = await api.handleRemoveAll();
            if(result.error === '') {
                alert('Todos os avisos removido com sucesso!');
                getMedicos();
               
            } else {
                alert(result.error);
            }
    }

    return (
        <C.Container>
            {!loading && list.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não há Aviso cadastrados.</C.NoListText>
                </C.NoListArea>
            }
            <C.List
                data={list}
                onRefresh={getMedicos}
                refreshing={loading}
                renderItem={({item})=><AvisoItem data={item} />}
                keyExtractor={(item)=>item.id.toString()}
            />

            {!loading && list.length != 0 &&
              <C.ButtonArea onPress={handleRemoveAll}>
                  <C.ButtonText>Limpar todos os Avisos</C.ButtonText>
             </C.ButtonArea>
            }
            
        </C.Container>
    );
}