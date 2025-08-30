'use client'
import { useState, useEffect, useRef } from "react";
import CourseCard from "@/component/CourseCard";
import { Course } from "@/types";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Star, Zap, ArrowUp, ArrowDown, Heart, ShoppingCart } from 'lucide-react';
import Breadcrumb from "@/component/Breadcrumb";

export default function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [sortBy, setSortBy] = useState('popular');
    type ExpandedSectionKey = 'brand' | 'need' | 'price' | 'origin' | 'condition' | 'promotion';
    const [expandedSections, setExpandedSections] = useState<Record<ExpandedSectionKey, boolean>>({
        brand: true,
        need: false,
        price: false,
        origin: false,
        condition: false,
        promotion: false
    });

    const [selectedFilters, setSelectedFilters] = useState({
        brands: [],
        needs: [],
        priceRanges: [],
        origins: [],
        conditions: []
    });

    const toggleSection = (section: ExpandedSectionKey) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    useEffect(() => {
        async function fetchCourses() {
            const response = await fetch('/api/courses', {
                method: 'GET'
            });
            const data = await response.json();
            setCourses(data.courses);
        }
        fetchCourses();
    }, []);
    console.log('Courses', courses);

    const sortOptions = [
        { value: 'popular', label: 'Phổ biến', icon: Star },
        { value: 'hot', label: 'Khuyến mãi HOT', icon: Zap },
        { value: 'price-asc', label: 'Giá Thấp - Cao', icon: ArrowUp },
        { value: 'price-desc', label: 'Giá Cao - Thấp', icon: ArrowDown }
    ];


    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN');
    };

    const brands = [
        { name: 'Lenovo', count: 120 },
        { name: 'Dell', count: 85 },
        { name: 'HP', count: 45 },
        { name: 'Microsoft', count: 12 },
        { name: 'Asus', count: 67 },
        { name: 'Acer', count: 34 },
        { name: 'Apple', count: 23 },
        { name: 'LG', count: 15 }
    ];

    const needs = [
        { name: 'Sinh viên', count: 89 },
        { name: 'Gaming', count: 45 },
        { name: 'Đồ họa', count: 32 },
        { name: 'Mỏng nhẹ', count: 78 },
        { name: 'Văn phòng', count: 156 },
        { name: 'Lập trình', count: 67 },
        { name: 'Laptop AI', count: 23 }
    ];

    const priceRanges = [
        'Dưới 10 triệu',
        'Từ 15 - 20 triệu',
        'Từ 25 - 30 triệu',
        'Trên 40 triệu',
        'Từ 10 - 15 triệu',
        'Từ 20 - 25 triệu',
        'Từ 30 - 40 triệu'
    ];

    const FilterSection = ({ title, isExpanded, onToggle, children }: { title: any, isExpanded: any, onToggle: any, children: any }) => (
        <div className="border-b border-gray-200 pb-4 mb-4">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            >
                <p className="lg:text-xl font-semibold">{title}</p>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {isExpanded && <div className="space-y-2">{children}</div>}
        </div>
    );
    return (
        <div className=" flex flex-col mb-10 2xl:mt-20 w-[95%] md:w-[98%] 2xl:w-[80%] mx-auto">
            <Breadcrumb />

            {/* <div className="w-full max-w-[1635px] mx-auto flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Sắp xếp theo</h1>
                <div className="flex gap-2">
                    {sortOptions.map(option => {
                        const IconComponent = option.icon;
                        return (
                            <button
                                key={option.value}
                                onClick={() => setSortBy(option.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${sortBy === option.value
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <IconComponent size={16} />
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </div> */}
            <div className="flex flex-row gap-5 ">
                {/* Sidebar Filters */}
                <div className="w-90 bg-white rounded-xl p-6 h-fit sticky top-6 overflow-y-scroll">
                    <h2 className="lg:text-xl font-semibold mb-5">277 sản phẩm</h2>
                    <div className="flex items-center justify-between border-b-1 border-gray-300 mb-5 pb-3">
                        <div className="flex gap-2">
                            <button className="px-3 py-1  border rounded text-lg">Sơ sánh</button>
                            <select className="px-3 py-1  border rounded text-lg">
                                <option>Nổi bật nhất</option>
                                <option>Giá thấp đến cao</option>
                                <option>Giá cao đến thấp</option>
                            </select>
                        </div>
                    </div>

                    {/* Brand Filter */}
                    <FilterSection
                        title="Thương hiệu"
                        isExpanded={expandedSections.brand}
                        onToggle={() => toggleSection('brand')}


                    >
                        <div className="grid grid-cols-2 gap-2">
                            {brands.map((brand) => (
                                <label key={brand.name} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span className="md:text-lg text-gray-700">{brand.name}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Need Filter */}
                    <FilterSection
                        title="Nhu cầu"
                        isExpanded={expandedSections.need}
                        onToggle={() => toggleSection('need')}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {needs.map((need) => (
                                <label key={need.name} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span className="text-sm text-gray-700">{need.name}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Price Filter */}
                    <FilterSection
                        title="Khoảng giá"
                        isExpanded={expandedSections.price}
                        onToggle={() => toggleSection('price')}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {priceRanges.map((range) => (
                                <label key={range} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span className="text-sm text-gray-700">{range}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Origin Filter */}
                    <FilterSection
                        title="Nguồn hàng"
                        isExpanded={expandedSections.origin}
                        onToggle={() => toggleSection('origin')}
                    >
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm text-gray-700">Chính hãng</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm text-gray-700">Nhập khẩu</span>
                            </label>
                        </div>
                    </FilterSection>

                    {/* Condition Filter */}
                    <FilterSection
                        title="Tình trạng"
                        isExpanded={expandedSections.condition}
                        onToggle={() => toggleSection('condition')}
                    >
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm text-gray-700">Mới, Sealed</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm text-gray-700">Mới, Full box</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm text-gray-700">Outlet</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm text-gray-700">Used</span>
                            </label>
                        </div>
                    </FilterSection>

                    {/* Promotion Filter */}
                    <FilterSection
                        title="Có khuyến mại (1)"
                        isExpanded={expandedSections.promotion}
                        onToggle={() => toggleSection('promotion')}
                    >
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm text-gray-700">Có khuyến mại</span>
                            </label>
                        </div>
                    </FilterSection>
                </div>

                <div className="flex justify-center mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-20 md:gap-y-7 lg:grid-cols-3 xl:grid-cols-5  ">
                    {courses.map((course: Course) => (
                        <div key={course.id} className="">
                            <CourseCard product={course} />
                        </div>
                    ))}
                </div>
            </div>
            {/* <Page type={tab.tab}/> */}
        </div>
    );
}

