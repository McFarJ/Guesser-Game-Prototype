import React, { Component } from "react";
import { Button, Text, View, SafeAreaView } from "react-native";

export default class GameEndScreen extends React.Component {
  constructor(props) {
    super(props);
  }
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
