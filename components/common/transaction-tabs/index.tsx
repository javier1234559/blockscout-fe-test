'use client'

import { memo, ReactNode, useState } from 'react'
import isEqual from 'react-fast-compare'
import { useMediaQuery } from 'usehooks-ts'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { MEDIA_MAX_WIDTH_KEYS } from '@/utils/media-queries'

import sx from './transaction-tabs.module.scss'

interface Props {
  defaultTab: string
  tabList: {
    title: string
    value: string
  }[]
  tabContent: {
    [key: string]: ReactNode
  }
}

function TransactionTabs({ defaultTab, tabList, tabContent }: Props) {
  const isBelowMD = useMediaQuery(MEDIA_MAX_WIDTH_KEYS.MD)
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="flex flex-col gap-2 rounded-sm bg-primary-dark p-4 text-sm lg:text-base">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        {isBelowMD ? (
          <Select value={activeTab} onValueChange={handleTabChange}>
            <SelectTrigger className="max-w-40 select-none border border-stroke-line !bg-transparent text-left text-white focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder={tabList.find((tab) => tab.value === activeTab)?.title} />
            </SelectTrigger>
            <SelectContent>
              {tabList.map((tab) => (
                <SelectItem key={tab.value} value={tab.value} className="!m-0 px-2 py-2 text-left">
                  {tab.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <TabsList className="flex max-w-full justify-start border-b border-b-stroke-line !bg-transparent lg:mb-0">
            {tabList.map((tab) => (
              <TabsTrigger
                key={tab.value}
                className={`${sx.TabTrigger}  font-size-clamp font-bold text-white transition-none data-[state=active]:border-b-4 data-[state=active]:!border-pink data-[state=active]:!text-primary`}
                value={tab.value}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        {Object.entries(tabContent).map(([key, value]) => (
          <TabsContent key={key} value={key}>
            {value}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default memo(TransactionTabs, isEqual)
