import { Button, Skeleton, Flex, IconButton, chakra } from "@chakra-ui/react";
import React from "react";

import type { PaginationParams } from "./types";

import IconSvg from "ui/shared/IconSvg";
import { useTranslation } from "next-i18next";
import { color } from "d3";

interface Props extends PaginationParams {
  className?: string;
}

const Pagination = ({
  page,
  onNextPageClick,
  onPrevPageClick,
  resetPage,
  hasPages,
  hasNextPage,
  className,
  canGoBackwards,
  isLoading,
  isVisible,
}: Props) => {
  const { t } = useTranslation();

  if (!isVisible) {
    return null;
  }
  const showSkeleton = page === 1 && !hasPages && isLoading;

  const commonButtonStyles = {
    variant: "outline",
    border: "1px solid",
    color: "primary.DEFAULT",
    borderColor: "gray.700",
    borderRadius: "sm",
    _focus: {
      borderColor: "primary.DEFAULT",
      boxShadow: "none",
      outline: "none",
      border: "1px solid",
    },
    _hover: {
      borderColor: "primary.DEFAULT",
      boxShadow: "none",
      outline: "none",
      color: "primary.DEFAULT",
      border: "1px solid",
    },
    _disabled: {
      borderColor: "gray.400",
      opacity: "0.2",
      color: "white",
    },
  };
  return (
    <Flex className={className} fontSize="sm" alignItems="center">
      <Skeleton
        isLoaded={!showSkeleton}
        display="inline-block"
        mr={4}
        borderRadius="sm"
      >
        <Button
          {...commonButtonStyles}
          color="primary.DEFAULT"
          onClick={resetPage}
          isDisabled={page === 1 || isLoading}
        >
          {t("First")}
        </Button>
      </Skeleton>

      <Skeleton
        isLoaded={!showSkeleton}
        display="inline-block"
        mr={3}
        borderRadius="sm"
      >
        <IconButton
          {...commonButtonStyles}
          onClick={onPrevPageClick}
          aria-label="Prev page"
          w="36px"
          icon={<IconSvg name="arrows/east-mini" w={5} h={5} />}
          isDisabled={!canGoBackwards || isLoading}
        />
      </Skeleton>

      <Skeleton
        isLoaded={!showSkeleton}
        display="inline-block"
        borderRadius="sm"
      >
        <Button
          {...commonButtonStyles}
          bg="transparent"
          data-selected={true}
          fontWeight={400}
          minW="36px"
          cursor="unset"
          sx={{
            '&[data-selected="true"]': {
              bg: "transparent !important",
              color: "primary.DEFAULT",
              borderColor: "gray.700",
            },
          }}
        >
          {page}
        </Button>
      </Skeleton>

      <Skeleton
        isLoaded={!showSkeleton}
        display="inline-block"
        ml={3}
        borderRadius="sm"
      >
        <IconButton
          {...commonButtonStyles}
          onClick={onNextPageClick}
          aria-label="Next page"
          w="36px"
          icon={
            <IconSvg
              name="arrows/east-mini"
              color="primary.500"
              w={5}
              h={5}
              transform="rotate(180deg)"
            />
          }
          isDisabled={!hasNextPage || isLoading}
        />
      </Skeleton>
    </Flex>
  );
};

export default chakra(Pagination);
