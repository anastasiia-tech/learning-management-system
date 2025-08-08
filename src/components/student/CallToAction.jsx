import React from "react";
import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Навчайтесь будь-де й будь-коли
      </h1>
      <p className="text-gray-500 sm:text-sm">
        Вивчайте нове у зручний для себе час та місце. Платформа <br /> створена
        для вашого комфорту й розвитку.
      </p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <button className="px-10 py-3 rounded-md text-white bg-blue-600">
          Почати
        </button>
        <button className="flex items-center gap-2">
          Дізнатись більше <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
