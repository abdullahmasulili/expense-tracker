import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 8,
    overflow: 'scroll',
  },
  heading: {
    flexDirection: 'column',
    alignItems: 'start',
    gap: 5,
    paddingVertical: 8,
  },
  list: {
    gap: 8,
  },
  emptyCategoryContainer: {
    paddingVertical: 8,
  },
  emptyCategoryMessage: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  formContainer: {
    padding: 8,
  },
  formSpacing: {
    marginTop: 8,
  },
});

export default styles;
