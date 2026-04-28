import { payoutType } from "../../features/cart/types/payoutType";
import { ProductType } from "./product.type";

export type RootStackParamList = {
  Onboard: undefined;
  Login: undefined;
  Signup: undefined;
  Recovery: undefined;
   Drawer: { screen: string } | undefined; 
  Details: {item: ProductType} | undefined;
 
  Checkout: {price: payoutType};
  bestSeller: { screen: string } | undefined; 
  Search: undefined;
  Product:{search:string} |undefined;
  Cart:undefined
};