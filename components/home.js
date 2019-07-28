import React, { Component } from "react";
import { Button, Text, View } from "react-native";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen!</Text>
        <Text>Choose your world</Text>
        <Button
          title="YouTube!"
          onPress={() => {
            this.props.navigation.navigate("Menu", {
              world: "YouTube"
            });
          }}
        />
        <Button
          title="Rotten Tomatoes!"
          onPress={() => {
            this.props.navigation.navigate("Menu", {
              world: "Rotten Tomatoes"
            });
          }}
        />
        <Button
          title="Ebay!"
          onPress={() => {
            this.props.navigation.navigate("Menu", {
              world: "Ebay"
            });
          }}
        />
      </View>
    );
  }
}
