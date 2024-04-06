import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color: #F5F6FA;
        padding: 20px;
    `,
    LoadingIcon: styled.ActivityIndicator``,
    NoListArea: styled.View`
        justify-content: center;
        align-items: center;
        padding: 30px;
    `,
    NoListText: styled.Text`
        font-size: 15px;
        color: #000;
    `,
    List: styled.FlatList`
        flex: 1;
    `,
    AddButton: styled.TouchableOpacity`
        margin-right: 15px;
    `,
    ButtonArea: styled.TouchableOpacity`
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #DC3545;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    `,
    ButtonText: styled.Text`
        font-size: 15px;
        font-weight: bold;
        color: #FFF;
    `,
};