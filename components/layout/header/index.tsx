"use client";

import { memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { usePathname } from "next/navigation";

import MobileHeader from "./mobile";
import PCHeader from "./pc";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { MEDIA_MIN_WIDTH_KEYS } from "service/utils/media-queries";
import { LocaleEnum } from "service/types/locales";

function Header() {
  const pathname = usePathname();

  // Hooks
  const [isMobile] = useMediaQuery(MEDIA_MIN_WIDTH_KEYS.SM);

  // States
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isInHomePage = [`/${LocaleEnum.EN}`, `/${LocaleEnum.VI}`].includes(
    pathname
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="h-[4.125rem] bg-gradient-to-r from-[#a72168] to-[#36087d]" />
    );

  console.log("isInHomePage", isMobile);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      transformOrigin="top"
      transition="all 0.5s"
      bg="linear-gradient(to right, #a72168, #36087d)"
      py={!isInHomePage || isScrolled ? 1 : 2}
    >
      {isMobile ? <PCHeader /> : <MobileHeader />}
    </Box>
  );
}

export default memo(Header, isEqual);
