'use client';

export function PageTitle({ title }: { title: string }) {
    return (
        <div className="flex w-full items-center justify-between">
            <h1 className='text-2xl'>{title}</h1>
        </div>
    );
}
