import React from 'react';
import { uuid } from 'uuidv4';
import { useTranslation } from 'next-i18next';
import {
  BiEdit,
  BiTrashAlt,
  BiChevronLeft,
  BiChevronRight,
} from 'react-icons/bi';
import { useAppContext } from '@/src/contexts/AppWrapper';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const getRandomSerial = () =>
  `ZX${uuid().slice(0, 13).replace(/-/g, '').toUpperCase()}`;

function Loading() {
  return (
    <tr className="relative w-full fade-in">
      <td colSpan="11" className="">
        <div className="relative min-h-[275px] flex items-center w-full h-full p-5">
          <p className="sticky -translate-x-1/2 left-1/2 top-1/2">Loading...</p>
        </div>
      </td>
    </tr>
  );
}

function Empty() {
  return (
    <tr className="w-full fade-in">
      <td colSpan="11" className="">
        <div className="relative min-h-[275px] flex items-center w-full h-full p-5">
          <p className="sticky -translate-x-1/2 left-1/2 top-1/2">Empty.</p>
        </div>
      </td>
    </tr>
  );
}

const getPagination = (page, limit = 5) => {
  const Pagination = {
    from: page * limit - limit + 1,
    to: page * limit || limit,
  };

  if (Pagination.from === 1) {
    Pagination.from = 0;
    Pagination.to -= 1;
  }

  if (Pagination.from > 1) {
    Pagination.from -= 1;
    Pagination.to -= 1;
  }

  return Pagination;
};

const isRangeValid = async ({ currentPage, supaBase }) => {
  try {
    const { from, to } = getPagination(currentPage);
    const { data, error } = await supaBase
      .from('warrantyList')
      .select('*', { count: 'exact' })
      .order('id', { ascending: true })
      .range(from, to);

    if (error || data?.length === 0) return false;

    return data;
  } catch (error) {
    return false;
  }
};

const deleteItem = async ({
  id,
  deviceSerialNumber,
  supaBase,
  getTableRows,
  activateAlertPopup,
}) => {
  try {
    const { error } = await supaBase
      .from('warrantyList')
      .delete()
      .match({ id });

    const TableElement = document.querySelector(
      `tr#list-item-${id}-${deviceSerialNumber}`
    );

    if (error)
      return activateAlertPopup({
        status: 'error',
        message: error?.message || 'An error occurred while deleting the item',
      });

    if (TableElement)
      TableElement.classList.add('max-h-[0px]', 'opacity-0', 'overflow-hidden');

    activateAlertPopup({
      status: 'success',
      message: 'Item deleted successfully.',
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    }).then(() => getTableRows());
  } catch (error) {
    return false;
  }
};

function DeleteButton({ id, deviceSerialNumber, getTableRows }) {
  const supaBase = useSupabaseClient();
  const { activateAlertPopup, activateConfirmPopup, deactivateConfirmPopup } =
    useAppContext();

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
            activateAlertPopup,
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

const insertDemoRow = async ({ supaBase, getTableRows }) => {
  try {
    const { error } = await supaBase.from('warrantyList').insert({
      deviceSerialNumber: getRandomSerial(),
      purchaseDate: '22/12/2020',
      name: 'John',
      surname: 'Doe',
      emailAddress: 'john.doe@example.com',
      phoneNumber: '+90 555 555 55 55',
      country: 'Germany',
      invoiceImage:
        'https://drive.google.com/file/d/1h0wjsiXhDxE5WDtAboQ3WQAM5AIxYdCh/view?usp=share_link',
      companyName: 'Example Ltd.',
      distributorName: 'Zaxe3D',
    });

    if (error) {
      throw new Error(
        error?.message || 'An error occurred while inserting row.'
      );
    }

    return getTableRows();
  } catch (error) {
    return false;
  }
};

const upperRange = async ({ currentPage, setCurrentPage, supaBase }) => {
  if (currentPage > 1) {
    const isValid = await isRangeValid({
      currentPage: currentPage - 1,
      supaBase,
    });
    if (isValid) {
      return setCurrentPage(currentPage - 1);
    }
  }
  return false;
};

const lowerRange = async ({ currentPage, setCurrentPage, supaBase }) => {
  const isValid = await isRangeValid({
    currentPage: currentPage + 1,
    supaBase,
  });

  if (isValid) {
    return setCurrentPage(currentPage + 1);
  }

  return false;
};

function List() {
  const { t } = useTranslation();
  const supaBase = useSupabaseClient();
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

  const [currentPage, setCurrentPage] = React.useState(1);
  const [tableRows, setTableRows] = React.useState({
    name: 'loading',
    data: <Loading />,
  });

  const getTableRows = async () => {
    try {
      const data = await isRangeValid({ supaBase, currentPage });

      if (data === false) {
        if (currentPage > 1) {
          return setCurrentPage(currentPage - 1);
        }

        return setTableRows({ name: 'empty', data: <Empty /> });
      }

      const TableRows = Promise.all(
        data.map((item) => (
          <tr
            id={`list-item-${item.id}-${item.deviceSerialNumber}`}
            className="fade-in"
            key={`${item.deviceSerialNumber}-list-item`}
          >
            <th scope="row" data-field="deviceSerialNumber">
              {item.deviceSerialNumber}
            </th>
            <td data-field="purchaseDate">{item.purchaseDate}</td>
            <td data-field="name">{item.name}</td>
            <td data-field="surname">{item.surname}</td>
            <td data-field="emailAddress">{item.emailAddress}</td>
            <td data-field="phoneNumber">{item.phoneNumber}</td>
            <td data-field="country">{item.country}</td>
            <td data-field="invoiceImage">
              <a href={item.invoiceImage} target="_blank" rel="noreferrer">
                Görüntüle
              </a>
            </td>
            <td data-field="companyName">{item.companyName}</td>
            <td data-field="distributorName">{item.distributorName}</td>
            <td>
              <div className="flex items-center justify-center w-full gap-3">
                <EditButton id={item.id} />
                <DeleteButton
                  id={item.id}
                  deviceSerialNumber={item.deviceSerialNumber}
                  getTableRows={getTableRows}
                />
              </div>
            </td>
          </tr>
        ))
      );

      return setTableRows({
        name: 'warrantyList',
        data: await TableRows,
      });
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    setTableRows({
      name: 'loading',
      data: <Loading />,
    });
    setTimeout(() => getTableRows(), 500);
  }, [currentPage]);

  return (
    <div className="relative flex flex-wrap items-center justify-center w-full gap-0 p-5 bg-white border shadow-xl warranty-list-table-container fade-in rounded-xl font-zaxe border-zinc-100">
      <div className="relative flex items-center justify-center w-full p-0 pt-5" />
      <div className="sticky left-0 flex items-center justify-start w-full gap-5 mb-5">
        <button
          type="button"
          onClick={() => insertDemoRow({ supaBase, getTableRows })}
          className="flex items-center justify-center px-2 py-1 text-xs bg-white border-2 rounded-md border-zinc-300 text-zinc-600 hover:bg-zinc-100"
        >
          + Mock Record
        </button>
      </div>
      <div className="overflow-x-auto relative shadow-md rounded-md max-h-[550px]">
        <table className="w-full warranty-list-table">
          <thead>
            <tr>
              <th scope="col">{Fields.deviceSerialNumber}</th>
              <th scope="col">{Fields.purchaseDate}</th>
              <th scope="col">{Fields.name}</th>
              <th scope="col">{Fields.surname}</th>
              <th scope="col">{Fields.emailAddress}</th>
              <th scope="col">{Fields.phoneNumber}</th>
              <th scope="col">{Fields.country}</th>
              <th scope="col">{Fields.invoiceImage}</th>
              <th scope="col">{Fields.companyName}</th>
              <th scope="col">{Fields.distributorName}</th>
              <th scope="col" className="!text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{tableRows.data}</tbody>
        </table>
      </div>
      <nav
        className="flex items-center justify-center p-0 m-5 mb-0 rounded-md shadow-lg "
        aria-label="Table navigation"
      >
        <ul className="inline-flex items-center">
          <li>
            <button
              type="button"
              disabled={tableRows.name === 'loading'}
              onClick={() =>
                upperRange({ supaBase, currentPage, setCurrentPage })
              }
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg disabled:pointer-events-none hover:bg-gray-100 hover:text-gray-700 "
            >
              <BiChevronLeft className="w-5 h-5" />
            </button>
          </li>
          <li>
            <span className="block h-full px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border-gray-300 border-y hover:bg-gray-100 hover:text-gray-700">
              {currentPage}
            </span>
          </li>
          <li>
            <button
              type="button"
              disabled={tableRows.name === 'loading'}
              onClick={() =>
                lowerRange({ supaBase, currentPage, setCurrentPage })
              }
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg disabled:pointer-events-none hover:bg-gray-100 hover:text-gray-700 "
            >
              <BiChevronRight className="w-5 h-5" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default List;
