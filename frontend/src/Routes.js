import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

// SLATE (Admissions) routes
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

// PAWS (Student Portal) routes
import WelcomePaws from './components/WelcomePaws';
import PawsSignInForm from './components/PawsSignInForm';
import PawsHomePage from './components/PawsHomePage';
import PawsSemesterSelect from './components/PawsSemesterSelect';
import PawsAddDropCourses from './components/PawsAddDropCourses';
import PawsSchedule from './components/PawsSchedule';
import PawsViewFees from './components/PawsViewFees';
import PawsGetApplicants from './components/PawsGetApplicants';
import PawsStatistics from './components/PawsStatistics';
import PawsGetStatistics from './components/PawsGetStatistics';

// OGMS (Office of Graduate Management) routes
import WelcomeOgms from './components/WelcomeOgms';
import OgmsGetStudents from './components/OgmsGetStudents';
import OgmsGetStudentsView from './components/OgmsGetStudentsView';
import OgmsGetCourses from './components/OgmsGetCourses';
import OgmsGetCoursesView from './components/OgmsGetCoursesView';
import OgmsGetEnrolls from './components/OgmsGetEnrolls';
import OgmsGetEnrollsView from './components/OgmsGetEnrollsView';
import OgmsAwardAssistantship from './components/OgmsAwardAssistantship';
import OgmsGradeUpdate from './components/OgmsGradeUpdate';

const Routes = () => (
<BrowserRouter>
<Switch>
    {/* SLATE – Admissions Portal */}
    <Route exact path='/' component={WelcomeSlate} />
    <Route path='/login' component={SignInForm} />
    <Route path='/register' component={SignUpForm} />
    <Route path='/home' component={HomePage} />
    <Route path='/regsucc' component={RegistrationSuccessForm} />
    <Route path='/:aid/profile' component={ProfileForm} />
    <Route path='/:aid/apply' component={ApplyForm} />
    <Route path='/appsucc' component={ApplicationSuccess} />
    <Route exact path='/applications' component={ApplicationList} />
    <Route exact path='/:aid/application' component={Application} />
    <Route exact path='/serverError' component={ServerError} />

    {/* PAWS – Student Portal */}
    <Route exact path='/paws' component={WelcomePaws} />
    <Route path='/paws/login' component={PawsSignInForm} />
    <Route path='/paws/home' component={PawsHomePage} />
    <Route path='/paws/semesterselect' component={PawsSemesterSelect} />
    <Route path='/paws/adddropcourses' component={PawsAddDropCourses} />
    <Route path='/paws/schedule' component={PawsSchedule} />
    <Route path='/paws/viewfees' component={PawsViewFees} />
    <Route exact path='/paws/applications' component={PawsGetApplicants} />
    <Route exact path='/paws/statistics' component={PawsStatistics} />
    <Route exact path='/paws/getstats' component={PawsGetStatistics} />

    {/* OGMS – Office of Graduate Management */}
    <Route exact path='/ogms' component={WelcomeOgms} />
    <Route exact path='/ogms/getstudents' component={OgmsGetStudents} />
    <Route exact path='/ogms/getstudentsview' component={OgmsGetStudentsView} />
    <Route exact path='/ogms/getcourses' component={OgmsGetCourses} />
    <Route exact path='/ogms/getcoursesview' component={OgmsGetCoursesView} />
    <Route exact path='/ogms/getenrolls' component={OgmsGetEnrolls} />
    <Route exact path='/ogms/getenrollsview' component={OgmsGetEnrollsView} />
    <Route exact path='/ogms/awardassistantship' component={OgmsAwardAssistantship} />
    <Route exact path='/ogms/gradeupdate' component={OgmsGradeUpdate} />
</Switch>
</BrowserRouter>
);

export default Routes;