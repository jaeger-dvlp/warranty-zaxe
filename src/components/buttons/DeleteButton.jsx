import React from 'react';

import { BiTrashAlt } from 'react-icons/bi';
import deleteItem from '@/src/utils/DeleteItem';
import { useAppContext } from '@/src/contexts/AppWrapper';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function DeleteButton({ id, deviceSerialNumber, getTableRows }) {
  const supaBase = useSupabaseClient();
  const {
    activateAlertPopup,
    updateAlertPopup,
    activateConfirmPopup,
    deactivateConfirmPopup,
  } = useAppContext();

  const handleClick = () => {
    try {
      return activateConfirmPopup({
        message: 'Are you sure you want to delete this item?',
        onConfirm: () => {
          deactivateConfirmPopup();
          activateAlertPopup({
            status: 'loading',
            message: 'Deleting item...',
          });

          return deleteItem({
            id,
            deviceSerialNumber,
            getTableRows,
            supaBase,
            updateAlertPopup,
          });
        },
      });
    } catch (error) {
      return false;
    }
  };

  return (
    <button
      type="button"
      className="flex items-center justify-center p-1 bg-white border-2 rounded-md border-zinc-300 text-zinc-600 hover:bg-zinc-100"
      onClick={handleClick}
    >
      <BiTrashAlt className="w-4 h-4" />
    </button>
  );
}

export default DeleteButton;
