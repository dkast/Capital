/* @flow */

import React, { Component } from "react";
import CryptoCompare from "../api/cryptoCompare";
// import SparkLine from "../components/sparkLine";
import { iOSUIKit, iOSColors } from "react-native-typography";
import {
  FormattedCurrency,
  FormattedNumber,
  PropTypes,
  Globalize
} from "react-native-globalize";
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

  fetchData = async () => {
    const currency = "MXN";
    let data = [];
    try {
      const coins = ["BTC", "ETH", "XRP", "LTC"];
      await Promise.all(
        coins.map(async coin => {
          const historical = await CryptoCompare.fetchCoinHistory(
            "histohour",
            coin,
            currency,
            "24"
          );

          const current = await CryptoCompare.fetchCoinPrice(coin, currency);

          let item = {};
          item.coin = coin;
          item.currency = currency;
          item.currentPrice = current;
          item.historical = historical;
          data.push(item);
        })
      );

      //console.log(data);
      this.setState({
        data: data,
        error: null,
        loading: false,
        refreshing: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        error,
        loading: false,
        refreshing: false
      });
    }
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
          keyExtractor={item => item.coin}
          ItemSeparatorComponent={this.renderSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  renderItem = ({ item }) => {
    console.log(item);
    let currencyName;
    const pastPrice = item.historical.slice(0, 1)[0];
    const diffPrice = item.currentPrice - pastPrice.close;
    const diffPct = diffPrice / item.currentPrice;

    switch (item.coin) {
      case "BTC":
        currencyName = "Bitcoin";
        break;
      case "ETH":
        currencyName = "Ethereum";
        break;
      case "XRP":
        currencyName = "Ripple";
        break;
      case "LTC":
        currencyName = "Litecoin";
        break;
      default:
        currencyName = item.coin;
    }

    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.itemTitle}>{currencyName}</Text>
          <FormattedCurrency
            value={item.currentPrice}
            currency="USD"
            style={iOSUIKit.body}
          />
          <FormattedNumber
            value={diffPct}
            numberStyle="percent"
            minimumFractionDigits={0}
            maximumFractionDigits={2}
          />
        </View>
        {/* <SparkLine /> */}
      </View>
    );
  };

  renderSeparator = () => <View style={styles.separator} />;
}

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
    ...iOSUIKit.title3Object
  },
  separator: {
    height: 1,
    backgroundColor: iOSColors.lightGray
  }
});

Currency.childContextTypes = {
  globalize: PropTypes.globalizeShape
};

Currency.defaultProps = {
  cldr: null,
  currency: "USD",
  locale: "en",
  localeFallback: false,
  messages: null,
  warnOnMissingMessage: true
};
