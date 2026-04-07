import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import ApplicationList from '././components/ApplicationList';
import Application from '././components/Application';
import SignInForm from '././components/SignInForm';
import SignUpForm from '././components/SignUpForm';
import WelcomeSlate from '././components/WelcomeSlate';
import ServerError from '././components/ServerError';
import HomePage from '././components/HomePage';
import RegistrationSuccessForm from '././components/RegistrationSuccessForm';
import ProfileForm from '././components/ProfileForm';
import ApplyForm from '././components/ApplyForm';
import ApplicationSuccess from './components/ApplicationSuccess';


const Routes = () => (
<BrowserRouter>
<Switch>
    <Route exact path='/' component={WelcomeSlate} />
    <Route  path='/login' component={SignInForm} />
    <Route  path='/register' component={SignUpForm} />
    <Route  path='/home' component={HomePage} />
    <Route  path='/regsucc' component={RegistrationSuccessForm} />
    <Route  path='/:aid/profile' component={ProfileForm} />
    <Route  path='/:aid/apply' component={ApplyForm} />
    <Route  path='/appsucc' component={ApplicationSuccess} />
    <Route exact path='/applications' component={ApplicationList} />
    <Route exact path='/:aid/application' component={Application} />
    <Route exact path='/serverError' component={ServerError} />
</Switch>
</BrowserRouter>
);

export default Routes;