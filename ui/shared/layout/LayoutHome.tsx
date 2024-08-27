import React from 'react'

import type { Props } from './types'

import AppErrorBoundary from 'ui/shared/AppError/AppErrorBoundary'
import HeaderAlert from 'ui/snippets/header/HeaderAlert'
import HeaderMobile from 'ui/snippets/header/HeaderMobile'
import * as Layout from './components'
import Header from 'components/layout/header'

const LayoutHome = ({ children }: Props) => {
  return (
    <Layout.Container>
      {/* <Layout.TopRow />
      <Layout.NavBar /> */}
      <Header />
      {/* <HeaderMobile hideSearchBar /> */}
      {/* <HeaderAlert /> */}
      <AppErrorBoundary>{children}</AppErrorBoundary>
      <Layout.Footer />
    </Layout.Container>
  )
}

export default LayoutHome
