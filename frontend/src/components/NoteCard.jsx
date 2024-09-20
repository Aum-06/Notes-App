import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const NoteCard = ({ title, date, content, onEdit, onDelete }) => {
  // Log date prop to check its format
  console.log("NoteCard date prop:", date);

  // Convert and format date
  const parsedDate = new Date(date);
  const formattedDate = isNaN(parsedDate.getTime()) ? 'Invalid Date' : parsedDate.toLocaleDateString();

  return (
    <div>
      <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out m-4">
        <div>
          <h6 className="text-md font-medium">{title}</h6>
          <span className="text-sm font-light text-slate-500">{formattedDate}</span> {/* Display formatted date */}
        </div>
        <p className="mt-2 font-normal">{content?.slice(0, 60)}</p>
        <div className="flex items-center gap-3 mt-1">
          <MdEdit className="size-6 hover:text-green-500 cursor-pointer" onClick={onEdit} />
          <MdDelete className="size-6 hover:text-red-500 cursor-pointer" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
