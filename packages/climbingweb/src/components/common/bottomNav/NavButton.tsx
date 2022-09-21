import { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { ButtonProps } from './type';

const NavButton: React.FC<ButtonProps & WithRouterProps> = ({
  path,
  icon,
  activedIcon,
  label,
  router,
}: ButtonProps & WithRouterProps) => {
  const isActived = router?.pathname === path;
  const labelColor = `text-xs ${
    isActived ? 'text-purple-500' : 'text-gray-400'
  }`;
  return (
    <Link href={path} passHref>
      <div className="flex flex-col items-center">
        <div className="Icon">{isActived ? activedIcon : icon}</div>
        <span className={labelColor}>{label}</span>
      </div>
    </Link>
  );
};

export default withRouter(NavButton);
