export interface ResponseWithPagination<T> {
  content: T
  pageable: {
    pageNumber: 0
    pageSize: 10
    sort: {
      empty: false
      sorted: true
      unsorted: false
    }
    offset: 0
    paged: true
    unpaged: false
  }
  totalPages: 1 
  totalElements: 1
  last: true
  size: 10
  number: 0
  sort: {
    empty: false
    sorted: true
    unsorted: false
  }
  numberOfElements: 1
  first: true
  empty: false
}

export interface HTTPError {
  message: string
}
