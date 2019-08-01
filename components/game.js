import React, { Component } from "react";
// AppRegistry not needed if using Create React Native App
import {
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
import { config } from "../config";
import { styles } from "./styles";
import { youTubeButtons } from "./abacus-buttons";
import Timer from "./timer";

const myKey = config.YouTubeDataKey;
const buttonSet = youTubeButtons;

let concerns = [],
  stage,
  userSearch,
  gameQuery,
  queryUrl,
  world,
  players,
  gameType,
  rounds,
  roundTime;

function numWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numWithNoCommas(num) {
  let noCommas = num.replace(/,/g, "");
  return Number(noCommas);
}

function seatSwitch() {
  let movingPlayer = players[0];
  players.shift();
  players.push(movingPlayer);
}

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: 0,
      roundStats: [],
      currentPlayer: 0,
      currentRound: 1,
      currentConcernLoading: true,
      currentConcern: {
        url: null,
        title: null,
        subTitle: null
      },
      abacusInterval: null,
      timerStart: false
    };
    this.onAbacusPressIn = this.onAbacusPressIn.bind(this);
    this.onAbacusPressOut = this.onAbacusPressOut.bind(this);
    this.onGuessPress = this.onGuessPress.bind(this);
    this.onWebViewLoad = this.onWebViewLoad.bind(this);
    this.timerEnd = this.timerEnd.bind(this);
  }

  onAbacusPressIn(abacusAmount) {
    this.setState({ guess: this.state.guess + abacusAmount });
    this.abacusInterval = setTimeout(
      () => this.onAbacusPressIn(abacusAmount),
      60
    );
  }

  onAbacusPressOut() {
    clearTimeout(this.abacusInterval);
  }

  onGuessPress() {
    let currentGuess = this.state.guess;
    let currentPlayer = this.state.currentPlayer;
    let pushedRounds = this.state.roundStats.length;
    let currentRound = this.state.currentRound;
    if (currentRound > pushedRounds) {
      let currentVideo = this.state.currentConcern.title;
      let currentViewCount = concerns[currentRound - 1].viewCount;
      let newRound = {
        video: currentVideo,
        viewCount: currentViewCount,
        guesses: { [currentPlayer]: currentGuess }
      };
      let completeRoundStats = this.state.roundStats;
      completeRoundStats.push(newRound);
      let nextPlayer = currentPlayer + 1;
      this.setState({
        roundStats: completeRoundStats,
        currentPlayer: nextPlayer,
        guess: 0
      });
      this.setState({ timerStart: true });
    } else {
      let completeRoundStats = this.state.roundStats;
      completeRoundStats[currentRound - 1].guesses[currentPlayer] = [
        currentGuess
      ];
      this.setState({ roundStats: completeRoundStats, guess: 0 });
    }
    let currentRoundStats = this.state.roundStats[currentRound - 1];
    let numPlayersDone = Object.keys(currentRoundStats.guesses).length;
    if (numPlayersDone === players.length && currentRound != rounds) {
      let nextConcern = {
        url: concerns[currentRound].url,
        title: concerns[currentRound].title,
        subTitle: concerns[currentRound].subTitle
      };
      seatSwitch();
      this.setState({
        currentConcern: nextConcern,
        currentPlayer: 0,
        currentRound: this.state.currentRound + 1
      });
    } else if (numPlayersDone === players.length && currentRound === rounds) {
      this.props.navigation.navigate("GameEnd", {
        roundStats: this.state.roundStats
      });
    }
  }

  onWebViewLoad() {
    this.setState({ timerStart: true });
  }

  timerEnd() {
    this.setState({ timerStart: false });
    this.onGuessPress();
  }

  // should I use async?
  // reference: https://medium.com/@alialhaddad/fetching-data-in-react-native-d92fb6876973
  async componentDidMount() {
    //   FOR iOS, REQUESTS NEED TO BE ENCRYPTED USING SSL
    return fetch(queryUrl)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          currentConcern: {
            url: `https://www.youtube.com/embed/${resJson.items[0].id.videoId}`,
            title: resJson.items[0].snippet.title,
            subTitle: resJson.items[0].snippet.channelTitle
          },
          currentConcernLoading: false
        });
        let resLength = resJson.items.length;
        for (i = 0; i < resLength; i++) {
          let videoId = resJson.items[i].id.videoId;
          let title = resJson.items[i].snippet.title;
          let subTitle = resJson.items[i].snippet.channelTitle;
          let statsFields =
            "fields=items(statistics(viewCount,likeCount,dislikeCount))";
          let videoStatsQuery = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&${statsFields}&key=${myKey}`;
          fetch(videoStatsQuery)
            .then(statsRes => statsRes.json())
            .then(statsResJson => {
              concerns.push({
                url: `https://www.youtube.com/embed/${videoId}`,
                title: title,
                subTitle: subTitle,
                viewCount: statsResJson.items[0].statistics.viewCount,
                likes: statsResJson.items[0].statistics.likeCount,
                dislikes: statsResJson.items[0].statistics.dislikeCount
              });
            });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    world = this.props.navigation.getParam("world");
    players = this.props.navigation.getParam("players");
    gameType = this.props.navigation.getParam("gameType");
    rounds = this.props.navigation.getParam("rounds");
    roundTime = this.props.navigation.getParam("roundTime");
    userSearch = this.props.navigation.getParam("userSearch");

    gameQuery = `search?q=${userSearch}&type=video`;
    queryUrl = `https://www.googleapis.com/youtube/v3/${gameQuery}&maxResults=${rounds}&part=snippet&fields=items(snippet(title,channelTitle),id/videoId)&key=${myKey}`;

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
            //onLoad={this.setState({ timerStart: false })}
            onLoad={this.onWebViewLoad}
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
          <View style={styles.game__titleAndTimerBar}>
            <Text style={{ flex: 9 }}>{gameType}</Text>
            <Timer
              time={this.props.navigation.getParam("time")}
              timerStart={this.state.timerStart}
              timerEnd={this.timerEnd}
            />
            <Image
              source={require("../assets/icon.png")}
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
              {players.map((player, i) =>
                i === this.state.currentPlayer && i + 1 != players.length ? (
                  <Text
                    key={`${world}_player_${i}${player}`}
                    style={styles.game_currentPlayer}
                  >
                    {player.name},{" "}
                  </Text>
                ) : i === this.state.currentPlayer &&
                  i + 1 === players.length ? (
                  <Text
                    key={`${world}_player_${i}${player}`}
                    style={styles.game_currentPlayer}
                  >
                    {player.name}
                  </Text>
                ) : i != this.state.currentPlayer && i + 1 != players.length ? (
                  <Text key={`${world}_player_${i}${player}`}>
                    {player.name},{" "}
                  </Text>
                ) : i != this.state.currentPlayer &&
                  i + 1 === players.length ? (
                  <Text key={`${world}_player_${i}${player}`}>
                    {player.name}
                  </Text>
                ) : null
              )}
            </View>
            <TextInput
              id="game_dynamic-number"
              style={{
                flex: 1,
                padding: 10,
                fontSize: 42,
                textAlign: "center"
              }}
              //onChangeText={text =>
              // this.setState({ guess: `${numWithNoCommas(text)}` })
              //}
              value={`${numWithCommas(this.state.guess)}`}
            />
            <View style={styles.game__buttons}>
              {buttonSet.map(i => (
                <TouchableHighlight
                  key={`${world} abacusButton ${i.name}`}
                  style={[styles.abacusButton, styles["abacusButton" + i.name]]}
                  underlayColor={"pink"}
                  activeOpacity={1}
                  onPressIn={() => this.onAbacusPressIn(i.amount)}
                  onPressOut={this.onAbacusPressOut}
                >
                  <Text>{i.name}</Text>
                </TouchableHighlight>
              ))}
            </View>
          </View>
          {/* Will need to create own TouchableOpacity button if want to control things like height and font-size*/}
          <Button
            //{...this.props}
            title="Guess!"
            onPress={this.onGuessPress}
          />
        </View>
      </SafeAreaView>
    );
  }
}
