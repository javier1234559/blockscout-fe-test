import {
  Box,
  Flex,
  Text,
  Skeleton,
  useColorModeValue,
  chakra,
  Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";

import type { Route } from "nextjs-routes";

import Hint from "ui/shared/Hint";
import IconSvg, { type IconName } from "ui/shared/IconSvg";
import TruncatedValue from "ui/shared/TruncatedValue";
import { formatCurrencyWithSuffix } from "service/utils/formater";
import AppIcon from "components/common/app-icon";

type Props = {
  className?: string;
  label: string;
  value: string | React.ReactNode;
  valuePrefix?: string;
  valuePostfix?: string;
  hint?: string | React.ReactNode;
  isLoading?: boolean;
  diff?: string | number;
  diffFormatted?: string;
  diffPeriod?: "24h";
  period?: "1h" | "24h";
  href?: Route;
  icon?: IconName;
  iconSrc?: string;
};

const Container = ({
  href,
  children,
}: {
  href?: Route;
  children: JSX.Element;
}) => {
  if (href) {
    return (
      <NextLink href={href} passHref legacyBehavior>
        {children}
      </NextLink>
    );
  }

  return children;
};

const StatsWidget = ({
  className,
  icon,
  iconSrc,
  label,
  value,
  valuePrefix,
  valuePostfix,
  isLoading,
  hint,
  diff,
  diffPeriod = "24h",
  diffFormatted,
  period,
  href,
}: Props) => {
  const bgColor = "transparent";
  const skeletonBgColor = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const hintColor = useColorModeValue("gray.600", "gray.400");
  const [formattedValue, setFormattedValue] = useState("$0.00");

  useEffect(() => {
    setFormattedValue(formatCurrencyWithSuffix(formattedValue));
  }, [formattedValue]);

  const renderValue = () => {
    if (label === "Stock Market Cap" && typeof value === "string") {
      const formattedValue = formatCurrencyWithSuffix(value);
      return <TruncatedValue isLoading={isLoading} value={formattedValue} />;
    }

    if (typeof value === "string") {
      return <TruncatedValue isLoading={isLoading} value={value} />;
    }

    return value;
  };

  return (
    <Container href={!isLoading ? href : undefined}>
      <Flex
        className={className}
        alignItems="center"
        bgColor={isLoading ? skeletonBgColor : bgColor}
        p="0.75rem"
        // justifyContent="space-between"
        columnGap={2}
        {...(href && !isLoading
          ? {
              as: "a",
              href,
            }
          : {})}
      >
        {icon && (
          <IconSvg
            name={icon}
            boxSize="20px"
            isLoading={isLoading}
            borderRadius="base"
            display={{ base: "none", lg: "block" }}
            flexShrink={0}
          />
        )}

        {iconSrc && (
          <Skeleton isLoaded={!isLoading} display="inline-block">
            <AppIcon
              src={iconSrc}
              width={20}
              height={20}
              viewBox="0 0 20 20"
              className="h-5 w-5 flex-shrink-0 opacity-60 md:block hidden"
            />
          </Skeleton>
        )}

        <Box w={{ base: "100%", lg: icon ? "calc(100% - 48px)" : "100%" }}>
          <Skeleton
            isLoaded={!isLoading}
            color="text_secondary"
            fontSize="xs"
            lineHeight="16px"
            w="fit-content"
            textTransform="uppercase"
          >
            <Heading
              as="h3"
              fontFamily="Inter"
              fontSize="1rem"
              lineHeight="1.25rem"
              textTransform="uppercase"
              fontWeight={700}
              color="primary.DEFAULT"
            >
              {label}
            </Heading>
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            display="flex"
            alignItems="baseline"
            fontWeight={500}
            fontSize="lg"
            lineHeight={6}
          >
            {valuePrefix && (
              <chakra.span whiteSpace="pre">{valuePrefix}</chakra.span>
            )}
            {renderValue()}
            {valuePostfix && (
              <chakra.span whiteSpace="pre">{valuePostfix}</chakra.span>
            )}
            {diff && Number(diff) > 0 && (
              <>
                <Text ml={2} mr={1} color="green.500">
                  +{diffFormatted || Number(diff).toLocaleString()}
                </Text>
                <Text variant="secondary" fontSize="sm">
                  ({diffPeriod})
                </Text>
              </>
            )}
            {period && (
              <Text variant="secondary" fontSize="xs" fontWeight={400} ml={1}>
                ({period})
              </Text>
            )}
          </Skeleton>
        </Box>
        {typeof hint === "string" ? (
          <Skeleton
            isLoaded={!isLoading}
            alignSelf="center"
            borderRadius="base"
          >
            <Hint label={hint} boxSize={6} color={hintColor} />
          </Skeleton>
        ) : (
          hint
        )}
      </Flex>
    </Container>
  );
};

export default chakra(StatsWidget);
