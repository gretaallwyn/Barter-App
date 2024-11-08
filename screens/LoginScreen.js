import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends React.Component
{
    constructor(){
        super();
        this.state={
          emailId:'',
          password:'',
          firstName:'',
          lastName:'',
          address:'',
          contact:'',
          confirmPassword:'',
          isModalVisible:'false'
        }
      }
    
      userSignUp = (emailId, password,confirmPassword) =>{
       if(password !== confirmPassword){
           return Alert.alert("password doesn't match\nCheck your password.")
       }else{
         firebase.auth().createUserWithEmailAndPassword(emailId, password)
         .then(()=>{
           db.collection('users').add({
             first_name:this.state.firstName,
             last_name:this.state.lastName,
             contact:this.state.contact,
             email_id:this.state.emailId,
             address:this.state.address,
             password:this.state.password
           })
           return  Alert.alert(
                'User Added Successfully',
                '',
                [
                  {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                ]
            );
         })
         .catch((error)=> {
           // Handle Errors here.
           var errorCode = error.code;
           var errorMessage = error.message;
           return Alert.alert(errorMessage)
         });
       }
     }
    
    userLogin = (emailId, password)=>{
       firebase.auth().signInWithEmailAndPassword(emailId, password)
       .then(()=>{
         this.props.navigation.navigate('HomeScreen')
       })
       .catch((error)=> {
         var errorCode = error.code;
         var errorMessage = error.message;
         return Alert.alert(errorMessage)
       })
     }

     updateBarterStatus=()=>{
  db.collection('all_Barters').add({
    item_name           : this.state.itemName,
    exchange_id          : this.state.exchangeId,
    requested_by        : this.state.receiverName,
    donor_id            : this.state.userId,
    request_status      :  "Donor Interested"
  })
}



  addNotification=()=>{
    console.log("in the function ",this.state.rec)
    var message = this.state.userName + " has shown interest in exchanging the item"
    db.collection("all_notifications").add({
      "targeted_user_id"    : this.state.receiverId,
      "donor_id"            : this.state.userId,
      "exchangeId"          : this.state.exchangeId,
      "item_name"           : this.state.itemName,
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status" : "unread",
      "message"             : message
    })
  }
    
    showModal = ()=>{
      return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
        >
        <View style={styles.modalContainer}>
          <ScrollView style={{width:'100%'}}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
            <Text
              style={styles.modalTitle}
              >Registration</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"First Name"}
              maxLength ={8}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Last Name"}
              maxLength ={8}
              onChangeText={(text)=>{
                this.setState({
                  lastName: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Contact"}
              maxLength ={10}
              keyboardType={'numeric'}
              onChangeText={(text)=>{
                this.setState({
                  contact: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Address"}
              multiline = {true}
              onChangeText={(text)=>{
                this.setState({
                  address: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Email"}
              keyboardType ={'email-address'}
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
            /><TextInput
              style={styles.formTextInput}
              placeholder ={"Password"}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            /><TextInput
              style={styles.formTextInput}
              placeholder ={"Confirm Password"}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  confirmPassword: text
                })
              }}
            />
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={()=>
                  this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                }
              >
              <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBackButton}>
              <TouchableOpacity
              style={styles.cancelButton}
                onPress={()=>this.setState({"isModalVisible":false})}
              >
              <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
    }
    render()
    {
        return(
            <View style={styles.container}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>

            </View>
                {
                     this.showModal()
                 }
           <View style={styles.profileContainer}>
               <Text style={styles.title}>BARTER SYSTEM</Text>
           </View>
            <View style={styles.buttonContainer}>

                <TextInput
                style={styles.loginBox}
                placeholder='USERNAME'
                keyboardType='email-address'
                placeholderTextColor='#ffa500'
                onChangeText={(text)=>
                {
                    this.setState({emailId:text})
                }}
                />
                

                <TextInput
                style={styles.loginBox}
                placeholder='PASSWORD'
                placeholderTextColor='#ffa500'
                secureTextEntry={true}
                onChangeText={(text)=>
                {
                    this.setState({password:text})
                }}
                />
                <TouchableOpacity
                style={[styles.button,{marginBottom:20,marginTop:20}]}
                onPress={()=>
                {
                    this.userLogin(this.state.emailId,this.state.password);
                    
                }}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={()=>
                {
                    this.setState({isModalVisible:true})
                    
                }}
                >
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#ffd191',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'bold',
     paddingBottom:30,
     marginLeft:35,
     color : '#ffa500'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#cc8400',
     fontSize: 20,
     margin:10,
     paddingLeft:10,
     fontWeight:'bold'
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#ffffff',
     borderColor:'black',
   },
   modalTitle :{
     justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ffa500',
   margin:30,
   fontWeight:'bold',
   textDecorationLine:'underline',
   },
   modalContainer:{
     flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'black',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:20,
     backgroundColor:'#f19900'
   },
   cancelButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:20,
    backgroundColor:'#f19900'
  },
   registerButtonText:{
     color:'#fff',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButtonText:{
    color:'#fff',
    fontSize:15,
    fontWeight:'bold'
  },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#f19900",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'bold',
     fontSize:20
   }
  })
