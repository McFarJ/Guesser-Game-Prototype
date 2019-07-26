import React, { Component } from "react";
import { Button, Text, View } from "react-native";

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      world: "YouTube",
      players: [{ name: "player 1" }, { name: "player 2" }],
      gameType: "CLOSEST GUESS WINS",
      rounds: 3,
      roundTime: 60
    };
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Menu Screen!</Text>
        <Button
          title="Start a Game!"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate("Game", {
              world: this.state.world,
              players: this.state.players,
              gameType: this.state.gameType,
              rounds: this.state.rounds,
              time: this.state.roundTime
            });
          }}
        />
      </View>
    );
  }
}

// players 2: ${name1}, ${name2}
// enter a search term or choose a category

// game options:
// game type: view count, over/under
// rounds: 1, 3, 5, 11, 21, ...
// player profiles: ${name1}x, ${name2}x, create new+
