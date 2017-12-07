import firebase from "react-native-firebase";
import { Navigation } from "react-native-navigation";
import { registerScreens } from "./screens";

registerScreens();

const tabs = [
  {
    label: "Transactions",
    screen: "Capital.Transactions",
    icon: require("../img/money.png"),
    title: "Transactions"
  },
  {
    label: "Add",
    screen: "Capital.PlusPlaceholder",
    icon: require("../img/plus.png"),
    title: "Navigation Test"
  }
];

Navigation.startTabBasedApp({
  tabs
});
