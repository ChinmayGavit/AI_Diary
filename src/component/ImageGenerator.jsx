import React, { useState } from 'react';
import axios from 'axios';


const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      prompt: prompt
    };

    try {

      const response = await axios.post('http://localhost:8000/api/canva/generate', userData, { withCredentials: true });
      console.log(response.data);
      if (response.status === 200) {
        alert(`Image generated successfully`);
        setTimeout(() => {
          window.location.href = '/ai/preview';
        }, 1000);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <>
    <div>
      <section className="image-generator h-[40vh] flex items-center justify-center relative bg-cover bg-center bg-[url('./images/bg.jpg')]">
        <div className="absolute left-0 top-0 w-full h-full bg-[#121212] opacity-50"></div>
        <div className="content relative text-white p-4 max-w-2xl text-center">
          <h1 className="text-4xl font-bold">AI Image Generator Tool JavaScript</h1>
          <p className="mt-4 text-xl">Convert your text into an image within a second using this JavaScript-powered AI Image Generator tool.</p>
          <form className="generate-form mt-12 flex items-center bg-white rounded-full p-1" onSubmit={handleSubmit}>
            <input
              className="prompt-input w-full h-full outline-none p-4 border-none bg-transparent rounded-full text-base"
              type="text"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to see"
              required
            />
            <div className="controls flex items-center gap-4 ml-4">
              <button
                type="submit"
                className={`generate-btn text-base outline-none border-none font-medium text-white cursor-pointer h-full px-6 rounded-full bg-blue-600`}
              >
                Generate
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
    </>
  );
};

export default ImageGenerator;
