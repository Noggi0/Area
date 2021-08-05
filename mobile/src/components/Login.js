import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Image, Text, Alert } from'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { Fontisto } from '@expo/vector-icons'; 
import Axios from 'axios';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
        }
    }

    isConnected = () => {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            console.log("username: " + this.state.username + ", password: "+ this.state.password);
            Axios.post(`http://10.0.2.2:8080/login?username=${this.state.username}&password=${this.state.password}`).then((response) => {
                if (response.status == 200) {
                    console.log("Welcome " + this.state.username + " !");
                    this.props.navigation.navigate("Home");
                } else {
                    Alert.alert("Wrong Username and/or Password");
                }
            }).catch(function(error) {
                Alert.alert("Wrong Username and/or Password");
                console.log(error);
            });  
        }
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={{backgroundColor:"#FFF",height:"100%"}}>
                <Image source={require('../images/logo.png')}
                    style={{...styles.logo}}
                />

                <View style={{...styles.textInput}}>
                    <Icon name="user" color="#3699d5" size={24}/>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#3699d5"
                        style={{paddingHorizontal:10}}
                        onChangeText={text => this.setState({username: text})}
                    />
                </View>

                <View style={{...styles.textInput}}>
                    <Fontisto name="user-secret" color="#3699d5" size={24}/>
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor="#3699d5"
                        style={{paddingHorizontal:10}}
                        onChangeText={text => this.setState({password: text})}
                    />
                </View>

                <View
                onStartShouldSetResponder={() => this.isConnected()}
                style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#3699d5",
                    paddingVertical:10,
                    borderRadius:23
                }}>
                    <Text
                    style={{
                        color:"white",
                        fontFamily:"SemiBold"
                    }}>Login</Text>
                </View>

                <Text    
                onPress={()=>navigate('Register')}
                
                style={{
                    alignSelf:"center",
                    color:"#3699d5",
                    fontFamily:"SemiBold",
                    paddingVertical:30
                }}>Register</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: '32%',
        height: '20%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '25%'
    },
    textInput: {
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:55,
        borderWidth:2,
        marginTop:20,
        paddingHorizontal:10,
        borderColor:"#3699d5",
        borderRadius:23,
        paddingVertical:2
    }
});