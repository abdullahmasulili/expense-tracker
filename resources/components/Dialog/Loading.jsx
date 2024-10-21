import { Dialog, ProgressBar } from 'react-native-paper';
import DialogContainer from './Container';
import { useEffect, useRef } from 'react';

export default function Loading({ title, visible }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (visible) {
      dialogRef.current.open();
    } else {
      dialogRef.current.close();
    }
  }, [visible]);

  return (
    <DialogContainer ref={dialogRef} title={title} dismissable={false}>
      <Dialog.Content>
        <ProgressBar indeterminate />
      </Dialog.Content>
    </DialogContainer>
  );
}
