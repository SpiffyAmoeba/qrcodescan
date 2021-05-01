import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Touchable} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component{

    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }

    getCameraPermissions=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA) 
        this.setState({
            hasCameraPermissions: status==="granted",
            buttonState:'clicked',
            scanned:false
        })
    }

    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;

        if(buttonState==="clicked"&& hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }else if(buttonState==="normal"){
            return(
                <View style={styles.container}> 
                    <Text style={styles.displayText}>
                        {hasCameraPermissions===true ? this.state.scannedData: "request camra permissions"}
                  </Text>
                  <TouchableOpacity
                  onPress={this.getCameraPermissions}
                  style={styles.scanButton}>
                      <Text style={styles.buttonText}>scan qr code</Text>
                  </TouchableOpacity>
                </View> 
            )
        }
        
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text> issue or return </Text>
                <TouchableOpacity
                onPress={this.getCameraPermissions}
                style={styles.scanButton}>
                <Text style={styles.displayText}>{hasCameraPermissions===true? this.state.scannedData:"request camra permissions"}
                 scan qr code</Text> 
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
displayText:{
    fontSize:15
},
scanButton:{
    backgroundColor:"blue",
    padding:10,
    margin:10
},
buttonText:{
    fontSize:20
}
})