import HomePage from './components/HomePage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/Dashboard';
import './App.css';
import ListVehiclePage from "./components/ListVehiclePage.jsx";
import AddVehicle from "./components/AddVehicle.jsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/auth" element={<AuthPage/>}/>
                    <Route path="/dashboard" element={<AdminDashboard/>}/>
                    <Route path="/vehicles" element={<ListVehiclePage/>}/>
                    <Route path="/add-vehicle" element={<AddVehicle/>}/>
                    <Route path="/add-vehicle/:id" element={<AddVehicle/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
