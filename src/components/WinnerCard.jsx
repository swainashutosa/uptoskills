import React from "react";

function WinnerCard(props) {
  // Utility fn: check agar URL Google/GitHub avatar ka hai
  const isThirdPartyAvatar = (url) => {
    if (!url) return false;
    return url.includes("googleusercontent.com") || url.includes("lh3.google") || url.includes("avatars.githubusercontent.com");
  };

  return (
    <div className="grid grid-cols-3 w-full h-full text-white items-end">
      {/* 🥈 2nd */}
      <div className="flex flex-col justify-end w-full h-full pb-2 relative rounded-t-xl overflow-hidden">
        <h3 className="text-center text-xl font-bold text-gray-300 mb-2 z-10 relative">🥈2nd</h3>
        <div className="flex justify-center items-center w-full mb-3 z-10 relative">
          <span className="text-sm text-gray-400">Score :&nbsp;</span>
          <p className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-[6px] rounded-full text-sm font-semibold text-white shadow-md">
            {props.second_winner_score}
          </p>
        </div>
        <div className="w-full flex justify-center h-[140px] mb-2 z-10 relative">
          <img
            src={props.second_winner}
            alt="Second winner image"
            className={`h-full w-auto object-cover shadow-xl ${isThirdPartyAvatar(props.second_winner) ? "rounded-full" : "rounded-lg"}`.replace('border-2 border-gray-700', '').trim()}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-center text-lg font-semibold mb-2 z-10 relative">{props.winner2}</p>
      </div>

      {/* 🏆 1st */}
      <div className="flex flex-col justify-end w-full h-full pb-[40px] -mt-0 relative rounded-t-xl overflow-hidden">
        <h3 className="text-center text-2xl font-extrabold text-white mb-2 z-10 relative">🥇 1st</h3>
        <div className="flex justify-center items-center w-full mb-3 z-10 relative">
          <span className="text-base text-gray-300">Score :&nbsp;</span>
          <p className="bg-gradient-to-r from-pink-600 to-red-600 px-5 py-[8px] rounded-full text-base font-bold text-white shadow-lg">
            {props.first_winner_score}
          </p>
        </div>
        <div className="w-full flex justify-center h-[180px] mb-2 z-10 relative">
          <img
            src={props.first_winner}
            alt="First winner image"
            className={`h-full w-auto object-cover shadow-2xl ${isThirdPartyAvatar(props.first_winner) ? "rounded-full" : "rounded-lg"}`.replace('border-4 border-yellow-500', '').trim()}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-center font-bold text-xl mb-2 z-10 relative">{props.winner1}</p>
      </div>

      {/* 🥉 3rd */}
      <div className="flex flex-col justify-end w-full h-full pb-2 relative rounded-t-xl overflow-hidden">
        <h3 className="text-center text-xl font-bold text-gray-300 mb-2 z-10 relative">🥉3rd</h3>
        <div className="flex justify-center items-center w-full mb-3 z-10 relative">
          <span className="text-sm text-gray-400">Score :&nbsp;</span>
          <p className="bg-gradient-to-r from-teal-600 to-blue-600 px-4 py-[6px] rounded-full text-sm font-semibold text-white shadow-md">
            {props.third_winner_score}
          </p>
        </div>
        <div className="w-full flex justify-center h-[120px] mb-2 z-10 relative">
          <img
            src={props.third_winner}
            alt="Third winner image"
            className={`h-full w-auto object-cover shadow-xl ${isThirdPartyAvatar(props.third_winner) ? "rounded-full" : "rounded-lg"}`.replace('border-2 border-gray-700', '').trim()}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-center text-lg font-semibold mb-2 z-10 relative">{props.winner3}</p>
      </div>
    </div>
  );
}

export default WinnerCard;
