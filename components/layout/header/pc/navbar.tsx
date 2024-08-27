import AppLink from 'components/common/app-link'
import MenuItem from 'components/common/menu-item'
import { useTranslation } from 'next-i18next';
import { getMenuItems } from '../data'
import TestnetBtn from '../testnet-btn'

function PCNavbar() {
  const { t } = useTranslation()
  const menuItems = getMenuItems(t)

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
          <TestnetBtn/>
        </li>
      </ul>
    </nav>
  )
}

export default PCNavbar
