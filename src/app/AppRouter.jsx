import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Timeline from "../pages/Timeline.jsx";
import Ending from "../pages/Ending.jsx";

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/ending" element={<Ending />} />
      </Routes>
    </HashRouter>
  );
}
