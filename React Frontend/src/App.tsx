import { Routes, Route } from "react-router-dom";
import UnauthorizedView from "./views/UnauthorizedView";
import RequireAuth from "./components/RequiredAuth";
import LogInView from "./views/LogInView";
import RegisterView from "./views/RegisterView";
import UserApprovalView from "./views/UserApprovalView";
import HomePageView from "./views/HomePageView";
import MissingView from "./views/MissingView";
import YourBibleView from "./views/YourBibleView";

const userRole = import.meta.env.VITE_USER_ROLE;
const adminRole = import.meta.env.VITE_ADMIN_ROLE;

const App = () => {
console.log(userRole)
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LogInView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/unauthorized" element={<UnauthorizedView />} />

      {/* Private routes */}
      <Route element={<RequireAuth allowedRoles={[userRole, adminRole]} />}>
          <Route path="/home" element={<HomePageView />} />
          <Route path="/yourbible" element={<YourBibleView />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[adminRole]} />}>
          <Route path="/userapproval" element={<UserApprovalView />} />
      </Route>

      {/* catch all */}
      <Route path="*" element={<MissingView />} />
    </Routes>
  );
}

export default App;