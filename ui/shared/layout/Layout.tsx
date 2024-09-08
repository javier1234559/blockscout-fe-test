import React from "react";

import type { Props } from "./types";

import AppErrorBoundary from "ui/shared/AppError/AppErrorBoundary";
import HeaderAlert from "ui/snippets/header/HeaderAlert";
import HeaderDesktop from "ui/snippets/header/HeaderDesktop";
import HeaderMobile from "ui/snippets/header/HeaderMobile";

import Header from "components/layout/header";
import Footer from "components/layout/footer";
import Container from "ui/shared/layout/components/Container";

const LayoutDefault = ({ children }: Props) => {
  return (
    <>
      <Header />
      <AppErrorBoundary>{children}</AppErrorBoundary>
      <Footer />
    </>

    // <Layout.Container>
    //   <Layout.TopRow/>
    //   <Layout.NavBar/>
    //   <HeaderMobile/>
    //   <Layout.MainArea>
    //     <Layout.SideBar/>
    //     <Layout.MainColumn>
    //       <HeaderAlert/>
    //       <HeaderDesktop/>
    //       <AppErrorBoundary>
    //         <Layout.Content>
    //           { children }
    //         </Layout.Content>
    //       </AppErrorBoundary>
    //     </Layout.MainColumn>
    //   </Layout.MainArea>
    //   <Layout.Footer/>
    // </Layout.Container>
  );
};

export default LayoutDefault;
