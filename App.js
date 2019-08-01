// search query: https://www.googleapis.com/youtube/v3/search?q=lebrock&type=video&maxResults=3&part=snippet&fields=items(snippet(title,channelTitle),id/videoId)&key=${myKey}
// stats query: https://www.googleapis.com/youtube/v3/videos?part=statistics&id=yMwYF069S1s&fields=items(statistics(viewCount,likeCount,dislikeCount))&key=${myKey}
// re: https://reactnavigation.org/docs/en/getting-started.html it's not clear if there's an extra step needed to connect react-navigation for iOS (the documents might be referring to connecting react-native-gesture-handler). This extra step is halfway down the page, using Cocoapods.

//Expo doesnt support SVG?
import React, { Component } from "react";
// AppRegistry not needed if using Create React Native App
import { AppRegistry } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import GameScreen from "./components/game";
import MenuScreen from "./components/menu";
import GameEndScreen from "./components/gameEnd";
import HomeScreen from "./components/home";

//         <Button
//           title="Go to Home"
//           onPress={() => this.props.navigation.navigate('Home')}
//         />
//         <Button
//           title="Go back"
//           onPress={() => this.props.navigation.goBack()}
//         />
// }

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Menu: MenuScreen,
    Game: GameScreen,
    GameEnd: GameEndScreen
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// AppRegistry not needed if using Create React Native App
AppRegistry.registerComponent("AwesomeProject", () => UselessTextInput);
