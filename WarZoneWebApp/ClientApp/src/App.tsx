import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import 'antd/dist/antd.css';
import './styles/warzone.css';
import ConsentForm from './components/pages/ConsentForm';
import Offer from './components/pages/Offer';
import OfferLogin from './components/pages/OfferLogin';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/consent" component={ConsentForm}></Route>
          <Route path="/offer" component={Offer}></Route>
          <Route path="/offerlogin" component={OfferLogin}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
