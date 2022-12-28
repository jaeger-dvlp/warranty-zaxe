import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsCheckCircleFill, BsExclamationCircleFill } from 'react-icons/bs';

const Icons = {
  error: BsExclamationCircleFill,
  loading: AiOutlineLoading,
  check: BsCheckCircleFill,
};

function Icon({ name, className }) {
  const Component = Icons[name];
  return <Component className={className} />;
}

export default Icon;
