import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import RegisterForm from "./components/RegisterForm";
import Layout from "./layouts/Layout";
import Unauthorized from "./components/Unauthorized";
import Home from "./components/Home";
import RequireAuth from "./components/RequiredAuth";

const ROLES = {
  'User': 1984,
  'Submitted': 2001,
  'Admin': 5150
}

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        
        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
  </Routes>
  );
}

export default App;