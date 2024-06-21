import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import { postRequest } from "../../utils/api/api";
import { useNavigation } from "@react-navigation/native";

function Register() {
  const navigation = useNavigation();
  const [registerData, setRegisterData] = useState({
    email: "",
    nickname: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");
  const [nicknameFocused, setNicknameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (field, value) => {
    setRegisterData((prevRegister) => ({
      ...prevRegister,
      [field]: value,
    }));
  };

  // 회원가입 API
  const handleSubmit = async () => {
    if (passwordsMatch) {
      console.log(`회원가입 정보 :  ${JSON.stringify(registerData, null, 2)}`);
      try {
        const response = await postRequest(
          `api/v1/user/auth/signup`,
          registerData
        );
        console.log("회원가입 응답 : ", response);
        if (response.httpStatusCode === 201) {
          navigation.navigate("Login");
        } else {
          Alert.alert(`${response.errorMessage}`);
        }
      } catch (err) {
        console.log("회원가입 에러 : ", err);
      }
    }
  };

  const handleConfirmChange = (text) => {
    setConfirm(text);
    setPasswordsMatch(text === registerData.password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}> Create Account </Text>
      <Text style={styles.infoText}>
        계정을 만들고 편리하게 예약하고, 빠르게 입장하세요!
      </Text>
      <TextInput
        style={[styles.input, nicknameFocused && styles.focusedInput]}
        onChangeText={(text) => handleInputChange("nickname", text)}
        placeholder="닉네임"
        onFocus={() => setNicknameFocused(true)}
        onBlur={() => setNicknameFocused(false)}
      />
      <TextInput
        style={[styles.input, emailFocused && styles.focusedInput]}
        onChangeText={(text) => handleInputChange("email", text)}
        placeholder="이메일"
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
      />
      <TextInput
        style={[styles.input, pwdFocused && styles.focusedInput]}
        secureTextEntry
        onChangeText={(text) => handleInputChange("password", text)}
        placeholder="비밀번호"
        onFocus={() => setPwdFocused(true)}
        onBlur={() => setPwdFocused(false)}
      />
      <TextInput
        style={[styles.input, confirmFocused && styles.focusedInput]}
        secureTextEntry
        onChangeText={handleConfirmChange}
        placeholder="비밀번호 확인"
        onFocus={() => setConfirmFocused(true)}
        onBlur={() => setConfirmFocused(false)}
      />
      {!passwordsMatch && (
        <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnText}> 회원가입 </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFC107",
    marginTop: -100,
    marginBottom: 15,
  },
  infoText: {
    fontWeight: "500",
    marginBottom: 80,
  },
  input: {
    width: "100%",
    padding: 10,
    height: 50,
    margin: 10,
    backgroundColor: "#F7F5F0",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  focusedInput: {
    borderWidth: 1,
  },
  button: {
    marginTop: 40,
    padding: 16,
    width: "100%",
    backgroundColor: "#424242",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  btnText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    alignSelf: "flex-start",
    color: "#f30000",
  },
});

export default Register;
