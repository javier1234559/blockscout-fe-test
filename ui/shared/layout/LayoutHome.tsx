import React from "react";

import type { Props } from "./types";

import AppErrorBoundary from "ui/shared/AppError/AppErrorBoundary";
// import * as Layout from "./components";
import Header from "components/layout/header";
import Footer from "components/layout/footer";

const LayoutHome = ({ children }: Props) => {
  return (
    <>
      <Header />
      {/* <HeaderMobile hideSearchBar /> */}
      {/* <HeaderAlert /> */}
      <AppErrorBoundary>{children}</AppErrorBoundary>
      {/* <Layout.Footer /> */}
      <Footer />
    </>
  );
};

export default LayoutHome;
