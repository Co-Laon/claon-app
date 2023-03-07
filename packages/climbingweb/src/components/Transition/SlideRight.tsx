import { motion } from 'framer-motion';

interface Props {
    children: React.ReactNode | React.ReactNode[] | null;
}

const width = global.innerWidth;

export const SlideRight = ({ children }: Props) => {

    return (
        <motion.div
            initial={{ x: width }}
            animate={{ x: 0 }}
            exit={{ x: width }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};