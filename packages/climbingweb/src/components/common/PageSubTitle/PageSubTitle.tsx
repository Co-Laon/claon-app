import React, { memo } from 'react';

interface PageSubTitleProps {
  title: string;
  className?: string;
}

const PageSubTitle = ({ title, className }: PageSubTitleProps) => {
  return <h2 className={`font-extrabold leading-6 ${className}`}>{title}</h2>;
};

export default memo(PageSubTitle);
