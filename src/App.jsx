import { Header } from "./components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/main/home";
import { Login } from "./pages/login";
import { CreatePost } from "./pages/createpost";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/createPost" element={<CreatePost />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
