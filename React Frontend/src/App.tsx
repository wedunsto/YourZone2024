import { Routes, Route } from "react-router-dom";
import UnauthorizedView from "./views/UnauthorizedView";
import RequireAuth from "./components/RequiredAuth";
import LogInView from "./views/LogInView";
import RegisterView from "./views/RegisterView";
import HomePageView from "./views/HomePageView";
import MissingView from "./views/MissingView";
import YourBibleView from "./views/YourBibleView";

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
      <Route path="/unauthorized" element={<UnauthorizedView />} />

      {/* Private routes */}
      <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="/home" element={<HomePageView />} />
          <Route path="/yourbible" element={<YourBibleView />} />
      </Route>

      {/* catch all */}
      <Route path="*" element={<MissingView />} />
    </Routes>
  );
}

export default App;