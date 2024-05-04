import { subtitle, title } from './primitives'

export function Title({ text }: { text: string }) {
    return (
        <div className="w-full flex text-center items-center justify-center">
            <span className={title({ color: 'violet' })}>{text}</span>
        </div>
    )
}

export function Subtitle({ text, startContent }: { text: string, startContent?: React.ReactNode }) {
    return (
        <div className="w-full flex text-center items-center justify-center mt-4">
            {startContent ? startContent : ''}
            <span>{text}</span>
        </div>
    )
}