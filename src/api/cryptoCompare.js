class CryptoCompare {
  static baseURL() {
    return "https://min-api.cryptocompare.com/data/";
  }

  static History(period, coin, currency, limit) {
    return `${CryptoCompare.baseURL()}${period}?fsym=${coin}&tsym=${currency}&limit=${limit}&e=CCCAGG`;
  }

  static Current(coin, currency) {
    return `${CryptoCompare.baseURL()}price?fsym=${coin}&tsyms=${currency}`;
  }

  static async fetchCoinHistory(period, coin, currency, limit) {
    try {
      let response = await fetch(
        CryptoCompare.History(period, coin, currency, limit)
      );
      let responseJson = await response.json();
      return responseJson.Data;
    } catch (e) {
      console.log(e);
    }
  }

  static async fetchCoinPrice(coin, currency) {
    try {
      let response = await fetch(CryptoCompare.Current(coin, currency));
      let responseJson = await response.json();
      console.log(responseJson);
      return responseJson.MXN;
    } catch (e) {
      console.log(e);
    }
  }
}

export default CryptoCompare;
