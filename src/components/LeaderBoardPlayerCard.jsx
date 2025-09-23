import React from "react";

function LeaderBoardPlayerCard({ rank, name, scores, avatar }) {
  return (
    <div
      className="
        w-full h-16 
        grid grid-cols-3 
        rounded-xl 
        bg-neutral-800 
        text-white 
        text-base 
        items-center 
        shadow-md 
        hover:bg-neutral-700 
        transition-colors 
        duration-200 
        cursor-pointer
      "
    >
      <div className="flex justify-start items-center w-full h-full pl-6 font-medium">
        {rank}
      </div>
      <div className="flex justify-start items-center w-full h-full gap-4">
        <img
          src={avatar}
          alt={`${name} avatar`}
          className="h-10 w-10 rounded-full object-cover border-2 border-purple-600 shadow-lg"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <span className="font-medium text-lg">{name}</span>
      </div>
      <div className="flex justify-end items-center w-full h-full pr-6">
        <p
          className="
            bg-gradient-to-r from-purple-500 to-indigo-500 
            px-4 py-[8px] 
            rounded-full 
            text-white 
            text-lg 
            font-bold 
            shadow-md
          "
        >
          {scores}
        </p>
      </div>
    </div>
  );
}

export default LeaderBoardPlayerCard;
