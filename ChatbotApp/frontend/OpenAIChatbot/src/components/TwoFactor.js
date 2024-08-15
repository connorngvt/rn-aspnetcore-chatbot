import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { CommonActions } from '@react-navigation/native';

function TwoFactor({ navigation }) {

  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:5284/api/2fa/validate",
        {
          code,
        }
      );

      if (response.status === 200) {
        // navigation.navigate("Chatbot");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Chatbot' }],
          })
        );
      }
    } catch (error) {
      if (error.response && error.response.status == 401) {
        Alert.alert("Invalid code");
      } else {
        Alert.alert("Error interacting with the server");
      }
    }
  };

  const isDisabled = code.length != 6;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>2-step verification</Text>
      <Text style={styles.message}>
        To complete your login, please enter the {"\n"} 6-digit code from your
        authenticator app.
      </Text>
      <TextInput
        autoFocus={true}
        style={styles.input}
        keyboardType="numeric"
        placeholder="123456"
        placeholderTextColor={"#DDDDDD"}
        maxLength={6}
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity 
        style={isDisabled ? styles.disabledsubmitbtn : styles.submitbtn} 
        onPress={handleSubmit}
        disabled={isDisabled}
      >
        <Text style={styles.submitbtntext}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 150,
    color: "#8576FF",
  },
  message: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#021526",
    marginTop: 10,
    marginBottom: 50,
  },
  input: {
    height: 60,
    width: 300,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 8,
    fontSize: 25,
  },
  disabledsubmitbtn: {
    height: 50,
    width: 300,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#B4B4B8",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#B4B4B8",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  submitbtn: {
    height: 50,
    width: 300,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#8576FF",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#8576FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  submitbtntext: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TwoFactor;
