import { memo } from 'react'
import isEqual from 'react-fast-compare'

import Logo from '@/components/common/logo'

import { DefaultViewProps } from '@/types/common'

import PCNavbar from './navbar'

function PCHeader({ dictionary }: DefaultViewProps) {
  return (
    <div className="flex items-center justify-between">
      <Logo />

      <PCNavbar dictionary={dictionary} />
    </div>
  )
}

export default memo(PCHeader, isEqual)
