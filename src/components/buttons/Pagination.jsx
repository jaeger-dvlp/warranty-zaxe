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
      <ul className="inline-flex items-center">
        <li>
          <button
            type="button"
            disabled={tableRows.name === 'TableLoading'}
            onClick={() =>
              upperRange({ supaBase, currentPage, setCurrentPage })
            }
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg disabled:pointer-events-none hover:bg-gray-100 hover:text-gray-700 "
          >
            <BiChevronLeft className="w-5 h-5" />
          </button>
        </li>
        <li>
          <span className="h-full px-4 py-2 text-gray-500 bg-white border-gray-300 border-y">
            {currentPage}
          </span>
        </li>
        <li>
          <button
            type="button"
            disabled={tableRows.name === 'TableLoading'}
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
  );
}

export default Pagination;
