import { StyleSheet, View, Text, ScrollView } from "react-native";
import React from "react";

export default function ShopHome() {
    return (
        <ScrollView>
            <View style={styles.stateView}>
                <View style={styles.stateContainer}>
                    <Text style={styles.stateName}> 웨이팅 현황 </Text>
                    <Text style={styles.state}> 29팀 </Text>
                </View>
                <View style={styles.stateContainer}>
                    <Text style={styles.stateName}> 빈 테이블 현황 </Text>
                    <Text style={styles.state}> 0 테이블 </Text>
                </View>
            </View>
            <View style={styles.homeContainer}>
                <View style={styles.homeInfo}>
                    <Text style={styles.infoName}> 전체 테이블 수 </Text>
                    <Text style={styles.info}>20개 </Text>
                </View>
                <View style={styles.homeInfo}>
                    <Text style={styles.infoName}> 운영시간 </Text>
                    <Text style={styles.info}>
                        월 9:00 ~ 20:00{"\n"}화 9:00 ~ 20:00{"\n"}수 9:00 ~
                        20:00
                        {"\n"}목 9:00 ~ 20:00{"\n"}금 9:00 ~ 20:00{"\n"}토 9:00
                        ~ 20:00
                    </Text>
                </View>
                <View style={styles.homeInfo}>
                    <Text style={styles.infoName}> 휴무일 </Text>
                    <Text style={styles.info}>일 </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    stateView: {
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginBottom: 90,
    },
    stateContainer: {
        alignItems: "center",
        gap: 20,
    },
    stateName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    state: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FF9900",
    },
    homeContainer: {
        flex: 1,
        gap: 30,
        marginBottom: 30,
    },
    homeInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    infoName: {
        flex: 1,
        fontSize: 15,
        fontWeight: "bold",
    },
    info: {
        flex: 1,
        fontSize: 15,
    },
});
