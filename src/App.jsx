import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import ForgetPassword from './components/ForgetPassword';
import ChangePassword from './components/ChangePassword';
import OTPVerify from './components/OTPVerify';
import ErrorBoundary from './components/AuthComponents/ErrorBoundary';
import NotFound from './components/AuthComponents/NotFound';
import ProtectedRoute from './components/AuthComponents/ProtectedRoute';
import AppBar from './components/Dashboard/AppBar';
import Project from './components/ProjectComponent/index';
import AddProject from './components/ProjectComponent/AddComponent/index';
import Estimate from './components/EstimationComponents/index';
import AddEstimate from './components/EstimationComponents/AddComponent/index';
import { ROUTES } from './constants/routes';

const App = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true");

  const handleLogin = () => {
    localStorage.setItem("isLogin", "true");
    setIsLogin(true);
  };


  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          {isLogin ? (
            <Routes>
              <Route path={ROUTES.HOME} element={
                <ProtectedRoute isAuthenticated={isLogin}>
                  <AppBar />
                </ProtectedRoute>}
              />
              {/* project */}
              <Route path={ROUTES.PROJECT} element={
                <ProtectedRoute isAuthenticated={isLogin}>
                  <Project />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.ADD_PROJECT} element={
                <ProtectedRoute isAuthenticated={isLogin}>
                  <AddProject />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.EDIT_PROJECT} element={
                <ProtectedRoute isAuthenticated={isLogin}>
                  <AddProject />
                </ProtectedRoute>
              } />
              {/* estimate */}
              <Route path={ROUTES.ESTIMATE} element={
                <ProtectedRoute isAuthenticated={isLogin}>
                  <Estimate />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.ADD_ESTIMATE} element={
                <ProtectedRoute isAuthenticated={isLogin}>
                  <AddEstimate />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.EDIT_ESTIMATE} element={
                <ProtectedRoute isAuthenticated={isLogin}>
                  <AddEstimate />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route path={ROUTES.HOME} element={<Login onLogin={handleLogin} />} />
              <Route path={ROUTES.LOGIN} element={<Login onLogin={handleLogin} />} />
              <Route path={ROUTES.REGISTER} element={<RegistrationForm />} />
              <Route path={ROUTES.FORGET_PASSWORD} element={<ForgetPassword />} />
              <Route path={ROUTES.VERIFY_OTP} element={<OTPVerify />} />
              <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
          )}
        </ErrorBoundary>
      </Router>
    </Provider>
  );
};

export default App;
