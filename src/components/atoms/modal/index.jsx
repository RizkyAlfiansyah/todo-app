import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo } from 'react';
import OutsideHandler from 'react-outside-click-handler';
import { CloseSVG } from '../../../assets/icons';
import { Button } from '..';
import Proptypes from 'prop-types';

const ModalLayout = (props) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    enableOverlayScroll,
    width,
    onSubmit,
    dataCy,
    dataCySaveButton,
    noProps,
    disabled,
  } = props;
  useEffect(() => {
    if (!enableOverlayScroll) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
      };
    }
  }, [isOpen, enableOverlayScroll]);

  const overlayVariants = useMemo(() => {
    return {
      closed: {
        opacity: 0,
        transition: { duration: 0.1 },
      },
      open: { opacity: 1, transition: { duration: 0.1 } },
    };
  }, []);

  const contentVariants = useMemo(() => {
    return {
      open: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', duration: 0.5 },
      },
      closed: { opacity: 0, scale: 0.5, transition: { duration: 0.25 } },
    };
  }, [width]);

  return (
    <AnimatePresence data-cy={dataCy}>
      {isOpen && (
        <motion.aside
          className="bg-black bg-opacity-80 h-screen fixed top-0 left-0 w-screen z-20 flex justify-center items-center"
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          data-cy={dataCy}
        >
          <OutsideHandler onOutsideClick={onClose} data-cy={dataCy}>
            <motion.div
              data-cy={dataCy}
              className="bg-white max-h-[95vh] h-fit relative rounded-xl"
              initial="closed"
              animate="open"
              exit="closed"
              variants={contentVariants}
              style={{ width: width || '' }}
            >
              {noProps ? (
                children
              ) : (
                <>
                  <header className="w-full flex justify-between items-center py-6 px-7">
                    <p className="text-lg font-semibold">{title}</p>
                    <CloseSVG onClick={onClose} />
                  </header>
                  <article className="w-full flex flex-col gap-3 bg-white py-3 px-4 overflow-y-auto border-y border-secondary">
                    {children}
                  </article>
                  <footer className="w-full flex justify-end items-center py-6 px-7">
                    <Button
                      onClick={onSubmit}
                      disabled={disabled}
                      dataCy={dataCySaveButton}
                    >
                      Simpan
                    </Button>
                  </footer>
                </>
              )}
            </motion.div>
          </OutsideHandler>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

ModalLayout.Proptypes = {
  isOpen: Proptypes.bool,
  onClose: Proptypes.func,
  title: Proptypes.string,
  children: Proptypes.node,
  enableOverlayScroll: Proptypes.bool,
  width: Proptypes.number,
  onSubmit: Proptypes.func,
  dataCy: Proptypes.string,
  dataCySaveButton: Proptypes.string,
  noProps: Proptypes.bool,
  disabled: Proptypes.bool,
};

ModalLayout.defaultProps = {
  isOpen: false,
  onClose: () => {},
  title: 'Tambah List Item',
  children: <></>,
  enableOverlayScroll: false,
  width: 830,
  onSubmit: () => {},
  dataCy: 'modal',
  dataCySaveButton: 'modal-add-save-button',
  noProps: false,
  disabled: false,
};

export default ModalLayout;
