import React from "react";
import { Text, View, Button } from "react-native";
import { styles } from "./styles";

export default class Interstitial extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // }
    this.endRoundInterstitialPress = this.endRoundInterstitialPress.bind(this);
    this.midRoundInterstitialPress = this.midRoundInterstitialPress.bind(this);
  }

  endRoundInterstitialPress() {
    this.props.setInterstitial(false, true);
    this.props.seatSwitch();
    this.props.startNewRound();
    this.props.updateCurrentPlayer(0);
    if (!this.props.webViewLoading) {
      this.props.startTimer;
    }
  }

  midRoundInterstitialPress() {
    let currentPlayer = this.props.currentPlayer;
    let pushedRounds = this.props.pushedRounds;
    let currentRound = this.props.currentRound;
    let nextPlayer = currentPlayer + 1;
    this.props.updateCurrentPlayer(nextPlayer);
    if (currentPlayer === this.props.numOfPlayers - 1) {
      this.props.setInterstitial(false, false);
    } else {
      this.props.setInterstitial(false, true);
    }
    this.props.startTimer;
  }

  render() {
    let interstitial;
    let interstitialStyle;
    let onInterstitialPress;
    if (this.props.status.on) {
      interstitialStyle = styles.game__interstitial;
      if (this.props.status.midRound) {
        onInterstitialPress = this.midRoundInterstitialPress;
      } else {
        onInterstitialPress = this.endRoundInterstitialPress;
      }
      interstitial = (
        <View style={{ interstitialStyle }}>
          <Text>{this.props.player} ready?</Text>
          <Button title="Go!" onPress={onInterstitialPress} />
        </View>
      );
    } else {
      interstitial = null;
    }

    return interstitial;
  }
}
