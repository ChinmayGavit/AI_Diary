import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ImageGenerator = () => {
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const [images, setImages] = useState([]);

  const handleImageGeneration = (e) => {
    e.preventDefault();
    if (isImageGenerating) return;

    const userPrompt = e.target.prompt.value;
    const userImgQuantity = parseInt(e.target.quantity.value);

    setIsImageGenerating(true);
    setImages(Array.from({ length: userImgQuantity }, () => ({ src: './images/loader.svg', loading: true })));

    // Simulate image generation delay
    setTimeout(() => {
      const generatedImages = Array.from({ length: userImgQuantity }, () => ({
        src: './images/placeholder.jpg',
        downloadName: `${new Date().getTime()}.jpg`,
        loading: false
      }));
      setImages(generatedImages);
      setIsImageGenerating(false);
    }, 2000);
  };

  return (
    <div>
      <section className="image-generator h-[40vh] flex items-center justify-center relative bg-cover bg-center bg-[url('./images/bg.jpg')]">
        <div className="absolute left-0 top-0 w-full h-full bg-[#121212] opacity-50"></div>
        <div className="content relative text-white p-4 max-w-2xl text-center">
          <h1 className="text-4xl font-bold">AI Image Generator Tool JavaScript</h1>
          <p className="mt-4 text-xl">Convert your text into an image within a second using this JavaScript-powered AI Image Generator tool.</p>
          <form onSubmit={handleImageGeneration} className="generate-form mt-12 flex items-center bg-white rounded-full p-1">
            <input
              className="prompt-input w-full h-full outline-none p-4 border-none bg-transparent rounded-full text-base"
              type="text"
              name="prompt"
              placeholder="Describe what you want to see"
              required
            />
            <div className="controls flex items-center gap-4 ml-4">
              <select name="quantity" className="img-quantity outline-none border-none h-11 bg-transparent text-base" hidden>
                <option value="1">1 Image</option>
                <option value="2">2 Images</option>
                <option value="3" selected>3 Images</option>
                <option value="4">4 Images</option>
              </select>
              <button
                type="submit"
                className={`generate-btn text-base outline-none border-none font-medium text-white cursor-pointer h-full px-6 rounded-full bg-blue-600 ${isImageGenerating && 'opacity-60 pointer-events-none'}`}
              >
                {isImageGenerating ? 'Generating' : 'Generate'}
              </button>
            </div>
          </form>
        </div>
        <Link to="/ai/preview" className="preview-btn absolute bottom-4 right-4 h-9 w-28 flex items-center justify-center text-white bg-blue-600 rounded-full opacity-90 hover:opacity-100">
          Preview
        </Link>
      </section>
      <section className="image-gallery flex gap-4 p-4 flex-wrap justify-center mx-auto mt-12 max-w-5xl">
        {images.map((image, index) => (
          <div key={index} className={`img-card relative flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden ${image.loading && 'loading'}`}>
            <img src={image.src} alt="AI generated" className="object-cover w-full h-full" />
            {!image.loading && (
              <a href={image.src} download={image.downloadName} className="download-btn absolute bottom-4 right-4 h-9 w-9 flex items-center justify-center text-white bg-white rounded-full opacity-0 transition-opacity duration-200 hover:opacity-100">
                <img src="./images/download.svg" alt="download icon" className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ImageGenerator;
