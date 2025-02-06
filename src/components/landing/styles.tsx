import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#ffffff",
    },
    logo: {
        width: 40,
        height: 40,
    },
    nav: {
        flexDirection: "row",
    },
    navItem: {
        marginLeft: 20,
        color: "#333",
        fontSize: 16,
    },
    hero: {
        alignItems: "center",
        padding: 50,
        backgroundColor: "#4a0e4e",
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 18,
        color: "#ffffff",
        marginBottom: 30,
    },
    downloadButtons: {
        flexDirection: "row",
    },
    button: {
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: "#4a0e4e",
        fontSize: 16,
        fontWeight: "bold",
    },
    features: {
        padding: 50,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    featureList: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    featureItem: {
        width: "30%",
        alignItems: "center",
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    featureDescription: {
        textAlign: "center",
        color: "#666",
    },
    footer: {
        backgroundColor: "#333",
        padding: 20,
        alignItems: "center",
    },
    footerText: {
        color: "#ffffff",
    },
});


