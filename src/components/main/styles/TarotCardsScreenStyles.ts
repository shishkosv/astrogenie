import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  cardItem: {
    width: "30%",
    aspectRatio: 0.6,
    marginBottom: 20,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  cardName: {
    marginTop: 5,
    textAlign: "center",
  },
})

