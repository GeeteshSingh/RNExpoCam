import React, { useState, useEffect } from 'react'
import {  Image, View, Platform, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import { Button } from 'react-native-elements'

export default function ImagePickerExample() {
  const [image, setImage] = useState(null)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)

  useEffect(() => {
    ;(async () => {
      const CameraStatus = await Camera.requestPermissionsAsync()
      setHasCameraPermission(CameraStatus.status === 'granted')

      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync()
      setHasCameraPermission(galleryStatus.status === 'granted')
    })()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }
  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text> No access La</Text>
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />
      )}

      <Button title='Pick an image from camera roll' onPress={pickImage}
      type='outline'
      raised />
    </View>
  )
}

//   return (
//     <View style={styles.container}>
//       <Image
//         source={{
//           uri: 'https://mayecreate.com/wp-content/uploads/2018/08/share-posts-featured.jpg'
//         }}
//         style={styles.logo}
//       />
//       <Text style={styles.instructions}>
//         To share a photo from your phone with a friend, just press the button
//         below!
//       </Text>

//       <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
//         <Text style={styles.buttonText}>Pick a photo</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6354ba',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
})
