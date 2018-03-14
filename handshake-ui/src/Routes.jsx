import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/home/Home';
import Login from './containers/login/Login';
import Signup from './containers/signup/Signup';
import Dashboard from './containers/dashboard/Dashboard';
import NotFound from './containers/four0four/NotFound';
import AppliedRoute from './components/AppliedRoute';
import Documents from './containers/dashboard/sections/Documents';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute
      path="/dashboard"
      exact
      component={Dashboard}
      props={childProps}
    />
    <AppliedRoute
      path="/documents"
      exact
      component={Documents}
      props={childProps}
    />
    <AppliedRoute
      path="/video"
      exact
      component={Documents}
      props={childProps}
    />
    <AppliedRoute
      path="/audio"
      exact
      component={Documents}
      props={childProps}
    />
    <AppliedRoute
      path="/images"
      exact
      component={Documents}
      props={childProps}
    />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
