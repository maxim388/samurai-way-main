import React from "react";
import { StoreType, store } from "./redux/redux-store";

type Provider = {
  store: StoreType;
  children: () => void;
};

export const Provider = (props: Provider) => {
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
};
export const StoreContext = React.createContext<StoreType>(store);
