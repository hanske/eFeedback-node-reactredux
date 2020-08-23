import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";

// Dummy components for now
//const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
//const Landing = () => <h2>Landing</h2>;

// BrowserRouter require atmost 1 child (1 div)
// When you want to show an always visible component, put it topmost and don't put inside Route
class App extends Component {
  //The instance this component is mounted on the screen, go and fetch current user
  componentDidMount() {
    // wire up react-redux connection in order to call action creator from Redux
    this.props.fetchUser();
  }
  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route exact path='/surveys' component={Dashboard} />
            <Route path='/surveys/new' component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
