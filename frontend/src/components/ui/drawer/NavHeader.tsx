import React from 'react'

type Props = {
    title: string;
}

export const NavHeader = ({ title }: Props) => {
    return (
        <div className="py-[18px] px-[16px]">
            <h2 className="font-roboto
                           font-extrabold
                           text-[14px]
                           tracking-[0.1px]
                           text-[#49454F]">
                {title}
            </h2>
        </div>
    )
}
