'use client';

import { UserType } from '@/interface';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

export default function UserInfo() {
  const { status } = useSession();
  const router = useRouter();

  const fetchUser = async () => {
    const { data } = await axios('/api/users');
    return data as UserType;
  };

  const { data: user, isSuccess } = useQuery('user', fetchUser, {
    enabled: status === 'authenticated',
  });

  return (
    <div className="mt-10 max-w-3xl mx-auto px-4">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-semibold">개인정보</h1>
        <button
          className="text-sm font-semibold underline px-4 py-1.5 rounded-md hover:bg-black/5"
          onClick={() => router.push('/users/edit')}
        >
          수정하기
        </button>
      </div>

      <div className="mt-10 flex flex-col mb-28">
        <div className="flex flex-col gap-2 border-b-gray-200 border-b pb-4">
          <h1>실명</h1>
          <div className="text-gray-500 text-sm">{user?.name || '-'}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b mt-4 pb-4">
          <h1>이메일</h1>
          <div className="text-gray-500 text-sm">{user?.email || '-'}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b mt-4 pb-4">
          <h1>이미지</h1>
          <img
            src={user?.image || '/images/logo.png'}
            width={50}
            height={50}
            alt="profile img"
            className="rounded-lg shadow"
          />
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b mt-4 pb-4">
          <h1>주소</h1>
          <div className="text-gray-500 text-sm">{user?.address || '-'}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b mt-4 pb-4">
          <h1>전화번호</h1>
          <div className="text-gray-500 text-sm">{user?.phone || '-'}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b mt-4 pb-4">
          <h1>로그인한 SNS</h1>
          <div className="text-gray-500 text-sm">
            {user?.accounts?.[0]?.provider || '-'}
          </div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b mt-4 pb-4">
          <h1>로그아웃</h1>
          <button
            className="text-gray-500 text-sm underline inline-block text-left"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            로그아웃하기
          </button>
        </div>
      </div>
    </div>
  );
}
