'use client'

import { RoomFormType, RoomType } from '@/interface'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import cn from 'classnames'
import {
  CATEGORY,
  FeatureRegisterField,
  RoomEditFields,
  RoomFeatureProps,
} from '@/constants'
import { useEffect, useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'

import { storage } from '@/utils/firebaseApp'
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { useSession } from 'next-auth/react'
import { nanoid } from 'nanoid'
import AddressSearch from './AddressSearch'

export default function RoomEditForm({ data }: { data: RoomType }) {
  const { data: session } = useSession()
  const [images, setImages] = useState<string[] | null>(null)
  const [imageKeys, setImageKeys] = useState<string[] | null>(null)
  const router = useRouter()
  const newImageKeys: string[] = []

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
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormType>()

  const onClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    title: keyof RoomFeatureProps,
  ) => {
    setValue(title, event?.target?.checked)
  }

  // @description 참고: https://firebase.google.com/docs/storage/web/delete-files?hl=ko
  async function deleteImages() {
    imageKeys?.forEach((key) => {
      const imageRef = ref(storage, `${session?.user?.id}/${key}`)
      deleteObject(imageRef)
        .then(() => {
          console.log('File deleted successfully: ', key)
        })
        .catch((error) => {
          console.log(error)
          setImageKeys(null)
        })
    })
    setImageKeys(null)

    return imageKeys
  }

  // @description firebase storage 업로드 참고: https://firebase.google.com/docs/storage/web/upload-files?hl=ko#upload_from_a_string
  async function uploadImages(images: string[] | null) {
    const uploadedImageUrls: string[] = []

    if (!images) {
      toast.error('이미지를 한 개 이상 업로드 해주세요')
      return
    }

    if (images === data.images) {
      // 기존 이미지에서 변경점이 없을 경우 이미지 삭제/등록 패스
      return
    }

    try {
      // 기존에 있던 이미지 전체 삭제
      await deleteImages()

      // 업로드 한 이미지 firebase storage에 업로드
      for (const imageFile of images) {
        const key = nanoid()
        newImageKeys.push(key)
        const imageRef = ref(storage, `${session?.user?.id}/${key}`)
        try {
          const data = await uploadString(imageRef, imageFile, 'data_url')
          const imageUrl = await getDownloadURL(data.ref)
          uploadedImageUrls.push(imageUrl)
        } catch (error) {
          console.error('Error uploading image:', error)
        }
      }
      return uploadedImageUrls
    } catch (error) {
      console.log('error occurred during image deletion: ', error)
    }
  }

  useEffect(() => {
    if (data) {
      Object.keys(data)?.forEach((key) => {
        const field = key as keyof RoomFormType
        if (RoomEditFields.includes(field)) {
          setValue(field, data[field])
        }
      })
    }

    if (data.imageKeys) {
      setImageKeys(data.imageKeys)
    }
    if (data.images) {
      setImages(data.images)
    }
  }, [data])

  return (
    <form
      className="px-4 md:max-w-4xl mx-auto py-8 my-20"
      onSubmit={handleSubmit(async (res) => {
        try {
          const imagesUrls = await uploadImages(images)
          const result = await axios.patch(`/api/rooms?id=${data.id}`, {
            ...res,
            images: imagesUrls,
            imageKeys: newImageKeys,
          })
          if (result.status === 200) {
            // 성공 케이스
            toast.success('숙소를 수정했습니다.')
            router.replace('/users/rooms')
          } else {
            // 실패 케이스
            toast.error('다시 시도해주세요')
            deleteImages()
          }
        } catch (e) {
          console.log(e)
          toast.error('데이터 수정중 문제가 생겼습니다. 다시 시도해주세요.')
          deleteImages()
        }
      })}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg md:text-2xl font-semibold leading-7 text-gray-900">
            숙소 수정
          </h2>
          <p className="mt-1 leading-6 text-gray-500">
            아래 내용을 입력해서 숙소를 수정해주세요
          </p>
          <button onClick={() => deleteImages()}>ssss</button>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-3">
              <label
                htmlFor="name"
                className="block text-sm md:text-base font-medium leading-6 text-gray-900"
              >
                숙소명
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('title', { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                />
                {errors?.title?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-3">
              <label
                htmlFor="category"
                className="block text-sm md:text-base font-medium leading-6 text-gray-900"
              >
                카테고리
              </label>
              <div className="mt-2">
                <select
                  {...register('category', { required: true })}
                  className="block w-full rounded-md border-0 px-2 outline-none py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                >
                  <option value="">카테고리 선택</option>
                  {CATEGORY?.map((category) => (
                    <option key={category.title} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
                {errors?.category?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-4">
              <label
                htmlFor="desc"
                className="block text-sm md:text-base font-medium leading-6 text-gray-900"
              >
                숙소 설명
              </label>
              <div className="mt-2">
                <textarea
                  {...register('desc', { required: true })}
                  className="block w-full rounded-md border-0 outline-none px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                />
                {errors?.desc?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-4">
              <label
                htmlFor="bedroomDesc"
                className="block text-sm md:text-base font-medium leading-6 text-gray-900"
              >
                침실 설명
              </label>
              <div className="mt-2">
                <textarea
                  {...register('bedroomDesc')}
                  className="block w-full rounded-md border-0 outline-none px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-3">
              <label
                htmlFor="price"
                className="block text-sm md:text-base font-medium leading-6 text-gray-900"
              >
                가격
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  min={0}
                  {...register('price', { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                />
                {errors?.price?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-4">
              <AddressSearch
                setValue={setValue}
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-4">
              <label className="block text-sm md:text-base font-medium leading-6 text-gray-900">
                편의시설
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-3">
                {FeatureRegisterField?.map((feature) => (
                  <label
                    key={feature.field}
                    className={cn(
                      'border-2 rounded-md hover:bg-black/5 p-3 text-center text-sm',
                      {
                        'border-2 border-black': watch(feature.field) === true,
                      },
                    )}
                  >
                    <input
                      type="checkbox"
                      onClick={(e: any) => onClick(e, feature.field)}
                      placeholder={feature.field}
                      {...register(feature.field)}
                      className="hidden"
                    />
                    {feature.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 col-span-3">
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
                          {...register('images')}
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, JEPG 등 이미지 포맷만 가능
                    </p>
                  </div>
                </div>
                <div className="max-w-lg mt-10">
                  <div className="flex flex-wrap gap-4 justify-start">
                    {images &&
                      images?.length > 0 &&
                      images?.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          width={100}
                          height={100}
                          loading="lazy"
                          className="rounded-md"
                          alt="room img"
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          뒤로가기
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          수정하기
        </button>
      </div>
    </form>
  )
}
