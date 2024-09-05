import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChallengeForm from './components/ChallengeForm';
import ChallengeOverview from './components/ChallengeOverview';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/challenges/:id" element={<ChallengeForm />} />
                <Route path="/challengesoverview/:id" element={<ChallengeOverview />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;