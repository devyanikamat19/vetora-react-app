import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import MyLearning from './pages/MyLearning';
import Learning from './pages/Learning';
import Explore from './pages/Explore';
import Clinical from './pages/Clinical';
import Admin from './pages/Admin';
import Certificates from './pages/Certificates';
import VetoraAI from './pages/VetoraAI';
import Profile from './pages/Profile';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/learning/:courseId/:lessonId" element={<Learning />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/clinical" element={<Clinical />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/ai" element={<VetoraAI />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
