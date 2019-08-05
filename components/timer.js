import React from "react";
import { Text, View } from "react-native";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedTime: null,
      timerInterval: null
    };
  }

  componentWillMount() {
    this.setState({ displayedTime: this.props.time });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.timerStarted != prevProps.timerStarted &&
      this.props.timerStarted === true
    ) {
      this.timerInterval = setInterval(() => {
        let newTime = this.state.displayedTime - 1;
        this.setState({ displayedTime: newTime });
        if (this.state.displayedTime < 1) {
          clearInterval(this.timerInterval);
          this.setState({ displayedTime: this.props.time });
          this.props.timesUp();
        }
      }, 1000);
    }
    if (
      this.props.timerStarted != prevProps.timerStarted &&
      this.props.timerStarted === false
    ) {
      clearInterval(this.timerInterval);
      this.setState({ displayedTime: this.props.time });
    }
    //is this needed anymore
    if (this.props.timerReload != prevProps.timerReload) {
      this.timerInterval = setInterval(() => {
        let newTime = this.state.displayedTime - 1;
        this.setState({ displayedTime: newTime });
        if (this.state.displayedTime < 1) {
          clearInterval(this.timerInterval);
          this.setState({ displayedTime: this.state.time });
          this.props.timesUp();
        }
      }, 1000);
    }
  }

  render() {
    return (
      <View>
        <Text>{this.state.displayedTime}</Text>
      </View>
    );
  }
}
