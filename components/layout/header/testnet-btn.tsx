import { Button } from 'components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { useTranslation } from 'next-i18next';

function TestnetBtn() {
  const { t } = useTranslation()

  return (
    <Popover>
      <PopoverTrigger>
        <button
          type="button"
          className="rounded-md border-none bg-white py-[0.125rem] pl-[0.125rem] pr-[0.125rem] md:pr-3"
        >
          <div className="flex items-center gap-3">
            <div className="rounded bg-primary px-2 py-[0.3125rem] text-sm font-normal capitalize leading-tight text-white">
              Testnet
            </div>
            <div className="hidden font-heading text-base font-normal leading-tight text-pink-500 md:block">
              {t('STO Chain')}
            </div>
          </div>
        </button>
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
            {t('View More Networks')}
          </Button>
          <Button variant="outline" size="sm">
            {t('Join Subscan')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TestnetBtn;
