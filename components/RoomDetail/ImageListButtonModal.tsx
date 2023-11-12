'use client';

import { Fragment, useState } from 'react';

import { RoomType } from '@/interface';
import { BLUR_DATA_URL } from '@/constants';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { AiOutlineClose, AiOutlineUnorderedList } from 'react-icons/ai';

export default function ImageListButtonModal({ data }: { data: RoomType }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="absolute right-6 bottom-8 bg-white text-black rounded-md px-4 py-1.5 text-sm border-black flex gap-2 items-center hover:shadow-lg"
      >
        <AiOutlineUnorderedList />
        사진 모두 보기
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <button
                    className="rounded-full p-2 hover:bg-black/5 mb-4"
                    onClick={closeModal}
                  >
                    <AiOutlineClose />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-xl md:text-2xl font-medium leading-6 text-gray-900"
                  >
                    이미지 전체 보기
                  </Dialog.Title>

                  <div className="flex flex-col gap-4 mt-10 mb-20 max-w-xl mx-auto">
                    {data?.images?.length > 0 ? (
                      data?.images?.map((img) => (
                        <Image
                          key={img}
                          src={img}
                          alt="room img"
                          width={1000}
                          height={1000}
                          style={{ objectFit: 'cover' }}
                          className="mx-auto"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-500">
                        등록된 숙소 이미지가 없습니다.
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
