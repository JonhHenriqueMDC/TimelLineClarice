import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Timeline.jsx";
import Timeline from "../pages/Timeline.jsx";
import Ending from "../pages/Timeline.jsx";

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/ending" element={<Timeline />} />
      </Routes>
    </HashRouter>
  );
}
