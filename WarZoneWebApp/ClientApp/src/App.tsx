import AuthorizedView from './components/views/AuthorizedView';
import ConsentContent from './components/pages/Consent';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Offer from './components/pages/Offer';
import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState
  } from 'react';
import Receipts from './components/pages/Receipts';
import Resources from './Resources';
import WarzoneLayout from './components/WarzoneLayout';
import {
  AppUser,
  IAppUser,
  IReceipt,
  SwaggerException,
  UsersClient
  } from './ApiClient';
import { BrowserRouter } from 'react-router-dom';
import { openErrorNotification, openNotification } from './helpers/NotificationHelper';
import { Redirect, Route, Switch } from 'react-router';
import './styles/warzone.css';
import 'antd/dist/antd.css';

const usePersistentState = (key: string, defaultValue: any) => {
  const _key = `persistent_state_${key}`;
  const [getPersistentState, setPersistentState] = useState(() => {
    var storageItem = localStorage.getItem(_key);
    if (storageItem) {
      try {
        return JSON.parse(storageItem);
      } catch{
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(_key, JSON.stringify(getPersistentState));
  }, [key, getPersistentState]);
  return [getPersistentState, setPersistentState];
}

export interface IPersistentState {
  usePersistentState: (key: string, defaultValue: any) => any[];
}

export interface IAppContext {
  toggleAppUser: ((newAppUser: IAppUser | undefined) => void) | undefined;
  appUser: IAppUser | undefined;
  selectedReceipt?: IReceipt | undefined;
  toggleSelectedReceipt: ((receipt: IReceipt | undefined) => void) | undefined;
}

export const PersistentStateContext = createContext<IPersistentState>({ usePersistentState: usePersistentState });
const defaultAppContext: IAppContext = {
  toggleAppUser: undefined,
  appUser: undefined,
  selectedReceipt: undefined,
  toggleSelectedReceipt: undefined
}
export const AppContext = createContext<IAppContext>(defaultAppContext);

const App: React.FunctionComponent = () => {
  useEffect(() => {
    CheckIfAuthorized();
  }, [])

  const { usePersistentState } = useContext<IPersistentState>(PersistentStateContext);
  const [appUser, setAppUser] = usePersistentState(Resources.persistentKeys.appUser, undefined);
  const [selectedReceipt, setSelectedReceipt] = useState<IReceipt | undefined>(undefined);

  const toggleAppUser = (newAppUser: IAppUser | undefined) => {
    /*     setAppUserToken(newAppUser ? newAppUser.token : undefined); */
    setAppUser(newAppUser);
  };

  const toggleSelectedReceipt = (receipt: IReceipt | undefined) => {
    setSelectedReceipt(receipt);
  };

  const CheckIfAuthorized = () => {
    new UsersClient().authorize().then(appUser => {
      toggleAppUser(appUser ? appUser : undefined);
    }).catch(ex => {
      if (SwaggerException.isSwaggerException(ex) && (ex as SwaggerException).status === 401) {
        toggleAppUser(undefined);
      }
    });
  }

  const TryLogin = (username: string, password: string) => {
    new UsersClient().authenticate(username, password).then(resp => {
      toggleAppUser(resp ? resp : undefined);
      openNotification(`Zalogowano!`, `Witaj użytkowniku.`);
    }).catch(ex => {
      if (SwaggerException.isSwaggerException(ex) && (ex as SwaggerException).status === 400) {
        toggleAppUser(undefined);
        openErrorNotification(`Błąd!`, `Nieprawidłowe dane logowania.`)
      }
    });
  }


  return (
    <BrowserRouter>
      <PersistentStateContext.Provider value={{ usePersistentState }}>
        <AppContext.Provider value={{ toggleAppUser, appUser, selectedReceipt, toggleSelectedReceipt }}>
          <WarzoneLayout>
            <AuthorizedView authorized={appUser}> {/* USER PAGES */}
              <Switch>
                <Redirect from="/login" to={Resources.pageAdresses.home} />
                <Route path={Resources.pageAdresses.home} component={Home} />
                <Route path={Resources.pageAdresses.consent} component={ConsentContent} />
                <Route path={Resources.pageAdresses.offer} component={Offer} />
                <AuthorizedView authorized={appUser && appUser.id === 1}> {/* ADMIN PAGE */}
                  <Route path={Resources.pageAdresses.receipts} component={Receipts} />
                  <Redirect from="/" to={Resources.pageAdresses.receipts} />
                </AuthorizedView>
                <Redirect from="/" to={Resources.pageAdresses.home} />
              </Switch>
            </AuthorizedView>
            <AuthorizedView authorized={appUser === undefined}> {/* NOT AUTHORIZED PAGE */}
              <Switch>
                <Route
                  path={Resources.pageAdresses.login}
                  render={(props) => <Login {...props} TryLogin={TryLogin} />}
                />
              </Switch>
              <Redirect from="/" to={Resources.pageAdresses.login} />
            </AuthorizedView>
          </WarzoneLayout>
        </AppContext.Provider>
      </PersistentStateContext.Provider>
    </BrowserRouter >

  );
}
export default App;