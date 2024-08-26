'use client'

import { memo, MouseEvent, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { Button, useToast, useClipboard } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import AppIcon from './app-icon'

function CopyableIconBtn({ value }: { value: string }) {
  const { t } = useTranslation()

  const toast = useToast()
  const { onCopy } = useClipboard(value)

  const handleSelectTier = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onCopy()
      toast({
        title: t('Copy Succeeded'),
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    },
    [onCopy, toast],
  )

  return (
    <Button
      type="button"
      onClick={handleSelectTier}
      aria-label="copy"
      className="!bg-pink-opacity !text-pink flex h-7 w-7 flex-shrink-0 items-center justify-center self-baseline rounded-full p-0"
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
