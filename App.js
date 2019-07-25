// https://www.googleapis.com/youtube/v3/search?q=lebrock&type=video&maxResults=3&part=snippet&fields=items(snippet(title,channelTitle),id/videoId)&key=${myKey}

//Expo doesnt support SVG?
import React, { Component } from "react";
// AppRegistry not needed if using Create React Native App
import {
  AppRegistry,
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  WebView
} from "react-native";
import { config } from "./config";
import { styles } from "./components/styles";
import { youTubeButtons } from "./components/abacus-buttons";

const myKey = config.YouTubeDataKey;
const buttonSet = youTubeButtons;

let test;

let concerns = [];
let stage;

let userSearch = "lebrock";
let gameQuery = `search?q=${userSearch}&type=video`;
let rounds = "3";
let queryUrl = `https://www.googleapis.com/youtube/v3/${gameQuery}&maxResults=${rounds}&part=snippet&fields=items(snippet(title,channelTitle),id/videoId)&key=${myKey}`;

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
      world: "YouTube",
      guess: 0,
      players: [{ name: "Player 1", score: 0 }, { name: "Player 2", score: 0 }],
      activePlayer: 0,
      gameType: "CLOSEST GUESS WINS",
      rounds: 5,
      currentRound: 1,
      time: 60,
      currentConcernLoading: true,
      currentConcern: {
        url: null,
        title: null,
        subTitle: null,
        views: null,
        likes: null,
        dislikes: null
      }
    };
    this.onAbacusButtonPress = this.onAbacusButtonPress.bind(this);
    this.onAbacusButtonLongPress = this.onAbacusButtonLongPress.bind(this);
    this.onAbacusPressOut = this.onAbacusPressOut.bind(this);
  }

  onAbacusButtonPress(abacusAmount) {
    let oldGuess = this.state.guess;
    let newGuess = oldGuess + abacusAmount;
    this.setState({ guess: newGuess });
  }

  onAbacusButtonLongPress(abacusAmount) {
    let intervalId = setInterval(
      () => this.onAbacusButtonPress(abacusAmount),
      50
    );
    this.setState({ abacusIntervalId: intervalId });
  }

  onAbacusPressOut() {
    clearInterval(this.state.abacusIntervalId);
  }

  // should I use async?
  // reference: https://medium.com/@alialhaddad/fetching-data-in-react-native-d92fb6876973
  async componentDidMount() {
    //   FOR iOS, REQUESTS NEED TO BE ENCRYPTED USING SSL
    return fetch(queryUrl)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          currentConcernLoading: false,
          currentConcern: {
            url: `https://www.youtube.com/embed/${resJson.items[0].id.videoId}`,
            title: resJson.items[0].snippet.title,
            subTitle: resJson.items[0].snippet.channelTitle
          }
        });
        let resLength = resJson.items.length;
        for (i = 0; i < resLength - 1; i++) {
          let videoId = resJson.items[i].id.videoId;
          let statsFields =
            "fields=items(statistics(viewCount,likeCount,dislikeCount))";
          let videoStatsQuery = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&${statsFields}&key=${myKey}`;
          fetch(videoStatsQuery)
            .then(statsRes => statsRes.json())
            .then(statsResJson => {
              concerns.push({
                url: `https://www.youtube.com/watch?v=${videoId}`,
                title: resJson.items[i].snippet.title,
                subTitle: resJson.items[i].snippet.channelTitle,
                viewCount: statsResJson.items.viewCount,
                likes: statsResJson.items.likeCount,
                dislikes: statsResJson.items.dislikeCount
              });
            });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.currentConcernLoading) {
      stage = (
        <View style={styles.game__stage}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      let uri = this.state.currentConcern.url;
      stage = (
        <View style={styles.game__stage}>
          <WebView
            style={{ flex: 1, marginLeft: 20, marginRight: 20 }}
            javaScriptEnabled={true}
            source={{ uri: uri }}
          />
          <View>
            <Text style={{ textAlign: "center" }}>
              Title: {this.state.currentConcern.title}
            </Text>
            <Text style={{ textAlign: "center" }}>
              Channel: {this.state.currentConcern.subTitle}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.game__container}>
          {/* test 2/2 */}
          <Text>{test}</Text>
          <View style={styles.game__titleAndTimer}>
            <Text style={{ flex: 9 }}>{this.state.gameType}</Text>
            <Image
              source={require("./assets/icon.png")}
              style={styles.game__timer}
            />
          </View>
          {stage}
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
            <View style={styles.game__buttons}>
              {buttonSet.map(i => (
                <TouchableHighlight
                  key={this.state.world + " " + "abacusButton" + i.name}
                  style={[styles.abacusButton, styles["abacusButton" + i.name]]}
                  underlayColor={"pink"}
                  activeOpacity={1}
                  onPress={() => this.onAbacusButtonPress(i.amount)}
                  onLongPress={() => this.onAbacusButtonLongPress(i.amount)}
                  onPressOut={this.onAbacusPressOut}
                >
                  <Text>{i.name}</Text>
                </TouchableHighlight>
              ))}
            </View>
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
