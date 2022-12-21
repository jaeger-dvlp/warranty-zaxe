import React from 'react';
import WarrantyForm from '../forms/WarrantyForm';

function Add() {
  return (
    <div className="flex items-center justify-center w-full p-5 bg-white border shadow-xl fade-in rounded-xl font-zaxe border-zinc-100">
      <WarrantyForm onSubmit={(body) => console.log(body)} />
    </div>
  );
}

export default Add;
