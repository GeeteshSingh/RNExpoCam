import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View,  Image } from 'react-native'
import { Camera } from 'expo-camera'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'expo-status-bar'
import {  SafeAreaProvider } from 'react-native-safe-area-context'
import { usePreventScreenCapture } from 'expo-screen-capture'

import { Button } from 'react-native-elements'


//component
import ImagePickerExample from './Gallery/Photos'
// import Wallpaper from './Gallery/joker'

function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null)
  const [camero, setCamero] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if(camero) {
      const data = await camero.takePictureAsync(null)
      console.log(data.uri);
      setImage(data.uri);
    }
  }

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.CameraContainer}>
          <Camera
            ref={ref => setCamero(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio={'1:1'}
          />
        </View>
        <View style={styles.camera}>
          <Button
            // style={styles.button}
            title='flip'
            type='outline'
            raised
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }}
          />
          <Button title='take picture' onPress={() => takePicture()} type='outline' raised />
          {image && <Image source={{uri: image }} style={styles.camera} />}
        </View>
        <StatusBar style='dark' />
      </View>
    </SafeAreaProvider>
  )
}
const Tab = createBottomTabNavigator()

export default function App() {
  usePreventScreenCapture()
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline'
            } else if (route.name === 'Camera') {
              iconName = focused ? 'md-camera-sharp' : 'md-camera-outline'
            } else if (route.name === 'Wallpaper') {
              iconName = focused ? 'md-image' : 'md-image-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          }
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen name='Home' component={ImagePickerExample} />
        <Tab.Screen name='Camera' component={CameraScreen} />
        {/* <Tab.Screen name='Wallpaper' component={Wallpaper} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6354ba'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  camera: {
    flex: 1
  },
  CameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: 'white'
  }
})
