'use client'

import { roomFormState } from '@/atom'
import NextButton from '@/components/Form/NextButton'
import Stepper from '@/components/Form/Stepper'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillCamera } from 'react-icons/ai'
import { useRecoilState, useResetRecoilState } from 'recoil'

interface RoomImageProps {
  images?: string[]
}

export default function RoomRegisterImage() {
  const router = useRouter()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  const resetRoomForm = useResetRecoilState(roomFormState)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoomImageProps>()

  const onSubmit = async (data: RoomImageProps) => {
    try {
      const result = await axios.post('/api/rooms', {
        ...roomForm,
        ...data,
      })

      if (result.status === 200) {
        toast.success('숙소를 등록했습니다.')
        resetRoomForm()
        router.push('/')
      } else {
        toast.error('데이터 저장중 문제가 발생했습니다. 다시 시도해주세요')
      }
    } catch (e) {
      console.log(e)
      toast.error('다시 시도해주세요.')
    }
    // 전체 roomForm API 생성 요청
    // 생성 후에 resetRoomForm으로 리코일 값 초기화
    // 생성 후에 나의 숙소 리스트로 돌아가도록 라우팅
  }

  return (
    <>
      <Stepper className="mt-10" count={5} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-6 px-4"
      >
        <section className="text-center">
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            숙소 사진 추가하기
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            숙소 사진은 최대 5장까지 추가하실 수 있습니다. 나중에 추가하시거나
            변경하실 수 있습니다.
          </p>
        </section>
        <div className="flex flex-col gap-2">
          <div className="col-span-full">
            <div className="max-w-lg mx-auto mt-10 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <AiFillCamera
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                {/* @레이아웃 참고: https://tailwindui.com/components/application-ui/forms/form-layouts */}
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <span>최대 5장의 사진을 </span>
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer outline-none rounded-md bg-white font-semibold text-rose-600 hover:text-rose-400 focus:text-rose-400"
                  >
                    <p className="pl-1">업로드 해주세요</p>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, JEPG 등 이미지 포맷만 가능
                </p>
              </div>
            </div>
          </div>
          {errors.images && errors.images.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <NextButton type="submit" text="완료" />
      </form>
    </>
  )
}
