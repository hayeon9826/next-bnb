'use client'

import { useEffect, useState } from 'react'

import NextButton from '@/components/Form/NextButton'
import Stepper from '@/components/Form/Stepper'
import { useRouter } from 'next/navigation'
import cn from 'classnames'
import { CATEGORY, Domains } from '@/constants'
import { useRecoilState } from 'recoil'
import { roomFormState } from '@/atom'

export default function RoomRegisterCategory() {
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const router = useRouter()

  const handleSubmit = () => {
    setRoomForm({
      ...roomForm,
      category: selectedCategory,
    })
    router.prefetch(Domains.REGISTER_ROOM_INFO)
    router.push(Domains.REGISTER_ROOM_INFO)
  }

  useEffect(() => {
    setSelectedCategory(roomForm?.category || '')
  }, [])

  return (
    <>
      <Stepper className="mt-10" count={1} />
      <section className="mt-10 flex flex-col gap-4">
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          다음 중 숙소를 가장 잘 나타내는 것은 무엇인가요?
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 px-10">
          {CATEGORY?.map((category) => (
            <button
              type="button"
              key={category.title}
              onClick={() => setSelectedCategory(category.title)}
              className={cn(
                'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
                {
                  'border-2 border-black': selectedCategory === category.title,
                },
              )}
            >
              <div className="text-2xl">
                <category.Icon />
              </div>
              <h1 className="font-semibold text-lg ">{category?.title}</h1>
            </button>
          ))}
        </div>
      </section>
      <NextButton disabled={!selectedCategory} onClick={handleSubmit} />
    </>
  )
}
