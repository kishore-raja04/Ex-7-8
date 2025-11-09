import { Link, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Q5 from "./pages/Q5";

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
        <Link className="navbar-brand" to="/portfolio">My Portfolio</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/portfolio">Home</Link>
          <Link className="nav-link" to="/q5">Question 5</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/q5" element={<Q5 />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </>
  );
}
