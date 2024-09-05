/* eslint-disable no-restricted-imports */
// import AppLink from 'components/common/app-link'
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from 'components/ui/navigation-menu'

// interface Props {
//   children: React.ReactNode
//   menuItems: {
//     title: string
//     link: string
//   }[]
// }

// function MenuItem({ children, menuItems }: Props) {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger
//             onPointerMove={(event) => event.preventDefault()}
//             onPointerLeave={(event) => event.preventDefault()}
//           >
//             <li className="text-sm font-semibold leading-tight text-white">{children}</li>
//           </NavigationMenuTrigger>
//           <NavigationMenuContent
//             onPointerEnter={(event) => event.preventDefault()}
//             onPointerLeave={(event) => event.preventDefault()}
//             className="flex min-w-[150px] flex-col text-white"
//           >
//             {menuItems.map((item) => (
//               <NavigationMenuList key={item.title}>
//                 <AppLink
//                   href={item.link}
//                   className="w-full cursor-pointer !bg-white text-sm duration-200"
//                 >
//                   <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                     {item.title}
//                   </NavigationMenuLink>
//                 </AppLink>
//               </NavigationMenuList>
//             ))}
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   )
// }

// export default MenuItem

import React from "react";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

import AppLink from "components/common/app-link";

interface Props {
  children: React.ReactNode;
  menuItems: {
    title: string;
    link: string;
  }[];
}

function ChakraMenuItem({ children, menuItems }: Props) {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            rightIcon={
              <ChevronDown
                style={{
                  transform: isOpen ? "rotate(180deg)" : undefined,
                  transition: "transform 0.2s",
                }}
              />
            }
            bg="transparent"
            color="white"
            border="none"
            fontSize="0.875rem"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
          >
            {children}
          </MenuButton>
          <MenuList
            bg="#181923"
            width="max-content"
            sx={{
              minWidth: "2rem !important",
            }}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.title} minWidth="7rem">
                <AppLink className="hover:bg-[#1E2A3B] w-full" href={item.link}>
                  {item.title}
                </AppLink>
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export default ChakraMenuItem;
