import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

//screens
import DeckListScreen from "../screens/DeckList";
import DeckDetailScreen from "../screens/DeckDetail";
import AddCardScreen from "../screens/AddCard";
import QuizScreen from "../screens/Quiz";
import AddDeckScreen from "../screens/AddDeck";

const DeckNavigation = createStackNavigator(
  {
    DeckList: {
      screen: DeckListScreen,
    },
    DeckDetail: {
      screen: DeckDetailScreen,
    },
    AddCard: {
      screen: AddCardScreen,
    },
    Quiz: {
      screen: QuizScreen,
    },
  },
  {
    initialRouteName: "DeckList",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.white,
      },
      headerTintColor:  Colors.fontColor
    },
  }
);

const DecksTabNavigator = createBottomTabNavigator(
  {
    Decks: {
      screen: DeckNavigation,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-list" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
    AddDeck: {
      screen: AddDeckScreen,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-add-circle-outline"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: Colors.selectedTabColor,
      activeTintColor: Colors.white,
    },
  },
);

export default createAppContainer(DecksTabNavigator);
