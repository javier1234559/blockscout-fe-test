'use client'

import { ElementType, memo } from 'react'
import isEqual from 'react-fast-compare'
import { Copy } from 'lucide-react'
import { useCopyToClipboard } from 'usehooks-ts'

import { Button } from '@/components/ui/button'

import { cn } from '@/utils/cn'

interface Props {
  valueToCopy: string
  className?: string
  Icon?: ElementType
}

function AppCopyButton(props: Props) {
  const { valueToCopy, className, Icon } = props

  const Child = Icon || Copy

  const [, copy] = useCopyToClipboard()

  const onClick = () => {
    copy(valueToCopy)
  }

  return (
    <Button size="icon" className={cn(className)} onClick={onClick}>
      <Child className="icon h-5 w-5" />
    </Button>
  )
}

export default memo(AppCopyButton, isEqual)
