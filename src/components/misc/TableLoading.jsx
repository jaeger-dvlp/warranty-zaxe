import React from 'react';

function TableLoading() {
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

export default TableLoading;
