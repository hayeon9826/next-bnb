'use client'

import { searchState } from '@/atom'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSetRecoilState } from 'recoil'

export default function UserSearchFilter() {
  const setQ = useSetRecoilState(searchState)

  const debounce = (func: Function, delay: number) => {
    let timerId: NodeJS.Timeout
    return function (...args: any[]) {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const handleDebouncedSearch = (value: string) => {
    setQ({ q: value })
  }

  const debouncedSearch = debounce(handleDebouncedSearch, 500)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    debouncedSearch(value)
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-10">
      <div className="flex items-center justify-center w-full gap-2">
        <input
          type="search"
          onChange={handleInputChange}
          placeholder="숙소명 검색"
          className="block w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-rose-500"
        />
        <AiOutlineSearch className="w-6 h-6" />
      </div>
    </div>
  )
}
