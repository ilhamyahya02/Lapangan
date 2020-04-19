import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Home from "./page/Home";
import Admin from "./page/Admin";
import AdminData from "./page/AdminData";
import Register from "./page/Register";
import Login from "./page/Login";
import Sewa from "./page/Sewa";

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/admindata" component={AdminData} />
        {/* <Route exact path="/admin" component={Admin} /> */}


        <Route path="/home">
          <Navbar />
          <Home />
        </Route>
        <Route path="/admin">
          <Navbar />
          <Admin />
        </Route>
        <Route path="/sewa">
          <Navbar />
          <Sewa />
        </Route>
      </Switch>
    );
  }
}

export default Main;
