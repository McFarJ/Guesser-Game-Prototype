import React, { Component } from "react";
import { Button, Text, View, Picker } from "react-native";
import MenuPrompt from "./menuPrompt";

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [{ name: "player 1" }, { name: "player 2" }],
      gameType: "view count",
      rounds: 3,
      roundTime: 30,
      userSearch: "lebrock",
      category: null,
      promptHidden: true,
      showButton: true
    };

    this.onStartGameButtonPress = this.onStartGameButtonPress.bind(this);
  }

  onStartGameButtonPress(queryUrl) {
    this.props.navigation.navigate("Game", {
      world: this.props.navigation.getParam("world"),
      players: this.state.players,
      gameType: this.state.gameType,
      rounds: this.state.rounds,
      time: this.state.roundTime,
      userSearch: this.state.userSearch,
      queryUrl: queryUrl
    });
  }

  render() {
    let menuButton;
    if (this.state.showButton) {
      menuButton = (
        <Button
          title="Okay!"
          onPress={() => {
            if (this.state.rounds === null) {
              this.setState({ rounds: 3 });
            }
            this.setState({ promptHidden: false });
            this.setState({ showButton: false });
          }}
        />
      );
    } else {
      menuButton = null;
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MenuPrompt
          promptHidden={this.state.promptHidden}
          onStartGameButtonPress={this.onStartGameButtonPress}
          rounds={this.state.rounds}
        />
        <Text>Menu Screen!</Text>
        <Text>Game Options</Text>
        <View>
          <Text>game:</Text>
          <Picker
            selectedValue={this.state.gameType || "view count"}
            style={{ height: 50, width: 140 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ gameType: itemValue })
            }
          >
            <Picker.Item label="over/under (comingsoon)" value="over/under" />
            <Picker.Item label="view count" value="view count" />
          </Picker>
        </View>
        <View>
          <Text>rounds:</Text>
          <Picker
            selectedValue={this.state.rounds || 3}
            style={{ height: 50, width: 140 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ rounds: itemValue })
            }
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="9" value={9} />
            <Picker.Item label="27" value={27} />
          </Picker>
        </View>
        <View>
          <Text>time:</Text>
          <Picker
            selectedValue={this.state.roundTime || 30}
            style={{ height: 50, width: 140 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ roundTime: itemValue })
            }
          >
            <Picker.Item label="5" value={5} />
            <Picker.Item label="30" value={30} />
            <Picker.Item label="60" value={60} />
            <Picker.Item label="∞" value={999} />
          </Picker>
        </View>

        {menuButton}
      </View>
    );
  }
}

// players 2: ${name1}, ${name2}
// enter a search term or choose a category

// player profiles: ${name1}x, ${name2}x, create new+
