import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const scroll = useRef();
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [disabledDates, setDisabledDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [medicoList, setMedicoList] = useState([]);
    const [selectedMedico, setSelectedMedico] = useState(null);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                headerTitle: `Agendamentos`
            });
            getDisabledDates();
        });
        return unsubscribe;
    }, [navigation, route]);

    useEffect(()=>{
        getMedicos();
    }, [selectedDate]);

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    const getMedicos = async () => {
        if(selectedDate) {
            const result = await api.getMedicosAgendamentos(selectedDate);
            if(result.error === '') {
                setSelectedMedico(null);
                setMedicoList(result.list);
                setTimeout(()=>{
                    scroll.current.scrollToEnd();
                }, 500);
            } else {
                alert(result.error);
            }
        }
    }

    const getDisabledDates = async () => {
        setDisabledDates([]);
        setMedicoList([]);
        setSelectedDate(null);
        setSelectedMedico(null);
        setLoading(true);
        const result = await api.getDisabledDates(1);
        setLoading(false);
        if(result.error === '') {
            let dateList = [];
            for(let i in result.list) {
                var tomorrow =  new Date(result.list[i]);
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateList.push( tomorrow );
                
            }
            
            
            setDisabledDates(dateList);
        } else {
            alert(result.error);
        }
    }

    const handleDateChange = (date) => {
        let dateEl = new Date(date);
        let year = dateEl.getUTCFullYear();
        let month = dateEl.getUTCMonth() + 1;
        let day = dateEl.getUTCDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        setSelectedDate(`${year}-${month}-${day}`);
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
        let newTime = time.substr(0, 5);
        return newTime;
    }

    const handleView = async () => {
        if(selectedDate && selectedMedico) {
            const data = await api.getMedicoId(selectedMedico);
            if(data.error === '') {
                navigation.navigate('ReservationMedico', {data});
            } else {
                alert(data.error);
            }
        } else {
            alert("Selecione DATA e HORÁRIO.");
        }
    }

    return (
        <C.Container>
            <C.Scroller ref={scroll} contentContainerStyle={{paddingBottom: 40}}>
                
                {loading &&
                    <C.LoadingIcon size="large" color="#8863E6" />
                }

                {!loading &&
                    <C.CalendarArea>
                        <CalendarPicker
                            onDateChange={handleDateChange}
                            disabledDates={disabledDates}
                            minDate={minDate}
                            maxDate={maxDate}
                            weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']}
                            months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                            previousTitle="Anterior"
                            nextTitle="Próximo"
                            selectedDayColor="#87CEFA"
                            selectedDayTextColor="#FFFFFF"
                            todayBackgroundColor="transparent"
                            todayTextStyle="#000000"
                        />
                    </C.CalendarArea>
                }

                {!loading && selectedDate &&
                    <>
                        <C.Title>Marcados em {showTextDate(selectedDate)}:</C.Title>

                        <C.TimeListArea>
                            {medicoList.map((item, index)=>(
                                <C.TimeItem
                                    key={index}
                                    onPress={()=>setSelectedMedico(item.id)}
                                    active={selectedMedico === item.id}
                                >
                                    <C.TimeItemText
                                        active={selectedMedico === item.id}
                                    >{item.NOME}</C.TimeItemText>
                                </C.TimeItem>
                            ))}
                        </C.TimeListArea>
                    </>
                }
            </C.Scroller>
            {!loading &&
                <C.ButtonArea onPress={handleView}>
                    <C.ButtonText>Visualizar</C.ButtonText>
                </C.ButtonArea>
            }
        </C.Container>
    );
}