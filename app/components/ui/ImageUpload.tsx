'use client'

import React, { useState, useRef } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import { Button } from './Button'

interface ImageUploadProps {
  onImageUpload: (url: string) => void
  onRemove?: () => void
  currentImage?: string
  className?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onRemove,
  currentImage,
  className = ''
}) => {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      const data = await response.json()
      onImageUpload(data.url)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Ошибка загрузки файла: ' + (error as Error).message)
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {currentImage ? (
        <div className="relative group">
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClick}
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              >
                <Upload className="w-4 h-4" />
                Заменить
              </Button>
              {onRemove && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onRemove}
                  className="bg-red-500/20 backdrop-blur-sm text-white hover:bg-red-500/30"
                >
                  <X className="w-4 h-4" />
                  Удалить
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-fire-primary bg-fire-primary/5'
              : 'border-gray-300 hover:border-gray-400'
          } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fire-primary mb-4"></div>
              <p className="text-gray-600">Загрузка...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">
                Перетащите изображение сюда или нажмите для выбора
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, WebP до 10MB
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 
 