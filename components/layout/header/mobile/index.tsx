import { memo } from 'react'
import isEqual from 'react-fast-compare'

import Logo from '@/components/common/logo'

import { DefaultViewProps } from '@/types/common'

import TestnetBtn from '../testnet-btn'

import MenuHamburger from './menu-hamburger'

function MobileHeader({ dictionary }: DefaultViewProps) {
  return (
    <div className="flex items-center justify-between">
      <TestnetBtn dictionary={dictionary} />

      <Logo />

      <MenuHamburger />
    </div>
  )
}

export default memo(MobileHeader, isEqual)
