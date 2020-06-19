import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import DefaultStyles from "../constants/DefaultStyles";

const Quiz = (props) => {
  const { navigation } = props;
  const deckDetails = navigation.getParam("deckDetails");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctCounter, setCorrectCounter] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const len = deckDetails.questions ? eval(deckDetails.questions).length : 0;
  const percent = parseInt((correctCounter * 100) / len);

  const handleCorrectAnswer = () => {
    setCorrectCounter(correctCounter + 1);
    nextQuestion();
  };

  const handleIncorrectAnswer = () => {
    nextQuestion();
  };

  const nextQuestion = () => {
    let next = questionNumber + 1;
    if (next < len) {
      setQuestionNumber(next);
    } else {
      setShowEnd(true);
    }
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleRestarQuiz = () => {
    setQuestionNumber(0);
    setCorrectCounter(0);
    setShowAnswer(false);
    setShowEnd(false);
  };

  const page = () => {
    if (!showAnswer && !showEnd) {
      return (
        <View style={DefaultStyles.container}>
          <Text>
            {questionNumber + 1}/{len}
          </Text>
          <Text style={DefaultStyles.questionTitle}>
            Q: {deckDetails.questions[questionNumber].question}
          </Text>
          <Button
            text="Show Answer"
            type="outlined"
            color={Colors.successColor}
            onPress={handleShowAnswer}
          />
        </View>
      );
    }
    if (showAnswer) {
      return (
        <View style={DefaultStyles.container}>
          <Text>
            {questionNumber + 1}/{len}
          </Text>
          <Text style={DefaultStyles.questionTitle}>
            A: {deckDetails.questions[questionNumber].answer}
          </Text>
          <Button
            text="Correct"
            color={Colors.successColor}
            onPress={handleCorrectAnswer}
          />
          <Button
            text="Incorrect"
            color={Colors.dangerColor}
            onPress={handleIncorrectAnswer}
          />
        </View>
      );
    }
    if (showEnd) {
      return (
        <View style={DefaultStyles.container}>
          <Text style={DefaultStyles.title}>End of Quiz!</Text>
          <Text style={DefaultStyles.label}>
            You got {correctCounter} of {len} correct answers.
          </Text>
          <Text>{percent} %</Text>
          <Button
            text="Restart Quiz"
            type="outlined"
            color={Colors.successColor}
            onPress={handleRestarQuiz}
          />
          <Button
            text="Back to Deck"
            type="outlined"
            color={Colors.primaryColor}
            onPress={() => {
              navigation.navigate("DeckDetail", { deckId: deckDetails.id , add: 0});
            }}
          />
        </View>
      );
    }
  };

  return <View style={DefaultStyles.container}>{page()}</View>;
};

Quiz.navigationOptions = {
  headerTitle: "Quiz",
};

const styles = StyleSheet.create({
  cardCount: {
    color: "lightgray",
    marginBottom: 30,
  },
  button: {
    marginTop: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  text: {
    alignItems: "center",
  },
});

export default Quiz;
