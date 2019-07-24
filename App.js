// https://www.googleapis.com/youtube/v3/search?q=lebrock&type=video&maxResults=3&part=snippet&fields=items(snippet(title,channelTitle),id/videoId)&key=${myKey}

// INITIAL VIDEO SET FOR SEARCH
// search       search?q={QUERY}&type=video
// rounds       &maxResults={ROUNDS}
// fields       &part=snippet&fields=items(snippet(title,channelTitle),id/videoId)

// SPECIFIC VIDEO DETAILS

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
import { config } from "./config.js";
import { youTubeButtons } from "./components/abacus-buttons";

const myKey = config.YouTubeDataKey;

let test;

let concerns = [];
let stage;
let abacusAmount;
let testingPressedButton;
let abacusPressOut = false;
let intervalId = 0;

const buttonSet = youTubeButtons;

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
      text: "",
      guess: 0,
      players: [{ name: "Player 1", score: 0 }, { name: "Player 2", score: 0 }],
      activePlayer: 0,
      gameType: "CLOSEST GUESS WINS",
      rounds: 5,
      currentRound: 1,
      time: 60,
      deleteMe: null,
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
    // this.onAbacusButtonLongPress = this.onAbacusButtonLongPress.bind(this);
    // this.onAbacusPressOut = this.onAbacusPressOut.bind(this);
  }

  onAbacusButtonPress(abacusAmount) {
    let oldGuess = this.state.guess;
    let newGuess = oldGuess + abacusAmount;
    this.setState({ guess: newGuess });
    return;
  }

  // onAbacusButtonLongPress(abacusAmount) {
  //   setInterval(() => {
  //     if (!abacusPressOut) {
  //       let oldGuess = this.state.guess;
  //       let newGuess = oldGuess + abacusAmount;
  //       this.setState({ guess: newGuess });
  //       abacusPressOut = false;
  //       test = abacusPressOut;
  //     } else clearInterval(interval);
  //   }, 100);
  //   return;
  // }

  // onAbacusPressOut() {
  //   clearInterval(myInterval);
  // }

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
      stage = <Text>Loading...</Text>;
    } else {
      let uri = this.state.currentConcern.url;
      stage = (
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
            {stage}
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
              {buttonSet.map(i => (
                <TouchableHighlight
                  key={this.state.world + " " + "abacusButton" + i.name}
                  style={[styles.abacusButton, styles["abacusButton" + i.name]]}
                  underlayColor={"pink"}
                  activeOpacity={1}
                  onPress={() => this.onAbacusButtonPress(i.amount)}
                  onLongPress={this.addAbacus}
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

  abacusButton1: { backgroundColor: "purple" },
  abacusButton100: { backgroundColor: "orange" },
  abacusButton1k: { backgroundColor: "green" },
  abacusButton100k: { backgroundColor: "brown" },
  abacusButton1m: { backgroundColor: "pink" },
  abacusButton100m: { backgroundColor: "blue" },
  abacusButton1b: { backgroundColor: "yellow" },
  abacusButton100b: { backgroundColor: "cyan" }
});

// {
//   "items": [
//    {
//     "id": {
//      "videoId": "shPv0B7nfNA"
//     },
//     "snippet": {
//      "title": "LeBrock - Call Me",
//      "channelTitle": "NewRetroWave"
//     }
//    },
//    {
//     "id": {
//      "videoId": "MVJ3IZu0kBw"
//     },
//     "snippet": {
//      "title": "LeBrock - Runaway",
//      "channelTitle": "NewRetroWave"
//     }
//    },
//    {
//     "id": {
//      "videoId": "h48rjAa_rpw"
//     },
//     "snippet": {
//      "title": "LEBROCK - One Night",
//      "channelTitle": "LEBROCK MUSIC"
//     }
//    }
//   ]
//  }
