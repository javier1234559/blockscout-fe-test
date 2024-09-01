import AppLink from "components/common/app-link";
import { useTranslation } from "next-i18next";
import { getMenuItems } from "../data";
import TestnetBtn from "../testnet-btn";
import { Flex, Text } from "@chakra-ui/react";
import ChakraMenuItem from "components/common/menu-item";
function PCNavbar() {
  const { t } = useTranslation();
  const menuItems = getMenuItems(t);

  return (
    <nav>
      <Flex as="ul" alignItems="center">
        {menuItems.map((menu) => {
          if (menu.subItems) {
            return (
              <ChakraMenuItem key={menu.title} menuItems={menu.subItems}>
                {menu.title}
              </ChakraMenuItem>
            );
          }

          return (
            <li key={menu.title}>
              <Text
                as="span"
                fontSize="sm"
                fontWeight="semibold"
                lineHeight="tight"
                color="white"
              >
                <AppLink href={menu.link}>{menu.title}</AppLink>
              </Text>
            </li>
          );
        })}
        <li>
          <TestnetBtn />
        </li>
      </Flex>
    </nav>
  );
}

export default PCNavbar;
