import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import AutoRefreshToken from './components/AutoRefreshToken.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { Signup } from './components/Signup.jsx';
import { Login } from './components/Login.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import ImageClassifier from './components/ImageClassifier.jsx';
import Efacility from './components/Efacility.jsx';
import Notifications from './components/Notifications.jsx';
import Price_List from './components/Price_List.jsx';
import Recycle_Form from './components/Recycle_Form.jsx';
import Profile from './components/Profile.jsx';
import ScrapCollectorDashboard from './components/ScrapCollectorDashboard.jsx';
import ScrapCollectorOrders from './components/ScrapCollectorOrders.jsx';
import ScrapRequestDetails from './components/ScrapRequestDetails.jsx';
import PendingPayments from './components/PendingPayments.jsx';
import Payment from './components/Payment.jsx';
import ScrapCollectorProfile from './components/ScrapCollectorProfile.jsx';
import AuthTest from './components/AuthTest.jsx';
function AppContent() {
  const location = useLocation();
  const hideLayoutFor = ['/scrap-collector', '/orders', '/pending-order', '/scrap-collector/profile']; // add more paths if needed
  const shouldHideLayout = hideLayoutFor.includes(location.pathname) || location.pathname.startsWith('/scraprequest-details/') || location.pathname.startsWith('/payment/');

  return (
    <>
      <AutoRefreshToken />
      {!shouldHideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth-test" element={<AuthTest />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/classify-image" element={<ImageClassifier />} />
        <Route path="/e-facility" element={<Efacility />} />
        <Route path="/notification" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/prices" element={<Price_List />} />
        <Route path="/recycle_main/:user_id" element={<ProtectedRoute><Recycle_Form /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        {/* Scrap collector Routes */}
        <Route path="/scrap-collector" element={<ProtectedRoute><ScrapCollectorDashboard /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><ScrapCollectorOrders /></ProtectedRoute>} />
        <Route path="/scraprequest-details/:orderId" element={<ProtectedRoute><ScrapRequestDetails /></ProtectedRoute>} />
        <Route path="/pending-order" element={<ProtectedRoute><PendingPayments /></ProtectedRoute>} />
        <Route path="/payment/:order_id/:user/" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/scrap-collector/profile/" element={<ProtectedRoute><ScrapCollectorProfile /></ProtectedRoute>} />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
