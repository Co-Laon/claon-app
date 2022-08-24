import NavButton from './NavButton';
import { ButtonProps, NavProps } from './type';

const NavBar = ({ navButtons }: NavProps) => {

    return (
        <div className="flex flex-row w-full justify-between py-4 px-10 border-t bottom-0 fixed bg-white z-50">
            {navButtons.map(({ path, icon, activedIcon, label }: ButtonProps) => (
                <NavButton
                    key={path}
                    path={path}
                    label={label}
                    icon={icon}
                    activedIcon={activedIcon}
                />
            ))}
        </div>
    );
};

export default NavBar;