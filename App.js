import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screeens/HomeScreen';
import ModelScreen from './src/screeens/ModelScreen';
import ModelDescriptionScreen from './src/screeens/ModelDescriptionScreen';


const Stack = createNativeStackNavigator();

const App = () => {

  const backButton = navigation => (
    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
      <View style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Image source={require('./src/assets/icon/Component14–12.png')} style={{ width: 33, height: 33 }} />
        <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Back</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Picture">
        <Stack.Screen
          name="Picture"
          component={HomeScreen}
          options={{
            headerTitle: 'Picture',
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: 'bold',
              fontFamily: 'OpenSans-bold',
              marginLeft: 7

            },
            headerStyle: {
              backgroundColor: '#DEDEDE',
            },
            headerRight: () => (
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Image source={require('./src/assets/icon/transaction-icon-gray.png')} style={{ width: 26, height: 26 }} />
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Proccess</Text>
              </View>
            ),

            navigationOptions: ({ navigation }) => ({
              headerLeft: backButton(navigation)
            }),
            headerLeft: () => (
              <View style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Image source={require('./src/assets/icon/Component14–12.png')} style={{ width: 33, height: 33 }} />
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Back</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ModelScreen"
          component={ModelScreen}
          options={{

            headerTitle: 'Model',
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: 'bold'
            },
            headerStyle: {
              backgroundColor: '#DEDEDE',
            },

            // headerLeft: () => (
            //   <TouchableOpacity onPress={() => { navigation.pop() }} style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            //     <Image source={require('./src/assets/icon/Component14–12.png')} style={{ width: 33, height: 33 }} />
            //     <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Back</Text>
            //   </TouchableOpacity>
            // ),

          }}
        />

        <Stack.Screen
          name="ModelDescriptionScreen"
          component={ModelDescriptionScreen}
          options={{

            headerTitle: 'Model Details',
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: 'bold'
            },
            headerStyle: {
              backgroundColor: '#DEDEDE',
            },
            // headerLeft: () => (
            //   <TouchableOpacity
            //     style={{ marginRight: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            //     onPress={() => navigation.navigate(ModelScreen)}
            //   >
            //     <Image source={require('./src/assets/icon/Component14–12.png')} style={{ width: 33, height: 33 }} />
            //     <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Back</Text>
            //   </TouchableOpacity>
            // ),
            headerRight: () => (
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: "#FFF", width: 59, height: 28, borderRadius: 15, borderWidth: 1, borderColor: '#707070' }}>
                <Image source={require('./src/assets/icon/edit-icon.png')} style={{ width: 18, height: 18 }} />
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Edit</Text>
              </View>
            ),
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({ custom: {}, });
export default App;
