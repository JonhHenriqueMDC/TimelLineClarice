import { HashRouter, Routes, Route } from "react-router-dom";
import Timeline from "../pages/Timeline.jsx";


export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Timeline />} />
      </Routes>
    </HashRouter>
  );
}
