import { Routes, Route } from "react-router-dom";

import ProfileSelection from "./pages/ProfileSelection";
import SetupConfiguration from "./pages/SetupConfiguration";
import ReviewSetup from "./pages/ReviewSetup";
import Execution from "./pages/Execution";
import Completion from "./pages/Completion";

function App() {
    return (
        <Routes>

            <Route
                path="/"
                element={<ProfileSelection />}
            />

            <Route
                path="/setup"
                element={<SetupConfiguration />}
            />

            <Route
                path="/review"
                element={<ReviewSetup />}
            />

            <Route
                path="/execution"
                element={<Execution />}
            />

            <Route
                path="/completion"
                element={<Completion />}
            />

        </Routes>
    );
}

export default App;