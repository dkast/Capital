import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

export default class PlusPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    //Alert.alert("Aviso", "Selecciona");
    const navigator = this.props.navigator;
    if (event.id === "bottomTabSelected") {
      navigator.showModal({
        screen: "Capital.AddTransaction",
        title: "Modal"
      });

      let tabIndexToSelect = event.unselectedTabIndex;
      navigator.switchToTab({
        tabIndex: tabIndexToSelect
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the Test component!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
