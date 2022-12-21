import React from 'react';
import DefaultForm from '@/src/components/forms/DefaultForm';

function Add() {
  return (
    <div className="flex items-center justify-center w-full p-5 bg-white border shadow-xl fade-in rounded-xl font-zaxe border-zinc-100">
      <DefaultForm
        formName="warranty-add-form"
        formPrefix="warranty"
        onSubmit={(body) => console.log(body)}
      />
    </div>
  );
}

export default Add;
