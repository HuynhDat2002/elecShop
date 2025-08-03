'use client'
import { useState, useEffect } from "react";
import Image from 'next/image'

export default function CategoryList() {
    const categoryList = [
        {
            key: "laptop",
            name: "Laptop",
            image: "/laptop.png"
        },
        {
            key: "mouse",
            name: "Chuột",
            image: "/mouse.png"
        },
        {
            key: "phone",
            name: "Điện thoại",
            image: "/iphone16.png"
        },
        {
            key: "keyboard",
            name: "Bàn phím",
            image: "/keyboard.png"
        }
    ]
    console.log('catelist',categoryList)
    return (

        <div className="flex justify-start items-center md:justify-start md:items-start mx-auto">

            <div className="flex justify-center items-center mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-1 md:gap-y-7 lg:grid-cols-4 2xl:gap-x-0 ">

                {categoryList.map((category: any) => (
                    <div key={category.key} className="">
                        <div className='flex flex-wrap justify-center'>
                            <div className="flex flex-col gap-4 cursor-pointer">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    width={200}
                                    height={200}
                                    className="w-50 h-50 object-contain"
                                />
                                <div className="flex px-1 mb-2 justify-center items-center">
                                    <p className="text-lg xl:text-2xl dark:text-zinc-400 text-zinc-600 font-bold line-clamp-2 basis-1/2">
                                        {category.name}
                                    </p>
                                </div>
                            </div>


                        </div>
                    </div>
                ))}
            </div>

        </div>

    );
}