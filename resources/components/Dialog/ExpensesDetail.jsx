import { forwardRef, useImperativeHandle, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

const ExpensesDetail = forwardRef(function ExpensesDetail(props, ref) {
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
      <Dialog visible={isVisible} onDismiss={handleCloseDialog}>
        <Dialog.Title>Expenses Detail</Dialog.Title>
        <Dialog.ScrollArea style={{ maxHeight: 500 }}>
          <ScrollView>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              dolore officiis doloribus autem consequuntur reprehenderit ipsa
              ratione. Eos non architecto voluptate perspiciatis autem, veniam
              nulla iure, a, quaerat repellendus atque. Debitis similique
              inventore, fugiat fuga eos dolorem! Nostrum eveniet doloremque
              iste consequuntur deserunt laborum recusandae repellat iure minima
              reprehenderit. Laudantium voluptatibus eligendi excepturi. Officia
              qui, culpa blanditiis nihil quidem et in! Quisquam quidem
              laboriosam dolorem odit. Ipsam error eaque voluptates? Nam, et
              sint. Excepturi sapiente porro architecto blanditiis suscipit,
              nobis accusamus nisi error ipsam vero molestiae, similique
              quisquam earum natus repellat unde quaerat magni provident tempore
              recusandae nostrum iste nulla cupiditate. Facere quo mollitia eum
              illum voluptatum quos dolores officiis, distinctio sint autem
              consequatur accusantium rem ex velit adipisci officia quas nemo?
              Aut iure harum ducimus perferendis dolorem molestiae ipsa labore
              ratione deserunt sit amet ab doloremque quod tempore, aliquid
              recusandae. Ratione reprehenderit repellat quasi ex nesciunt
              sapiente enim assumenda quos. Consectetur doloribus saepe itaque
              voluptate velit. Facere unde pariatur cumque consequuntur dolore
              reprehenderit in ducimus perspiciatis aperiam, fugiat cupiditate
              totam rerum minima adipisci tenetur? Animi, iure! Quidem neque
              accusamus doloremque! Exercitationem ut pariatur voluptatibus
              suscipit omnis maiores soluta facere. Obcaecati recusandae commodi
              incidunt repellendus minus, magni, explicabo eos voluptates iste
              eligendi tempora ducimus exercitationem voluptatibus natus
              delectus consectetur maiores quia ipsum assumenda facere et.
              Veritatis quos ratione molestias, ducimus quibusdam hic dicta eum
              sed voluptas et minus suscipit iusto impedit, exercitationem
              labore consectetur esse nam excepturi inventore at aliquid nulla
              saepe? Laboriosam, rem inventore facilis ipsam cupiditate velit
              tempore illo laborum dolor quaerat, repudiandae impedit error,
              quod laudantium cum pariatur vero id odit suscipit nam? Expedita
              repellat aperiam incidunt neque saepe eligendi exercitationem
              obcaecati nihil minima nemo quas asperiores dignissimos at quasi
              aut dolorum eaque magni commodi, architecto temporibus recusandae
              corporis est? Magnam blanditiis distinctio dolorem quibusdam autem
              voluptatum!
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button icon="close" onPress={handleCloseDialog}>
            Close
          </Button>
          <Button icon="pencil">Edit</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default ExpensesDetail;
