/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class AddTransaction extends Component {
  static navigatorButtons = {
    rightButtons: [{ title: "Close", systemItem: "Done", id: "close" }]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "close") {
        console.log("done");
        this.props.navigator.dismissModal();
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the addTransaction component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
