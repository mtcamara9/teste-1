import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

import MedicoComentario from '../../components/MedicoComentario';
import ComentarioModal from '../../components/ComentarioModal';
import ComentarioModalEdit from '../../components/ComentarioModalEdit';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    const [loading, setLoading] = useState(true);
    const [medicoList, setMedicoList] = useState([]);
    const [comentarioEdit, setComentarioEdit] = useState('');
    const [carregarComentario, setCarregarComentario] = useState(false);

    const [novasegunda, setNovasegunda] = useState([]);
    const [novaterca, setNovaterca] = useState([]);
    const [novaquarta, setNovaquarta] = useState([]);
    const [novaquinta, setNovaquinta] = useState([]);
    const [novasexta, setNovasexta] = useState([]);
    const [novasabado, setNovasabado] = useState([]);
    const [array, setArray] = useState([]);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                headerTitle: `Médico(a) ${route.params.data.list.NOME}`
            });
            
        });
        getMedicoId();
        return unsubscribe;
    }, [navigation, route]);
    const getMedicoId = async () => {
        setMedicoList([]);
        setLoading(true);
        const result = await api.getMedicoId(route.params.data.list.id);
        setLoading(false);
        if(result.error === '') {
            setMedicoList(result.list);
        } else {
            alert(result.error);
        }
        setArray(result.list.ID_PERIODO.split('|'));
        var arrayHere = result.list.ID_PERIODO.split('|');
        if(arrayHere.length > 4) {
            setNovasegunda(arrayHere[0].split(','))
            setNovaterca(arrayHere[1].split(','));
            setNovaquarta(arrayHere[2].split(','));
            setNovaquinta(arrayHere[3].split(','));
            setNovasexta(arrayHere[4].split(','));
            setNovasabado(arrayHere[5].split(','));
          
        }
    }

    const showTextDate = (date) => {
        let dateEl = new Date(date);
        let year = dateEl.getUTCFullYear();
        let month = dateEl.getUTCMonth() + 1;
        let day = dateEl.getUTCDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        return `${day}/${month}/${year}`;
    }

    const showTimeDate = (time) => {
        if(typeof time == 'string'){
            let newTime = time.substr(0, 5);
            return newTime;
        }
        
    }

    const handleComentarioChoose = () => {
        setShowModal(true);
    }

    const handleComentarioEditChoose = () => {
        setShowModalEdit(true);
    }

    

    return (
        <C.Container>
           <C.Header>
               <C.Info>
                   <C.InfoText>
                       Nome :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {medicoList.NOME}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                       CRM :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {medicoList.CRM}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                       Endereço :
                   </C.InfoText>
                   <C.InfoTextMin style={{width:230}}>
                        {medicoList.ENDERECO}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                       Bairro :
                   </C.InfoText>
                   <C.InfoTextMin style={{width:230}}>
                        {medicoList.BAIRRO}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                       Telefone :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {medicoList.TELEFONE}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                       Data marcada :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {showTextDate(medicoList.DIA)}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info>
                   <C.InfoText>
                      Especialidade :
                   </C.InfoText>
                   <C.InfoTextMin>
                        {medicoList.ESPECIALIDADE}
                   </C.InfoTextMin>
               </C.Info>
               <C.Info style={{flexDirection: 'column'}}>
                   <C.InfoText>
                      Período de Atendimento :
                   </C.InfoText>
                   <View style={{flexDirection: 'row'}}>
                    {array.length > 4 && novasegunda[0] == 1 &&
                    <C.InfoTextMin>Segunda-feira:</C.InfoTextMin>
                    }
                    {array.length > 4 && novasegunda[1] == 1 &&
                    <C.InfoTextMin> ( Manhã ) </C.InfoTextMin>
                    }
                    {array.length > 4 && novasegunda[2] == 1 &&
                    <C.InfoTextMin> ( Tarde ) </C.InfoTextMin>
                    }
                    </View>

                    <View style={{flexDirection: 'row'}}>
                    {array.length > 4 && novaterca[0] == 1 &&
                    <C.InfoTextMin>Terça-feira:</C.InfoTextMin>
                    }
                    {array.length > 4 && novaterca[1] == 1 &&
                    <C.InfoTextMin> ( Manhã ) </C.InfoTextMin>
                    }
                    {array.length > 4 && novaterca[2] == 1 &&
                    <C.InfoTextMin> ( Tarde ) </C.InfoTextMin>
                    }
                    </View>

                    <View style={{flexDirection: 'row'}}>
                    {array.length > 4 && novaquarta[0] == 1 &&
                    <C.InfoTextMin>Quarta-feira:</C.InfoTextMin>
                    }
                    {array.length > 4 && novaquarta[1] == 1 &&
                    <C.InfoTextMin> ( Manhã ) </C.InfoTextMin>
                    }
                    {array.length > 4 && novaquarta[2] == 1 &&
                    <C.InfoTextMin> ( Tarde ) </C.InfoTextMin>
                    }
                    </View>

                    <View style={{flexDirection: 'row'}}>
                    {array.length > 4 && novaquinta[0] == 1 &&
                    <C.InfoTextMin>Quinta-feira:</C.InfoTextMin>
                    }
                    {array.length > 4 && novaquinta[1] == 1 &&
                    <C.InfoTextMin> ( Manhã ) </C.InfoTextMin>
                    }
                    {array.length > 4 && novaquinta[2] == 1 &&
                    <C.InfoTextMin> ( Tarde ) </C.InfoTextMin>
                    }
                    </View>

                    <View style={{flexDirection: 'row'}}>
                    {array.length > 4 && novasexta[0] == 1 &&
                    <C.InfoTextMin>Sexta-feira:</C.InfoTextMin>
                    }
                    {array.length > 4 && novasexta[1] == 1 &&
                    <C.InfoTextMin> ( Manhã ) </C.InfoTextMin>
                    }
                    {array.length > 4 && novasexta[2] == 1 &&
                    <C.InfoTextMin> ( Tarde ) </C.InfoTextMin>
                    }
                    </View>

                    <View style={{flexDirection: 'row'}}>
                    {array.length > 4 && novasabado[0] == 1 &&
                    <C.InfoTextMin>Sabado:</C.InfoTextMin>
                    }
                    {array.length > 4 && novasabado[1] == 1 &&
                    <C.InfoTextMin> ( Manhã ) </C.InfoTextMin>
                    }
                    {array.length > 4 && novasabado[2] == 1 &&
                    <C.InfoTextMin> ( Tarde ) </C.InfoTextMin>
                    }
                    </View>
               </C.Info>
           </C.Header>
           
           <C.List
                data={medicoList.comentarios}
                onRefresh={getMedicoId}
                refreshing={loading}
                renderItem={({item})=><MedicoComentario data={item} setShowEdit={setShowModalEdit} setComentarioEdit={setComentarioEdit} setCarregarComentario={setCarregarComentario}  />}
                keyExtractor={(item)=>item.id.toString()}
            />
            <C.ButtonArea onPress={()=>handleComentarioChoose()}>
                    <C.ButtonText>Adicionar Comentário</C.ButtonText>
            </C.ButtonArea>

            <ComentarioModal 
                show={showModal}
                setShow={setShowModal}
                getMedico={getMedicoId}

                medicoId={route.params.data.list.id}
            />

            <ComentarioModalEdit 
                show={showModalEdit}
                setShow={setShowModalEdit}
                comentarioEdit={comentarioEdit}
                setCarregarComentario={setCarregarComentario}
                carregarComentario={carregarComentario}
                getMedico={getMedicoId}
            />

        </C.Container>
    );
}