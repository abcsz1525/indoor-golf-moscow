import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logoIcon from '../assets/logo-icon.png';

export function Preloader() {
  const [show, setShow] = useState(
    () => !sessionStorage.getItem('preloaded'),
  );

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem('preloaded', '1');
      setShow(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: '#FAFAFA' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={logoIcon}
            alt=""
            className="h-16 w-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
