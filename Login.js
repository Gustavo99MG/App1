import React, { Component } from 'react';
import { View, Text, ImageBackground, Audio, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Input, Icon } from '@rneui/base';
import Animated from 'react-native-reanimated';
import axios from 'axios';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        siono:0,
        mueve:0,
        correo:"",
        password:"",
    };
  }

  render() {
    // const navigation = useNavigation();
    const Login = () =>{
      this.interval = setInterval(() => {
        // console.log('Interval triggered');
        this.setState({mueve:this.state.mueve-9})
        // console.log(this.state.mueve);
        if(this.state.mueve < -790){
          this.setState({siono:1})
          clearInterval(this.interval);
        }
      }, 1);
      //this.setState({siono:1})
  }
  const Alta = () =>{
    this.interval1 = setInterval(() => {
     // console.log('Interval triggered');
      this.setState({mueve:this.state.mueve-9})
    //  console.log(this.state.mueve);
      if(this.state.mueve < -790){
        this.setState({siono:2})
        clearInterval(this.interval1);
      }
    }, 1);
    }
    const regresa = () => {
      this.interval3 = setInterval(() => {
       // console.log('Interval triggered');
        this.setState({mueve:this.state.mueve+9})
      //  console.log(this.state.mueve);
        if(this.state.mueve > -5){
        
          clearInterval(this.interval3);
        }
        if(this.state.mueve < 600){
          this.setState({siono:4})
          
        }
      }, 1);

    }
    const entrar = () =>{
      let _this =this;
      axios.get('https://cuceimobile1.000webhostapp.com/login.php?correo='+this.state.correo+'&password='+this.state.password)
  .then(function (response) {
    // manejar respuesta exitosa
    // console.log(response.data);
    
    if(response.data == "0"){
      Alert.alert('Error!!', 'Password Errorneo , intenta de nuevo', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else if(response.data == "3"){
      Alert.alert('Error!!', 'No se encontro, Registrate', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else {
         _this.props.navigation.navigate("Usuario",{nombre:response.data});
      }
    
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  })
  .finally(function () {
    // siempre sera executado
  });
    }
    return (
      <View>
       <ImageBackground source={require('./Imagenes/fondo.jpg')}
       style={{width:600,height:1000}}>
   
   <Animated.View
      style={{
        width: 600,
        height: 900,
        backgroundColor: 'transparent',
        position:"absolute"
      }}
    >
      <TouchableOpacity onPress={regresa}>
  <Image source={require('./Imagenes/cortina.jpg')}
  style={{width:600,
          height:1000,
          marginTop:this.state.mueve,
  }}
  ></Image>
  </TouchableOpacity>
  </Animated.View>  

              <Button
              title="Login"
              icon={{
                name: 'user',
                type: 'font-awesome',
                size: 25,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(90, 154, 230, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginTop:550,
                marginLeft:100,
              }} onPress={Login}
            />
            <Button
              title="Alta"
              icon={{
                name: 'user-plus',
                type: 'font-awesome',
                size: 25,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(199, 43, 98, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
               marginLeft:100,
               marginTop:30,
              }} onPress={Alta}
            />
         {this.state.siono === 1?<View>
           <View style={{marginTop:-600,}}>
            <Input
      placeholder='Correo'
      placeholderTextColor={"red"}
      onChangeText={var1 => this.setState({correo:var1})}
      leftIcon={
        <Icon
          name='envelope'
          size={24}
          color='white'
          type='font-awesome'
        />
      }style={{color:'white'}}
    />
    <Input
      placeholder='Password'
      placeholderTextColor={"red"}
      onChangeText={var1 => this.setState({password:var1})}
      leftIcon={
        <Icon
          name='lock'
          size={24}
          color='white'
          type='font-awesome'
        />
      } style={{color:'white'}}
      secureTextEntry={true}
    />
    <View style={{width:200,height:80,marginLeft:100}}>
    <Button radius={"sm"} type="solid" onPress={entrar}>
  Entrar
  <Icon name="arrow-right" color="white" />
</Button></View>
</View>
         </View>:null}

         {this.state.siono === 2?<View>
              <View style={{marginTop:-500}}>
              <Input
      placeholder='Correo'
      placeholderTextColor={"red"}
      leftIcon={
        <Icon
          name='envelope'
          size={24}
          color='white'
          type='font-awesome'
        />
      }style={{color:'white'}}
    />
    <Input
      placeholder='Nombre'
      placeholderTextColor={"red"}
      leftIcon={
        <Icon
          name='user'
          size={24}
          color='white'
          type='font-awesome'
        />
      }style={{color:'white'}}
    />
    <Input
      placeholder='Password'
      placeholderTextColor={"red"} 
      leftIcon={
        <Icon
          name='lock'
          size={24}
          color='white'
          type='font-awesome'
        />
      }style={{color:'white'}}
    />
    <Input
      placeholder='Telefono'
      placeholderTextColor={"red"}
      leftIcon={
        <Icon
          name='mobile'
          size={24}
          color='white'
          type='font-awesome'
        />
      }style={{color:'white'}}
    />
              </View>

         </View>:null}
        </ImageBackground>
      </View>
    );
  }
}
