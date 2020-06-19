import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import DefaultStyles from "../constants/DefaultStyles";
import { addCard } from "../data/api";

const AddCard = (props) => {
  const { navigation } = props;
  const [anwser, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  const deckId = navigation.getParam("deckId");

  const handleSubmit = () => {
      const newCard = {
        question: question,
        answer: anwser,
      };
      addCard(deckId, newCard);
      navigation.navigate("DeckDetail", { add: 1});
  };

  const handleQuestion = (inputText) => {
    setQuestion(inputText);
  };

  const handleAnswer = (inputText) => {
    setAnswer(inputText);
  };


  return (
    <View style={DefaultStyles.container}>
      <Text style={DefaultStyles.label}>Question: </Text>
      <TextInput
        style={DefaultStyles.input}
        value={question}
        onChangeText={handleQuestion}
        autoFocus={true}
      />
      <Text style={DefaultStyles.label}>Answer: </Text>
      <TextInput
        style={DefaultStyles.input}
        value={anwser}
        onChangeText={handleAnswer}
      />
      <Button text="Add Card" type="outlined" color={Colors.successColor} onPress={handleSubmit} />
    </View>
  );
};

AddCard.navigationOptions = (navigationData) => {
  const { navigation } = navigationData;
  const title = navigation.getParam("title");

  return {
    headerTitle: title + " - Add cards",
  };
};

const styles = StyleSheet.create({
  sectionInput: {
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    height: 40,
    paddingLeft: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default AddCard;
