import { Navigation } from "react-native-navigation";

import Currency from "./currency";
import PlusPlaceholder from "./plusPlaceholder";
import AddTransaction from "./addTransaction";

export function registerScreens() {
  Navigation.registerComponent("Capital.Currency", () => Currency);
  Navigation.registerComponent(
    "Capital.PlusPlaceholder",
    () => PlusPlaceholder
  );
  Navigation.registerComponent("Capital.AddTransaction", () => AddTransaction);
}
