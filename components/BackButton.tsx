'use client';

import { useRouter } from 'next/navigation';
import { BiChevronLeft } from 'react-icons/bi';
import cn from 'classnames';

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={cn('rounded-md p-4 hover:bg-black/5', className)}
    >
      <BiChevronLeft />
    </button>
  );
}
