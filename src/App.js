import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import
{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminSignIn from "./pages/AdminSignIn";


function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-signin" element={<AdminSignIn />} />
        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;
