import { createContext, useContext } from 'react'

import { ColumnDataType } from '@/src/types/dashboard'

import S from './ColumnLayout.module.scss'

import type { ChildrenProps } from '@/src/types/common'

interface ColumnsContextType {
  columns: ColumnDataType[]
  setColumns: React.Dispatch<React.SetStateAction<ColumnDataType[]>>
  dashboardId: number
}

const ColumnsContext = createContext<ColumnsContextType | undefined>(undefined)

export const useColumnsContext = () => {
  const context = useContext(ColumnsContext)
  if (!context) {
    throw new Error()
  }
  return context
}

interface ColumnsProviderProps extends ChildrenProps {
  columns: ColumnDataType[]
  setColumns: React.Dispatch<React.SetStateAction<ColumnDataType[]>>
  dashboardId: number
}

export const ColumnsProvider = ({
  children,
  columns,
  setColumns,
  dashboardId,
}: ColumnsProviderProps) => {
  return (
    <ColumnsContext.Provider value={{ columns, setColumns, dashboardId }}>
      <main className={S.container}>{children}</main>
    </ColumnsContext.Provider>
  )
}

export default ColumnsProvider
