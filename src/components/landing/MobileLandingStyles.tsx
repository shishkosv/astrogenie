import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4a0e4e",
    },
    header: {
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 20,
    },
    logo: {
        width: 60,
        height: 60,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: "#ffffff",
        marginBottom: 30,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#ffffff",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: "#4a0e4e",
        fontSize: 18,
        fontWeight: "bold",
    },
});
