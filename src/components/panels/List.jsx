import React from 'react';
import { useTranslation } from 'next-i18next';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useAppContext } from '@/src/contexts/AppWrapper';

function Loading() {
  return (
    <tr className="w-full fade-in">
      <td colSpan="11" className="">
        <div className="flex items-center justify-center w-full h-full p-5">
          <p>Loading...</p>
        </div>
      </td>
    </tr>
  );
}

function Empty() {
  return (
    <tr className="w-full fade-in">
      <td colSpan="11" className="">
        <div className="flex items-center justify-center w-full h-full p-5">
          <p>Empty.</p>
        </div>
      </td>
    </tr>
  );
}

function DeleteButton({ id }) {
  const supaBase = useSupabaseClient();
  const { activateAlertPopup } = useAppContext();
  const deleteItem = async () => {
    const { error } = await supaBase
      .from('warrantyList')
      .delete()
      .match({ id });

    if (error)
      return activateAlertPopup({
        status: 'Error',
        message: error?.message || 'An error occurred while deleting the item',
      });

    return activateAlertPopup({
      status: 'Success',
      message: 'Item deleted successfully.',
    });
  };

  return (
    <button
      type="button"
      className="flex items-center justify-center p-1 bg-white border-2 rounded-md border-zinc-300 text-zinc-600 hover:bg-zinc-100"
      onClick={deleteItem}
    >
      <BiTrashAlt className="w-4 h-4" />
    </button>
  );
}

function EditButton({ id }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center p-1 bg-white border-2 rounded-md border-zinc-300 text-zinc-600 hover:bg-zinc-100"
      onClick={() => id}
    >
      <BiEdit className="w-4 h-4" />
    </button>
  );
}

function List() {
  const [tableRows, setTableRows] = React.useState(<Loading />);
  const { t } = useTranslation();
  const Fields = {
    deviceSerialNumber: t('forms.global.inputs.deviceSerialNumber.label'),
    purchaseDate: t('forms.global.inputs.purchaseDate.label'),
    name: t('forms.global.inputs.name.label'),
    surname: t('forms.global.inputs.surname.label'),
    emailAddress: t('forms.global.inputs.emailAddress.label'),
    phoneNumber: t('forms.global.inputs.phoneNumber.label'),
    country: t('forms.global.inputs.country.label'),
    invoiceImage: t('forms.global.inputs.invoiceImage.label'),
    companyName: t('forms.global.inputs.companyName.label'),
    distributorName: t('forms.global.inputs.distributorName.label'),
  };

  const supaBase = useSupabaseClient();

  const getTableRows = async () => {
    const { data, error } = await supaBase.from('warrantyList').select('*');

    if (error) return null;

    const TableRows = Promise.all(
      data.map((item) => (
        <tr className="fade-in" key={`${item.deviceSerialNumber}-list-item`}>
          <td>{item.deviceSerialNumber}</td>
          <td>{item.purchaseDate}</td>
          <td>{item.name}</td>
          <td>{item.surname}</td>
          <td>{item.emailAddress}</td>
          <td>{item.phoneNumber}</td>
          <td>{item.country}</td>
          <td>
            <a href={item.invoiceImage} target="_blank" rel="noreferrer">
              Görüntüle
            </a>
          </td>
          <td>{item.companyName}</td>
          <td>{item.distributorName}</td>
          <td>
            <div className="flex items-center justify-center w-full gap-3">
              <EditButton id={item.id} />
              <DeleteButton id={item.id} />
            </div>
          </td>
        </tr>
      ))
    );

    if (data.length > 0) {
      return setTableRows(await TableRows);
    }
    return setTableRows(Empty);
  };

  React.useEffect(() => {
    const Init = async () => getTableRows();

    Init();
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full p-5 bg-white border shadow-xl warranty-list-table-container fade-in rounded-xl font-zaxe border-zinc-100">
      <table className="w-full warranty-list-table">
        <thead>
          <tr>
            <th>{Fields.deviceSerialNumber}</th>
            <th>{Fields.purchaseDate}</th>
            <th>{Fields.name}</th>
            <th>{Fields.surname}</th>
            <th>{Fields.emailAddress}</th>
            <th>{Fields.phoneNumber}</th>
            <th>{Fields.country}</th>
            <th>{Fields.invoiceImage}</th>
            <th>{Fields.companyName}</th>
            <th>{Fields.distributorName}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default List;
