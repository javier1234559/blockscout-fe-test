import { memo } from 'react'
import isEqual from 'react-fast-compare'


import TestnetBtn from '../testnet-btn'

import MenuHamburger from './menu-hamburger'
import { DefaultViewProps } from 'service/types/common'
import Logo from 'components/common/logo'

function MobileHeader() {
  return (
    <div className="flex items-center justify-between">
      <TestnetBtn/>

      <Logo />

      <MenuHamburger />
    </div>
  )
}

export default memo(MobileHeader, isEqual)
