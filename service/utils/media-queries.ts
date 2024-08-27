import theme from 'service/theme'

export const MEDIA_MAX_WIDTH = (width: string) => `(max-width: ${width})`

export const MEDIA_MIN_WIDTH = (width: string) => `(min-width: ${width})`

export const MEDIA_MAX_WIDTH_KEYS = {
  SM: MEDIA_MAX_WIDTH(theme.screens.sm),
  MD: MEDIA_MAX_WIDTH(theme.screens.md),
  LG: MEDIA_MAX_WIDTH(theme.screens.lg),
  XL: MEDIA_MAX_WIDTH(theme.screens.xl),
}

export const MEDIA_MIN_WIDTH_KEYS = {
  SM: MEDIA_MIN_WIDTH(theme.screens.sm),
  MD: MEDIA_MIN_WIDTH(theme.screens.md),
  LG: MEDIA_MIN_WIDTH(theme.screens.lg),
  XL: MEDIA_MIN_WIDTH(theme.screens.xl),
}
