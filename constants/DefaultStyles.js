import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default StyleSheet.create({
  anwerTitle:{
    fontFamily: "open-sans",
    fontSize: 12,
    padding: 20,
  },
  bodyText: {
    fontFamily: "open-sans",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  card: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    width: "100%",
  },
  cardCount: {
    fontSize: 14,
    color:Colors.fontColor
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   // backgroundColor: Colors.backgroundColor,
  },
  deckTitle: {
  //  fontFamily: "open-sans", // not sure why this is causing an issue when loading
    height: 50,
    paddingTop: 10,
    fontSize: 28,
    fontWeight: "700",
    color:Colors.menuFontColorSelected
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    height: 40,
    paddingLeft: 10,
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
  },
  questionTitle: {
    fontFamily: "open-sans",
    fontSize: 36,
    padding: 20,
  },
  label: {
    fontFamily: "open-sans",
    fontSize: 20,
    padding: 20,
  },
  text: {
    fontFamily: "open-sans",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});
