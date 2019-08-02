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

  // closing midRoundInterstitials starts new timer.
  componentDidUpdate(prevProps) {
    if (
      //revieved new props: timerStart
      this.props.timerStart != prevProps.timerStart &&
      this.props.timerStart === true
    ) {
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
    if (
      //recieved new props: !timerStart
      this.props.timerStart != prevProps.timerStart &&
      this.props.timerStart === false
    ) {
      clearInterval(this.timerInterval);
      this.setState({ displayedTime: this.state.time });
    }
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
