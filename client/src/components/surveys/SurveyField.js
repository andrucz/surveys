import React from 'react';

export default ({ input, label, meta }) => {
  const { touched, error } = meta;
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {touched && error}
    </div>
  );
};
