import './App.css';
import AppMenu from "./components/Menu/AppMenu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import SectionNews from "./pages/SectionNews/SectionNews";
import SubsectionNews from "./pages/SubsectionNews/SubsectionNews";
import NewsDetails from "./pages/NewsDetails/NewsDetails";
import {Statistic} from "antd";


function App() {
    return (
        <BrowserRouter>
            <AppMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/:section" element={<SectionNews />} />
                <Route path="/:section/:subsection" element={<SubsectionNews />} />
                <Route path="/:section/:subsection/:title/:id" element={<NewsDetails/>} />
                <Route path="/statistic" element={<Statistic />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
