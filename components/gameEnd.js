import React, { Component } from "react";
import { Button, Text, View, SafeAreaView } from "react-native";

export default class GameEndScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  // calculateWinner(roundStats){
  //   let printedStats
  //   roundStats.map(round => {
  //     let correctAnswer = round.viewCount;
  //     let numberOfPlayers = this.navigate.getParam('players').length
  //     roundStats.forEach(function(round){
  //       let correctAnswer = round.viewCount;
  //       let guesses = round.guesses
  //     })
  //   })
  // }

  render() {
    let roundStats = this.props.navigation.getParam("roundStats");
    roundStats = JSON.stringify(roundStats);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text>{roundStats}</Text>
        </View>
      </SafeAreaView>
    );
  }
}
