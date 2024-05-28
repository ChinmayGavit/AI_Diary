import React from 'react';
import axios from 'axios';

const Preview = () => {

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/canva/download', null, {
        withCredentials: true
      });
      if (response.status === 200) {
        alert(`Download Successfull`);
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="max-w-2xl py-32 sm:py-4 lg:py-5">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Thank you for using AI Diary Generator
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleClick}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;