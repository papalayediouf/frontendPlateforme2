import { BrowserRouter, Routes, Route } from "react-router";

import FormationForm from "./components/FormationForm";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulaire" element={<FormationForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
