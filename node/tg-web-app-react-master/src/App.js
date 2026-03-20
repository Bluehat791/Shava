import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./components/hooks/useTelegram.js";
import Header from "./components/Header/Header.jsx";
import {Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList.jsx";
import Form from "./components/Form/Form.jsx";

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route index element={<ProductList />}/>
                <Route path={'form'} element={<Form />}/>
            </Routes>
        </div>
    );
}

export default App;