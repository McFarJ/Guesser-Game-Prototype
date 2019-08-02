import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  game__container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 25
  },

  game__stage: {
    flex: 6,
    backgroundColor: "skyblue",
    alignSelf: "stretch"
  },

  game__titleAndTimerBar: {
    flex: 1,
    backgroundColor: "powderblue",
    flexDirection: "row"
  },

  game__timer: {
    flex: 1,
    resizeMode: "contain",
    height: undefined,
    width: undefined
  },

  game__buttons: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "red",
    opacity: 0.5,
    alignSelf: "stretch",
    alignContent: "center"
  },

  abacusButton: {
    alignItems: "center",
    padding: 0,
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
  abacusButton100b: { backgroundColor: "cyan" },

  game_currentPlayer: { backgroundColor: "red" },

  game__interstitial: {},
  game__interstitial_hidden: {}
});

export { styles };
