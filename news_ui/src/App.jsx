import './App.css';
import AppMenu from "./components/Menu/AppMenu";
import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";

function App() {

    useEffect(() => {

    }, []);
    return (
        <BrowserRouter>
           <AppMenu/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
