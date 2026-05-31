import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./components/layout/MainLayout";
import HeroSection from "./sections/HeroSection";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          {/* <Route path='/about' element = {<About/>} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
