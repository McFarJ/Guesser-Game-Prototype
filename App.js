//Expo doesnt support SVG
import React, { Component } from "react";
// AppRegistry not needed if using Create React Native App
import {
  AppRegistry,
  ActivityIndicator,
  Button,
  Slider,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";

const styles = StyleSheet.create({
  bibBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30
  },
  red: {
    color: "red"
  },
  button: {
    height: 50,
    color: "red"
  },
  buttonText: {
    height: 50,
    color: "blue"
  }
});

let sliderInitialized = false;

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", guess: 0, sliderValue: 0 };

    this.onSliderChange = this.onSliderChange.bind(this);
    this.onSlidingComplete = this.onSlidingComplete.bind(this);
  }

  _onPressButton() {
    return;
  }

  componentDidMount() {
    //   FOR iOS, REQUESTS NEED TO BE ENCRYPTED USING SSL
    return fetch("https://facebook.github.io/react-native/movies.json")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.movies
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  onSliderChange(val) {
    this.setState({ sliderValue: val });
    if (!sliderInitialized) {
      const initialValueAdd = this.state.guess + this.state.sliderValue;
      this.setState({ guess: Math.round(initialValueAdd) });
      sliderInitialized = true;
      setInterval(
        function() {
          if (!sliderInitialized) {
            return;
          } else {
            newGuess = this.state.guess + this.state.sliderValue;
            this.setState({ guess: Math.round(newGuess) });
          }
        }.bind(this),
        50
      );
    }
  }

  onSlidingComplete() {
    sliderInitialized = false;
    setTimeout(
      function() {
        this.setState({ sliderValue: 0 });
      }.bind(this),
      50
    );
    // document.getElementById("main-slider").value = "0";
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "powderblue"
          }}
        >
          <Text>Player Name</Text>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "skyblue"
          }}
        >
          <Text>Video</Text>
        </View>
        <View
          style={{
            flex: 3,
            backgroundColor: "steelblue"
          }}
        >
          <Text>Guessing Tools</Text>
          <TextInput
            placeholder="Type your bet or use slider"
            onChangeText={text => this.setState({ text })}
          />
          <Text style={{ flex: 1, padding: 10, fontSize: 42 }}>
            {this.state.guess}
          </Text>
          <Slider
            id="main-slider"
            style={{ width: 200, height: 40 }}
            minimumValue={-200}
            maximumValue={200}
            value={this.state.sliderValue}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={this.onSliderChange}
            onSlidingComplete={this.onSlidingComplete}
          />
        </View>
        <Button
          style={{ flex: 1 }}
          onPress={this._onPressButton}
          title="Press Me (button)"
        />
        <TouchableHighlight
          style={{ flex: 1 }}
          onPress={this._onPressButton}
          underlayColor="red"
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press Me TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

// AppRegistry not needed if using Create React Native App
AppRegistry.registerComponent("AwesomeProject", () => UselessTextInput);

// A slider which, on continual intervals, adds a value, related to the val of the slider, to a variable, and returns to start when released.
// >relevant equation for exponential slope might be here (second derivative test) http://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtII.aspx
// (-)1st - (-)23rd
// 0 <- start
// +1 <- 1st
// +2
// +4
// +8
// +16
// +32
// +64
// +128
// 256
// 512
// 1024
// 2048
// 4096
// 8192
// 16384
// 32768
// 65536
// 131072
// 262144
// 524288
// 1048576
// 2097152
// 4194304
// 8388608 <- 23rd
//
// what is 'x' when 'y' is 1,000,000,000? (what do I set max/min value to?)
// what is the equation to determine 'y' at a given 'x' (what is the value added?)
