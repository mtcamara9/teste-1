import React, { useEffect, useState } from 'react';
import { Button, View } from "react-native";
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera } from 'react-native-image-picker';
import C from './styles';
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';
import DocumentPicker from 'react-native-document-picker';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import { isExists } from 'date-fns';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState('Selecione uma opção');
    const [comentario, setComentario] = useState('');

    const [data, setData] = useState(new Date());
    const [hora, setHora] = useState('');
    const [arquivo, setArquivo] = useState([]);

    const [botao, setBotao] = useState('Editar');

   


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const openDocumentFile = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            setArquivo(res);
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }

    const formatHora = (hora) => {
        if( hora.length==2 )
		{
            setHora(`${hora}:`);
			
		}else if(hora.length >=6){
            
        }else{
            setHora(hora);
        }
		
    }


    const handleConfirm = (date) => {
        let dateEl = new Date(date);
        let year = dateEl.getFullYear();
        let month = dateEl.getMonth() + 1;
        let day = dateEl.getDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        
        setData(`${year}-${month}-${day}`);
        hideDatePicker();
    };

    const showTextDate = (date) => {
        if(date != ''){
            let dateEl = new Date(date);
            let year = dateEl.getUTCFullYear();
            let month = dateEl.getUTCMonth() + 1;
            let day = dateEl.getUTCDate();

            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;
            return `${day}/${month}/${year}`;
        }
    }

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        let dateEl = new Date(time);
        let hours = dateEl.getHours();
        let minutes = dateEl.getMinutes();
        let seconds = dateEl.getSeconds();

        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds;

        setTime(`${hours}:${minutes}`);
        hideTimePicker();
    };

    const showTextTime = (time) => {
        // if(time != ''){
        //     let dateEl = new Date(date);
        //     let year = dateEl.getFullYear();
        //     let month = dateEl.getMonth() + 1;
        //     let day = dateEl.getDate();

        //     month = month < 10 ? '0'+month : month;
        //     day = day < 10 ? '0'+day : day;
        //     return `${day}/${month}/${year}`;
        // }
    }

    

    // useEffect(()=>{
    //     navigation.setOptions({
    //         headerTitle: 'Adicionar um Aviso'
    //     });
    //     let dateEl = new Date();
    //     let year = dateEl.getUTCFullYear();
    //     let month = dateEl.getUTCMonth() + 1;
    //     let day = dateEl.getUTCDate();

    //     month = month < 10 ? '0'+month : month;
    //     day = day < 10 ? '0'+day : day;
    //     setData(`${year}-${month}-${day}`);
    // }, []);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                headerTitle: `Editar Aviso`
            });
            
        });
        setData(`${route.params.data.DIA}`);
        setHora(`${route.params.data.HORA}`);
        setSelect(`${route.params.data.TIPO_AVISO}`);
        setComentario(`${route.params.data.COMENTARIO}`);
        if(route.params.data.TIPO_AVISO == 'Outros'){
            setHora(`00:00:00`);
        }

        return unsubscribe;
    }, [navigation, route]);

   
    const handleEditarMedico = async () => {
        setBotao('Carregando ...');
        if(comentario !== '' && select !== 'Selecione uma opção') {
            const result = await api.editAviso(comentario, data, hora, select, arquivo, route.params.data.id);
            if(result.error === '') {
                setSelect('Selecione uma opção');
                setData('');
                setHora('');
                alert('Evento editado com sucesso!');
                navigation.navigate('AvisoScreen');
            } else {
                alert(result.error);
            }
        } else {
            alert("Preencha todos os campos");
        }
        setBotao('Editar');
    }

    return (
        <C.Container>
            <C.Scroller>
                <C.Title>Selecione o Tipo de Aviso</C.Title>
                <Picker
                    selectedValue={select}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => setSelect(itemValue)}
                >
                    <Picker.Item label="Selecione uma opção" value="0" />
                    <Picker.Item label="Workshop" value="Workshop" />
                    <Picker.Item label="Reunião" value="Reunião" />
                    <Picker.Item label="Congresso" value="Congresso" />
                    <Picker.Item label="Outros" value="Outros" />
                </Picker>
                {select != 'Outros' &&
                <>
                <C.Title>Data do agendamento</C.Title>
                <DatePicker
                    mode="date"
                    style={{ hidth: 500, margin:20 }}
                    date={data}
                    onDateChange={t=>setData(t)} 
                />
                <C.Title>Hora do agendamento</C.Title>
                <C.Field
                    placeholder="Digite a hora do agendamento"
                    value={hora}
                    keyboardType="numeric"
                    onChangeText={t=>formatHora(t)}                
                />
                </>
                }
                <C.Title>Comentário</C.Title>
                <C.Field
                    placeholder="Digite um comentário"
                    value={comentario}
                    onChangeText={t=>setComentario(t)}
                    multiline={true}
                />
                {!arquivo.uri && 
                    <C.ButtonArea onPress={openDocumentFile}>
                        <C.ButtonText>Selecionar um arquivo</C.ButtonText>
                    </C.ButtonArea>
                }
                {arquivo.uri && 
                    <C.ButtonAreaSuccess onPress={openDocumentFile}>
                        <C.ButtonText>Arquivo {arquivo.name} Selecionado. </C.ButtonText>
                    </C.ButtonAreaSuccess>
                }

                
                

                <C.ButtonArea onPress={handleEditarMedico}>
                    <C.ButtonText>{botao}</C.ButtonText>
                </C.ButtonArea>
            </C.Scroller>
        </C.Container>
    );
}