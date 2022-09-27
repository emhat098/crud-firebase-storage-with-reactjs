import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import { deleteFile, getAllFile, uploadFile } from '../utils/fileManager';

const Home: NextPage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagesUploaded, setImageUploaded] = useState<string[]>([]);
  const [imageGallery, setImageGallery] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const FOLDER_NAME = 'images';

  const handleOnChange = (e: any) => {
    setImages(e.target.files as File[]);
    e.target.files = null;
  };

  const handleOnDelete = (url: string) => {
    deleteFile(url).then(() => {
      setImageUploaded((prev) => prev.filter((img) => img !== url));
      setImageGallery((prev) => prev.filter((img) => img !== url));
      alert(`Deleted file`);
    });
  };

  const handleOnUpload = () => {
    if (images.length === 0) return false;
    uploadFile(FOLDER_NAME, images).then((imageList) => {
      setImageUploaded(imageList);
      alert('Upload file successed');
      if (fileRef.current) {
        fileRef.current.value = '';
      }
    });
  };

  const handleGetFiles = () => {
    getAllFile(FOLDER_NAME)
      .then((listImages) => {
        setImageGallery(listImages);
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  };
  return (
    <div className="app">
      <div className="form-control">
        <label htmlFor="file">
          <input
            type="file"
            ref={fileRef}
            onChange={handleOnChange}
            multiple
          />
        </label>
        <button
          className="button"
          onClick={handleOnUpload}
        >
          Upload file to firebase storage
        </button>
      </div>
      <div className="image-container">
        <p>Image preview</p>
        <ul className="image-container__list">
          {imagesUploaded.length > 0 &&
            imagesUploaded.map((image) => (
              <li
                style={{ listStyle: 'none' }}
                key={image}
              >
                <img
                  src={image}
                  width="100%"
                />
                <button
                  type="button"
                  onClick={() => handleOnDelete(image)}
                >
                  Delete file
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="image-container-gallery">
        <h1>
          Image Gallery
          <button
            className="button"
            onClick={handleGetFiles}
          >
            Click me to get it !!!
          </button>
        </h1>
        <div className="image-container">
          <ul className="image-container__list">
            {imageGallery.length > 0 &&
              imageGallery.map((image) => (
                <li
                  style={{ listStyle: 'none' }}
                  key={image}
                >
                  <img
                    src={image}
                    width="100%"
                  />
                  <button
                    type="button"
                    onClick={() => handleOnDelete(image)}
                  >
                    Delete file
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
