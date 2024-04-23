import { createContext, useContext } from 'react'

import { ColumnDataType } from '@/src/types/dashboard.interface'

import S from './ColumnLayout.module.scss'

import type { ChildrenProps } from '@/src/types/commonType'

interface ColumnsContextType {
  columns: ColumnDataType[]
  setColumns: React.Dispatch<React.SetStateAction<ColumnDataType[]>>
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
}

export const ColumnsProvider = ({
  children,
  columns,
  setColumns,
}: ColumnsProviderProps) => {
  return (
    <ColumnsContext.Provider value={{ columns, setColumns }}>
      <main className={S.container}>{children}</main>
    </ColumnsContext.Provider>
  )
}

export default ColumnsProvider
