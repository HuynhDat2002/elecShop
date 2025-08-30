'use client'
import CourseList from "@/component/CarouselList";
import { useState, useEffect } from "react";
import { Course } from "@/types";
import CategoryList from "@/component/CategoryList";
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/component/Breadcrumb";
export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();
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
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-10 mt-15 w-[95%] md:w-[98%] 2xl:w-[80%] md:mx-auto mx-auto">
        <Breadcrumb/>
        <div className="">
          slide
        </div>
        <div key="categorylist" className="w-full z-0">
          
          <p className=" flex text-3xl font-bold justify-center items-center md:justify-start mx-auto mb-3">Danh mục nổi bật</p>
          <CategoryList />
        </div>

        <div key="laptop" className="w-full z-0">
          {/* <p className=" flex text-3xl font-bold justify-center items-center md:justify-start mx-auto mb-3">Laptop</p> */}
           <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Sản phẩm nổi bật</h2>
                </div>
                <button
                    onClick={()=>router.push('/products')}
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors md:text-xl"
                >
                    Xem tất cả
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
          <CourseList courses={courses} />
        </div>

        <div key="phone" className="w-full z-0">
          <p className=" flex text-3xl font-bold justify-center items-center md:justify-start mx-auto mb-3">Dien thoai</p>
          <CourseList courses={courses} />
        </div>
        <div key="keyboard" className="w-full z-0">
          <p className=" flex text-3xl font-bold justify-center items-center md:justify-start mx-auto mb-3">Keyboard</p>
          <CourseList courses={courses} />
        </div>
        <div key="mouse" className="w-full z-0">
          <p className=" flex text-3xl font-bold justify-center items-center md:justify-start mx-auto mb-3">Mouse</p>
          <CourseList courses={courses} />
        </div>
      </main>
    </div>
  );
}
