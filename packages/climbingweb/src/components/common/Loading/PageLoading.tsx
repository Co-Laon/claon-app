import React from 'react';
import Loading from './Loading';

const PageLoading = () => (
  <div className="absolute w-screen h-screen flex justify-center items-center opacity-60 bg-slate-800 z-10">
    <Loading />
  </div>
);

export default PageLoading;
