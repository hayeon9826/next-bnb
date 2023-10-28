import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { COMMENTS } from './CommentList'

interface CommentListModalProps {
  isOpen: boolean
  closeModal: () => void
}

export default function CommentListModal({
  isOpen,
  closeModal,
}: CommentListModalProps) {
  return (
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
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <button
                  className="rounded-full p-2 hover:bg-black/5 mb-4"
                  onClick={closeModal}
                >
                  <AiOutlineClose />
                </button>
                <Dialog.Title
                  as="h3"
                  className="text-xl md:text-2xl font-semibold leading-6 text-gray-900"
                >
                  후기 전체 보기
                </Dialog.Title>
                <h1 className="font-semibold text-xl mb-2 mt-4">후기 248개</h1>
                <div className="mt-8 flex flex-col gap-8 mx-auto max-w-lg mb-10">
                  {COMMENTS?.map((comment) => (
                    <div key={comment?.id} className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <img
                          src={comment?.imageUrl || '/images/logo.png'}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <div>
                          <h1 className="font-semibold">
                            {comment?.name || '-'}
                          </h1>
                          <div className="text-gray-500 text-xs">
                            {comment?.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-600 text-sm">
                        {comment?.comment}
                      </div>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
