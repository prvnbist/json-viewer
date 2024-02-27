import { Box, Checkbox, Flex, Table } from '@mantine/core'

const columnAlignment = (type: string, format: string) => {
   if (type === 'boolean') return 'center'
   return ['date-time', 'date', 'time', 'phone'].includes(format) ||
      ['number', 'integer'].includes(type)
      ? 'right'
      : 'left'
}

type Column = {
   id: string
   title: string
   type: string
   format: string
   schema?: any
}

const cellRenderer = (column: Column, row: Record<any, any>, schema?: any) => {
   return (
      <Table.Td key={column.id} {...(column.type === 'object' && { p: 0 })}>
         <Flex w="100%" justify={columnAlignment(column.type, column.format)}>
            {column.type === 'object' && (
               <Box w="100%">
                  <DataTable value={row[column.id]} schema={schema} isNested />
               </Box>
            )}
            {column.type === 'boolean' && (
               <Checkbox
                  readOnly
                  size="xs"
                  color="green"
                  onChange={() => {}}
                  checked={row[column.id]}
               />
            )}
            {!['boolean', 'object'].includes(column.type) && row[column.id]}
         </Flex>
      </Table.Td>
   )
}

type DataTableProps = {
   value: Record<any, any>
   schema: Record<any, any>
   isNested?: boolean
}

const DataTable = (props: DataTableProps) => {
   const data = props.schema.type === 'array' ? props.value : [props.value]

   const _schema = props.schema.properties ?? props.schema.items?.properties ?? {}

   const columns = Object.keys(_schema).reduce((acc: Column[], key) => {
      const type = _schema?.[key]?.type as string
      const format = _schema?.[key]?.format as string

      if (['array'].includes(type)) return acc

      acc.push({
         type,
         format,
         id: key,
         title: key,
         ...(type === 'object' && { schema: _schema?.[key] }),
      })
      return acc
   }, [])

   return (
      <Table
         withTableBorder
         withColumnBorders
         stickyHeader={!props.isNested}
         className={props.isNested ? 'mantine_nested_table' : ''}>
         <Table.Thead>
            <Table.Tr>
               {columns.map(column => (
                  <Table.Th key={column.id} ta={columnAlignment(column.type, column.format)}>
                     {column.title}
                  </Table.Th>
               ))}
            </Table.Tr>
         </Table.Thead>
         <Table.Tbody>
            {data.map((datum: any, index: number) => (
               <Table.Tr key={index}>
                  {columns.map(column =>
                     cellRenderer(column, datum, column.type === 'object' ? column.schema : null)
                  )}
               </Table.Tr>
            ))}
         </Table.Tbody>
      </Table>
   )
}

export default DataTable
