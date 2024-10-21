/* eslint-disable no-restricted-imports */
import { useTranslation } from "next-i18next";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Text,
  Flex,
  VStack,
  Divider,
  Heading,
} from "@chakra-ui/react";

function TestnetBtn() {
  const { t } = useTranslation();

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          bg="white"
          h="auto"
          borderRadius="sm"
          border="none"
          py="0.125rem"
          pl="0.125rem"
          pr={{ base: "0.125rem", md: "0.75rem" }}
          _hover={{ bg: "gray.100" }}
        >
          <Flex alignItems="center" gap={3}>
            <Text
              as="span"
              bg="#ff2ca8"
              color="white"
              fontSize="sm"
              fontWeight="normal"
              lineHeight="tight"
              px={2}
              py="0.3125rem"
              borderRadius="sm"
              textTransform="capitalize"
            >
              {t("Testnet")}
            </Text>
            <Text
              fontFamily="autowide"
              fontSize="base"
              fontWeight="normal"
              lineHeight="tight"
              color="#ff2ca8"
              display={{ base: "none", md: "block" }}
            >
              {t("STO Chain")}
            </Text>
          </Flex>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bg="#050818"
        borderColor="#050818"
        minW="200px"
        w="max-content"
        p={4}
        zIndex="modal"
      >
        <VStack spacing={4} align="stretch">
          <VStack align="stretch" spacing={2}>
            <Heading as="h4" size="xs" px={2}>
              Mainnet
            </Heading>
            <Text
              fontSize="sm"
              px={2}
              py={2}
              borderRadius="sm"
              _hover={{ bg: "gray.700" }}
              transition="background 0.2s"
              cursor="pointer"
            >
              STO chain
            </Text>
          </VStack>

          <Divider borderColor="whiteAlpha.300" />

          <VStack align="stretch" spacing={2}>
            <Heading as="h4" size="xs" px={2}>
              Testnet
            </Heading>
            <Text
              fontSize="sm"
              px={2}
              py={2}
              borderRadius="sm"
              _hover={{ bg: "gray.700" }}
              transition="background 0.2s"
              cursor="pointer"
            >
              STO testnet
            </Text>
          </VStack>

          <Divider borderColor="whiteAlpha.300" />
          <VStack spacing={2}>
            <Button
              variant="solid"
              bg="primary.DEFAULT"
              color="white"
              _hover={{ bg: "primary.600" }}
              size="sm"
              w="full"
              borderRadius="sm"
              _focus={{
                bg: "primary.DEFAULT",
              }}
              fontWeight={400}
            >
              {t("View More Networks")}
            </Button>
            <Button
              _focus={{
                color: "inherit",
                outline: "none",
                border: "none",
              }}
              variant="outline"
              border="1px solid"
              borderColor="gray.outline"
              color="white"
              _hover={{ bg: "primary.50" }}
              size="sm"
              w="full"
              borderRadius="sm"
              fontWeight={400}
            >
              {t("Join Subscan")}
            </Button>
          </VStack>
        </VStack>
      </PopoverContent>
    </Popover>
  );
}

export default TestnetBtn;
