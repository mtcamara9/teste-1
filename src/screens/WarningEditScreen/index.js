import React, { useEffect, useState } from 'react';
import { Button, View, Picker } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera } from 'react-native-image-picker';
import { Switch, CheckBox } from 'react-native-elements';
import C from './styles';
//import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();

    const [warnText, setWarnText] = useState('');
    const [photoList, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState('Selecione uma opção');
    const [outro, setOutro] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [crm, setCrm] = useState('');
    const [especialidade, setEspecialidade] = useState('');

    const [segunda, setSegunda] = useState(false);
    const [terca, setTerca] = useState(false);
    const [quarta, setQuarta] = useState(false);
    const [quinta, setQuinta] = useState(false);
    const [sexta, setSexta] = useState(false);
    const [sabado, setSabado] = useState(false);

    const [smanha, setSmanha] = useState(false);
    const [starde, setStarde] = useState(false);

    const [tmanha, setTmanha] = useState(false);
    const [ttarde, setTtarde] = useState(false);

    const [qmanha, setQmanha] = useState(false);
    const [qtarde, setQtarde] = useState(false);

    const [quimanha, setQuimanha] = useState(false);
    const [quitarde, setQuitarde] = useState(false);

    const [sexmanha, setSexmanha] = useState(false);
    const [sextarde, setSextarde] = useState(false);

    const [sabmanha, setSabmanha] = useState(false);
    const [sabtarde, setSabtarde] = useState(false);

    const [data, setData] = useState(new Date());
    const [hora, setHora] = useState('');

    const [hands, setHands] = useState(false);
    const [bairro, setBairro] = useState('');
    const [produto, setProduto] = useState('');

    const [p1, setP1] = useState(false);
    const [p2, setP2] = useState(false);
    const [p3, setP3] = useState(false);

    const [botao, setBotao] = useState('Salvar');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

   

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

    useEffect(()=>{
        if(!segunda){
            setSmanha(false);
            setStarde(false);
        }
    }, [segunda, smanha, starde]);

    useEffect(()=>{
        if(!terca){
            setTmanha(false);
            setTtarde(false);
        }
    }, [terca, tmanha, ttarde]);

    useEffect(()=>{
        if(!quarta){
            setQmanha(false);
            setQtarde(false);
        }
    }, [quarta, qmanha, qtarde]);

    useEffect(()=>{
        if(!quinta){
            setQuimanha(false);
            setQuitarde(false);
        }
    }, [quinta, quimanha, quitarde]);

    useEffect(()=>{
        if(!sexta){
            setSexmanha(false);
            setSextarde(false);
        }
    }, [sexta, sexmanha, sextarde]);

    useEffect(()=>{
        if(!sabado){
            setSabmanha(false);
            setSabtarde(false);
        }
    }, [sabado, sabmanha, sabtarde]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Adicionar um Médico'
        });
    }, []);
   

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                headerTitle: `Editar Médico ${route.params.data.NOME}`
            });
            
        });

        var array = route.params.data.ID_PERIODO.split('|');
        if(array.length > 4) {
            var novasegunda = array[0].split(',');
            var novaterca = array[1].split(',');
            var novaquarta = array[2].split(',');
            var novaquinta = array[3].split(',');
            var novasexta = array[4].split(',');
            var novasabado = array[5].split(',');

            if(novasegunda[0] == '1'){
                setSegunda(true);
                if(novasegunda[1] == '1'){
                    setSmanha(true);
                }else{
                    setSmanha(false);
                }
                if(novasegunda[2] == '1'){
                    setStarde(true);
                }else{
                    setStarde(false);
                }
            }

            if(novaterca[0] == '1'){
                setTerca(true);
                if(novaterca[1] == '1'){
                    setTmanha(true);
                }else{
                    setTmanha(false);
                }
                if(novaterca[2] == '1'){
                    setTtarde(true);
                }else{
                    setTtarde(false);
                }
            }

            if(novaquarta[0] == '1'){
                setQuarta(true);
                if(novaquarta[1] == '1'){
                    setQmanha(true);
                }else{
                    setQmanha(false);
                }
                if(novaquarta[2] == '1'){
                    setQtarde(true);
                }else{
                    setQtarde(false);
                }
            }

            if(novaquinta[0] == '1'){
                setQuinta(true);
                if(novaquinta[1] == '1'){
                    setQuimanha(true);
                }else{
                    setQuimanha(false);
                }
                if(novaquinta[2] == '1'){
                    setQuitarde(true);
                }else{
                    setQuitarde(false);
                }
            }

            if(novasexta[0] == '1'){
                setSexta(true);
                if(novasexta[1] == '1'){
                    setSexmanha(true);
                }else{
                    setSexmanha(false);
                }
                if(novasexta[2] == '1'){
                    setSextarde(true);
                }else{
                    setSextarde(false);
                }
            }

            if(novasabado[0] == '1'){
                setSabado(true);
                if(novasabado[1] == '1'){
                    setSabmanha(true);
                }else{
                    setSabmanha(false);
                }
                if(novasabado[2] == '1'){
                    setSabtarde(true);
                }else{
                    setSabtarde(false);
                }
            }

        }
       
        setNome(`${route.params.data.NOME}`);
        setEndereco(`${route.params.data.ENDERECO}`);
        setCrm(`${route.params.data.CRM}`);
        setTelefone(`${route.params.data.TELEFONE}`);
        setEspecialidade(`${route.params.data.ESPECIALIDADE}`);
        setData(`${route.params.data.DIA}`);
        setHora(`${route.params.data.HORA}`);
        setBairro(`${route.params.data.BAIRRO}`);
        if(route.params.data.HANDS == '1'){
            setHands(true);
        }else{
            setHands(false);

        }
        if(route.params.data.PRODUTO != null){
            var produtoConsulta = route.params.data.PRODUTO.split(',');
            if ( produtoConsulta.includes('Ellansé') ){
                setP1(true);
            }
            if ( produtoConsulta.includes('Silhouette') ){
                setP2(true);
            }
            if ( produtoConsulta.includes('Perfechta') ){
                setP3(true);
            }
        }


        return unsubscribe;
    }, [navigation, route]);

   
    const handleEditMedico = async () => {
        setBotao('Carregando ...');
        let periodo = '';
        if(segunda){
            periodo += '1,';  
            if(smanha){
                periodo += '1,';
            }else{
                periodo += '0,';
            }
            if(starde){
                periodo += '1|';
            }else{
                periodo += '0|';
            }
        }else{
            periodo += '0,0,0|';
        }

        if(terca){
            periodo += '1,';  
            if(tmanha){
                periodo += '1,';
            }else{
                periodo += '0,';
            }
            if(ttarde){
                periodo += '1|';
            }else{
                periodo += '0|';
            }
        }else{
            periodo += '0,0,0|';
        }

        if(quarta){
            periodo += '1,';  
            if(qmanha){
                periodo += '1,';
            }else{
                periodo += '0,';
            }
            if(qtarde){
                periodo += '1|';
            }else{
                periodo += '0|';
            }
        }else{
            periodo += '0,0,0|';
        }

        if(quinta){
            periodo += '1,';  
            if(quimanha){
                periodo += '1,';
            }else{
                periodo += '0,';
            }
            if(quitarde){
                periodo += '1|';
            }else{
                periodo += '0|';
            }
        }else{
            periodo += '0,0,0|';
        }

        if(sexta){
            periodo += '1,';  
            if(sexmanha){
                periodo += '1,';
            }else{
                periodo += '0,';
            }
            if(sextarde){
                periodo += '1|';
            }else{
                periodo += '0|';
            }
        }else{
            periodo += '0,0,0|';
        }

        if(sabado){
            periodo += '1,';  
            if(sabmanha){
                periodo += '1,';
            }else{
                periodo += '0,';
            }
            if(sabtarde){
                periodo += '1';
            }else{
                periodo += '0';
            }
        }else{
            periodo += '0,0,0';
        }

        var produtoNovo = [];
        if(p1){
            produtoNovo.push('Ellansé');
        }
        if(p2){
            produtoNovo.push('Silhouette');
        }
        if(p3){
            produtoNovo.push('Perfechta');
        }
        if(nome !== '' && telefone !== '' && endereco !== '' && bairro !== '' && crm !== '' && especialidade != '' && data !== '') {
                var result = await api.editMedico(nome, telefone, endereco, bairro, produtoNovo.toString(), hands, crm, especialidade, data, periodo, route.params.data.id);
            if(result.error === '') {
                alert('Medico editado com sucesso!');
                navigation.navigate('WarningScreen');
            } else {
                alert(result.error);
            }
        } else {
            alert("Preencha todos os campos");
        }
        setBotao('Salvar');
    }

    return (
        <C.Container>
            <C.Scroller>
                <C.Title>Nome</C.Title>
                <C.Field
                    placeholder=""
                    value={nome}
                    onChangeText={t=>setNome(t)}
                />
                <C.Title>Endereço</C.Title>
                <C.Field
                    placeholder=""
                    value={endereco}
                    onChangeText={t=>setEndereco(t)}
                />
                <C.Title>Bairro</C.Title>
                <C.Field
                    placeholder=""
                    value={bairro}
                    onChangeText={t=>setBairro(t)}
                />
                <C.Title>Telefone</C.Title>
                <C.Field
                    placeholder=""
                    value={telefone}
                    onChangeText={t=>setTelefone(t)}
                />
                <C.Title>CRM</C.Title>
                <C.Field
                    placeholder=""
                    value={crm}
                    onChangeText={t=>setCrm(t)}
                />
                <C.Title>Especialidade</C.Title>
                <C.Field
                    placeholder=""
                    value={especialidade}
                    onChangeText={t=>setEspecialidade(t)}
                />
                <CheckBox
                center
                title='Ellansé'
                checked={p1}
                onPress={()=>setP1(!p1)}
                />
                <CheckBox
                center
                title='Silhouette'
                checked={p2}
                onPress={()=>setP2(!p2)}
                />
                <CheckBox
                center
                title='Perfechta'
                checked={p3}
                onPress={()=>setP3(!p3)}
                />
                <C.Periodo>
                    <C.PeriodoText>Participou de Hands On ?</C.PeriodoText>   
                    <Switch
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={hands ? "#0f0" : "#f4f3f4"}
                        onValueChange={()=>setHands(!hands)}
                        value={hands}
                    /> 
                </C.Periodo>
                <C.Title>Data do agendamento</C.Title>
                <DatePicker
                    mode="date"
                    style={{ hidth: 500, margin:20 }}
                    date={data}
                    onDateChange={t=>setData(t)} 
                />

                <C.Title>Período de Atendimento</C.Title>
                
                <C.Periodo style={{flexDirection: 'column', flex:1, alignItems: 'flex-start', backgroundColor: '#fff', paddingLeft: 20}}>
                    <C.Periodo>
                    <C.PeriodoText>Segunda-feira</C.PeriodoText>   
                    <Switch
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={segunda ? "#0f0" : "#f4f3f4"}
                        onValueChange={()=>setSegunda(!segunda)}
                        value={segunda}
                    /> 
                    </C.Periodo>
                    <C.Periodo>
                    <CheckBox
                        center
                        title='Manhã'
                        checked={smanha}
                        onPress={()=>setSmanha(!smanha)}
                        />
                    <CheckBox
                    center
                    title='Tarde'
                    checked={starde}
                    onPress={()=>setStarde(!starde)}
                    
                    />
                    </C.Periodo>
                </C.Periodo>
                <C.Periodo style={{flexDirection: 'column', flex:1, alignItems: 'flex-start', backgroundColor: '#fff', paddingLeft: 20}}>
                    <C.Periodo>
                    <C.PeriodoText>Terça-feira</C.PeriodoText>   
                    <Switch
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={terca ? "#0f0" : "#f4f3f4"}
                        onValueChange={()=>setTerca(!terca)}
                        value={terca}
                    /> 
                    </C.Periodo>
                    <C.Periodo>
                    <CheckBox
                        center
                        title='Manhã'
                        checked={tmanha}
                        onPress={()=>setTmanha(!tmanha)}
                        />
                    <CheckBox
                    center
                    title='Tarde'
                    checked={ttarde}
                    onPress={()=>setTtarde(!ttarde)}
                    
                    />
                    </C.Periodo>
                </C.Periodo>
                <C.Periodo style={{flexDirection: 'column', flex:1, alignItems: 'flex-start', backgroundColor: '#fff', paddingLeft: 20}}>
                    <C.Periodo>
                    <C.PeriodoText>Quarta-feira</C.PeriodoText>   
                    <Switch
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={quarta ? "#0f0" : "#f4f3f4"}
                        onValueChange={()=>setQuarta(!quarta)}
                        value={quarta}
                    /> 
                    </C.Periodo>
                    <C.Periodo>
                    <CheckBox
                        center
                        title='Manhã'
                        checked={qmanha}
                        onPress={()=>setQmanha(!qmanha)}
                        />
                    <CheckBox
                    center
                    title='Tarde'
                    checked={qtarde}
                    onPress={()=>setQtarde(!qtarde)}
                    
                    />
                    </C.Periodo>
                </C.Periodo>
                <C.Periodo style={{flexDirection: 'column', flex:1, alignItems: 'flex-start', backgroundColor: '#fff', paddingLeft: 20}}>
                    <C.Periodo>
                    <C.PeriodoText>Quinta-feira</C.PeriodoText>   
                    <Switch
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={quinta ? "#0f0" : "#f4f3f4"}
                        onValueChange={()=>setQuinta(!quinta)}
                        value={quinta}
                    /> 
                    </C.Periodo>
                    <C.Periodo>
                    <CheckBox
                        center
                        title='Manhã'
                        checked={quimanha}
                        onPress={()=>setQuimanha(!quimanha)}
                        />
                    <CheckBox
                    center
                    title='Tarde'
                    checked={quitarde}
                    onPress={()=>setQuitarde(!quitarde)}
                    
                    />
                    </C.Periodo>
                </C.Periodo>
                <C.Periodo style={{flexDirection: 'column', flex:1, alignItems: 'flex-start', backgroundColor: '#fff', paddingLeft: 20}}>
                    <C.Periodo>
                    <C.PeriodoText>Sexta-feira</C.PeriodoText>   
                    <Switch
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={sexta ? "#0f0" : "#f4f3f4"}
                        onValueChange={()=>setSexta(!sexta)}
                        value={sexta}
                    /> 
                    </C.Periodo>
                    <C.Periodo>
                    <CheckBox
                        center
                        title='Manhã'
                        checked={sexmanha}
                        onPress={()=>setSexmanha(!sexmanha)}
                        />
                    <CheckBox
                    center
                    title='Tarde'
                    checked={sextarde}
                    onPress={()=>setSextarde(!sextarde)}
                    
                    />
                    </C.Periodo>
                </C.Periodo>
                <C.Periodo style={{flexDirection: 'column', flex:1, alignItems: 'flex-start', backgroundColor: '#fff', paddingLeft: 20}}>
                    <C.Periodo>
                    <C.PeriodoText>Sábado</C.PeriodoText>   
                    <Switch
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={sabado ? "#0f0" : "#f4f3f4"}
                        onValueChange={()=>setSabado(!sabado)}
                        value={sabado}
                    /> 
                    </C.Periodo>
                    <C.Periodo>
                    <CheckBox
                        center
                        title='Manhã'
                        checked={sabmanha}
                        onPress={()=>setSabmanha(!sabmanha)}
                        />
                    <CheckBox
                    center
                    title='Tarde'
                    checked={sabtarde}
                    onPress={()=>setSabtarde(!sabtarde)}
                    
                    />
                    </C.Periodo>
                </C.Periodo>

                {select == 'outro' && 
                <C.Title>Digite Manualmente o Período de Atendimento</C.Title>
                }
                {select == 'outro' && 
                   <C.Field
                   placeholder=""
                   value={outro}
                   onChangeText={t=>setOutro(t)}
                    />
                    
                }
                

                <C.ButtonArea onPress={handleEditMedico}>
                    <C.ButtonText>{botao}</C.ButtonText>
                </C.ButtonArea>
            </C.Scroller>
        </C.Container>
    );
}