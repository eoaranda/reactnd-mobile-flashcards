import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import DefaultStyles from "../constants/DefaultStyles";
import { addCard } from "../data/api";

const AddCard = (props) => {
  const { navigation } = props;
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [disableSave, setDisableSave] = useState(true);
  const deckId = navigation.getParam("deckId");

  const handleSubmit = () => {
    const newCard = {
      question: question,
      answer: answer,
    };
    addCard(deckId, newCard);
    navigation.navigate("DeckDetail", { add: 1 });
  };

  const handleQuestion = (inputText) => {
    setQuestion(inputText);
  };

  const handleAnswer = (inputText) => {
    setAnswer(inputText);
  };

  const handleButton = () => {
    if (question.length >= 1 && answer.length >= 1) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  };

  useEffect(() => {
    handleButton();
}, [question,answer]);


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
        value={answer}
        onChangeText={handleAnswer}
      />
      <Button
        text="Add Card"
        disabled={disableSave}
        type="outlined"
        color={Colors.successColor}
        onPress={handleSubmit}
      />
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
