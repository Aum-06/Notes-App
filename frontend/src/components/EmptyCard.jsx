import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div>
      <img src={imgSrc} alt="no-note" className="w-60" />
      <p className="w-1/2 text-center text-sm font-medium text-slate-700 leading-7  mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
