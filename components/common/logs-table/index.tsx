import { memo, ReactNode } from 'react'
import isEqual from 'react-fast-compare'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { LocaleKeys } from '@/types/locales'

import CopyableIconBtn from '../copyable-icon-btn'

export interface TableRowWithCellsProps {
  label: string
  content: ReactNode
}

export interface DecodedTableProps {
  dictionary: LocaleKeys
}

export interface DataTableRow {
  name: string
  type: string
  indexed: string
  data: string
}

export interface DataTableProps {
  dictionary: LocaleKeys
  data: DataTableRow[]
}

interface LogsProps {
  data: TableRowWithCellsProps[]
}

function TableRowWithCells({ label, content }: TableRowWithCellsProps) {
  return (
    <TableRow className="border-b border-stroke-line text-sm hover:!bg-primary-dark">
      <TableCell className="block align-top  text-sm font-bold lg:table-cell">{label}</TableCell>
      <TableCell className="block lg:table-cell">{content}</TableCell>
    </TableRow>
  )
}

export function DecodedTable({ dictionary }: DecodedTableProps) {
  return (
    <Table>
      <TableBody>
        <TableRow className="border-none hover:!bg-primary-dark">
          <TableCell className="block w-[calc(200/904*100%)] bg-stroke-line lg:table-cell">
            {dictionary['Method Id']}
          </TableCell>
          <TableCell className="block lg:table-cell">0x156e29f6</TableCell>
        </TableRow>
        <TableRow className="border-none hover:!bg-primary-dark">
          <TableCell className="block w-[calc(200/904*100%)] bg-stroke-line lg:table-cell">
            {dictionary.Call}
          </TableCell>
          <TableCell className="block lg:table-cell">
            {dictionary.mint}({dictionary['address to']}, uint256 {dictionary.level}, uint256
            robiBoost)
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export function DataTable({ dictionary, data }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-none bg-stroke-line hover:!bg-stroke-line">
          <TableHead className="w-[calc(100/904*100%)] py-4 !text-white">
            {dictionary.Name}
          </TableHead>
          <TableHead className="w-[calc(100/904*100%)] py-4 !text-white">
            {dictionary.Type}
          </TableHead>
          <TableHead className="w-[calc(100/904*100%)] py-4 !text-white">
            {dictionary.Indexed}?
          </TableHead>
          <TableHead className="py-4 !text-white">{dictionary.Data}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.name} className="border-none bg-primary-dark hover:!bg-primary-dark">
            <TableCell className="lowercase">{row.name}</TableCell>
            <TableCell className="lowercase">{row.type}</TableCell>
            <TableCell className="w-[6.5rem]">{row.indexed}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <span className="text-blue-light">{row.data}</span>
                <CopyableIconBtn value={row.data} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function LogsTable({ data }: LogsProps) {
  return (
    <Table className="text-white">
      <TableBody>
        {data.map((item) => (
          <TableRowWithCells key={item.label} label={item.label} content={item.content} />
        ))}
      </TableBody>
    </Table>
  )
}

export default memo(LogsTable, isEqual)
