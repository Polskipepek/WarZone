import ConsentForm from './components/pages/ConsentForm';
import Home from './components/pages/Home';
import Offer from './components/pages/Offer';
import OfferLogin from './components/pages/OfferLogin';
import React, { Component } from 'react';
import Receipts from './components/pages/Receipts';
import Resources from './Resources';
import WarzoneLayout from './components/WarzoneLayout';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Redirect, Route, Switch } from 'react-router';
import './styles/warzone.css';
import 'antd/dist/antd.css';



const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <WarzoneLayout >
        <Switch>
          <Route path={Resources.pageAdresses.home} exact component={Home} />
          <Route path={Resources.pageAdresses.consent} component={ConsentForm} />
          <Route path={Resources.pageAdresses.offer} component={Offer} />
          <Route path={Resources.pageAdresses.receipts} component={Receipts} />

        </Switch>
      </WarzoneLayout>

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

export default App;