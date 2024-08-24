'use client'

import { memo, MouseEvent, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { Button, useToast, useClipboard } from '@chakra-ui/react'

import AppIcon from './app-icon'
import { useDictionary } from 'service/providers/dictionary'

function CopyableIconBtn({ value }: { value: string }) {
  const { dictionary } = useDictionary()
  const toast = useToast()
  const { onCopy } = useClipboard(value)

  const handleSelectTier = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onCopy()
      toast({
        title: dictionary['Copy Succeeded'],
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    },
    [onCopy, dictionary, toast],
  )

  return (
    <Button
      type="button"
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