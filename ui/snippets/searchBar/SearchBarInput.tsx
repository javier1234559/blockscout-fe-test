import {
  InputGroup,
  Input,
  chakra,
  useColorModeValue,
  forwardRef,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import throttle from "lodash/throttle";
import React from "react";
import type { ChangeEvent, FormEvent, FocusEvent } from "react";

import { useScrollDirection } from "lib/contexts/scrollDirection";
import useIsMobile from "lib/hooks/useIsMobile";
import ClearButton from "ui/shared/ClearButton";
import { useTranslation } from "next-i18next";
import { Button } from "@chakra-ui/react";

interface Props {
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBlur?: (event: FocusEvent<HTMLFormElement>) => void;
  onFocus?: () => void;
  onHide?: () => void;
  onClear: () => void;
  isHomepage?: boolean;
  isSuggestOpen?: boolean;
  value: string;
}

const SearchBarInput = (
  {
    onChange,
    onSubmit,
    isHomepage,
    isSuggestOpen,
    onFocus,
    onBlur,
    onHide,
    onClear,
    value,
  }: Props,
  ref: React.ForwardedRef<HTMLFormElement>
) => {
  const { t } = useTranslation();

  const innerRef = React.useRef<HTMLFormElement>(null);
  React.useImperativeHandle(ref, () => innerRef.current as HTMLFormElement, []);
  const [isSticky, setIsSticky] = React.useState(false);
  const scrollDirection = useScrollDirection();
  const isMobile = useIsMobile();

  const handleScroll = React.useCallback(() => {
    const TOP_BAR_HEIGHT = 36;
    if (!isHomepage) {
      if (window.scrollY >= TOP_BAR_HEIGHT) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
    const clientRect = isMobile && innerRef?.current?.getBoundingClientRect();
    if (clientRect && clientRect.y < TOP_BAR_HEIGHT) {
      onHide?.();
    }
  }, [isMobile, onHide, isHomepage]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  React.useEffect(() => {
    if (!isMobile) {
      return;
    }
    const throttledHandleScroll = throttle(handleScroll, 300);

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [isMobile, handleScroll]);

  const bgColor = useColorModeValue("white", "black");
  const transformMobile =
    scrollDirection !== "down" ? "translateY(0)" : "translateY(-100%)";

  return (
    <>
      <chakra.form
        ref={innerRef}
        noValidate
        onSubmit={onSubmit}
        onBlur={onBlur}
        onFocus={onFocus}
        w="100%"
        backgroundColor="transparent"
        borderRadius={{ base: isHomepage ? "base" : "none", lg: "base" }}
        position={{ base: isHomepage ? "static" : "absolute", lg: "relative" }}
        top={{ base: isHomepage ? 0 : 55, lg: 0 }}
        left="0"
        zIndex={{
          base: isHomepage ? "auto" : "-1",
          lg: isSuggestOpen ? "popover" : "auto",
        }}
        paddingX={{ base: isHomepage ? 0 : 3, lg: 0 }}
        paddingTop={{ base: isHomepage ? 0 : 1, lg: 0 }}
        paddingBottom={{ base: isHomepage ? 0 : 2, lg: 0 }}
        boxShadow={scrollDirection !== "down" && isSticky ? "md" : "none"}
        transform={{ base: isHomepage ? "none" : transformMobile, lg: "none" }}
        transitionProperty="transform,box-shadow,background-color,color,border-color"
        transitionDuration="normal"
        transitionTimingFunction="ease"
      >
        <Flex alignItems="stretch">
          <InputGroup size={{ base: "sm", lg: isHomepage ? "sm_md" : "sm" }}>
            <Input
              placeholder={
                isMobile
                  ? "Search by address / ... "
                  : t(
                      "Search by Address/ Token symbol/ Name / Transaction hash / Block number"
                    )
              }
              onChange={handleChange}
              _focusWithin={{ _placeholder: { color: "gray.300" } }}
              color={useColorModeValue("black", "white")}
              _placeholder={{ color: "#9CA3AF" }}
              style={{
                borderRadius: "4px 0 0 4px",
                backgroundColor: "transparent",
              }}
              p={{ base: 2, lg: 3 }}
              value={value}
            />
            {value && (
              <InputRightElement
                top={{ base: 2, lg: isHomepage ? 3 : 2 }}
                right={2}
              >
                <ClearButton onClick={onClear} />
              </InputRightElement>
            )}
          </InputGroup>
          <Button
            type="submit"
            bgColor="#ff2ca8"
            _hover={{ bgColor: "#ff2ca8" }}
            h="auto"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            borderTopRightRadius="4px"
            borderBottomRightRadius="4px"
          >
            {t("Search")}
          </Button>
        </Flex>
      </chakra.form>
    </>
  );
};

export default React.memo(forwardRef(SearchBarInput));
