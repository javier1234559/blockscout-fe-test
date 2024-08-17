'use client'

import { memo, MouseEvent, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'usehooks-ts'

import { useDictionary } from '@/providers/dictionary'

import { Button } from '../ui/button'

import AppIcon from './app-icon'

function CopyableIconBtn({ value }: { value: string }) {
  const { dictionary } = useDictionary()
  const [, copy] = useCopyToClipboard()

  const handleSelectTier = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const selected = event.currentTarget.value

      copy(selected)
        .then(() => toast.success(dictionary['Copy Succeeded']))
        .catch(() => toast.error(dictionary['Something Went Wrong']))
    },
    [copy, dictionary],
  )

  return (
    <Button
      type="button"
      value={value}
      onClick={handleSelectTier}
      aria-label="copy"
      className="flex h-7 w-7 flex-shrink-0 items-center justify-center self-baseline rounded-full !bg-pink-opacity p-0 !text-pink"
    >
      <AppIcon
        src="/svg/icons/copy.svg#id"
        width="1em"
        height="1em"
        className="max-h-[1em] max-w-[1em]"
      />
    </Button>
  )
}

export default memo(CopyableIconBtn, isEqual)
