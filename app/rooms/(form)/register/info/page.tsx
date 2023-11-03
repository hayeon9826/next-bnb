'use client'

import { roomFormState } from '@/atom'
import NextButton from '@/components/Form/NextButton'
import Stepper from '@/components/Form/Stepper'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'

interface RoomInfoProps {
  title?: string
  desc?: string
  price?: number
  bedroomDesc?: string
}

export default function RoomRegisterInfo() {
  const router = useRouter()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoomInfoProps>()

  const onSubmit = (data: RoomInfoProps) => {
    setRoomForm({
      ...roomForm,
      title: data.title,
      desc: data.desc,
      bedroomDesc: data.bedroomDesc,
      price: data.price,
    })
    router.push('/rooms/register/address')
  }

  useEffect(() => {
    if (roomForm) {
      setValue('bedroomDesc', roomForm?.bedroomDesc)
      setValue('title', roomForm?.title)
      setValue('price', roomForm?.price)
      setValue('desc', roomForm?.desc)
    }
  }, [roomForm])

  return (
    <>
      <Stepper className="mt-10" count={2} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-6 px-4"
      >
        <section className="text-center">
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            숙소의 기본 정보를 입력해주세요
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            기본 정보는 숙소 등록 후에도 수정하실 수 있습니다.
          </p>
        </section>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-semibold">
            숙소 이름
          </label>
          <input
            id="title"
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black"
            {...register('title', { required: true, maxLength: 30 })}
          />
          {errors.title && errors.title.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-semibold">
            숙소 설명
          </label>
          <textarea
            id="desc"
            rows={3}
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black resize-none"
            {...register('desc', { required: true })}
          />
          {errors.desc && errors.desc.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-semibold">
            가격 (1박 기준)
          </label>
          <input
            id="price"
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black"
            type="number"
            {...register('price', { required: true })}
          />
          {errors.price && errors.price.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-semibold">
            침실 설명
          </label>
          <textarea
            id="bedroomDesc"
            rows={3}
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black resize-none"
            {...register('bedroomDesc', { required: true })}
          />
          {errors.bedroomDesc && errors.bedroomDesc.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <NextButton type="submit" />
      </form>
    </>
  )
}
