import React from "react";

function LeaderBoardPlayerCardTitle() {
  return (
    <div
      className="
        w-full h-12 
        grid grid-cols-3 
        rounded-xl 
        border-b-2 border-purple-800 
        text-[rgb(180,180,180)] 
        font-semibold text-lg
      "
    >
      <div className="flex justify-start items-center w-full h-full pl-6">
        Rank
      </div>
      <div className="flex justify-start items-center w-full h-full">
        User name
      </div>
      <div className="flex justify-end items-center w-full h-full pr-6">
        Score
      </div>
    </div>
  );
}

export default LeaderBoardPlayerCardTitle;
