import { memo } from "react";

import TestnetBtn from "../testnet-btn";

// import MenuHamburger from "./menu-hamburger";
import Logo from "components/common/logo";

function MobileHeader() {
  return (
    <div className="flex items-center justify-between">
      <TestnetBtn />

      <Logo />

      {/* <MenuHamburger /> */}
    </div>
  );
}

export default memo(MobileHeader);
