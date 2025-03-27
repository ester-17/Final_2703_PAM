import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Button, TextInput, Title } from 'react-native-paper';

export default function App() {
    const [cep, setCep] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [addressData, setAddressData] = useState({});

    const buscaCep = (xcep) => {
        const url = `https://viacep.com.br/ws/${xcep}/json/`;
        fetch(url)
            .then((resp) => resp.json())
            .then((dados) => {
                setAddressData(dados);
            })
            .catch((erro) => {
                console.log(erro);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Title>Cadastro de Endereço</Title>
            </View>
            <TextInput
                label="Nome"
                value={name}
                onChangeText={(value) => setName(value)}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Email"
                value={email}
                onChangeText={(value) => setEmail(value)}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Digite o CEP"
                value={cep}
                onChangeText={(value) => setCep(value)}
                mode="outlined"
                style={styles.input}
            />
            <Button 
                mode="contained" 
                onPress={() => buscaCep(cep)}
            >
                Buscar
            </Button>

            {addressData.logradouro && (
                <View style={styles.addressContainer}>
                    <Text>Endereço: {addressData.logradouro}</Text>
                    <Text>Bairro: {addressData.bairro}</Text>
                    <Text>Cidade: {addressData.localidade}</Text>
                    <Text>Estado: {addressData.uf}</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        margin: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
    },
    addressContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});
