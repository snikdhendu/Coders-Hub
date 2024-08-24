import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import UploadingAnimation from "../assets/uploading.gif";
import { useUser } from '@clerk/clerk-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
interface ImageUploadProps {
  onUpload: (newPhotoUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const { user } = useUser();
  const userState: any = useSelector((state: RootState) => state.user);
  const DefaultImage = userState.profileUrl;
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
        const newPhotoUrl = data.location;
        setAvatarURL(newPhotoUrl);
        onUpload(newPhotoUrl); // Notify the parent component of the new photo URL
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
          isDragging ? 'border-blue-500 bg-blue-100 dark:bg-background' : 'border-gray-300 bg-gray-100 dark:bg-background'
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
