import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import { Image } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nombreAlumno: ''
    };
  }

  componentDidMount() {
    this.obtenerNombreAlumno();
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        <Text>Bievenido {this.state.nombreAlumno}</Text>
        <TouchableOpacity onPress={this.toggleOpen}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  obtenerNombreAlumno = async () => {
    try {
      const nombreAlumno = await AsyncStorage.getItem('nombre');
      if (nombreAlumno !== null) {
        this.setState({ nombreAlumno });
      }
    } catch (error) {
      console.error('Error al obtener el nombre del alumno:', error);
    }
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <MenuDrawer
            open={this.state.open}
            position={'left'}
            drawerContent={this.drawerContent()}
            drawerPercentage={45}
            animationTime={250}
            overlay={true}
            opacity={0.4}>
            <View style={styles.body}>
              <TouchableOpacity onPress={this.toggleOpen}>
                <Text>Open</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginLeft: 0,
                backgroundColor: '',
                marginRight: 0,
                marginTop: 12,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Fotos
              </Text>
            </View>
            <ScrollView>
              <View>
                <Image
                  source={require('./Imagenes/salchicha.jpg')}
                  style={{width: 420, height: 275}}
                />
                <Image
                  source={require('./Imagenes/salchicha.jpg')}
                  style={{width: 420, height: 275, marginTop: 9}}
                />
                <Image
                  source={require('./Imagenes/salchicha.jpg')}
                  style={{width: 420, height: 275, marginTop: 9}}
                />
                <Image
                  source={require('./Imagenes/salchicha.jpg')}
                  style={{width: 420, height: 275, marginTop: 9}}
                />
                <Image
                  source={require('./Imagenes/salchicha.jpg')}
                  style={{width: 420, height: 275, marginTop: 9}}
                />
                <Image
                  source={require('./Imagenes/salchicha.jpg')}
                  style={{width: 420, height: 275, marginTop: 9}}
                />
                <Image
                  source={require('./Imagenes/salchicha.jpg')}
                  style={{width: 420, height: 275, marginTop: 9}}
                />
                <Image
                  source={require('./Imagenes/salchicha.jpg')}
                  style={{width: 420, height: 275, marginTop: 9}}
                />
                <Image
                  source={require('./Imagenes/salchicha.jpg')}
                  style={{width: 420, height: 275, marginTop: 9}}
                />
                <Image
                  source={require('./Imagenes/salchicha.jpg')}
                  style={{width: 420, height: 275, marginTop: 9}}
                />
              </View>
            </ScrollView>
          </MenuDrawer>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    zIndex: 0,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: '#38C8EC',
    padding: 10,
  },
  body: {
    width: 50,
    backgroundColor: '#F04812',
  },
});

const otro = StyleSheet.create({
  usar: {
    flex: 1,
    width: 400,
    height: 800,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 32,
  },
});