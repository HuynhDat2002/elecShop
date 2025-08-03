'use client'
import Image from "next/image";
import { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation';
import SearchBar from "./SearchBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ModalSearch from './ModalSearch'
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import UserDropDown from "./UserDropDown";
import ModalChangePassword from "./ModalChangePassword";
import ModalManager from "./ModalManager";

export default function Header() {
    const [isOpenModalSearch, setOpenModalSearch] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false)
    const [isChangePassword, setIsChangePassword] = useState(false)
    const router = useRouter();
    const items = [
        {
            key: "home",
            label: "Trang chủ",
        },
        {
            key: "wish-list",
            label: "Đã thích",
        },
        {
            key: "watched",
            label: "Lịch sử xem",
        }

    ];

    const hanleClickDropDown = (key: string) => {
        if (key === "home") {
            router.push("/")
        }
        if (key === "wish-list") {
            router.push("/wish-list")
        }
        if (key === "watched") {
            router.push("/watched")
        }

    }
    return (
        <>
            <header className="fixed top-0 left-0 right-0 w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-xs flex flex-row py-2 place-content-between border-b border-gray-200 z-50">

                {/* logo  */}
                <div className=" flex flex-row items-center pl-5 gap-5">
                    <div className="flex flex-row items-center">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={50}
                            height={50}
                            className="rounded-full fill-red-500 stroke-blue-500"
                            style={{ fill: "red" }}
                        />
                        <p className="text-2xl font-bold ml-2 cursor-pointer" onClick={() => router.push("/")}>

                            CellElec
                        </p>
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center md:bg-gray-200 md:p-2 md:rounded-2xl font-semibold">
                        <p className="hidden md:block lg:text-xl">Danh mục</p>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className="cursor-pointer border-1 border-gray-300 rounded-lg p-2 shadow-md" variant="bordered">
                                    <Bars3BottomRightIcon className="size-6 text-black" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions"
                                className="bg-white border-1 border-gray-300 rounded-lg shadow-md"
                            >

                                <DropdownItem
                                    key={'danhmuc'}
                                    className={"text-danger p-2 border-b border-gray-300 hover:bg-gray-100"}
                                    onClick={() => hanleClickDropDown('danhmuc')}
                                >
                                    Danh mục
                                </DropdownItem>

                                <DropdownItem key="add-button" textValue="Add Button">
                                    {!isLogged &&
                                        <button
                                            type="button"
                                            className='ct-button-login my-3 hidden md:block'
                                            onClick={() => setIsOpenLogin(true)}

                                        >
                                            Đăng nhập
                                        </button>
                                    }
                                    {isLogged &&
                                        <Button className="hidden md:block cursor-pointer border-1 border-gray-300 rounded-lg p-2 shadow-md" variant="bordered">
                                            <UserCircleIcon className="size-6 text-black" />
                                        </Button>
                                    }
                                    <Button className="md:hidden block cursor-pointer " variant="bordered">
                                        <UserCircleIcon className="size-6 text-black" />
                                    </Button>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                {/* search bar */}
                <div className="flex justify-center items-center hidden 2xl:block">
                    <SearchBar />
                </div>

                {/* more */}
                <div className="flex items-center md:gap-3">
                    <div className="flex justify-center items-center block 2xl:hidden mr-5">
                        <MagnifyingGlassIcon className="size-7 text-black"
                            onClick={() => setOpenModalSearch(true)}
                        />
                    </div>
                    {/* <div className="text-xl flex gap-5 justify-center items-center flex-row pr-5"> */}
                    <div className="flex flex-row gap-3 cursor-pointer"
                        onClick={() => router.push('/cart')}
                    >
                        <p className="hidden md:block texl-xl">Giỏ hàng</p>
                        <p className="">
                            <ShoppingCartIcon className="size-8 text-black" />
                        </p>
                    </div>

                    <div className="flex justify-end items-center">
                        {!isLogged &&
                            <button
                                type="button"
                                className='ct-button-login my-3 hidden md:block mr-3'
                                onClick={() => setIsOpenLogin(true)}

                            >
                                Đăng nhập
                            </button>
                        }
                        {isLogged &&
                            <Button className="hidden md:block cursor-pointer border-1 border-gray-300 rounded-lg p-2 shadow-md" variant="bordered">
                                <UserCircleIcon className="size-6 text-black" />
                            </Button>
                        }
                        <Button className="md:hidden block cursor-pointer " variant="bordered">
                            <UserCircleIcon className="size-8 text-black" />
                        </Button>
                        {/* {isLogged &&

                                <UserDropDown isChangePassword={isChangePassword} setIsChangePassword={setIsChangePassword} />
                            } */}
                    </div>

                </div>

                {/* </div> */}
            </header>
            {isOpenModalSearch &&
                // <div className="flex justify-center items-center">

                <ModalSearch isOpen={isOpenModalSearch} onClose={() => setOpenModalSearch(false)} />
                // </div>
            }
            {isOpenLogin &&
                <ModalManager isOpen={isOpenLogin} setIsOpen={setIsOpenLogin} />
            }
            {isChangePassword &&
                <ModalChangePassword isOpen={isChangePassword} setIsOpen={setIsChangePassword} />
            }
        </>
    )
}

