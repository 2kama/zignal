import { View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import tw from 'twrnc'
import { Button, Input, Text } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { auth, createUserWithEmailAndPassword, updateProfile } from '../firebase'

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ imageURL, setImageUrl ] = useState("")


  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            updateProfile(auth.currentUser!, {
                displayName: name,
                photoURL: imageURL || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            })
        }).catch((error) => {
            console.log(error)
        })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
        headerBackTitle: "Back to Login"
    })
  }, [navigation])


  return (
    <View style={tw`flex-1 items-center justify-center p-2 bg-white`}>
      <Text style={tw`mb-12 text-3xl`}>
        Create a Zignal Account
      </Text>


      <View  style={tw`w-80`}>
        <Input  
          placeholder='Full Name'
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input  
          placeholder='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input  
          placeholder='Password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input  
          placeholder='Profile Picture URL (optional)'
          value={imageURL}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button raised title="Register" onPress={register}  containerStyle={tw`w-60 mt-4 rounded`}  />
    </View>
  )
}

export default RegisterScreen