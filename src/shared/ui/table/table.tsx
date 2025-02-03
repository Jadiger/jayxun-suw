// import {
//   MRT_RowData,
//   MRT_TableOptions,
//   MantineReactTable,
// } from 'mantine-react-table'

// import { ActionIcon, Group } from '@mantine/core'
// import { IconEdit, IconTrash } from '@tabler/icons-react'

// interface TableProps<T extends MRT_RowData> extends MRT_TableOptions<T> {
//   isError?: boolean
//   errorText?: string
//   onUpdate?: (id: number) => void
//   onDelete?: (id: number) => void
// }

// export const Table = <TData extends MRT_RowData>(props: TableProps<TData>) => {
//   const { isError, errorText, onUpdate, onDelete, ...otherProps } = props

//   return (
//     <MantineReactTable
//       enableColumnActions={false}
//       enableColumnFilters={false}
//       enableFullScreenToggle={false}
//       enableDensityToggle={false}
//       enableRowActions={true}
//       renderRowActions={({ row }) => (
//         <Group gap="xs" wrap="nowrap">
//           <ActionIcon
//             size="lg"
//             variant="light"
//             onClick={onUpdate ? () => onUpdate(row.original['id']) : undefined}
//           >
//             <IconEdit />
//           </ActionIcon>
//           <ActionIcon
//             size="lg"
//             variant="light"
//             color="red"
//             onClick={onDelete ? () => onDelete(row.original['id']) : undefined}
//           >
//             <IconTrash />
//           </ActionIcon>
//         </Group>
//       )}
//       mantineTableProps={{
//         highlightOnHover: false,
//       }}
//       initialState={{
//         density: 'xs',
//         showGlobalFilter: true,
//       }}
//       mantineToolbarAlertBannerProps={
//         isError
//           ? {
//               color: 'red',
//               title: 'Ошибка',
//               children: errorText,
//             }
//           : undefined
//       }
//       renderTopToolbarCustomActions={() => null}
//       paginationDisplayMode="pages"
//       positionGlobalFilter="right"
//       {...otherProps}
//       state={{
//         showSkeletons: false,
//         ...otherProps.state,
//       }}
//       mantinePaperProps={{
//         style: {
//           display: 'flex',
//           flexDirection: 'column',
//           height: 'calc(100vh - 180px)',
//         },
//       }}
//       mantineTableContainerProps={{ style: { flexGrow: '1' } }}
//       mantineTableFooterProps={{ style: { flexGrow: '0' } }}
//     />
//   )
// }
