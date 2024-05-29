import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import JobsScreen from "./screens/JobsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProfileScreen from "./screens/ProfileScreen";
import RecruiterRoute from "./components/RecruiterRoute";
import PostJobScreen from "./screens/PostJobScreen";
import PostedJobsScreen from "./screens/PostedJobsScreen";
import JobPostEditScreen from "./screens/JobPostEditScreen";
import AppliedJobScreen from "./screens/AppliedJobScreen";
import CandidateProfile from "./screens/CandidateProfile";
import AppliedCandidatesScreen from "./screens/AppliedCandidatesScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/jobs/:id" element={<JobsScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/profile/applied-jobs" element={<AppliedJobScreen />} />
      </Route>

      <Route path="" element={<RecruiterRoute />}>
        <Route path="/recruiter/postjobs" element={<PostJobScreen />} />
        <Route path="/recruiter/posted/:id" element={<PostedJobsScreen />} />
        <Route path="/recruiter/editjob/:id" element={<JobPostEditScreen />} />
        <Route path="/recruiter/appliedcandidates/:id" element={<AppliedCandidatesScreen />} />
        <Route path="/candidate/:id" element={<CandidateProfile />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
