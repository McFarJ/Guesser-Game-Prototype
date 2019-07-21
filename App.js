// https://www.googleapis.com/youtube/v3/search?q=lebrock&type=video&maxResults=3&part=snippet&fields=items(id,snippet/title,snippet/position,id/videoId)&key=AIzaSyAWH21tONDJLTI83JA5FjqV4rxU1PmplsQ

// search       search?q={QUERY}&type=video
// rounds       &maxResults={ROUNDS}
// fields       &part=snippet&fields=items(snippet(title,channelTitle),id/videoId)

// answers      videos?id={I}

// Resource:        playlist (for use in future implimentation of user curated rounds)
//                  search result
//                  thumbnail (possibly use instead of embedding video?)
//                  video (for info on single video)
//                  videoCategory (are the categories in this list all I can use?)
// part parameter:  snippet (publishedAt: datetime, title, description, thumbnails, channelTitle)
//                  statistics? (viewCount, likeCount, dislikeCount)
//                  topicCategories?
//                  relevantTopicIds?
//                  fields parameter (use to narrow down response data)

// list (most popular videos, and most popular videos by category, search result)

// CategoryIds:
// 1 - Film & Animation
// 2 - Autos & Vehicles
// 10 - Music
// 15 - Pets & Animals
// 17 - Sports
// 18 - Short Movies
// 19 - Travel & Events
// 20 - Gaming
// 21 - Videoblogging
// 22 - People & Blogs
// 23 - Comedy
// 24 - Entertainment
// 25 - News & Politics
// 26 - Howto & Style
// 27 - Education
// 28 - Science & Technology
// 29 - Nonprofits & Activism
// 30 - Movies
// 31 - Anime/Animation
// 32 - Action/Adventure
// 33 - Classics
// 34 - Comedy
// 35 - Documentary
// 36 - Drama
// 37 - Family
// 38 - Foreign
// 39 - Horror
// 40 - Sci-Fi/Fantasy
// 41 - Thriller
// 42 - Shorts
// 43 - Shows
// 44 - Trailers

//Expo doesnt support SVG?
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
// for secret API key
import { config } from "./config.js";

// Secret API key variable
const myKey = config.myKey;

let sliderInitialized = false;

let test;

let concerns = [];

let userSearch = "lebrock";
let gameQuery = `search?q=${userSearch}&type=video`;
let rounds = "3";
let queryUrl = `https://www.googleapis.com/youtube/v3/${gameQuery}&maxResults=${rounds}&part=snippet&fields=items(snippet(title,channelTitle),id/videoId)&key=${
  config.YouTubeDataKey
}`;

function setConcerns(array) {
  array.forEach(x => {
    concerns.push(x);
  });
}

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
      rounds: 5,
      currentRound: 1,
      time: 60,
      currentConcern: {
        URL: null,
        title: null,
        subTitle: null,
        views: null,
        likes: null,
        dislikes: null
      }
    };

    this.onSliderChange = this.onSliderChange.bind(this);
    this.onSlidingComplete = this.onSlidingComplete.bind(this);
    this.onAbacusButtonPress = this.onAbacusButtonPress.bind(this);
  }

  onSliderChange(val) {
    this.setState({ sliderValue: val });
    if (!sliderInitialized) {
      const initialValueAdd = this.state.guess + this.state.sliderValue;
      this.setState({ guess: Math.round(initialValueAdd) });
      sliderInitialized = true;
      // setInterval(
      // function() {
      if (!sliderInitialized) {
        return;
      } else {
        newGuess =
          this.state.guess +
          this.state.sliderValue *
            this.state.sliderValue *
            this.state.sliderValue;
        if (newGuess < 0) {
          newGuess = 0;
        }
        this.setState({ guess: Math.round(newGuess) });
      }
      // }.bind(this),
      // 50
      // );
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

  onAbacusButtonPress() {
    return;
  }

  // should I use async?
  // reference: https://medium.com/@alialhaddad/fetching-data-in-react-native-d92fb6876973
  async componentDidMount() {
    //   FOR iOS, REQUESTS NEED TO BE ENCRYPTED USING SSL

    return fetch(queryUrl)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
        // test = JSON.stringify(this.state.dataSource);
        this.setState({ currentConcern: responseJson.items[0] });
        test = JSON.stringify(this.state.currentConcern);
      })
      .catch(error => {
        console.error(error);
      });
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
          {/* test 2/2 */}
          <Text>{test}</Text>
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
              <Text>Round {this.state.currentRound}: </Text>
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
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "red",
                opacity: 0.5,
                alignSelf: "stretch",
                alignContent: "center"
              }}
            >
              <TouchableHighlight
                style={[styles.abacusButton, styles.abacus1]}
                underlayColor={"pink"}
                activeOpacity={1}
                onPress={this.onAbacusButtonPress}
              >
                <Text>1</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.abacusButton, styles.abacus100]}
                underlayColor={"pink"}
                activeOpacity={1}
                onPress={this.onAbacusButtonPress}
              >
                <Text>100</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.abacusButton, styles.abacus1k]}
                underlayColor={"pink"}
                activeOpacity={1}
                onPress={this.onAbacusButtonPress}
              >
                <Text>1k</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.abacusButton, styles.abacus100k]}
                underlayColor={"pink"}
                activeOpacity={1}
                onPress={this.onAbacusButtonPress}
              >
                <Text>100k</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.abacusButton, styles.abacus1m]}
                underlayColor={"pink"}
                activeOpacity={1}
                onPress={this.onAbacusButtonPress}
              >
                <Text>1m</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.abacusButton, styles.abacus100m]}
                underlayColor={"pink"}
                activeOpacity={1}
                onPress={this.onAbacusButtonPress}
              >
                <Text>100m</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.abacusButton, styles.abacus1b]}
                underlayColor={"pink"}
                activeOpacity={1}
                onPress={this.onAbacusButtonPress}
              >
                <Text>1b</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.abacusButton, styles.abacus100b]}
                underlayColor={"pink"}
                activeOpacity={1}
                onPress={this.onAbacusButtonPress}
              >
                <Text>100b</Text>
              </TouchableHighlight>
            </View>
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

const styles = StyleSheet.create({
  abacusButton: {
    alignItems: "center",
    padding: 10,
    margin: 5,
    flex: 1,
    borderRadius: 50,
    width: 5,
    height: 30
  },

  abacus1: { backgroundColor: "purple" },
  abacus100: { backgroundColor: "orange" },
  abacus1k: { backgroundColor: "green" },
  abacus100k: { backgroundColor: "brown" },
  abacus1m: { backgroundColor: "pink" },
  abacus100m: { backgroundColor: "blue" },
  abacus1b: { backgroundColor: "yellow" },
  abacus100b: { backgroundColor: "cyan" },

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
