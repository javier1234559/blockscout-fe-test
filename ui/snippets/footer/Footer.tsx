import React from "react";
import LanguageSelect from "components/layout/footer/language-select";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import RouteNames from "service/constants/routes";
import AppLink from "components/common/app-link";
import AppIcon from "components/common/app-icon";
import { Box, Container, Flex, HStack, Link, VStack } from "@chakra-ui/react";

const Footer = () => {
  const { t } = useTranslation();

  const SOCIAL_LINKS = [
    {
      link: "https://twitter.com",
      icon: "/svg/icons/twitter.svg#id",
    },
    {
      link: "https://github.com",
      icon: "/svg/icons/github.svg#id",
    },
    {
      link: "https://element.com",
      icon: "/svg/icons/element.svg#id",
    },
    {
      link: "https://medium.com",
      icon: "/svg/icons/medium.svg#id",
    },
    {
      link: "mailto:someone@example.com",
      icon: "/svg/icons/mail.svg#id",
    },
  ];

  const FOOTER_LINKS = [
    { href: "/", label: t("Version History") },
    { href: "/", label: t("Privacy Policy") },
    { href: "/", label: t("Open Source Notices") },
    { href: "/", label: t("Service Status") },
    { href: "/", label: t("Feedback") },
    { href: "/", label: t("Career") },
  ];

  return (
    <Box
      as="footer"
      bg="black"
      w="full"
      p={5}
      mt={4}
      fontSize="xs"
      lineHeight="snug"
    >
      <Container maxW="container.xl">
        <Flex
          // direction={{ base: "column", md: "row" }}
          align="center"
          justify={{ base: "center", md: "space-between" }}
          gap={5}
        >
          <Link href={RouteNames.Home}>
            <Image
              src="/svg/icons/logo.svg"
              alt="STO Chain logo"
              width={163}
              height={100}
            />
          </Link>
          <HStack spacing={5}>
            {SOCIAL_LINKS.map((link) => (
              <Link
                key={link.icon}
                href={link.link}
                isExternal
                aria-label="Social Icon"
              >
                <Box as="span" w={5} h={5} color="gray.500">
                  <AppIcon
                    src={link.icon}
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                  />
                </Box>
              </Link>
            ))}
          </HStack>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          justify={{ base: "center", md: "space-between" }}
          mt={10}
          mb={2}
          color="gray.500"
        >
          <Box as="p" textAlign={{ base: "center", md: "left" }}>
            {t("Copyright © 2024 STO Chain. All Rights Reserved.")}
          </Box>
          <VStack
            as="ul"
            spacing={4}
            align={{ base: "center", md: "flex-start" }}
            mt={{ base: 2, md: 0 }}
            direction={{ base: "column", md: "row" }}
          >
            {FOOTER_LINKS.map((link, index) => (
              <Box as="li" key={index} listStyleType="none">
                <Link href={link.href} aria-label={link.label}>
                  {link.label}
                </Link>
              </Box>
            ))}
            <Box as="li" listStyleType="none">
              <LanguageSelect />
            </Box>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default React.memo(Footer);
