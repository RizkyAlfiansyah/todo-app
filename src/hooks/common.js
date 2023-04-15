import { useState } from 'react';

export const useModal = (initial) => {
  const [isOpen, setIsOpen] = useState(initial);

  return {
    toggleModal: (state) => setIsOpen((p) => state || !p),
    isOpen,
  };
};
