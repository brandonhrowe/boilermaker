import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { getUser } from "./reducer";
import Login from "./Login";
import UserPage from "./UserPage";
import store from "./store";

const Main = withRouter(
  class extends Component {
    componentDidMount() {
      store.dispatch(getUser()).then(() => this.props.history.push("/home"));
    }

    render() {
      return (
        <Switch>
          <Route path="/home" component={UserPage} />
          <Route component={Login} />
        </Switch>
      );
    }
  }
);

export default Main;
