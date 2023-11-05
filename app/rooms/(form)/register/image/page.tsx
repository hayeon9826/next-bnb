'use client'

import { roomFormState } from '@/atom'
import NextButton from '@/components/Form/NextButton'
import Stepper from '@/components/Form/Stepper'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillCamera } from 'react-icons/ai'
import { storage } from '@/utils/firebaseApp'
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import { nanoid } from 'nanoid'
import axios from 'axios'

interface RoomImageProps {
  images?: string[]
}

export default function RoomRegisterImage() {
  const { data: session } = useSession()
  const router = useRouter()
  const roomForm = useRecoilValue(roomFormState)
  const [images, setImages] = useState<string[] | null>(null)
  let imageKeys: string[] = []

  const resetRoomForm = useResetRecoilState(roomFormState)

  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e

    if (!files) return
    setImages(null)
    ;[...files]?.forEach((file: any) => {
      const fileReader = new FileReader()
      fileReader?.readAsDataURL(file)

      fileReader.onloadend = (e: any) => {
        const { result } = e?.currentTarget
        setImages((val) => (val ? [...val, result] : [result]))
      }
    })
  }

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<RoomImageProps>()

  // @description firebase storage 업로드 참고: https://firebase.google.com/docs/storage/web/upload-files?hl=ko#upload_from_a_string
  async function uploadImages(images: string[] | null) {
    const uploadedImageUrls = []

    if (!images) return

    for (const imageFile of images) {
      const imageKey = nanoid()
      const imageRef = ref(storage, `${session?.user?.id}/${imageKey}`)
      imageKeys.push(imageKey)
      try {
        const data = await uploadString(imageRef, imageFile, 'data_url')
        const imageUrl = await getDownloadURL(data.ref)
        uploadedImageUrls.push(imageUrl)
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }

    return uploadedImageUrls
  }

  // @description 참고: https://firebase.google.com/docs/storage/web/delete-files?hl=ko
  const deleteImages = () => {
    imageKeys?.forEach((key) => {
      const imageRef = ref(storage, `${session?.user?.id}/${key}`)
      deleteObject(imageRef)
        .then(() => {
          console.log('File deleted successfully: ', key)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  const onSubmit = async () => {
    try {
      uploadImages(images).then(async (images) => {
        const result = await axios.post('/api/rooms', {
          ...roomForm,
          images: images,
          imageKeys: imageKeys,
        })

        if (result.status === 200) {
          toast.success('숙소를 등록했습니다.')
          resetRoomForm()
          router.push('/')
        } else {
          // Failed: 업로드 된 이미지 삭제 로직 추가
          toast.error('데이터 저장중 문제가 발생했습니다. 다시 시도해주세요')
          deleteImages()
        }
      })
    } catch (e) {
      console.log(e)
      toast.error('다시 시도해주세요.')
      deleteImages()
    }
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
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      {...register('images', { required: true })}
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, JEPG 등 이미지 포맷만 가능
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-lg mx-auto mt-10">
            <div className="flex flex-wrap gap-4">
              {images &&
                images?.length > 0 &&
                images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                ))}
            </div>
          </div>

          {errors.images && errors.images.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <NextButton type="submit" text="완료" disabled={isSubmitting} />
      </form>
    </>
  )
}
