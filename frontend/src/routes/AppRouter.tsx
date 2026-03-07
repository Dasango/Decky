import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/private/Dashboard";
import StudySession from "../pages/private/StudySession";
import EditDeck from "../pages/private/EditDeck";
import { LayoutSelector } from "../components/layout/LayoutSelector";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <LayoutSelector>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/study/:deckId" element={<StudySession />} />
                    <Route path="/edit/:deckId" element={<EditDeck />} />
                </Routes>
            </LayoutSelector>
        </BrowserRouter>
    );
};

export default AppRouter;