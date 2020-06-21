import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, Text, AsyncStorage, TouchableOpacity } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.23/3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                console.log('booking_response', booking)
                Alert.alert(`Sua reserva em ${booking.spot.company} para o dia ${booking.date} 
                foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        })
    }, []);

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
            <Image source={logo} style={styles.logo} />

            <ScrollView>
                {techs.length > 0
                    ? (techs.map(tech => <SpotList key={tech} tech={tech} />))
                    : (<Text>Não existem tecnologias.</Text>)
                }
                <TouchableOpacity onPress={handleLogOut} style={styles.button}>
                    <Text style={styles.buttonText}>LogOut</Text>
                </TouchableOpacity>
            </ScrollView>

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
        borderRadius: 2,
        marginTop: 20
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16
    }
});
