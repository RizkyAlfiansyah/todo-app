import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../../atoms/modal';
import { WarningSVG } from '../../../assets/icons';
import { Button } from '../../atoms';

const ModalDeleteTodo = (props) => {
  const { isOpen, onClose, ...otherProps } = props;
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      noProps
      width={490}
      {...otherProps}
    >
      <div className="w-full flex flex-col justify-start items-center gap-10 py-11 px-14">
        <WarningSVG />
        <p className="text-lg">
          Apakah anda yakin menghapus activity{' '}
          <strong>“Meeting dengan Client”?</strong>
        </p>
        <div className="w-full flex justify-center items-center gap-5">
          <Button
            dataCy="todo-cancel-delete"
            variant="secondary"
            size="lg"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button dataCy="todo-confirm-delete" variant="error" size="lg">
            Hapus
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};

ModalDeleteTodo.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

ModalDeleteTodo.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

export default ModalDeleteTodo;
