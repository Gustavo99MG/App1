import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import USUARIO from "./Usuario";
import USUARIO1 from "./Usuario1";
import USUARIO2 from "./Usuario2";

export default class ManejoTabs extends Component {
  componentDidMount() {
    this.verificarDatosAlumno();
}

verificarDatosAlumno = async () => {
    await AsyncStorage.setItem('nombre', this.props.route.params.nombre);
    try {
        const nombreAlumno = await AsyncStorage.getItem('nombre');
        if (nombreAlumno) {
            // Si se han guardado datos de código de alumno, navegar a Usuario1
            this.props.navigation.navigate('Usuario');
        } else {
            // Si no se han guardado datos de código de alumno, navegar a Login
            this.props.navigation.navigate('Login');
        }
    } catch (error) {
        console.error('Error al verificar datos del alumno:', error);
    }
};

  render() {

    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator 
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: 'tomato' }}>
            <Tab.Screen name="Imagenes" component={USUARIO}  
            options={{tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="image" color={"red"} size={26} /> )}}/>
            
            <Tab.Screen name="Video" component={USUARIO1} 
            options={{tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="video" color={"red"} size={26} /> )}}/>
            
            <Tab.Screen name="Audio" component={USUARIO2} 
            options={{tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="music" color={"red"} size={26} /> )}}/>
        </Tab.Navigator>
    );
  }
}