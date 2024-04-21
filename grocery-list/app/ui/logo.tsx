import { ListBulletIcon } from '@heroicons/react/24/outline';

export default function Logo() {
  return (
    <div
      className='flex flex-row items-center leading-none'
    >
      <ListBulletIcon className="h-12 w-12" />
      <p className="text-[22px]">Lista Master</p>
    </div>
  );
}
