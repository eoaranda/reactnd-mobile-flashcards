import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import DefaultStyles from "../constants/DefaultStyles";
import { removeDeck, getDeckData } from "../data/api";

const DeckDetail = (props) => {
  const { navigation } = props;
  const [deckDetails, setDeckDetails] = useState("");


  const deckId = navigation.getParam("deckId");
  const add = navigation.getParam("add") !== undefined ? navigation.getParam("add") : 0;
  const title = deckDetails.title; // navigation.getParam("title");
  const questions = deckDetails.questions; //navigation.getParam("questions");
  let len = add ? add : 0;
  len +=  questions ? eval(questions).length : 0;

  const handleStartQuiz = async () => {
    if (len == 0) {
      Alert.alert(
        "Error",
        "Empty deck, add at least 1 question.",
        [{ text: "OK" }],
        { cancelable: true }
      );
    } else {
      let deckDetails = await getDeckData(deckId);
      navigation.navigate("Quiz", { deckDetails });
    }
  };

  const handleDeleteDeck = () => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this deck ? (Note: default decks will load after restarting the App) ",
      [
        {
          text: "Cancel",
        },
        { text: "YES", onPress: () => deleteDeck() },
      ],
      { cancelable: false }
    );
  };

  const deleteDeck = () => {
    removeDeck(deckId);
    navigation.navigate("DeckList");
  };

  const loadDeckData = async () => {
    let deck = await getDeckData(deckId);
    setDeckDetails(deck);
  };

  useEffect(() => {
      //clearAll();
      loadDeckData(deckId);

  }, [navigation]);

  return (
    <View style={DefaultStyles.container}>
      <View style={DefaultStyles.text}>
        <Text style={DefaultStyles.deckTitle}>{title}</Text>
        <Text style={DefaultStyles.cardCount}>
          {len} card
          {len === 0 || len === 1 ? "" : "s"}
        </Text>
      </View>

      <Button
        text="Add Card"
        type="outlined"
        color={Colors.successColor}
        onPress={() => {
          navigation.navigate("AddCard", { deckId, title });
        }}
      />

      <Button
        text="Start Quiz"
        type="outlined"
        color={Colors.primaryColor}
        onPress={handleStartQuiz}
      />

      <View style={DefaultStyles.bottom}>
        <Button
          text="Delete Deck"
          type="outlined"
          color={Colors.dangerColor}
          onPress={handleDeleteDeck}
        />
      </View>
    </View>
  );
};

DeckDetail.navigationOptions = {
  headerTitle: "Deck Details",
};

export default DeckDetail;
