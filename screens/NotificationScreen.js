import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class NotificationScreen extends React.Component{
    constructor(){
    super();
    this.state={
        allNotifications : [],
        userId:firebase.auth().currentUser.email
    }
   }
    getNotifications=()=>{
     db.collection("all_notifications").where("notification_status","==","unread")
     .where("targeted_user_id","==",this.state.userId).get()
         .onSnapShot((snapshot)=>{
          var allNotification = []
          snapshot.docs.map((doc)=>{
            var notification = doc.data()
            notification["doc_id"] = doc.id
            allNotification.push(notification)
          })
          this.setState({
              allNotifications:[...this.state.allNotifications,allNotification]
          })
         })

     
    }

    renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.targeted_user_id}
            subtitle={item.item_name}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            
              bottomDivider
          />
        )
      }

    render(){
        return(
          
           <View style={{flex:1, backgroundColor:"#ffd191"}}>

                <MyHeader title="NOTIFICATIONS" navigation={this.props.navigation}/>

            <View style={{flex:1}}>
          
              {
                this.state.allNotifications.length === 0
                ?(
                  <View style={styles.container}>
                    <Text style={{ fontSize: 20, textAlign:'center', color:'#ffa500', fontWeight: "bold"}}>You Have No Notifications</Text>
                  </View>
                )
                :(
                
              
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                  />
                 
                )
              }
            </View>
          </View>
          
        )
    }
}

const styles = StyleSheet.create({
     
    }
  )