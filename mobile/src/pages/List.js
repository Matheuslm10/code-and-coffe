import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, Text, AsyncStorage, TouchableOpacity } from 'react-native';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            let techsArray = [];

            if (storagedTechs && storagedTechs !== '') {
               techsArray = storagedTechs.split(',').map(tech => tech.trim());
            }
            
            if (techsArray.length > 0) 
                setTechs(techsArray);
        })
    }, []);

    async function handleLogOut() {
        await AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container} >
            <Image source={logo} style={styles.logo}/>
            <Text>{techs.length > 0 ? techs : 'Não existem tecnologias.'}</Text>
            <TouchableOpacity onPress={handleLogOut} style={styles.button}>
                <Text style={styles.buttonText}>LogOut</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1
    },
    
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 20
    },

    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16
    }
});
