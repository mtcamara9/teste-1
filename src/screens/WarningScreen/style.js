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
    SearchArea: styled.View`
        background-color: #ccc;
        height: 40px;
        border-radius: 20px;
        padding: 0 20px;
        margin: 0 20px 20px 20px;
    `,
    SearchInput: styled.TextInput`
        flex:1;
        font-size: 16px;
        color: #FFFFFF;
    `,

};