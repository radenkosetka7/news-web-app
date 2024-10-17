import './App.css';
import AppMenu from "./components/Menu/AppMenu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <BrowserRouter>
            <AppMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
