import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentArticle } from './actions/articleActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import CreateArticle from './components/create-article/CreateArticle';
import EditArticle from './components/edit-article/EditArticle';

import CreateOrg from './components/create-org/CreateOrg';
import EditOrg from './components/edit-org/EditOrg';

import Articles from './components/articles/Articles';
import Article from './components/article/Article';

import Orgs from './components/orgs/Orgs';
import Org from './components/org/Org';

import Categorys from './components/categorys/Categorys';
import NotFound from './components/not-found/NotFound';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentArticle());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/articles" component={Articles} />
              <Route exact path="/orgs" component={Orgs} />
              <Route exact path="/article/:title" component={Article} />
              <Route exact path="/org/:org" component={Org} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-article"
                  component={CreateArticle}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-article"
                  component={EditArticle}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-org"
                  component={CreateOrg}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-org"
                  component={EditOrg}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Categorys} />
              </Switch>
              
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
