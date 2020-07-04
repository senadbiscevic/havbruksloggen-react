import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar";
import Boats from "./components/boats";
import BoatForm from './components/boatForm';
import Sailors from "./components/sailors";
import SailorForm from './components/sailorForm';
import Itinerary from './components/itinerary';
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
      <ToastContainer />
      <NavBar/>
      <main className="container">
        <Switch>
          <Route path="/boats/:id" component={BoatForm} />
          <Route path="/boats" component={Boats} />
          <Route path="/sailors/:id" component={SailorForm} />
          <Route path="/sailors" component={Sailors} />
          <Route path="/itinerary" component={Itinerary} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/boats" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
    );
  }
}

export default App;
