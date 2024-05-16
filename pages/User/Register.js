import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";

function Register() {
    const [nickname, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirm, setConfirm] = useState("");

    const [nicknameFocused, setNicknameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [pwdFocused, setPwdFocused] = useState(false);
    const [confirmFocused, setConfirmFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.headText}> Create Account </Text>
            <Text style={styles.infoText}>
                계정을 만들고 편리하게 예약하고, 빠르게 입장하세요!
            </Text>
            <TextInput
                style={[styles.input, nicknameFocused && styles.focusedInput]}
                value={nickname}
                onChangeText={setNickName}
                placeholder="닉네임"
                onFocus={() => setNicknameFocused(true)}
                onBlur={() => setNicknameFocused(false)}
            />
            <TextInput
                style={[styles.input, emailFocused && styles.focusedInput]}
                value={email}
                onChangeText={setEmail}
                placeholder="이메일"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
            />
            <TextInput
                style={[styles.input, pwdFocused && styles.focusedInput]}
                value={pwd}
                secureTextEntry
                onChangeText={setPwd}
                placeholder="비밀번호"
                onFocus={() => setPwdFocused(true)}
                onBlur={() => setPwdFocused(false)}
            />
            <TextInput
                style={[styles.input, confirmFocused && styles.focusedInput]}
                value={confirm}
                secureTextEntry
                onChangeText={setConfirm}
                placeholder="비밀번호 확인"
                onFocus={() => setConfirmFocused(true)}
                onBlur={() => setConfirmFocused(false)}
            />
            <TouchableOpacity style={styles.button}>
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
        marginBottom: 80,
    },
    input: {
        height: 50,
        width: "100%",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F7F5F0",
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
    },
});

export default Register;
