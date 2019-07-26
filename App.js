// https://www.googleapis.com/youtube/v3/search?q=lebrock&type=video&maxResults=3&part=snippet&fields=items(snippet(title,channelTitle),id/videoId)&key=${myKey}

// re: https://reactnavigation.org/docs/en/getting-started.html it's not clear if there's an extra step needed to connect react-navigation for iOS (the documents might be referring to connecting react-native-gesture-handler). This extra step is halfway down the page, using Cocoapods.

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
import { createStackNavigator, createAppContainer } from "react-navigation";
import { config } from "./config";
import { styles } from "./components/styles";
import GameScreen from "./components/game";
import MenuScreen from "./components/menu";

// class DetailsScreen extends React.Component {
//   render() {
//     /* 2. Get the param, provide a fallback value if not available */
//     const { navigation } = this.props;
//     const itemId = navigation.getParam('itemId', 'NO-ID');
//     const otherParam = navigation.getParam('otherParam', 'some default value');

//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//         <Text>itemId: {JSON.stringify(itemId)}</Text>
//         <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//         <Button
//           title="Go to Details... again"
//           onPress={() =>
//             this.props.navigation.push('Details', {
//               itemId: Math.floor(Math.random() * 100),
//             })}
//         />
//         <Button
//           title="Go to Home"
//           onPress={() => this.props.navigation.navigate('Home')}
//         />
//         <Button
//           title="Go back"
//           onPress={() => this.props.navigation.goBack()}
//         />
//       </View>
//     );
//   }
// }

const AppNavigator = createStackNavigator(
  {
    Home: MenuScreen,
    Game: GameScreen
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
