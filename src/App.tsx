import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          {/* <Route path='/about' element = {<About/>} /> */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
