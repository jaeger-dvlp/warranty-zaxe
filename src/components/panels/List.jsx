import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { BiLinkExternal } from 'react-icons/bi';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import insertDemoRow from '@/src/utils/InsertDemoData';
import TableEmpty from '@/src/components/misc/TableEmpty';
import EditButton from '@/src/components/buttons/EditButton';
import Pagination from '@/src/components/buttons/Pagination';
import TableLoading from '@/src/components/misc/TableLoading';
import DeleteButton from '@/src/components/buttons/DeleteButton';

const TableElements = {
  loading: {
    name: 'TableLoading',
    component: <TableLoading />,
  },
  empty: {
    name: 'TableEmpty',
    component: <TableEmpty />,
  },
  list: {
    name: 'TableList',
    component: null,
  },
};

const getPagination = (page, limit = 5) => {
  const pagination = {
    from: page * limit - limit + 1,
    to: page * limit || limit,
  };

  if (pagination.from === 1) {
    pagination.from = 0;
    pagination.to -= 1;
  }

  if (pagination.from > 1) {
    pagination.from -= 1;
    pagination.to -= 1;
  }

  return pagination;
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
  const router = useRouter();
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
    actions: t('components.table.labels.actions'),
    inspect: t('components.table.labels.inspect'),
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  const [tableRows, setTableRows] = React.useState(TableElements.loading);

  const getTableRows = async () => {
    try {
      const data = await isRangeValid({ supaBase, currentPage });

      if (data === false) {
        if (currentPage > 1) {
          return setCurrentPage(currentPage - 1);
        }

        return setTableRows(TableElements.empty);
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
              <a
                className="flex items-center justify-start gap-1 text-sky-500 hover:underline"
                href={item.invoiceImage}
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-current">{Fields.inspect}</span>
                <BiLinkExternal className="w-3 h-3 text-current" />
              </a>
            </td>
            <td data-field="companyName">{item.companyName}</td>
            <td data-field="distributorName">{item.distributorName}</td>
            <td>
              <div className="flex items-center justify-center w-full gap-3">
                <EditButton item={item} />
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
        name: TableElements.list.name,
        component: await TableRows,
      });
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    setTableRows(TableElements.empty);
    setTableRows(TableElements.loading);

    new Promise((resolve) => {
      setTimeout(resolve, 750);
    }).then(() => getTableRows());
  }, [currentPage, router]);

  return (
    <div className="relative flex flex-wrap items-center justify-center w-full gap-0 p-5 bg-white border shadow-xl warranty-list-table-container fade-in rounded-xl font-zaxe border-zinc-100">
      <div className="overflow-x-auto relative shadow-md rounded-md max-h-[550px]">
        <table className="w-full warranty-list-table">
          <thead>
            <tr>
              <th
                onClick={async () => {
                  await insertDemoRow({
                    supaBase,
                    onComplete: () => getTableRows(),
                  });
                }}
                scope="col"
              >
                {Fields.deviceSerialNumber}
              </th>
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
                {Fields.actions}
              </th>
            </tr>
          </thead>
          <tbody>{tableRows.component}</tbody>
        </table>
      </div>
      <Pagination
        props={{
          supaBase,
          currentPage,
          setCurrentPage,
          tableRows,
          upperRange,
          lowerRange,
        }}
      />
    </div>
  );
}

export default List;
