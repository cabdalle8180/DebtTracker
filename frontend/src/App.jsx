// import LoginPage from "./pages/LoginPage"
// import SignUpPage from "./pages/SignUpPage"
// import { Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <div className= "">
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//       </Routes>

//     </div>
//   )
// }

// export default App













import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage/>} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;