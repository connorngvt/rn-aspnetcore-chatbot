import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:5284/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        navigation.navigate("TwoFactor");
      }
    } catch (error) {
      if (error.response && error.response.status == 401) {
        Alert.alert("Invalid username or password");
      } else {
        Alert.alert("Error interacting with the server");
      }
    }
  };

  const isDisabled = !username || !password;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Here</Text>
      <Text style={styles.message}>Welcome back you've{"\n"} been missed!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={isDisabled ? styles.disabledloginbtn : styles.loginbtn}
        onPress={handleLogin}
        disabled={isDisabled}
      >
        <Text style={styles.loginbtntxt}>Login</Text>
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
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 120,
    color: "#8576FF",
  },
  message: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#021526",
    marginTop: 15,
    marginBottom: 50,
  },
  input: {
    height: 50,
    width: 300,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  disabledloginbtn: {
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
  loginbtn: {
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
  loginbtntxt: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LoginPage;
