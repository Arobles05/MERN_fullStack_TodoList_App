import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "../components/Dashboard";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from "./Navigation";
import {ConnectTaskDetail} from "./TaskDatail";

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        {/*<ConnectedDashboard />*/}
        <ConnectedNavigation />
        <Route exact path="/dashboard" render={() => <ConnectedDashboard />} />
        <Route exact
          path="/task/:id"
          render={({match})=>(<ConnectTaskDetail match={match} />)}/>
      </div>
    </Provider>
  </Router>
);
