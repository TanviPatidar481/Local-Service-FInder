import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ListBusiness from "./pages/ListBusiness";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/list-business" element={<ListBusiness />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;