import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { getDecks, clearAll, loadDefaultDeck } from "../data/api";
import DefaultStyles from "../constants/DefaultStyles";
import Button from "../components/Button";
import Colors from "../constants/Colors";

const DeckList = (props) => {
  const { navigation } = props;
  const [decksList, setDecksList] = useState("");
  const [loading, setLoading] = useState(true);

  // delete this after everything works
  const loadSampleData = async () => {
    let decks = await loadDefaultDeck();
    setDecksList(decks);
  };

  const getInitialData = async () => {
    let decks = Object.values(await getDecks());
    if (decks !== undefined) {
      setDecksList(decks);
      setLoading(false);
    }
  };

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
     //clearAll();
     getInitialData();
    }

    return () => {
      didCancel = true;
    };
  }, [decksList]);

  const renderDecks = (itemData) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          style={DefaultStyles.card}
          onPress={() => {
            navigation.navigate("DeckDetail", {
              deckId: itemData.item.id
            });
          }}
        >
          <View>
            <Text style={DefaultStyles.deckTitle}>{itemData.item.title}</Text>
            <Text style={DefaultStyles.cardCount}>
              {itemData.item.questions.length} Card
              {itemData.item.questions.length === 0 ||
              itemData.item.questions.length === 1
                ? ""
                : "s"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  let page;

  if (loading == true) {
    page = (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (decksList == null || decksList.length == 0) {
    page = (
      <View>
        <Text>Welcome, you have no deck.</Text>
        <Button
          text="Load Sample Data"
          type="outlined"
          color={Colors.successColor}
          onPress={loadSampleData}
        />
      </View>
    );
  } else {
    page = (
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(itemData) => itemData.id}
          data={decksList}
          renderItem={renderDecks}
        />
      </View>
    );
  }

  return <View style={DefaultStyles.container}>{page}</View>;
};

DeckList.navigationOptions = {
  headerTitle: "Mobile Flash Cards",
};

const styles = StyleSheet.create({
  listItem: {
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContainer: {
    flex: 1, // we need this on Android so the scrollview works
    padding: 10,
    width: Dimensions.get("window").width > 350 ? "100%" : "60%",
  },
});

export default DeckList;
