import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

function Pagination({
  props: {
    supaBase,
    currentPage,
    setCurrentPage,
    tableRows,
    upperRange,
    lowerRange,
  },
}) {
  return (
    <nav
      className="flex items-center justify-center p-0 m-5 mb-0 rounded-md shadow-lg "
      aria-label="Table navigation"
    >
      <ul className="flex items-center justify-center text-sm">
        <li className="h-full">
          <button
            type="button"
            disabled={tableRows.name === 'TableLoading'}
            onClick={() =>
              upperRange({ supaBase, currentPage, setCurrentPage })
            }
            className="flex items-center justify-center p-2 min-h-[38px] min-w-[38px] text-gray-500 bg-white border border-gray-300 rounded-l-lg disabled:pointer-events-none hover:bg-gray-100 hover:text-gray-700 "
          >
            <BiChevronLeft className="w-5 h-5" />
          </button>
        </li>
        <li className="h-full">
          <button
            disabled
            type="button"
            onClick={() => null}
            className="flex items-center justify-center h-full p-2 min-h-[38px] min-w-[38px] text-gray-500 bg-white border-y border-gray-300 cursor-default disabled:pointer-events-none"
          >
            {currentPage}
          </button>
        </li>
        <li className="h-full">
          <button
            type="button"
            disabled={tableRows.name === 'TableLoading'}
            onClick={() =>
              lowerRange({ supaBase, currentPage, setCurrentPage })
            }
            className="flex items-center justify-center p-2 min-h-[38px] min-w-[38px] text-gray-500 bg-white border border-gray-300 rounded-r-lg disabled:pointer-events-none hover:bg-gray-100 hover:text-gray-700 "
          >
            <BiChevronRight className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
