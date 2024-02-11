import React from "react";
import image from './../assets/movix.png';

const Projects = () => {
  return (
    <div className="flex flex-col justify-center max-w-2xl mx-auto p-3 gap-6 mt-2 mb-8">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500">Build fun and engaging projects while learning MERN Stack</p>

      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="https://movies-kappa-eight.vercel.app/" target="_blank">
          <img
            className="rounded-t-lg"
            src={image}
            alt=""
          />
        </a>
        <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Movie Based Platform Using React JS
            </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Movies are meant to be shared, discussed, and celebrated – and that's exactly what you'll find on Movie Detail. 
          </p>
          <a
            href="https://movies-kappa-eight.vercel.app/" target="_blank"
            className="font-bold inline-flex focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300  rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
             Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
