import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./i18n/i18n";
import Header from "./components/Header";
import EligibilityCarousel from "./components/EligibilityCarousel";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Saved from "./pages/Saved";
import Learn from "./pages/Learn";
import InternshipDetails from "./pages/InternshipDetails";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <I18nProvider>
            <Router>
                <div className="min-h-screen bg-white flex flex-col">
                    <Header />
                    <EligibilityCarousel />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/saved" element={<Saved />} />
                            <Route path="/learn" element={<Learn />} />
                            <Route
                                path="/details/:id"
                                element={<InternshipDetails />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </I18nProvider>
    );
}

export default App;
