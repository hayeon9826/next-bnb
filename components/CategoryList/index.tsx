'use client'

import { filterState } from '@/atom'
import { CATEGORY } from '@/constants'
import { useRecoilState } from 'recoil'

import cn from 'classnames'
import { BiReset } from 'react-icons/bi'

export default function CategoryList() {
  const [filterValue, setFilterValue] = useRecoilState(filterState)

  return (
    <div
      data-cy="category-filter"
      className="flex gap-6 overflow-x-scroll inset-x-0 max-w-7xl flex-nowrap mx-auto sm:pr-16 sm:pl-4 px-2 mb-6 fixed bg-white top-20 z-[1]"
    >
      <button
        className="flex-none justify-center gap-3 py-4 w-16 text-center"
        onClick={() =>
          setFilterValue({
            ...filterValue,
            category: '',
          })
        }
      >
        <div
          className={cn(
            'flex flex-col justify-center gap-3 text-gray-500 hover:text-gray-700 cursor-pointer',
            {
              'text-black font-semibold underline underline-offset-8':
                filterValue.category === '',
            },
          )}
        >
          <div className="text-2xl  mx-auto">
            <BiReset />
          </div>
          <div className="text-xs">전체</div>
        </div>
      </button>
      {CATEGORY?.map((category) => (
        <button
          data-cy={`category-filter-${category.title}`}
          key={category.title}
          className="flex-none justify-center gap-3 py-4 w-16 text-center"
          onClick={() =>
            setFilterValue({
              ...filterValue,
              category: category.title,
            })
          }
        >
          <div
            className={cn(
              'flex flex-col justify-center gap-3 text-gray-500 hover:text-gray-700 cursor-pointer',
              {
                'text-black font-semibold underline underline-offset-8':
                  filterValue.category === category.title,
              },
            )}
          >
            <div className="text-2xl  mx-auto">
              <category.Icon />
            </div>
            <div className="text-xs">{category.title}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
