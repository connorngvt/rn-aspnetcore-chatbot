import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Chatbot from "./src/components/Chatbot";
import LoginPage from "./src/components/LoginPage";
import TwoFactor from "./src/components/TwoFactor";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [authorized, setAuthorized] = useState(false);

  // const handleAuthorization = (status) => {
  //   setAuthorized(status);
  // };

  return (
    // <View style={styles.container}>
    //   {authorized ? <Chatbot /> : <LoginPage onLogin={handleAuthorization} />}
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="TwoFactor" component={TwoFactor} options={{ headerShown: false }} />
        <Stack.Screen name="Chatbot" component={Chatbot} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
