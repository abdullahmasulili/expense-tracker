import { forwardRef, useImperativeHandle, useState } from 'react';
import { Dialog, Portal } from 'react-native-paper';

const DialogContainer = forwardRef(function DialogContainer(
  { title, children, ...props },
  ref,
) {
  const [isVisible, setIsVisible] = useState(false);

  function handleOpenDialog() {
    setIsVisible(true);
  }

  function handleCloseDialog() {
    setIsVisible(false);
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        handleOpenDialog();
      },
      close() {
        handleCloseDialog();
      },
    };
  });

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={handleCloseDialog} {...props}>
        <Dialog.Title>{title}</Dialog.Title>
        {children}
      </Dialog>
    </Portal>
  );
});

export default DialogContainer;
