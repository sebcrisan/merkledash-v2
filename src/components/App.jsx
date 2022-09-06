import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./pages/signup/Signup";
// import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotpw/ForgotPassword";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute, ReversePrivateRoute } from "./PrivateRoute";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Verify from "./pages/verify/Verify";
import "../style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeContext";
import GetStarted from "./pages/getstarted/GetStarted";
import NotFound from "./pages/404/NotFound";

function App() {
  const {darkMode} = useContext(DarkModeContext)
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router basename="/">
        <AuthProvider>
              <Routes>
                <Route path="/" element={<Home/>} />
                {/* <Route exact path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/> */}
                <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                <Route path="/projects" element={<PrivateRoute><Projects/></PrivateRoute>}/>
                <Route path="/projects/:projectId" element={<PrivateRoute><Single/></PrivateRoute>}/>
                <Route path="/projects/new" element={<PrivateRoute><New/></PrivateRoute>}/>
                <Route path="/verify" element={<Verify/>}/>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<ReversePrivateRoute><Login/></ReversePrivateRoute>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/getstarted" element={<GetStarted/>} />
                <Route path="*" element={<NotFound></NotFound>}></Route>
              </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
