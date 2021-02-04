import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "../components/Dashboard";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from "./Navigation";
import {ConnectTaskDetail} from "./TaskDatail";
import { Redirect } from "react-router"
const RouteGuard = Component => ({ match }) => {
  console.info("Route Guard", match);
  if (!store.getState().session.authenticated) {
     return <Redirect to="/" />
  } else {
      return <Component match={match} />
  }
}

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        {/*<ConnectedDashboard />
           <Route exact path="/dashboard" render={() => <ConnectedDashboard />} />
           <Route exact
          path="/task/:id"
          render={({match})=>(<ConnectTaskDetail match={match} />)}/>
        */}
        <ConnectedNavigation />
       <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)} />
        <Route exact
          path="/task/:id"
          render={RouteGuard(ConnectTaskDetail)}/>
      </div>
    </Provider>
  </Router>
);
