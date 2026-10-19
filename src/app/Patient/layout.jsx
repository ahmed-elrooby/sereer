
import PatientContext from "../providers/PatientContext.jsx";

import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header.jsx";

export default function PatientLayout({ children }) {
  return (
    <PatientContext>
      <Header />
      {children}
      <Footer />
    </PatientContext>
  );
}
