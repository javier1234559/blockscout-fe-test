import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { useTranslation } from "next-i18next";
import { Text, Button } from "@chakra-ui/react";

function TestnetBtn() {
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          type="button"
          bg="white"
          height="auto"
          borderRadius="sm"
          border="none"
          py="0.125rem"
          pl="0.125rem"
          pr={{ base: "0.125rem", md: "0.75rem" }}
          _hover={{ bg: "gray.100" }}
        >
          <div className="flex items-center gap-3">
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
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="flex w-max min-w-[200px] flex-col gap-4 px-2 py-4"
      >
        <div className="space-y-2">
          <h4 className="px-2 text-xs font-medium leading-none">Mainnet</h4>
          <p className="rounded px-2 py-2 text-sm text-muted-foreground duration-200 hover:bg-slate-700">
            STO chain
          </p>
        </div>

        <div className="h-[1px] w-full bg-[#9993]" />

        <div className="space-y-2">
          <h4 className="px-2 text-xs font-medium leading-none">Testnet</h4>
          <p className="rounded px-2 py-2 text-sm text-muted-foreground duration-200 hover:bg-slate-700">
            STO testnet
          </p>
        </div>

        <div className="h-[1px] w-full bg-[#9993]" />

        <div className="flex flex-col gap-2">
          <Button variant="primary" size="sm">
            {t("View More Networks")}
          </Button>
          <Button variant="outline" size="sm">
            {t("Join Subscan")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default TestnetBtn;
