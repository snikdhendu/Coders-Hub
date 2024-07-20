import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import DefaultImage from "../assets/upload-photo-here.png";
import UploadingAnimation from "../assets/uploading.gif";

const ImageUpload: React.FC = () => {
  const [avatarURL, setAvatarURL] = useState<string>(DefaultImage);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileUploadRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = () => {
    fileUploadRef.current?.click();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      uploadImageDisplay(file);
      event.dataTransfer.clearData();
    }
  };

  const uploadImageDisplay = async (file: File) => {
    try {
      setAvatarURL(UploadingAnimation);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        const data = await response.json();
        setAvatarURL(data.location);
      } else {
        setAvatarURL(DefaultImage);
      }
    } catch (error) {
      console.error(error);
      setAvatarURL(DefaultImage);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      uploadImageDisplay(file);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <img
        src={avatarURL}
        alt="Avatar"
        className="h-24 w-24 rounded-full object-cover border-4 border-blue-900"
      />

      <div
        className={`border-dashed border-2 rounded-lg p-6 w-96 font-royal4 flex flex-col items-center justify-center cursor-pointer ${
          isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
        }`}
        onClick={handleImageUpload}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileUploadRef}
          onChange={handleFileChange}
          hidden
        />
        <p className="text-center">Click to upload or drag and drop</p>
        <p className="text-center text-sm text-gray-500">PNG, JPG or JPEG (Max. 1mb)</p>
      </div>
    </div>
  );
};

export default ImageUpload;
