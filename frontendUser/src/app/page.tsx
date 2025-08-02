'use client'
import CourseList from "@/component/CourseList";
import { useState, useEffect } from "react";
import { Course } from "@/types";
import CategoryList from "@/component/CategoryList";
export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
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
        <div className="">
          slide
        </div>
        <div key="categorylist" className="w-full z-0">
          <p className=" flex text-3xl font-bold justify-center items-center md:justify-start mx-auto mb-3">Danh mục nổi bật</p>
          <CategoryList />
        </div>

        <div key="laptop" className="w-full z-0">
          <p className=" flex text-3xl font-bold justify-center items-center md:justify-start mx-auto mb-3">Laptop</p>
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
