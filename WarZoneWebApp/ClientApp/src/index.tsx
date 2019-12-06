import App from './App';
import configureStore, { IAppState } from '../src/components/redux/Store';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { getAllReceipts } from './components/redux/actions/ReceiptActions';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import 'bootstrap/dist/css/bootstrap.css';
/* import './index.css'; */

// Store type from Redux

// Import the store function and state

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

interface IProps {
  store: Store<IAppState>;
}

const store = configureStore();
store.dispatch(getAllReceipts());

const Root: React.SFC<IProps> = props => {
  return (
    <BrowserRouter >
      <Provider store={props.store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root store={store} />, rootElement);

registerServiceWorker();

