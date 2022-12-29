import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { useAppContext } from '@/src/contexts/AppWrapper';

function EditButton({ item, onEditComplete }) {
  const { activateEditPopup } = useAppContext();

  return (
    <button
      type="button"
      className="flex items-center justify-center p-1 bg-white border-2 rounded-md border-zinc-300 text-zinc-600 hover:bg-zinc-100"
      onClick={() => activateEditPopup({ item, onEditComplete })}
    >
      <BiEdit className="w-4 h-4" />
    </button>
  );
}

export default EditButton;
