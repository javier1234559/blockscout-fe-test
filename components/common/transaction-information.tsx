import { ReactNode } from 'react'
import { Info } from 'lucide-react'

import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

interface Props {
  data: {
    label: string
    content: string | ReactNode
    tooltip?: string
  }[]
}

function TransactionInformation({ data }: Props) {
  return (
    <div className="rounded-sm bg-primary-dark p-4">
      <Table className="text-white">
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.label}
              className="border-bottom border-stroke-line text-sm hover:!bg-primary-dark"
            >
              <TableCell className="block w-36 text-nowrap font-bold lg:table-cell">
                {item.label}

                {!!item.tooltip && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="relative top-[1px] ml-1 h-3 w-3" />
                      </TooltipTrigger>
                      <TooltipContent>{item.tooltip}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </TableCell>
              <TableCell className="block lg:table-cell">{item.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TransactionInformation
