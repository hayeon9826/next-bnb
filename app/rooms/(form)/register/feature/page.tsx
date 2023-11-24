'use client'

import { roomFormState } from '@/atom'
import NextButton from '@/components/Form/NextButton'
import Stepper from '@/components/Form/Stepper'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import cn from 'classnames'
import {
  AiOutlineCheckCircle,
  AiOutlineDesktop,
  AiOutlineWifi,
} from 'react-icons/ai'
import { BsDoorClosed } from 'react-icons/bs'
import { PiBathtub, PiMountainsDuotone } from 'react-icons/pi'
import { MdOutlineLocalLaundryService } from 'react-icons/md'
import { GiBarbecue } from 'react-icons/gi'
import { LuParkingCircle } from 'react-icons/lu'
import { Domains } from '@/constants'

interface RoomFeatureProps {
  freeCancel?: boolean
  selfCheckIn?: boolean
  officeSpace?: boolean
  hasMountainView?: boolean
  hasShampoo?: boolean
  hasFreeLaundry?: boolean
  hasAirConditioner?: boolean
  hasWifi?: boolean
  hasBarbeque?: boolean
  hasFreeParking?: boolean
}

export default function RoomRegisterFeature() {
  const router = useRouter()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<RoomFeatureProps>()

  const onSubmit = (data: RoomFeatureProps) => {
    setRoomForm({
      ...roomForm,
      freeCancel: data.freeCancel,
      selfCheckIn: data.selfCheckIn,
      officeSpace: data.officeSpace,
      hasMountainView: data.hasMountainView,
      hasShampoo: data.hasShampoo,
      hasFreeLaundry: data.hasFreeLaundry,
      hasAirConditioner: data.hasAirConditioner,
      hasWifi: data.hasWifi,
      hasBarbeque: data.hasBarbeque,
      hasFreeParking: data.hasFreeParking,
    })
    router.push(Domains.REGISTER_ROOM_IMAGE)
  }

  const onClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    title: keyof RoomFeatureProps,
  ) => {
    setValue(title, event?.target?.checked)
  }

  useEffect(() => {
    if (roomForm) {
      setValue('freeCancel', roomForm?.freeCancel)
      setValue('selfCheckIn', roomForm?.selfCheckIn)
      setValue('officeSpace', roomForm?.officeSpace)
      setValue('hasMountainView', roomForm?.hasMountainView)
      setValue('hasShampoo', roomForm?.hasShampoo)
      setValue('hasFreeLaundry', roomForm?.hasFreeLaundry)
      setValue('hasAirConditioner', roomForm?.hasAirConditioner)
      setValue('hasWifi', roomForm?.hasWifi)
      setValue('hasBarbeque', roomForm?.hasBarbeque)
      setValue('hasFreeParking', roomForm?.hasFreeParking)
    }
  }, [roomForm])

  return (
    <>
      <Stepper className="mt-10" count={4} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-6 px-4"
      >
        <section className="text-center">
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            숙소의 편의시설 정보를 추가해주세요
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            편의시설 정보는 숙소 등록 후에도 수정하실 수 있습니다.
          </p>
        </section>
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4 px-10">
          <RoomRegisterFeature.CheckBoxLayout isChecked={!!watch('freeCancel')}>
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'freeCancel')}
              placeholder="freeCancel"
              {...register('freeCancel')}
              className="hidden"
            />
            <AiOutlineCheckCircle className="text-lg md:text-2xl" />
            무료 취소
          </RoomRegisterFeature.CheckBoxLayout>
          <RoomRegisterFeature.CheckBoxLayout
            isChecked={!!watch('selfCheckIn')}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'selfCheckIn')}
              placeholder="selfCheckIn"
              {...register('selfCheckIn')}
              className="hidden"
            />
            <BsDoorClosed className="text-lg md:text-2xl" />
            셀프 체크인
          </RoomRegisterFeature.CheckBoxLayout>
          <RoomRegisterFeature.CheckBoxLayout
            isChecked={!!watch('officeSpace')}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'officeSpace')}
              placeholder="officeSpace"
              {...register('officeSpace')}
              className="hidden"
            />
            <AiOutlineDesktop className="text-lg md:text-2xl" />
            사무시설
          </RoomRegisterFeature.CheckBoxLayout>
          <RoomRegisterFeature.CheckBoxLayout
            isChecked={!!watch('hasMountainView')}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasMountainView')}
              placeholder="hasMountainView"
              {...register('hasMountainView')}
              className="hidden"
            />
            <PiMountainsDuotone className="text-lg md:text-2xl" />
            마운틴 뷰
          </RoomRegisterFeature.CheckBoxLayout>
          <RoomRegisterFeature.CheckBoxLayout isChecked={!!watch('hasShampoo')}>
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasShampoo')}
              placeholder="hasShampoo"
              {...register('hasShampoo')}
              className="hidden"
            />
            <PiBathtub className="text-lg md:text-2xl" />
            샴푸 및 욕실 용품
          </RoomRegisterFeature.CheckBoxLayout>
          <RoomRegisterFeature.CheckBoxLayout
            isChecked={!!watch('hasFreeLaundry')}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasFreeLaundry')}
              placeholder="hasFreeLaundry"
              {...register('hasFreeLaundry')}
              className="hidden"
            />
            <MdOutlineLocalLaundryService className="text-lg md:text-2xl" />
            무료 세탁
          </RoomRegisterFeature.CheckBoxLayout>
          <RoomRegisterFeature.CheckBoxLayout
            isChecked={!!watch('hasAirConditioner')}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasAirConditioner')}
              placeholder="hasAirConditioner"
              {...register('hasAirConditioner')}
              className="hidden"
            />
            <MdOutlineLocalLaundryService className="text-lg md:text-2xl" />
            에어컨
          </RoomRegisterFeature.CheckBoxLayout>
          <RoomRegisterFeature.CheckBoxLayout isChecked={!!watch('hasWifi')}>
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasWifi')}
              placeholder="hasWifi"
              {...register('hasWifi')}
              className="hidden"
            />
            <AiOutlineWifi className="text-lg md:text-2xl" />
            무료 와이파이
          </RoomRegisterFeature.CheckBoxLayout>
          <RoomRegisterFeature.CheckBoxLayout
            isChecked={!!watch('hasBarbeque')}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasBarbeque')}
              placeholder="hasBarbeque"
              {...register('hasBarbeque')}
              className="hidden"
            />
            <GiBarbecue className="text-lg md:text-2xl" />
            바베큐 시설
          </RoomRegisterFeature.CheckBoxLayout>
          <RoomRegisterFeature.CheckBoxLayout
            isChecked={!!watch('hasFreeParking')}
          >
            <input
              type="checkbox"
              onClick={(e: any) => onClick(e, 'hasFreeParking')}
              placeholder="hasFreeParking"
              {...register('hasFreeParking')}
              className="hidden"
            />
            <LuParkingCircle className="text-lg md:text-2xl" />
            무료 주차
          </RoomRegisterFeature.CheckBoxLayout>
        </section>
        <NextButton type="submit" disabled={isSubmitting} />
      </form>
    </>
  )
}

interface CheckBoxLayoutProps {
  children: React.ReactNode
  isChecked: boolean
}

RoomRegisterFeature.CheckBoxLayout = function ({
  children,
  isChecked,
}: CheckBoxLayoutProps) {
  return (
    <label
      className={cn(
        'border-2 rounded-md hover:bg-black/5 px-6 py-4 flex flex-col gap-2',
        {
          'border-2 border-black': isChecked,
        },
      )}
    >
      {children}
    </label>
  )
}
