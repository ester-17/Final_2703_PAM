
import { Text, SafeAreaView, StyleSheet, View } from 'react-native'; // Import View from react-native
import { useState } from 'react';
import { Button, TextInput, Title } from 'react-native-paper'; // Title from react-native-paper

export default function App() {
    let [cep, setCep] = useState(null);
    let [render, setRender] = useState([]);

    let BuscaCep = (xcep) => {
        let url = `https://viacep.com.br/ws/${xcep}/json/`;
        console.log(url);
        fetch(url)
            .then((resp) => { return resp.json() })
            .then((dados) => {
                console.log(dados);
                setRender(dados);
            })
            .catch((erro) => { console.log(erro) });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}> {/* Wrap Title in a View */}
                <Title>Cep</Title> {/* Using Title from React Native Paper */}
            </View>
            <TextInput
                label="Digite Cep" // Label for the TextInput
                value={cep} // Bind the value to the state
                onChangeText={(value) => { setCep(value) }} // Update state on text change
                mode="outlined" // You can choose 'outlined' or 'flat'
                style={styles.input} // Optional: Add styles for the input
            />
            <Button 
                mode="contained" // You can change the mode to 'outlined' if you prefer
                onPress={() => { BuscaCep(cep) }}
            >
                Buscar
            </Button>

            <Text> Endereço : {render["logradouro"]}</Text>
            <Text> Bairro : {render["bairro"]}</Text>
            <Text> Cidade : {render.localidade}</Text>
            <Text> Estado : {render.uf}</Text> {/* Changed 'estado' to 'uf' */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
        margin: 20
    },
    titleContainer: {
        alignItems: 'center', // Center horizontally
        marginBottom: 16, // Optional: Add some margin for spacing
    },
    input: {
        marginBottom: 16, // Add some margin for spacing
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
