'use client'

import { roomFormState } from '@/atom'
import AddressSearch from '@/components/Form/AddressSearch'
import NextButton from '@/components/Form/NextButton'
import Stepper from '@/components/Form/Stepper'
import { Domains } from '@/constants'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

interface RoomAddressProps {
  address?: string
}

export default function RoomRegisterAddress() {
  const router = useRouter()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomAddressProps>()

  const onSubmit = (data: RoomAddressProps) => {
    setRoomForm({
      ...roomForm,
      address: data?.address,
    })
    router.push(Domains.REGISTER_ROOM_FEATURE)
  }

  useEffect(() => {
    if (roomForm) {
      setValue('address', roomForm?.address)
    }
  }, [roomForm])

  return (
    <>
      <Stepper className="mt-10" count={3} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-6 px-4 max-w-lg md:max-w-xl mx-auto"
      >
        <section className="text-center">
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            숙소의 위치를 입력해주세요
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            주소는 게스트의 예약이 확정된 이후에만 공개됩니다.
          </p>
        </section>
        <div className="mt-10">
          <AddressSearch
            register={register}
            errors={errors}
            setValue={setValue}
          />
        </div>
        <NextButton type="submit" disabled={isSubmitting} />
      </form>
    </>
  )
}
