import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%',
    paddingHorizontal: 10,
    gap: 10,
  },
  heading: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '800',
    textTransform: 'uppercase',
    paddingVertical: 12,
  },
  label: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
