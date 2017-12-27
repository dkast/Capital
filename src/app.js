import firebase from "react-native-firebase";
import { Navigation } from "react-native-navigation";
import { registerScreens } from "./screens";

registerScreens();

const tabs = [
  {
    label: "Precios",
    screen: "Capital.Currency",
    icon: require("../img/coins.png"),
    title: "Precios"
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
