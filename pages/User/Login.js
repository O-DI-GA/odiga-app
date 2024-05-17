import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function Login() {
  const navigation = useNavigation();
  const [emailBorderColor, setEmailBorderColor] = useState("#ccc");
  const [passwordBorderColor, setPasswordBorderColor] = useState("#ccc");

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login here</Text>
      <Text style={styles.welcomeText}>돌아오신 것을 환영합니다!</Text>
      <TextInput
        style={[styles.input, { borderColor: emailBorderColor }]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#626262"
        onFocus={() => setEmailBorderColor("#424242")}
        onBlur={() => setEmailBorderColor("#cccccc")}
      />
      <TextInput
        style={[styles.input, { borderColor: passwordBorderColor }]}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#626262"
        onFocus={() => setPasswordBorderColor("#424242")}
        onBlur={() => setPasswordBorderColor("#cccccc")}
      />
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>
          비밀번호를 잊어버리셨나요?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.createAccountText}
          onPress={() => navigation.navigate("Register")}
        >
          계정 만들기
        </Text>
      </TouchableOpacity>
      <Text style={styles.OAuthText}>Or continue with</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFC107",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 100,
  },
  input: {
    width: "100%",
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    backgroundColor: "#f7f5f0",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  loginButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#424242",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "#FFC107",
    marginVertical: 10,
  },
  createAccountText: {
    color: "#494949",
    marginVertical: 10,
    marginBottom: 80,
  },
  OAuthText: {
    color: "#FFC107",
    fontSize: 16,
  },
});

export default Login;
