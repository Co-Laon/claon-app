import React from 'react';

interface PageSubTitleProps {
  title: string;
}

const PageSubTitle = ({ title }: PageSubTitleProps) => {
  return <h2 className="text-lg font-extrabold leading-6">{title}</h2>;
};

export default PageSubTitle;
