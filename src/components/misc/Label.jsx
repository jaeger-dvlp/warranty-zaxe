import React from 'react';
import Classes from '@/src/utils/Classes';

function Label({ htmlFor, required, children }) {
  return (
    <label htmlFor={htmlFor} className={Classes.label}>
      {children}
      {required && <span className="!text-red-300"> *</span>}
    </label>
  );
}

export default Label;
