import { Routes, Route } from "react-router-dom";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequiredAuth";
import LogInView from "./views/LogInView";
import RegisterView from "./views/RegisterView";
import HomePage from "./components/HomePage";

const ROLES = {
  'User': 1984,
  'Submitted': 2001,
  'Admin': 5150
}

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LogInView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Private routes */}
      <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
    </Routes>
  );
}

/*
const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes }
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        
        {/* we want to protect these routes}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
  </Routes>
  );
}*/

export default App;