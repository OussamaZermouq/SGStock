'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

export default function UploadImageForm() {
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
      console.log(imageDataUri)
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageDataUri) {
      alert('Please select an image to upload.');
      return;
    }

    try {
      const response = await axios.post('/api/upload-image', { image: imageDataUri });
      setImageUrl(response.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Upload Image</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
