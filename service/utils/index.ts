import { Metadata } from 'next'

export function isSSR() {
  return typeof window === 'undefined'
}

export function constructMetadata({
  title = 'STO Chain',
  description = 'STO Chain',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@joshtriedcoding',
    },
    icons,
    metadataBase: new URL('https://localhost:3000/'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export function shortenText(text: string, startChars = 6, endChars = 6) {
  if (text.length > startChars + endChars) {
    return `${text.slice(0, startChars)}...${text.slice(-endChars)}`
  }
  return text
}
