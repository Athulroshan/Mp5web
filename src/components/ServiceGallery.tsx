import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ServiceGalleryProps {
  images: string[]
  serviceName: string
}

const ServiceGallery: React.FC<ServiceGalleryProps> = ({ images, serviceName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  const currentImage = images[currentImageIndex]
  const isLoaded = loadedImages.has(currentImageIndex)

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-12 overflow-hidden">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">{serviceName} Gallery</h3>
      
      <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video">
        {/* Image with lazy loading */}
        <img
          src={currentImage}
          alt={`${serviceName} - Image ${currentImageIndex + 1}`}
          loading="lazy"
          onLoad={() => handleImageLoad(currentImageIndex)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Skeleton loader */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-4 mt-8 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                currentImageIndex === index ? 'ring-2 ring-indigo-600' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ServiceGallery
