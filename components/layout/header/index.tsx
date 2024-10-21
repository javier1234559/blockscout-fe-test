import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import MobileHeader from "./mobile";
import PCHeader from "./pc";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { MEDIA_MIN_WIDTH_KEYS } from "service/utils/media-queries";
import { LocaleEnum } from "service/types/locales";
import { Container } from "ui/shared/layout/components";

export const HEADER_HEIGHT = 58; //rem

function Header() {
  const pathname = usePathname();

  // Hooks
  const [isMobile] = useMediaQuery(MEDIA_MIN_WIDTH_KEYS.SM);

  // States
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isInHomePage = useCallback(() => {
    const pathParts = pathname.slice(1).split("/");
    return (
      (pathParts.length === 1 && pathParts[0] === "") ||
      Object.values(LocaleEnum).includes(pathParts[0] as LocaleEnum)
    );
  }, [pathname]);

  // FIXME: https://ahooks.js.org/
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

  if (!mounted) {
    return <Box h="58px" />;
  }

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="banner"
      transformOrigin="top"
      transition="all 0.3s"
      bg={
        !isInHomePage() || isScrolled
          ? "primary.DEFAULT"
          : "linear-gradient(to right, #a72168, #36087d)"
      }
      w="100%"
      py={!isInHomePage() || isScrolled ? 1 : 2}
      boxShadow={!isInHomePage() || isScrolled ? "md" : "none"}
      px={4}
    >
      <Container maxW="container.xl" mx="auto">
        {isMobile ? <PCHeader /> : <MobileHeader />}
      </Container>
    </Box>
  );
}

export default Header;
