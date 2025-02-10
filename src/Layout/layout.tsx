import React from "react";

import { FooterWithSocialLinks } from "./Footer.jsx";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main> {/* Tutaj pojawi się zawartość strony */}
      
      {/* <FooterWithSocialLinks /> */}
    </div>
  );
};

export default Layout;
