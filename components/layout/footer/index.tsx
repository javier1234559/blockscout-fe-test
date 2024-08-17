/* eslint-disable react/no-array-index-key */
import { memo } from 'react'
import isEqual from 'react-fast-compare'
import Image from 'next/image'

import AppIcon from '@/components/common/app-icon'
import AppLink from '@/components/common/app-link'

import RouteNames from '@/constants/routes'
import { DefaultViewProps } from '@/types/common'

import LanguageSelect from './language-select'

const SOCIAL_LINKS = [
  {
    link: 'https://twitter.com',
    icon: '/svg/icons/twitter.svg#id',
  },
  {
    link: 'https://github.com',
    icon: '/svg/icons/github.svg#id',
  },
  {
    link: 'https://element.com',
    icon: '/svg/icons/element.svg#id',
  },
  {
    link: 'https://medium.com',
    icon: '/svg/icons/medium.svg#id',
  },
  {
    link: 'mailto:someone@example.com',
    icon: '/svg/icons/mail.svg#id',
  },
]

const FOOTER_LINKS = [
  { href: '/', label: 'Version History' },
  { href: '/', label: 'Privacy Policy' },
  { href: '/', label: 'Open Source Notices' },
  { href: '/', label: 'Service Status' },
  { href: '/', label: 'Feedback' },
  { href: '/', label: 'Career' },
]

function Footer({ dictionary }: DefaultViewProps) {
  return (
    <footer className="w-full bg-black-footer p-5 text-xs leading-snug">
      <div className="container">
        <div className="flex items-center justify-center gap-[20px] md:justify-start">
          <AppLink href={RouteNames.Home}>
            <Image src="/svg/icons/logo.svg" alt="STO Chain logo" width={163} height={100} />
          </AppLink>
          {SOCIAL_LINKS.map((link) => (
            <a
              href={link.link}
              aria-label="Social Icon"
              key={link.icon}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppIcon
                src={link.icon}
                width="21"
                height="22"
                viewBox="0 0 21 22"
                className="h-5 w-5 text-gray-icon "
              />
            </a>
          ))}
        </div>

        <div className="mb-2 mt-10 flex flex-col items-center justify-start text-gray-icon md:flex-row md:justify-between">
          <h4 className="text-center md:text-left">
            {dictionary['Copyright © 2024 STO Chain. All Rights Reserved.']}
          </h4>
          <ul className="mb-1.25 mt-2 flex list-none flex-wrap items-center justify-center gap-4 md:mt-0">
            {FOOTER_LINKS.map((link, index) => (
              <li key={index}>
                <AppLink href={link.href} aria-label={link.label}>
                  {link.label}
                </AppLink>
              </li>
            ))}
            <li>
              <LanguageSelect />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer, isEqual)
