'use client'
import { useRouter,usePathname } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';

export default function Breadcrumb() {
  const router = useRouter();
   const pathname = usePathname();
  
  // Mapping routes to breadcrumb labels
  type labelType = '/'|'/product' | '/dien-thoai' | '/dien-thoai/apple' | '/dien-thoai/samsung' | '/laptop' | '/tablet'|'/products';
  const routeLabels:Record<labelType, string> = {
    '/': 'Trang chủ',
    '/dien-thoai': 'Điện thoại',
    '/dien-thoai/apple': 'Apple',
    '/dien-thoai/samsung': 'Samsung',
    '/laptop': 'Laptop',
    '/tablet': 'Tablet',
    '/products':'Products',
    '/product':'Product'
  };
 
  // Build breadcrumb from current route
  const buildBreadcrumb = () => {
    const pathSegments = pathname.split('/').filter(Boolean);   
    const breadcrumb = [{ label: 'Trang chủ', href: '/' }];
    
    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath as labelType] || segment;
      breadcrumb.push({ label, href: currentPath });
    });
    
    return breadcrumb;
  };

  const breadcrumbItems = buildBreadcrumb();

  return (
    <div className="flex items-center gap-2 mb-6 lg:text-lg">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index === 0 && <Home size={16} className="text-gray-700" />}
          
          <button
            onClick={() => router.push(item.href)}
            className={`hover:text-blue-600 hover:cursor-pointer transition-colors ${
              index === breadcrumbItems.length - 1 
                ? 'text-gray-900 font-semibold' 
                : 'text-gray-600 hover:underline'
            }`}
          >
            {item.label}
          </button>
          
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight size={16} className="text-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
}