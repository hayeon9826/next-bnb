'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import axios from 'axios'
import { UserType } from '@/interface'
import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { FullPageLoader } from '@/components/Loader'

export default function UserEdit() {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const { status } = useSession()

  const fetchUser = async () => {
    const { data } = await axios('/api/users')
    return data as UserType
  }

  const { data: user, isSuccess } = useQuery('user', fetchUser, {
    enabled: status === 'authenticated',
    refetchOnMount: false,
  })

  const updateUser = async () => {
    const res = await axios.put('/api/users', {
      name: name,
      phone: phone,
      address: address,
      email: email,
    })
    if (res.status === 200) {
      toast.success('정보를 수정했습니다.')
      router.replace('/users/info')
    } else {
      toast.error('다시 시도해주세요.')
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    if (name === 'name') {
      setName(value)
    }
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'phone') {
      setPhone(value)
    }
    if (name === 'address') {
      setAddress(value)
    }
  }

  useEffect(() => {
    if (user && isSuccess) {
      setName(user?.name || '')
      setPhone(user?.phone || '')
      setAddress(user?.address || '')
      setEmail(user?.email || '')
    }
  }, [user, isSuccess])

  return user ? (
    <form className="max-w-3xl mx-auto px-4">
      <div className="pb-24">
        <h1 className="text-3xl font-semibold leading-7 text-gray-900">
          개인정보 수정
        </h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          개인정보를 수정해주세요.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              실명
            </label>
            <div className="mt-2">
              <input
                type="text"
                required
                name="name"
                id="name"
                onChange={onChange}
                value={name}
                className="block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              이메일 주소
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                required
                onChange={onChange}
                value={email}
                type="email"
                className="block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              집 주소
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="address"
                onChange={onChange}
                value={address}
                id="address"
                className="block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              전화번호
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={onChange}
                value={phone}
                className="block w-full rounded-md border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <input name="id" value={user.id} className="hidden" readOnly />
          <div className="col-span-full pt-4">
            <button
              type="button"
              onClick={updateUser}
              className="w-full py-2.5 rounded-md bg-rose-500 text-white hover:bg-rose-600"
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </form>
  ) : (
    <FullPageLoader />
  )
}
