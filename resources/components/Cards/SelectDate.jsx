import { Button, Card, MD3Colors, Text } from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';

export default function SelectDate({
  onChange,
  startDate,
  endDate,
  onConfirm,
}) {
  return (
    <Card>
      <Card.Title title={<Text variant="titleLarge">Select Dates</Text>} />
      <Card.Content>
        <DateTimePicker
          mode="range"
          calendarTextStyle={{ color: MD3Colors.primary40 }}
          headerTextStyle={{ color: MD3Colors.primary40 }}
          weekDaysTextStyle={{ color: MD3Colors.primary40 }}
          selectedItemColor={MD3Colors.primary20}
          selectedRangeBackgroundColor={MD3Colors.primary90}
          maxDate={new Date()}
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
        />
      </Card.Content>
      <Card.Actions>
        <Button
          icon="calculator-variant"
          mode="contained"
          onPress={onConfirm}
          disabled={!startDate || !endDate}>
          Confirm
        </Button>
      </Card.Actions>
    </Card>
  );
}
