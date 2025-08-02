'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState("")
    const [selectedValue, setSelectedValue] = useState("")
    const router = useRouter()
    const items = [
        {
            key: "lt500",
            label: "< 500k",
        },
        {
            key: "from500to1m",
            label: "500k - 1000k",
        },
        {
            key: "gt1m",
            label: "> 1000k",
        }
    ];

    console.log('selectedvalue', selectedValue)

    const handleSearch = (e: any) => {
        e.preventDefault();
        router.push(`/search?query=${searchValue}&price=${selectedValue}`)

    }

    const handleSuggestion = (e:any)=>{
        e.preventDefault();
        router.push(`/suggestions?userId=1`)
    }
    return (
        <div className="ct-search-bar-1">
            <div className="ct-search-bar-2" >
                <form className=" max-w-md mx-auto" onSubmit={handleSearch}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="flex flex-col sm:flex-row relative focus:outline-none gap-2">
                        {/* o tim kiem */}
                        <div className=" flex items-center border border-gray-300 rounded-lg shadow-md p-2">
                            <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <input
                                type="search"
                                id="default-search"
                                className="w-full ps-10 text-lg text-gray-1000  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none "
                                placeholder="Tìm kiếm..."
                                onChange={(e) => setSearchValue(e.target.value || "")}
                            />
                        </div>

                        {/* filter  and search button*/}
                        <div className="flex flex-row gap-2 justify-end">

                            <button
                                type="submit"
                                className="ct-button-search"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}