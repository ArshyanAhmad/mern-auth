import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/verify-email" element={<VerifyEmail />} />
         <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
   );
};

export default App;
