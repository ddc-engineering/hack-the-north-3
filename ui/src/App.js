import React, { Component } from "react";
import "./sass/App.scss";
import { initAll } from "govuk-frontend";
import Header from "./presentation/Header.react";
import Footer from "./presentation/Footer.react";
import Router from "./presentation/Router.react";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";

class App extends Component {
  componentDidMount() {
    initAll();
  }
  render() {
    return (
      <Provider store={configureStore()}>
        <div className="App">
          <Header />
          <Router />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
