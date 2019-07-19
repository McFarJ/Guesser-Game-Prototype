//Expo doesnt support SVG
import React, { Component } from "react";
// AppRegistry not needed if using Create React Native App
import {
  AppRegistry,
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  Slider,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  WebView
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

function numWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numWithNoCommas(num) {
  let noCommas = num.replace(/,/g, "");
  return Number(noCommas);
}

export default class YouTubeGameApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      guess: 0,
      sliderValue: 0,
      players: [{ name: "Player 1", score: 0 }, { name: "Player 2", score: 0 }],
      activePlayer: 0,
      gameType: "CLOSEST GUESS WINS",
      round: 1,
      time: 60,
      currentConcern: {
        URI: null,
        title: null,
        subTitle: null,
        views: null,
        likes: null,
        dislikes: null
      }
    };

    this.onSliderChange = this.onSliderChange.bind(this);
    this.onSlidingComplete = this.onSlidingComplete.bind(this);
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
            if (newGuess < 0) {
              newGuess = 0;
            }
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
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            marginBottom: 25
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "powderblue",
              flexDirection: "row"
            }}
          >
            <Text style={{ flex: 9 }}>{this.state.gameType}</Text>
            <Image
              source={require("./assets/icon.png")}
              style={{
                flex: 1,
                resizeMode: "contain",
                height: undefined,
                width: undefined
              }}
            />
          </View>
          <View
            style={{
              flex: 6,
              backgroundColor: "skyblue",
              alignSelf: "stretch"
            }}
          >
            <WebView
              style={{ flex: 1, marginLeft: 20, marginRight: 20 }}
              javaScriptEnabled={true}
              source={{ uri: "https://www.youtube.com/embed/HMcVYmCnnVQ" }}
            />
            <View>
              <Text style={{ textAlign: "center" }}>name of video</Text>
              <Text style={{ textAlign: "center" }}>username</Text>
            </View>
          </View>
          <View
            style={{
              flex: 4,
              backgroundColor: "steelblue",
              alignSelf: "stretch"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text>Round {this.state.round}: </Text>
              <Text>{this.state.players[0].name}, </Text>
              <Text>{this.state.players[1].name}</Text>
            </View>
            <TextInput
              id="game_dynamic-number"
              style={{
                flex: 1,
                padding: 10,
                fontSize: 42,
                textAlign: "center"
              }}
              onChangeText={text =>
                this.setState({ guess: `${numWithNoCommas(text)}` })
              }
              value={`${numWithCommas(this.state.guess)}`}
            />
            <Slider
              style={{ width: 350, height: 40, alignSelf: "center" }}
              minimumValue={-200}
              maximumValue={200}
              value={this.state.sliderValue}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={this.onSliderChange}
              onSlidingComplete={this.onSlidingComplete}
            />
          </View>
          {/* Will need to create own TouchableOpacity button if want to control things like height and font-size*/}
          <Button onPress={this._onPressButton} title="Guess!" />
        </View>
      </SafeAreaView>
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
