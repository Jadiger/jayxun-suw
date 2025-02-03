import { useState } from 'react'

interface useListParamsProps {
  pagination: { pageIndex: number; pageSize: number }
  globalFilter: string
}

export const useListParams = (
  props: useListParamsProps = {
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    globalFilter: '',
  }
) => {
  const [globalFilter, setGlobalFilter] = useState(props.globalFilter)
  const [pagination, setPagination] = useState(props.pagination)

  return {
    globalFilter,
    setGlobalFilter,
    pagination,
    setPagination,
  }
}
