import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../../atoms/modal';
import { InformationSVG } from '../../../assets/icons';

const ModalInfo = (props) => {
  const { message, isOpen, onClose, ...otherProps } = props;

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      noProps
      width={490}
      dataCy="modal-information"
      {...otherProps}
    >
      <div
        className="w-full flex justify-start items-center gap-3 py-5 px-8"
        data-cy="modal-information"
      >
        <InformationSVG />
        <p className="text-sm text-center">{message}</p>
      </div>
    </ModalLayout>
  );
};

ModalInfo.propTypes = {
  message: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

ModalInfo.defaultProps = {
  message: '',
  isOpen: false,
  onClose: () => {},
};

export default ModalInfo;
