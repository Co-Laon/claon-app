import React, { memo } from 'react';

interface PageSubTitleProps {
  title: string;
}

const PageSubTitle = ({ title }: PageSubTitleProps) => {
  return <h2 className="text-lg font-extrabold leading-6">{title}</h2>;
};

export default memo(PageSubTitle);
