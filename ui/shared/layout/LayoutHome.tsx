import React from 'react';

import type { Props } from './types';

import AppErrorBoundary from 'ui/shared/AppError/AppErrorBoundary';
import HeaderAlert from 'ui/snippets/header/HeaderAlert';
import HeaderMobile from 'ui/snippets/header/HeaderMobile';
import * as Layout from './components';
import Header from 'components/layout/header';

interface LayoutHomeProps {
  dictionary: any;
  children: React.ReactNode;
}

const LayoutHome = ({ children ,dictionary }:LayoutHomeProps ) => {
  return (
    <Layout.Container>
      <Layout.TopRow/>
      <Layout.NavBar/>
      <Header dictionary={dictionary} />
      <HeaderMobile hideSearchBar/>
      <Layout.MainArea>
        {/* <Layout.SideBar />   */}
        <Layout.MainColumn paddingTop={{ base: 3, lg: 6 }}>
          <HeaderAlert/>
          <AppErrorBoundary>{ children }</AppErrorBoundary>
        </Layout.MainColumn>
      </Layout.MainArea>
      <Layout.Footer/>
    </Layout.Container>
  );
};

export default LayoutHome;
