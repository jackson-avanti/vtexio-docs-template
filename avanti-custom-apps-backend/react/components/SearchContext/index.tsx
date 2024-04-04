import React from 'react'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'

interface ISearchContext {
  params: IParams
}

interface IParams {
  department?: string
  id?: string
  term?: string
}

export function SearchContext() {
  const searchContext: ISearchContext = useSearchPage()

  console.log('Search Context', searchContext)

  return (
    <div>
      <h4>{searchContext.params.department ? searchContext.params.department : searchContext.params.term}</h4>
    </div>
  )
}
