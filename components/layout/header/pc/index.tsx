import { memo } from 'react'
import isEqual from 'react-fast-compare'

import PCNavbar from './navbar'
import { DefaultViewProps } from 'service/types/common'
import Logo from 'components/common/logo'

function PCHeader({ dictionary }: DefaultViewProps) {
  return (
    <div className="flex items-center justify-between">
      <Logo />

      <PCNavbar dictionary={dictionary} />
    </div>
  )
}

export default memo(PCHeader, isEqual)
