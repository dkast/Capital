import { Navigation } from "react-native-navigation";

import Transactions from "./transactions";
import PlusPlaceholder from "./plusPlaceholder";
import AddTransaction from "./addTransaction";

export function registerScreens() {
  Navigation.registerComponent("Capital.Transactions", () => Transactions);
  Navigation.registerComponent(
    "Capital.PlusPlaceholder",
    () => PlusPlaceholder
  );
  Navigation.registerComponent("Capital.AddTransaction", () => AddTransaction);
}
