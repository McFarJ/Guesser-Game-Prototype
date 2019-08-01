import React from "react";
import { Text, View } from "react-native";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
      displayedTime: null,
      timerInterval: null
    };
  }

  componentWillMount() {
    this.setState({ displayedTime: this.props.time });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.timerStart != prevProps.timerStart &&
      this.props.timerStart === true
    ) {
      this.timerInterval = setInterval(() => {
        let newTime = this.state.displayedTime - 1;
        this.setState({ displayedTime: newTime });
        if (this.state.displayedTime < 1) {
          clearInterval(this.timerInterval);
          this.setState({ displayedTime: this.state.time });
          this.props.timerEnd();
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
