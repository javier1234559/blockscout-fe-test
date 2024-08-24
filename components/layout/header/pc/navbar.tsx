import { memo } from 'react'
import isEqual from 'react-fast-compare'

import AppLink from 'components/common/app-link'
import MenuItem from 'components/common/menu-item'

import { getMenuItems } from '../data'
import TestnetBtn from '../testnet-btn'
import { DefaultViewProps } from 'service/types/common'

function PCNavbar({ dictionary }: DefaultViewProps) {
  const menuItems = getMenuItems(dictionary)

  return (
    <nav>
      <ul className="flex items-center gap-8">
        {menuItems.map((menu) => {
          if (menu.subItems) {
            return (
              <MenuItem key={menu.title} menuItems={menu.subItems}>
                {menu.title}
              </MenuItem>
            )
          }

          return (
            <li key={menu.title} className="text-sm font-semibold leading-tight text-white">
              <AppLink href={menu.link}>{menu.title}</AppLink>
            </li>
          )
        })}
        <li>
          {/* <TestnetBtn dictionary={dictionary} /> */}
        </li>
      </ul>
    </nav>
  )
}

export default memo(PCNavbar, isEqual)
