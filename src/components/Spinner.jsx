import React from 'react';
import {Grid} from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Grid
        type="Circles"
        color="#00BFFF"
        height={50}
        width={200}
        wrapperClass="m-10"
        visible={true}
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;