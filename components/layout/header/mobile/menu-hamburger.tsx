import { memo, useState } from 'react'
import isEqual from 'react-fast-compare'
import { AlignJustify } from 'lucide-react'

import AppLink from 'components/common/app-link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion'
import { Button } from 'components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from 'components/ui/sheet'


import { getMenuItems } from '../data'
import { DefaultViewProps } from 'service/types/common'

function MenuHamburger({ dictionary }: DefaultViewProps) {

  const menuItems = getMenuItems(dictionary)

  const [openSheet, setOpenSheet] = useState(false)

  const handleToggleSheet = () => setOpenSheet(!openSheet)
  const handleCloseSheet = () => setOpenSheet(false)

  return (
    <Sheet open={openSheet} onOpenChange={handleToggleSheet}>
      <SheetTrigger>
        <Button variant="link" size="icon">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-none">
        <SheetHeader>
          <SheetTitle>{dictionary.Menu}</SheetTitle>

          <div className="!mt-10">
            <Accordion type="multiple" className="w-full">
              {menuItems.map((menu) => {
                if (menu.subItems) {
                  return (
                    <AccordionItem key={menu.title} value={menu.title} className="border-none">
                      <AccordionTrigger>{menu.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="flex flex-col">
                          {menu.subItems.map((subItem) => (
                            <li key={subItem.title} className="py-2 pl-4 text-left">
                              <AppLink
                                href={subItem.link}
                                onClick={handleCloseSheet}
                                className="h-auto w-full text-left text-base"
                              >
                                {subItem.title}
                              </AppLink>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )
                }

                return (
                  <AccordionItem key={menu.title} value={menu.title} className="border-none">
                    <AccordionTrigger hideArrowIcon>
                      <a href={menu.link}>{menu.title}</a>
                    </AccordionTrigger>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default memo(MenuHamburger, isEqual)
