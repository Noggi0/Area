import React from 'react';
import { Text, View, Image, StyleSheet, TextInput, Alert } from'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import Axios from 'axios';

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            confirmPassword: null,
        }
    }

    isRegistered = () => {
        if (this.state.username.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0) {
            if (this.state.password != this.state.confirmPassword) {
                Alert.alert("The two passwords are different");
            } else {
                console.log("User: "+ this.state.username + ", Password: "+ this.state.password)
                Axios.post(`http://10.0.2.2:8080/register?username=${this.state.username}&password=${this.state.password}`).then((response) => {
                    console.log(response);
                    this.props.navigation.navigate("Login");
                }).catch(function(error) {
                    console.log(error);
                });
            }
        } else
            Alert.alert("One or more of the entries are not completed");
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={{backgroundColor:"#FFF",height:"100%"}}>
                <View>
                    <Icon
                    onPress={()=>navigate('Login')}
                    name="back" color="#3699d5" size={30} 
                    style={{marginLeft: 20, marginTop: 40}}/>
                </View>

                <Image source={require('../images/logo.png')}
                    style={{...styles.logo}}
                />

                <View style={{...styles.textInput}}>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#3699d5"
                        style={{paddingHorizontal:10}}
                        onChangeText={text => this.setState({username: text})}
                    />
                </View>

                <View style={{...styles.textInput}}>
                   <TextInput
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor="#3699d5"
                        style={{paddingHorizontal:10}}
                        onChangeText={text => this.setState({password: text})}
                    />
                </View>

                <View style={{...styles.textInput}}>
                   <TextInput
                        secureTextEntry
                        placeholder="Confirm Password"
                        placeholderTextColor="#3699d5"
                        style={{paddingHorizontal:10}}
                        onChangeText={text => this.setState({confirmPassword: text})}
                    />
                </View>

                <View onStartShouldSetResponder={()=>this.isRegistered()}
                style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#3699d5",
                    paddingVertical:10,
                    borderRadius:23
                }}>
                    <Text style={{
                        color:"white",
                        fontFamily:"SemiBold"
                    }}>Register</Text>
                </View>
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
        marginTop: '5%'
    },
    textInput: {
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:55,
        borderWidth:2,
        marginTop:15,
        paddingHorizontal:10,
        borderColor:"#3699d5",
        borderRadius:23,
        paddingVertical:2
    }
});