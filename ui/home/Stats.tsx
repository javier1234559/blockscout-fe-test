import { Grid } from '@chakra-ui/react'
import BigNumber from 'bignumber.js'
import React from 'react'

import config from 'configs/app'
import useApiQuery from 'lib/api/useApiQuery'
import { WEI } from 'lib/consts'
import { HOMEPAGE_STATS } from 'stubs/stats'
import GasInfoTooltip from 'ui/shared/gas/GasInfoTooltip'
import GasPrice from 'ui/shared/gas/GasPrice'
import IconSvg from 'ui/shared/IconSvg'
import StatsWidget from 'ui/shared/stats/StatsWidget'
import { DefaultViewProps } from 'service/types/common'
import { FormatNumber } from 'service/utils/formater'
import AppIcon from 'components/common/app-icon'

const hasAvgBlockTime = config.UI.homepage.showAvgBlockTime
const rollupFeature = config.features.rollup

const Stats = ({ dictionary }: DefaultViewProps) => {
  const [hasGasTracker, setHasGasTracker] = React.useState(config.features.gasTracker.isEnabled)
  const { data, isPlaceholderData, isError, dataUpdatedAt } = useApiQuery('stats', {
    queryOptions: {
      refetchOnMount: false,
      placeholderData: HOMEPAGE_STATS,
    },
  })

  React.useEffect(() => {
    if (!isPlaceholderData && !data?.gas_prices?.average) {
      setHasGasTracker(false)
    }
    // should run only after initial fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaceholderData])

  const zkEvmLatestBatchQuery = useApiQuery('homepage_zkevm_latest_batch', {
    queryOptions: {
      placeholderData: 12345,
      enabled: rollupFeature.isEnabled && rollupFeature.type === 'zkEvm',
    },
  })

  const zkSyncLatestBatchQuery = useApiQuery('homepage_zksync_latest_batch', {
    queryOptions: {
      placeholderData: 12345,
      enabled: rollupFeature.isEnabled && rollupFeature.type === 'zkSync',
    },
  })

  if (isError || zkEvmLatestBatchQuery.isError || zkSyncLatestBatchQuery.isError) {
    return null
  }

  const isLoading =
    isPlaceholderData ||
    (rollupFeature.isEnabled &&
      rollupFeature.type === 'zkEvm' &&
      zkEvmLatestBatchQuery.isPlaceholderData) ||
    (rollupFeature.isEnabled &&
      rollupFeature.type === 'zkSync' &&
      zkSyncLatestBatchQuery.isPlaceholderData)

  let content

  const lastItemStyle = { gridColumn: 'span 2' }

  let itemsCount = 5
  !hasGasTracker && itemsCount--
  !hasAvgBlockTime && itemsCount--

  if (data) {
    !data.gas_prices && itemsCount--
    data.rootstock_locked_btc && itemsCount++
    rollupFeature.isEnabled && data.last_output_root_size && itemsCount++
    const isOdd = Boolean(itemsCount % 2)
    const gasInfoTooltip =
      hasGasTracker && data.gas_prices && data.gas_prices.average ? (
        <GasInfoTooltip data={data} dataUpdatedAt={dataUpdatedAt}>
          <IconSvg
            isLoading={isLoading}
            name="info"
            boxSize={5}
            flexShrink={0}
            cursor="pointer"
            color="icon_info"
            _hover={{ color: 'link_hovered' }}
          />
        </GasInfoTooltip>
      ) : null

    content = (
      <>
        {rollupFeature.isEnabled && rollupFeature.type === 'zkEvm' && (
          <StatsWidget
            icon="txn_batches_slim"
            label="Latest batch"
            value={(zkEvmLatestBatchQuery.data || 0).toLocaleString()}
            href={{ pathname: '/batches' }}
            isLoading={isLoading}
          />
        )}
        {rollupFeature.isEnabled && rollupFeature.type === 'zkSync' && (
          <StatsWidget
            icon="txn_batches_slim"
            label="Latest batch"
            value={(zkSyncLatestBatchQuery.data || 0).toLocaleString()}
            href={{ pathname: '/batches' }}
            isLoading={isLoading}
          />
        )}
        {!(
          rollupFeature.isEnabled &&
          (rollupFeature.type === 'zkEvm' || rollupFeature.type === 'zkSync')
        ) && (
          <StatsWidget
            icon="block_slim"
            label="Total blocks"
            value={Number(data.total_blocks).toLocaleString()}
            href={{ pathname: '/blocks' }}
            isLoading={isLoading}
          />
        )}
        {hasAvgBlockTime && (
          <StatsWidget
            icon="clock"
            label="Average block time"
            value={`${(data.average_block_time / 1000).toFixed(1)}s`}
            isLoading={isLoading}
          />
        )}
        <StatsWidget
          icon="transactions_slim"
          label="Total transactions"
          value={Number(data.total_transactions).toLocaleString()}
          href={{ pathname: '/txs' }}
          isLoading={isLoading}
        />
        {rollupFeature.isEnabled && data.last_output_root_size && (
          <StatsWidget
            icon="txn_batches_slim"
            label="Latest L1 state batch"
            value={data.last_output_root_size}
            href={{ pathname: '/batches' }}
            isLoading={isLoading}
          />
        )}
        <StatsWidget
          icon="wallet"
          label="Wallet addresses"
          value={Number(data.total_addresses).toLocaleString()}
          isLoading={isLoading}
          _last={isOdd ? lastItemStyle : undefined}
        />
        {hasGasTracker && data.gas_prices && (
          <StatsWidget
            icon="gas"
            label="Gas tracker"
            value={data.gas_prices.average ? <GasPrice data={data.gas_prices.average} /> : 'N/A'}
            hint={gasInfoTooltip}
            isLoading={isLoading}
            _last={isOdd ? lastItemStyle : undefined}
          />
        )}
        {data.rootstock_locked_btc && (
          <StatsWidget
            icon="coins/bitcoin"
            label="BTC Locked in 2WP"
            value={`${BigNumber(data.rootstock_locked_btc).div(WEI).dp(0).toFormat()} RBTC`}
            isLoading={isLoading}
            _last={isOdd ? lastItemStyle : undefined}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Grid gridTemplateColumns="1fr 1fr" gridGap={{ base: 1, lg: 2 }} flexBasis="50%" flexGrow={1}>
        {content}
      </Grid>
      <div className="flex items-center gap-1 py-4">
        <AppIcon
          src="/svg/icons/contracts.svg#id"
          width={20}
          height={20}
          viewBox="0 0 20 20"
          className="h-5 w-5 flex-shrink-0 opacity-60"
        />
        <h6>{dictionary.Overview}</h6>
      </div>

      <div className="bg-background-bg-2 grid grid-cols-2 rounded-md border border-stroke-line p-3 xl:grid-cols-3">
        <div className="flex items-center gap-3 md:py-4">
          <AppIcon
            src="/svg/icons/container.svg#id"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="h-6 w-6 flex-shrink-0 opacity-60"
          />

          <div>
            <h4 className="text-h4/medium uppercase text-primary">STOCK {dictionary.Price}</h4>

            <span>N/A</span>
          </div>
        </div>

        <div className="flex items-center gap-3 py-4">
          <AppIcon
            src="/svg/icons/coin-and-clock.svg#id"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="h-6 w-6 flex-shrink-0 opacity-60"
          />

          <div>
            <h4 className="text-h4/medium uppercase text-primary">
              STOCK {dictionary['Total Blocks']}
            </h4>

            <span>{FormatNumber.numberWithCommas(9167699)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 py-4">
          <div>
            <h4 className="text-h4/medium uppercase text-primary">{dictionary['Gas Tracker']}</h4>

            <div className="flex items-center gap-1">
              <span>10.0 Gwei</span>

              <AppIcon
                src="/svg/icons/info.svg#id"
                width={12}
                height={12}
                viewBox="0 0 12 12"
                className="h-3 w-3 flex-shrink-0"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 py-4">
          <AppIcon
            src="/svg/icons/coin-stack.svg#id"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="h-6 w-6 flex-shrink-0 opacity-60"
          />

          <div>
            <h4 className="text-h4/medium uppercase text-primary">
              STOC {dictionary['Market Cap']}
            </h4>

            <span>$0.00 USD</span>
          </div>
        </div>

        <div className="flex items-center gap-3 py-4">
          <AppIcon
            src="/svg/icons/left-and-right.svg#id"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="h-6 w-6 flex-shrink-0 opacity-60"
          />

          <div>
            <h4 className="text-h4/medium uppercase text-primary">{dictionary.Transactions}</h4>

            <span>{FormatNumber.numberWithCommas(189572)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 py-4">
          <div>
            <h4 className="text-h4/medium uppercase text-primary">
              {dictionary['Average Block Time']}
            </h4>

            <span>5 {dictionary.seconds}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Stats
