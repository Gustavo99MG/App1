import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

const img_speaker = require('./Imagenes/ui_speaker.png');
const img_pause = require('./Imagenes/ui_pause.png');
const img_play = require('./Imagenes/ui_play.png');
const img_playjumpleft = require('./Imagenes/ui_playjumpleft.png');
const img_playjumpright = require('./Imagenes/ui_playjumpright.png');

export default class Usuario2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreAlumno: '',
      sound: null,
      open: false,
      playing: false, // Nuevo estado para controlar si la música está reproduciendo o pausada
      tiempoTranscurrido: 0, // Estado para almacenar el tiempo transcurrido en segundos
    };
    this.tiempoTimer = null; // Temporizador para actualizar el tiempo transcurrido
  }

  componentDidMount() {
    this.obtenerNombreAlumno();
    this.loadSound();
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        <Text>Bienvenido {this.state.nombreAlumno}</Text>
        <TouchableOpacity onPress={this.toggleOpen}>
          <Text>Cerrar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  componentWillUnmount() {
    clearInterval(this.timer); // Limpia el temporizador cuando el componente se desmonta
    if (this.state.sound) {
      this.state.sound.release();
    }
  }

  loadSound = () => {
    const sound = new Sound(require('./Sonidos/Humble-Fantasmas.mp3'), (error) => {
      if (error) {
        console.log('Error al cargar el sonido', error);
        return;
      }
      this.setState({ sound });
    });
  }

  toggleSound = () => {
    if (this.state.sound) {
      if (this.state.playing) {
        this.state.sound.pause();
        clearInterval(this.tiempoTimer); // Detener el temporizador cuando se pausa la reproducción
      } else {
        this.state.sound.play();
        this.tiempoTimer = setInterval(this.actualizarTiempoTranscurrido, 1000); // Iniciar el temporizador al comenzar la reproducción
      }
      this.setState(prevState => ({ playing: !prevState.playing }));
    }
  }

  jumpForward = () => {
    if (this.state.sound) {
      this.state.sound.getCurrentTime((currentTime) => {
        this.state.sound.setCurrentTime(currentTime + 5); // Adelantar 5 segundos
      });
    }
  }

  jumpBackward = () => {
    if (this.state.sound) {
      this.state.sound.getCurrentTime((currentTime) => {
        this.state.sound.setCurrentTime(currentTime - 5); // Retroceder 5 segundos
      });
    }
  }

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

  actualizarTiempoTranscurrido = () => {
    if (this.state.sound && this.state.playing) {
      this.state.sound.getCurrentTime((currentTime) => {
        this.setState({ tiempoTranscurrido: Math.floor(currentTime) }); // Actualizar el estado del tiempo transcurrido
      });
    }
  }

  formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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
                <Text>Abrir</Text>
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
                Audio
              </Text>
            </View>

            <TouchableOpacity style={styles.centeredContainer}>
              <Image source={img_speaker} style={{ width: 250, height: 250 }} />
            </TouchableOpacity>

            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{this.formatTime(this.state.tiempoTranscurrido)}</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={[styles.button, { marginLeft: 10 }]} onPress={this.jumpBackward}>
                <Image source={img_playjumpleft} style={{ width: 30, height: 30 }} />
                <Text style={styles.buttonText}>5 seg</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonWithImage, { marginLeft: 10 }]} onPress={this.toggleSound}>
                {this.state.playing ? <Image source={img_pause} style={{ width: 40, height: 40 }} /> : <Image source={img_play} style={{ width: 40, height: 40 }} />}
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { marginLeft: 10 }]} onPress={this.jumpForward}>
                <Image source={img_playjumpright} style={{ width: 30, height: 30 }} />
                <Text style={styles.buttonText}>5 seg</Text>
              </TouchableOpacity>
            </View>
          </MenuDrawer>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    zIndex: 0,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: '#38C8EC',
    padding: 10,
  },
  body: {
    width: 50,
    backgroundColor: '#F04812'
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  centeredContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWithImage: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // Centra los elementos horizontalmente
    justifyContent: 'center', // Centra los elementos verticalmente
    width: 120,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  timeText: {
    color: 'black',
    fontSize: 60,
    marginTop: 10,
  },
});

