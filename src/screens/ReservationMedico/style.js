import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color: #F5F6FA;
        padding: 20px;
    `,
    Header: styled.View`
        padding:20px;
        background-color: #fff;
        
        margin-bottom:20px;
    `,
    Info: styled.View`
        
        flex-direction:row;
        padding:5px;
    `,
    InfoText: styled.Text`
        font-weight: bold;
        font-size: 16px;
        margin-right: 5px;
    `,
    InfoTextMin: styled.Text`
        font-size: 15px;
        

    `,
    List: styled.FlatList`
        flex: 1;
    `,
    ButtonArea: styled.TouchableOpacity`
        margin-top: 20px;
        background-color: #87CEFA;
        padding: 15px;
        justify-content: center;
        align-items: center;
    `,
    ButtonText: styled.Text`
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
    `,
    NoListArea: styled.View`
        justify-content: center;
        align-items: center;
        padding: 30px;
    `,
    NoListText: styled.Text`
        font-size: 15px;
        color: #000;
    `,
};