import AppLink from 'components/common/app-link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from 'components/ui/navigation-menu'

interface Props {
  children: React.ReactNode
  menuItems: {
    title: string
    link: string
  }[]
}

function MenuItem({ children, menuItems }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            <li className="text-sm font-semibold leading-tight text-white">{children}</li>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerEnter={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
            className="flex min-w-[150px] flex-col text-white"
          >
            {menuItems.map((item) => (
              <NavigationMenuList key={item.title}>
                <AppLink
                  href={item.link}
                  className="w-full cursor-pointer !bg-white text-sm duration-200"
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </AppLink>
              </NavigationMenuList>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuItem
