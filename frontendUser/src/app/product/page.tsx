'use client'
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart, ShoppingCart, Shield, Truck, RefreshCw, Award, Copy, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/component/Breadcrumb';

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('i5-1340P');
  const [selectedColor, setSelectedColor] = useState('Platinum Silver');
  const [selectedCondition, setSelectedCondition] = useState('Mới, Sealed');
  const [selectedWarranty, setSelectedWarranty] = useState('standard');
  // const [activeTab, setActiveTab] = useState('info');
  const [activeTab, setActiveTab] = useState('thongtin');
  const [showDetails, setShowDetails] = useState({
    thongtin: false,
    cauhinh: false,
    danhgia: false,
    baiviet: false
  });
  type tabType = 'thongtin' | 'cauhinh' | 'danhgia' | 'baiviet';

  const toggleDetails = (tab: tabType) => {
    setShowDetails(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }));
  };

  const tabs = [
    { id: 'thongtin', label: 'Thông tin' },
    { id: 'cauhinh', label: 'Cấu hình' },
    { id: 'danhgia', label: 'Đánh giá' },
    { id: 'baiviet', label: 'Bài viết' }
  ];

  const productImages = [
    'https://imagor.owtg.one/unsafe/fit-in/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2023/5/8/dell-xps-13-plus-9320-thinkpro.jpg',
    'https://imagor.owtg.one/unsafe/fit-in/160x160/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2023/5/8/dell-xps-13-plus-9320-thinkpro-u6x.jpg',
    'https://imagor.owtg.one/unsafe/fit-in/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2023/5/8/dell-xps-13-plus-9320-thinkpro-46a.jpg',
    'https://imagor.owtg.one/unsafe/fit-in/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2023/5/8/dell-xps-13-plus-9320-thinkpro-Of4.jpg',
    'https://imagor.owtg.one/unsafe/fit-in/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2023/5/8/dell-xps-13-plus-9320-thinkpro-vfL.jpg',
    'https://imagor.owtg.one/unsafe/fit-in/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2023/5/8/dell-xps-13-plus-9320-thinkpro-Wzw.jpg'
  ];

  const specifications = [
    { label: 'Loại CPU', value: 'Intel - Core i5 1340P, 12 / 16' },
    { label: 'Tốc độ', value: '1.0GHz , Lên tới 4.6GHz' },
    { label: 'Bộ nhớ đệm', value: '12MB' },
    { label: 'Card onboard', value: 'Intel Iris Xe Graphics' },
    { label: 'Card rời', value: 'Không' },
    { label: 'Dung lượng', value: '16GB LPDDR5 5200MHz' },
    { label: 'Hỗ trợ tối đa', value: '16GB (Không thể nâng cấp)' },
    { label: 'Dung lượng SSD', value: '512 GB (M.2 NVMe)' }
  ];

  const reviews = [
    { name: 'Uyên Thu', rating: 5.0, comment: 'SP tốt, tư vấn nhiệt tình.' },
    { name: 'bay', rating: 5.0, comment: 'oke' }
  ];

  const features = [
    { icon: '👤', text: 'Tư vấn tận tâm' },
    { icon: '🏪', text: 'Trung tâm khách hàng' },
    { icon: '📞', text: 'Phục vụ đến 24 giờ' },
    { icon: '🎯', text: 'Trải nghiệm tận tay' },
    { icon: '📝', text: 'Tư vấn' }
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="flex flex-col mb-10 2xl:mt-20 w-[95%] md:w-[98%] 2xl:w-[80%] mx-auto min-h-screen ">
      {/* Breadcrumb */}
     <Breadcrumb/>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg p-5 border">
              <div className="aspect-[4/3] flex items-center justify-center">
                <img
                  src={productImages[selectedImage]}
                  alt="Dell Inspiron 16 5630"
                  className="w-[800px] h-full object-contain"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-6 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-5 gap-4 pt-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                    {feature.icon}
                  </div>
                  <div className="text-xs text-gray-600">{feature.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Dell Inspiron 16 5630 - i5 1340P, QHD+ 16GB, 512GB
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gray-600">SKU: Inspiron1653001NS</span>
                <Copy size={16} className="text-gray-400 cursor-pointer" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-medium">5.0</span>
                </div>
                <span className="text-sm text-blue-600 cursor-pointer">2 đánh giá</span>
              </div>
            </div>

            {/* Variants */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Phiên bản</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedVariant('i5-1340P')}
                    className={`px-4 py-2 rounded-full border text-sm ${selectedVariant === 'i5-1340P'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700'
                      }`}
                  >
                    i5 1340P, QHD+ 16GB, 512GB
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Màu</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedColor('Platinum Silver')}
                    className={`px-4 py-2 rounded-full border text-sm ${selectedColor === 'Platinum Silver'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700'
                      }`}
                  >
                    Platinum Silver
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Loại hàng</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCondition('Mới, Sealed')}
                    className={`px-4 py-2 rounded-full border text-sm ${selectedCondition === 'Mới, Sealed'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700'
                      }`}
                  >
                    Mới, Sealed, Nhập khẩu
                  </button>
                </div>
              </div>
            </div>

            {/* Warranty Options */}
            <div>
              <h3 className="font-medium mb-3">Chọn gói bảo hành</h3>
              <div className="space-y-3">
                <div
                  onClick={() => setSelectedWarranty('standard')}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedWarranty === 'standard'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Bảo hành tiêu chuẩn</div>
                      <div className="text-sm text-green-600">Miễn phí</div>
                    </div>
                    <button className="text-blue-600 text-sm">Xem chi tiết</button>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedWarranty('extended')}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedWarranty === 'extended'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Bảo hành toàn diện 24 tháng</div>
                      <div className="text-sm text-blue-600">+999.000</div>
                    </div>
                    <button className="text-blue-600 text-sm">Xem chi tiết</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Purchase */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm text-gray-600">Mua ngay</div>
                  <div className="text-xs text-gray-500">Trả hết một giá</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Trả góp</div>
                  <div className="text-xs text-gray-500">0%, rất đơn giản</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-red-600">16.390.000</span>
                <span className="text-lg text-gray-500 line-through">28.990.000</span>
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">-43%</span>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-cyan-400 text-white py-3 px-6 rounded-lg font-medium hover:bg-cyan-500 transition-colors">
                  Mua ngay
                </button>
                <button className="flex items-center gap-2 bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors">
                  <ShoppingCart size={20} />
                  Thêm vào giỏ
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">i</span>
                </div>
                <div>
                  <div className="font-medium text-blue-900">Inspiron 16</div>
                  <div className="text-sm text-blue-700 mt-1">
                    🔵 ThinkPro là nhà bán lẻ chính thức
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Dell Inspiron 16 là dòng máy phổ thông, giá thành phải chăng nhưng vẫn đảm bảo được độ ổn định, hiệu suất bền bỉ cho học tập và làm việc.
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4">
                <Truck className="mx-auto mb-2 text-blue-600" size={24} />
                <div className="text-sm font-medium">Sẵn hàng và trung bay</div>
                <div className="text-xs text-gray-600">Tại 1 chi nhánh</div>
              </div>
              <div className="text-center p-4">
                <Shield className="mx-auto mb-2 text-blue-600" size={24} />
                <div className="text-sm font-medium">Vận chuyển miễn phí</div>
                <div className="text-xs text-gray-600">Nội thành HN & TPHCM</div>
              </div>
              <div className="text-center p-4">
                <RefreshCw className="mx-auto mb-2 text-blue-600" size={24} />
                <div className="text-sm font-medium">Bảo hành và đổi trả</div>
                <div className="text-xs text-gray-600">Bảo hành 12 tháng tại chuỗi của hãng ThinkPro</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        {/* <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { key: 'info', label: 'Thông tin' },
                { key: 'specs', label: 'Cấu hình' },
                { key: 'reviews', label: 'Đánh giá' },
                { key: 'articles', label: 'Bài viết' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-cyan-400 text-cyan-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'specs' && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">Cấu hình & đặc điểm</h3>
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex py-3 border-b border-gray-100">
                      <div className="w-1/3 text-gray-600">{spec.label}</div>
                      <div className="w-2/3 font-medium">{spec.value}</div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 text-blue-600 font-medium flex items-center gap-2">
                  Xem chi tiết <ChevronDown size={16} />
                </button>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Đánh giá sản phẩm</h3>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                    ✏️ Viết đánh giá
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-4xl font-bold mb-2">5.0 / 5</div>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-2 text-gray-600">2 đánh giá</span>
                    </div>
                    
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-sm w-8">{stars} ⭐</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded">
                            <div 
                              className="h-full bg-gray-800 rounded"
                              style={{ width: stars === 5 ? '100%' : '0%' }}
                            />
                          </div>
                          <span className="text-sm w-8">{stars === 5 ? '2' : '0'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <select className="w-full p-3 border rounded-lg mb-4">
                      <option>Mới nhất</option>
                      <option>Cũ nhất</option>
                      <option>Rating cao nhất</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {review.name[0]}
                        </div>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{review.rating}</span>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className="text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <button className="mt-6 text-blue-600 font-medium flex items-center gap-2">
                  Xem tất cả <ChevronDown size={16} />
                </button>
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">Bài viết chi tiết</h3>
                <div className="prose max-w-none">
                  <h4 className="text-lg font-semibold mb-4">
                    Đánh giá nhanh Dell Inspiron 5630: Màn ngon, chip khỏe, làm việc vui vẻ!
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Bạn đang tìm kiếm một chiếc laptop với màn hình cực lớn, chất lượng hiển thị rất cao để làm các công việc sáng tạo? 
                    Bạn cần một sản phẩm có thương hiệu, đủ bền bỉ để sử dụng lâu dài? Vậy thì hãy mạnh dạn lựa chọn Dell Inspiron 
                    5630, mẫu máy giá phổ thông đã có màn hình độ phân giải lên tới 2.5K, kích thước 16-inch, đi kèm phần cứng đời mới 
                    của Intel xoay quanh con chip Core i5-1335U - tiết kiệm điện nhưng không kém phần mạnh mẽ.
                  </p>
                  <button className="text-blue-600 font-medium">Xem chi tiết</button>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">Thông tin sản phẩm</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">
                    Dell Inspiron 16 5630 là laptop được thiết kế dành cho công việc và học tập hàng ngày. 
                    Với màn hình 16 inch độ phân giải QHD+ cung cấp hình ảnh sắc nét, chi tiết.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Được trang bị bộ vi xử lý Intel Core i5-1340P thế hệ thứ 13 mang lại hiệu năng mạnh mẽ 
                    cho các tác vụ văn phòng, thiết kế đồ họa cơ bản và giải trí.
                  </p>
                  <button className="text-blue-600 font-medium">Xem chi tiết</button>
                </div>
              </div>
            )}
          </div>
        </div> */}

        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer px-4 py-2 font-medium transition-colors duration-200 ${activeTab === tab.id
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className=" rounded-lg p-6">

            {/* Thông tin Tab */}
            {activeTab === 'thongtin' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin sản phẩm</h2>

                {/* Always visible content */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Mô tả sản phẩm</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Dell Inspiron 16 5630 là laptop được thiết kế dành cho công việc và học tập hàng ngày.
                      Với màn hình 16 inch độ phân giải QHD+ cung cấp hình ảnh sắc nét, chi tiết.
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-2">
                      Được trang bị vi xử lý Intel Core i5-1340P thế hệ thứ 13 mang lại hiệu năng mạnh mẽ
                      cho các tác vụ văn phóng, thiết kế đồ họa cơ bản và giải trí.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Thông tin cơ bản</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Thương hiệu:</span>
                        <span className="font-medium">Dell</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-medium">Inspiron 16 5630</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Màu sắc:</span>
                        <span className="font-medium">Platinum Silver</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bảo hành:</span>
                        <span className="font-medium">12 tháng</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable content */}
                {showDetails.thongtin && (
                  <div className="mt-4 space-y-4 animate-fadeIn">
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Ưu điểm nổi bật</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium text-gray-700">Hiệu năng vượt trội</h4>
                            <p className="text-sm text-gray-600">Intel Core i5-1340P với 12 cores, 16 threads cho hiệu năng đa nhiệm mượt mà</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium text-gray-700">Màn hình sắc nét</h4>
                            <p className="text-sm text-gray-600">QHD+ 16 inch với độ phân giải 2560x1600, hiển thị chi tiết sắc nét</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium text-gray-700">Thiết kế hiện đại</h4>
                            <p className="text-sm text-gray-600">Kiểu dáng mỏng nhẹ, vật liệu cao cấp, phù hợp mọi không gian làm việc</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Phù hợp với</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Sinh viên</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Nhân viên văn phòng</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Thiết kế đồ họa</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Lập trình viên</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Giải trí multimedia</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle Button */}
                <button
                  onClick={() => toggleDetails('thongtin')}
                  className="mt-4 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>{showDetails.thongtin ? 'Thu gọn' : 'Xem chi tiết'}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${showDetails.thongtin ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Cấu hình Tab */}
            {activeTab === 'cauhinh' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Cấu hình kỹ thuật</h2>

                {/* Always visible specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-700 mb-3">Vi xử lý</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">CPU:</span>
                        <span className="font-medium">Intel Core i5-1340P</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số nhân:</span>
                        <span className="font-medium">12 cores (4P + 8E)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tốc độ:</span>
                        <span className="font-medium">Up to 4.6GHz</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-700 mb-3">Bộ nhớ</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">RAM:</span>
                        <span className="font-medium">16GB DDR4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tốc độ RAM:</span>
                        <span className="font-medium">3200MHz</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ổ cứng:</span>
                        <span className="font-medium">512GB SSD PCIe</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-700 mb-3">Màn hình</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kích thước:</span>
                        <span className="font-medium">16 inch</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Độ phân giải:</span>
                        <span className="font-medium">2560 x 1600 (QHD+)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-700 mb-3">Đồ họa</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">GPU:</span>
                        <span className="font-medium">Intel Iris Xe Graphics</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VRAM:</span>
                        <span className="font-medium">Shared</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable detailed specs */}
                {showDetails.cauhinh && (
                  <div className="mt-4 space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-700 mb-3">Kết nối</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">USB-A:</span>
                            <span className="font-medium">2x USB 3.2 Gen 1</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">USB-C:</span>
                            <span className="font-medium">1x Thunderbolt 4</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">HDMI:</span>
                            <span className="font-medium">1x HDMI 1.4</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Audio:</span>
                            <span className="font-medium">3.5mm combo jack</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Card reader:</span>
                            <span className="font-medium">MicroSD</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-700 mb-3">Wireless & Audio</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">WiFi:</span>
                            <span className="font-medium">WiFi 6E (802.11ax)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bluetooth:</span>
                            <span className="font-medium">Bluetooth 5.2</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Speaker:</span>
                            <span className="font-medium">Dual stereo speakers</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Micro:</span>
                            <span className="font-medium">Dual array microphone</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-700 mb-3">Thông số vật lý</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Trọng lượng:</span>
                            <span className="font-medium">1.87 kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Kích thước:</span>
                            <span className="font-medium">356.78 x 251.9 x 18.3 mm</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Chất liệu:</span>
                            <span className="font-medium">Nhựa cao cấp</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-700 mb-3">Pin & Sạc</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Dung lượng pin:</span>
                            <span className="font-medium">54WHr</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Adapter:</span>
                            <span className="font-medium">65W USB-C</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Thời gian sạc:</span>
                            <span className="font-medium">~1.5 giờ (0-80%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle Button */}
                <button
                  onClick={() => toggleDetails('cauhinh')}
                  className="mt-4 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>{showDetails.cauhinh ? 'Thu gọn' : 'Xem chi tiết'}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${showDetails.cauhinh ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Đánh giá Tab */}
            {activeTab === 'danhgia' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Đánh giá sản phẩm</h2>

                {/* Overall rating */}
                <div className="bg-white p-4 rounded-lg border mb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">4.2</div>
                      <div className="flex text-yellow-400 text-sm">
                        ★★★★☆
                      </div>
                      <div className="text-sm text-gray-600">156 đánh giá</div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map(star => (
                          <div key={star} className="flex items-center space-x-2 text-sm">
                            <span className="w-3">{star}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: star === 4 ? '45%' : star === 5 ? '35%' : star === 3 ? '15%' : '5%' }}
                              ></div>
                            </div>
                            <span className="text-gray-600 w-8">{star === 4 ? '70' : star === 5 ? '55' : star === 3 ? '24' : star === 2 ? '5' : '2'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample reviews */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          A
                        </div>
                        <div>
                          <div className="font-medium">Anh Tuấn</div>
                          <div className="text-yellow-400 text-sm">★★★★★</div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 ngày trước</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Laptop này rất phù hợp cho công việc văn phòng và học tập. Màn hình sắc nét, hiệu năng ổn định.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          M
                        </div>
                        <div>
                          <div className="font-medium">Minh Châu</div>
                          <div className="text-yellow-400 text-sm">★★★★☆</div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">5 ngày trước</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Pin khá tốt, dùng được cả ngày. Thiết kế đẹp nhưng hơi nặng một chút.
                    </p>
                  </div>
                </div>

                {/* Expandable reviews */}
                {showDetails.danhgia && (
                  <div className="mt-4 space-y-4 animate-fadeIn">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            L
                          </div>
                          <div>
                            <div className="font-medium">Linh Đan</div>
                            <div className="text-yellow-400 text-sm">★★★★★</div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">1 tuần trước</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Mình là sinh viên IT và laptop này đáp ứng tốt nhu cầu code và thiết kế. RAM 16GB rất đủ dùng, màn hình QHD+ hiển thị code rất rõ ràng. Tản nhiệt cũng ổn, không bị nóng nhiều khi làm việc lâu.
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                          <span>👍</span><span>12</span>
                        </button>
                        <button className="hover:text-blue-500">Trả lời</button>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            H
                          </div>
                          <div>
                            <div className="font-medium">Hoàng Nam</div>
                            <div className="text-yellow-400 text-sm">★★★☆☆</div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">2 tuần trước</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Laptop ok nhưng loa hơi nhỏ, âm thanh không được hay lắm. Phù hợp cho những ai ít nghe nhạc xem phim. Hiệu năng thì tạm ổn.
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                          <span>👍</span><span>8</span>
                        </button>
                        <button className="hover:text-blue-500">Trả lời</button>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            T
                          </div>
                          <div>
                            <div className="font-medium">Thảo Vi</div>
                            <div className="text-yellow-400 text-sm">★★★★★</div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">3 tuần trước</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Rất hài lòng với sản phẩm! Giao diện Windows 11 mượt mà, khởi động nhanh nhờ SSD. Màn hình 16 inch vừa phải để làm việc, không bị mỏi mắt. Giá cả hợp lý so với cấu hình.
                      </p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                          <span>👍</span><span>15</span>
                        </button>
                        <button className="hover:text-blue-500">Trả lời</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle Button */}
                <button
                  onClick={() => toggleDetails('danhgia')}
                  className="mt-4 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>{showDetails.danhgia ? 'Thu gọn' : 'Xem thêm đánh giá'}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${showDetails.danhgia ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Bài viết Tab */}
            {activeTab === 'baiviet' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Bài viết liên quan</h2>

                {/* Featured articles */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          Đánh giá chi tiết Dell Inspiron 16 5630: Laptop văn phòng đáng mua 2024
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Cùng khám phá những ưu nhược điểm của Dell Inspiron 16 5630 trong bài đánh giá chi tiết...
                        </p>
                        <div className="text-xs text-gray-500">
                          <span>Tech Review</span> • <span>2 ngày trước</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          So sánh Dell Inspiron 16 5630 vs HP Pavilion 15: Chọn laptop nào?
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Phân tích chi tiết hai mẫu laptop tầm trung phổ biến nhất hiện nay...
                        </p>
                        <div className="text-xs text-gray-500">
                          <span>Laptop Guide</span> • <span>5 ngày trước</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable articles */}
                {showDetails.baiviet && (
                  <div className="mt-4 space-y-4 animate-fadeIn">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            Top 5 phần mềm tối ưu cho Dell Inspiron 16 5630
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Danh sách những phần mềm giúp khai thác tối đa hiệu năng laptop Dell của bạn...
                          </p>
                          <div className="text-xs text-gray-500">
                            <span>Software Tips</span> • <span>1 tuần trước</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            Hướng dẫn upgrade RAM và SSD cho Dell Inspiron 16 5630
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Chi tiết từng bước nâng cấp phần cứng để laptop hoạt động mạnh mẽ hơn...
                          </p>
                          <div className="text-xs text-gray-500">
                            <span>Hardware Guide</span> • <span>2 tuần trước</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            Kinh nghiệm sử dụng Dell Inspiron 16 5630 sau 6 tháng
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Chia sẻ trải nghiệm thực tế từ người dùng lâu năm về độ bền và hiệu năng...
                          </p>
                          <div className="text-xs text-gray-500">
                            <span>User Experience</span> • <span>3 tuần trước</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle Button */}
                <button
                  onClick={() => toggleDetails('baiviet')}
                  className="mt-4 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>{showDetails.baiviet ? 'Thu gọn' : 'Xem thêm bài viết'}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${showDetails.baiviet ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;