/* @flow */

import React, { Component } from "react";
import {
  FormattedCurrency,
  PropTypes,
  Globalize
} from "react-native-globalize";
import { iOSUIKit, iOSColors } from "react-native-typography";
import {
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
  View
} from "react-native";

export default class Currency extends Component {
  constructor(props) {
    super(props);

    const instance = new Globalize(props.locale, props.currency, {
      fallback: props.localeFallback,
      warnOnMissingMessage: props.warnOnMissingMessage
    });

    this.state = {
      loading: true,
      data: [],
      error: null,
      refreshing: false,
      globalize: instance
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  getChildContext() {
    return {
      globalize: this.state.globalize
    };
  }

  //Bring only conversions for MXN currency
  filterMXN = item => {
    return item.book.toLowerCase().indexOf("mxn") > -1;
  };

  fetchData = () => {
    const url = "https://api.bitso.com/v3/ticker/";
    //this.setState({ loading: true });
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.payload);
        var data = responseJson.payload.filter(this.filterMXN);
        this.setState({
          data: data,
          error: responseJson.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(errpr => {
        console.log(error);
        this.setState({
          error,
          loading: false,
          refreshing: false
        });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.fetchData();
      }
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.book}
          ItemSeparatorComponent={this.renderSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item.book}</Text>
        <Text style={iOSUIKit.title3}>{item.last}</Text>
        <FormattedCurrency
          value={9.99}
          currency="USD"
          style={{ color: "red" }}
        />
      </View>
    );
  };

  renderSeparator = () => <View style={styles.separator} />;
}

Currency.childContextTypes = {
  globalize: PropTypes.globalizeShape
};

Currency.defaultProps = {
  cldr: null,
  currency: "USD",
  locale: "es-419",
  localeFallback: false,
  messages: null,
  warnOnMissingMessage: true
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-end"
  },
  itemTitle: {
    ...iOSUIKit.bodyEmphasizedObject,
    color: iOSColors.gray
  },
  separator: {
    height: 1,
    backgroundColor: iOSColors.lightGray
  }
});
