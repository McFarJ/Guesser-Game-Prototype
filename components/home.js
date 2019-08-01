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
        <Text>Sign in with Facebook or play</Text>
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
          title="Rotten Tomatoes! (coming soon)"
          onPress={() => {
            return;
          }}
        />
        <Button
          title="Ebay! (coming soon)"
          onPress={() => {
            return;
          }}
        />
      </View>
    );
  }
}
