import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import 'antd/dist/antd.css';
import './styles/warzone.css';
import ConsentForm from './components/pages/ConsentForm';
import Offer from './components/pages/Offer';
import OfferLogin from './components/pages/OfferLogin';
import WarzoneLayout from './components/WarzoneLayout';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <Redirect from="/" to="/dashboard"></Redirect>
        <Route path="/" component={WarzoneLayout}></Route>
      </BrowserRouter>
      /*             <BrowserRouter>
                  <Switch>
                    <Route exact path="/" component={WarzoneLayout}></Route>
                    <Route path="/consent" component={ConsentForm}></Route>
                    <Route path="/offer" component={Offer}></Route>
                    <Route path="/offerlogin" component={OfferLogin}></Route>
                  </Switch>
                </BrowserRouter> */
    );
  }
}
