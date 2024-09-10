import {
  Button,
  chakra,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import React, { useCallback, useState } from "react";
import { useTranslation } from "next-i18next";

import ClearButton from "ui/shared/ClearButton";
import IconSvg from "ui/shared/IconSvg";

type Props = {
  onChange?: (searchTerm: string) => void;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  placeholder: string;
  initialValue?: string;
  isLoading?: boolean;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
};

const FilterInput = ({
  onChange,
  className,
  size = "sm",
  placeholder,
  initialValue,
  isLoading,
  type,
  name,
}: Props) => {
  const { t } = useTranslation();
  const [filterQuery, setFilterQuery] = useState(initialValue || "");
  const inputRef = React.useRef<HTMLInputElement>(null);
  // const iconColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");

  const handleFilterQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setFilterQuery(value);
      onChange?.(value);
    },
    [onChange]
  );

  const handleFilterQueryClear = useCallback(() => {
    setFilterQuery("");
    onChange?.("");
    inputRef?.current?.focus();
  }, [onChange]);

  return (
    <Skeleton
      isLoaded={!isLoading}
      className={className}
      minW="250px"
      borderRadius="base"
    >
      <Flex alignItems="stretch">
        <InputGroup size={size}>
          <Input
            ref={inputRef}
            borderRadius="sm"
            w="100%"
            value={filterQuery}
            onChange={handleFilterQueryChange}
            placeholder={placeholder}
            borderWidth="1px"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            type={type}
            name={name}
            h="3rem"
          />
          {filterQuery ? (
            <InputRightElement>
              <ClearButton onClick={handleFilterQueryClear} />
            </InputRightElement>
          ) : null}
        </InputGroup>
        <Button
          type="submit"
          bgGradient="linear(90deg, #f40993, #3500cb)"
          _hover={{
            bgGradient: "linear(90deg, #ff2ca8, #ff2ca8)",
          }}
          h="auto"
          px={8}
          borderTopLeftRadius="0"
          borderBottomLeftRadius="0"
          borderTopRightRadius="1px"
          borderBottomRightRadius="1px"
          fontWeight={400}
        >
          {t("Search")}
        </Button>
      </Flex>
    </Skeleton>
  );
};

export default chakra(FilterInput);
