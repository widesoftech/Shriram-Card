import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar (1)";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Cards from "./components/Cards (1)";
import Card from "./components/Card";
import Forms from "./components/Forms";
import PrivateRouts from "./components/auth/PrivateRouts";
import FormsFilds from "./components/FormsFilds";
import Secondform from "./components/Secondform";
import Admin from "./pages/Admin";
// import IdCard from './pages/IdCard'
import IdCardJDVertical from "./pages/IdCardJDVertical";
import IdCardJDHorizontal from "./pages/IdCardJDHorizontal";
import Templates from "./pages/Templates";
import SubmissionSuccess from "./pages/SubmissionSuccess";
import AddTemplates from "./pages/AddTemplates";
import ImageSwiper from "./pages/ImageSwiper";
import AboutUs from "./components/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import WhatsAppIcon from "./components/WhatsAppIcon";

function App() {
  return (
    <div className=" bg-white">
      <Navbar />
      <WhatsAppIcon />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<SubmissionSuccess />} />
        <Route
          path="/card"
          element={
            <PrivateRouts>
              <Card />
            </PrivateRouts>
          }
        />
        <Route
          path="/template"
          element={
            <PrivateRouts>
              <Cards />
            </PrivateRouts>
          }
        />
        <Route
          path="/forms"
          element={
            <PrivateRouts>
              <FormsFilds />
            </PrivateRouts>
          }
        />
        <Route path="/detailsform/:fieldsId/:role" element={<Secondform />} />
        <Route
          path="/admin"
          element={
            <PrivateRouts>
              <Admin />
            </PrivateRouts>
          }
        />
        <Route
          path="/IdCardV"
          element={
            <PrivateRouts>
              <IdCardJDVertical />
            </PrivateRouts>
          }
        />
        <Route
          path="/IdCardH"
          element={
            <PrivateRouts>
              <IdCardJDHorizontal />
            </PrivateRouts>
          }
        />
        <Route
          path="/allTemplates"
          element={
            <PrivateRouts>
              <Templates />
            </PrivateRouts>
          }
        />
        <Route
          path="/addTemplates"
          element={
            <PrivateRouts>
              <AddTemplates />
            </PrivateRouts>
          }
        />
        <Route
          path="/All-Templates"
          element={
            <PrivateRouts>
              <ImageSwiper />
            </PrivateRouts>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
