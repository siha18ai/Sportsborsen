import * as React from 'react';
import firebase from 'firebase';
import {
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet, Image,
} from 'react-native';
import TitleLayout from "../Layout/TitleLayout";
import {Buttons} from "../Buttons";

const Sportsbørsen = require("../../assets/Sportsbørsen.png");

export default class SignUpView extends React.Component {

    state= {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    setError = errorMessage => this.setState({errorMessage});
    clearError = () => this.setState({errorMessage: null});
    startLoading = () => this.setState({isLoading: true});
    endLoading = () => this.setState({isLoading: false});

    handleChangeEmail = email => this.setState({email});
    handleChangePassword = password => this.setState({password});


    render = () => {
        const { email, password, errorMessage } = this.state;
        return(
            <View style={styles.Container}>
                <Image source={Sportsbørsen} style={styles.image}/>
            <View style={styles.insideContainer}>
                <TextInput placeholder={"email"} value={email} onChangeText={this.handleChangeEmail}
                style={styles.textInput}/>
                <TextInput placeholder={"password"} value={password} onChangeText={this.handleChangePassword}
                secureTextEntry
                style={styles.textInput}/>
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage} </Text>
                )}
                {this.renderButton()}
            </View>
        </View>
        )
    };

    handleSubmit = async () => {
        const {email, password} = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
            //Debug nye user i console
            console.log(result);
            this.endLoading();
            this.setState({isCompleted: true});
        } catch (e) {
            this.setError(e.message);
            this.endLoading();
        }
    };

    renderButton = () => {
        const {isLoading} = this.state;
        if (isLoading) {
            return <ActivityIndicator/>
        }
        return <Buttons onPress={this.handleSubmit} text="Sign Up"/>

    }

}
/*Styles*/
const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    insideContainer:{
        minWidth:'80%'
    },
    error: {
        color: 'red',
    },
    textInput: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 20,
    },
});