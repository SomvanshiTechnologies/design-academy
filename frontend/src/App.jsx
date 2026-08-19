import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import EducationDirections from "./components/EducationDirections";
import Herobox from "./components/Herobox";
import AboutUs from "./components/AboutUs";
import Course from "./components/Course";
import FounderMessage from "./components/FounderMessage";
import Testimonials from "./components/testimonials/index";
import Footer from "./components/Footer";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import BlogSection from "./components/BlogSection";
import EventSection from "./components/EventSection";
import BlogDetail from "./pages/BlogDetail";
import AllBlogs from "./pages/AllBlogs";
import AllEvents from "./pages/AllEvents";
import CourseDetail from "./components/courses/CourseDetail";
import ContactUs from "./components/ContactUs";
import Enrollments from "./components/Enrollment";
import FloatingActionBox from "./components/FloatingActionBox";
import WhyUs from "./components/WhyUs";
import Gallery from "./components/Gallery";
import Home from "./pages/Home";
import ContactFormPopup from "./components/ContactFormPopup";
import StudentWorkPage from "./pages/StudentWorkPage";
import ScrollToTop from "./components/ScrollToTop";
import GlobalChatAssistant from "./components/GlobalChatAssistant";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";

const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [location]);

  return <ScrollToTop />;
};

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <ScrollHandler />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/student-work" element={<StudentWorkPage />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/course" element={<Course />} />
            <Route path="/enrollment" element={<Enrollments />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/courses/:courseName" element={<CourseDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />

            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingActionBox />
          <ContactFormPopup />
          <GlobalChatAssistant />
          <Footer />
        </div>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
