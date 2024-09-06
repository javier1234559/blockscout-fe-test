import { memo } from "react";
import isEqual from "react-fast-compare";

import PCNavbar from "./navbar";
import Logo from "components/common/logo";
import { Flex } from "@chakra-ui/react";

function PCHeader() {
  return (
    <Flex align="center" justify="space-between">
      <Logo />
      <PCNavbar />
    </Flex>
  );
}

export default memo(PCHeader, isEqual);
