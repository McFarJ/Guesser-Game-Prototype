//need to set region code for categories dynamically with region connecting from

//https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=[YOUR_API_KEY]
// items [...]
// items/snippet/title

//https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY]

import React, { Component } from "react";
import { Text, View, Button, Picker, TextInput } from "react-native";
import { styles } from "./styles";
import { config } from "../config";

const myKey = config.YouTubeDataKey;
let gameQuery;
let queryUrl;
let menuPrompt;

export default class MenuPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "none"
    };
  }
  render() {
    gameQuery = `search?q=${this.state.search}&type=video`;
    queryUrl = `https://www.googleapis.com/youtube/v3/${gameQuery}&maxResults=${
      this.props.rounds
    }&part=snippet&fields=items(snippet(title,channelTitle),id/videoId)&key=${myKey}`;
    if (this.props.promptHidden) {
      menuPrompt = null;
    } else {
      menuPrompt = (
        <View style={styles.menu__prompt}>
          <Text>Category</Text>
          <Picker
            selectedValue={"none"}
            style={{ height: 50, width: 140 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ category: itemValue })
            }
          >
            <Picker.Item label="none" value="none" />
            <Picker.Item label="(comingsoon)" value="(comingsoon)" />
          </Picker>
          <Text>Search Term</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text => this.setState({ search: text })}
            value={this.state.search}
          />
          <Button
            title="Start a Game!"
            //onPress={() => {
            //if (this.state.rounds === null) {
            //  this.setState({ rounds: 3 });
            //}
            onPress={() => {
              this.props.onStartGameButtonPress(queryUrl);
            }}
          />
        </View>
      );
    }

    return menuPrompt;
  }
}
