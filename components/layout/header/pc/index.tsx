import { memo } from 'react'
import isEqual from 'react-fast-compare'

import PCNavbar from './navbar'
import { DefaultViewProps } from 'service/types/common'
import Logo from 'components/common/logo'

function PCHeader() {
  return (
    <div className="flex items-center justify-between">
      <Logo />

      <PCNavbar/>
    </div>
  )
}

export default memo(PCHeader, isEqual)
