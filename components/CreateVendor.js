import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert, Modal, TextInput } from 'react-native';

const styles = StyleSheet.create({
    openModal:{
        padding: 10,
        fontSize:14,
        color:"#fff",
        backgroundColor:"#000"
    }
})

// const [value, onChangeText] = React.useState('Useless Placeholder');

class CreateVendor extends Component{
    constructor (props) {
        super (props)
        this.state = {
            modalVisible: false,
            inputValues:{
                name:"",
                phoneNumber:"",
                PAN:"",
                paymentMode:""
            }
        }
    }

    componentDidMount () {

    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    submitModal (visible) {
        this.setState({modalVisible: visible});
        const validForm = this.state.inputValues;
        if (validForm.name === "" || 
            validForm.number === "" || 
            validForm.pan === "" || 
            validForm.payment === "") {
            return alert("fill the inputs");    
        }else{
            this.formSubmitService();
        }
    }

    formSubmitService() {
        const data = this.state.inputValues;
        console.log(data)
        fetch('http://192.168.1.186:3000/vendor', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then ( resp => resp.json())
        .then ( result => {
            console.log(result)
            this.setState({modalVisible: visible});
        }, error => {
            console.log(error)
            this.setState({modalVisible: visible});
        })
    }

    onChangeFunction = (keyName,value) => {
        console.log(keyName,value)
        this.setState(prevState => ({
            inputValues: {                   // object that we want to update
                ...prevState.inputValues,    // keep all other key-value pairs
                keyName: value       // update the value of specific key
            }
        }))

    }

    render () {
        return (
            <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.setState(prevState => ({
                inputValues: {                   // object that we want to update
                    ...prevState.inputValues,    // keep all other key-value pairs
                    name: text       // update the value of specific key
                }
            }))}
            value={this.state.inputValues.name}
            placeholder="Name"
            name="name"
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.setState(prevState => ({
                inputValues: {                   // object that we want to update
                    ...prevState.inputValues,    // keep all other key-value pairs
                    phoneNumber: text       // update the value of specific key
                }
            }))}
            value={this.state.inputValues.phoneNumber}
            placeholder="Mobile number"
            name="phoneNumber"
            />
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.setState(prevState => ({
                inputValues: {                   // object that we want to update
                    ...prevState.inputValues,    // keep all other key-value pairs
                    PAN: text       // update the value of specific key
                }
            }))}
            value={this.state.inputValues.PAN}
            placeholder="PAN"
            />
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => this.setState(prevState => ({
                inputValues: {                   // object that we want to update
                    ...prevState.inputValues,    // keep all other key-value pairs
                    paymentMode: text       // update the value of specific key
                }
            }))}
            value={this.state.inputValues.paymentMode}
            placeholder="payment mode"
            name="paymentMode"
            />
              <TouchableHighlight
                onPress={() => {
                  this.submitModal(!this.state.modalVisible);
                }}>
                <Text style={styles.openModal}>Submit</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.openModal}>Cancel</Text>
                </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.openModal}>Create</Text>
        </TouchableHighlight>
      </View>
        )
    }   
}

export default CreateVendor;