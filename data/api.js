import AsyncStorage from "@react-native-community/async-storage";
const STORAGE_KEY = "FLASHCARD_DECKS_DATA";
/*
Value saved is always a string so we need to stringify it IN and parse it OUT
*/

// base data
const _DATA = {
  ce5d4f5a83e940f7b7fa91e02fd27e59: {
    id: "ce5d4f5a83e940f7b7fa91e02fd27e59",
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces",
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
      },
    ],
  },
  ef3c037e9c534cf58169d64ceb729a21: {
    id: "ef3c037e9c534cf58169d64ceb729a21",
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
};

// GOOD
export const loadDefaultDeck = async () => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(_DATA));
  return _DATA;
};

// GOOD
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // error
  }
};

// GOOD
export const getDecks = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY).then((results) => {
      if (results === null) {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(_DATA));
        return _DATA;
      } else {
        return JSON.parse(results);
      }
    });
  } catch (e) {
    // error
  }
};

// GOOD
export const saveDeck = async (newDeck) => {
  try {
    await AsyncStorage.mergeItem(
      STORAGE_KEY,
      JSON.stringify({
        [newDeck.id]: newDeck,
      })
    );
    return newDeck;
  } catch (e) {
    
  }
};

// GOOD
export const removeDeck = async (deckId) => {
  const results = await AsyncStorage.getItem(STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    delete data[deckId];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  return {};
};

//GOOD
export const addCard = async (deckId, card) => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY).then((results) => {
      const decks = JSON.parse(results);
      decks[deckId] = {
        ...decks[deckId],
        questions: [...decks[deckId].questions, card],
      };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    });
  } catch (e) {
    // error
  }
};

//GOOD
export const getDeckData = async (deckId) => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY).then((results) => {
      const decks = JSON.parse(results);
      return decks[deckId];
    });
  } catch (e) {
    // error
  }
};
