import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import DefaultStyles from "../constants/DefaultStyles";
import { uuidv4 } from "../utils/helpers";
import { saveDeck } from "../data/api";

const AddDeck = (props) => {
  const { navigation } = props;
  const [enteredDeck, setEnteredDeckTitle] = useState("");

  const deckInputHandler = (inputText) => {
    setEnteredDeckTitle(inputText);
  };

  const handleSubmit = () => {
    const title = enteredDeck;
    if (title) {
      const questions = [];
      const deckId = uuidv4();
      const newDeck = { id: deckId, title: title, questions: questions };
      saveDeck(newDeck);
      setEnteredDeckTitle("");
      navigation.navigate("DeckDetail", { deckId });
    } else {
      Alert.alert(
        "Error",
        "Can't create a deck without a name.",
        [{ text: "OK" }],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={DefaultStyles.container}>
      <Text style={DefaultStyles.label}>
        What is the title of your new deck?
      </Text>
      <TextInput
        style={DefaultStyles.input}
        value={enteredDeck}
        onChangeText={deckInputHandler}
      />
      <Button
        text="Save Deck"
        type="outlined"
        color={Colors.successColor}
        onPress={handleSubmit}
      />
    </View>
  );
};

AddDeck.navigationOptions = {
  headerTitle: "Mobile Flash Cards",
};

export default AddDeck;
