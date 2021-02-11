import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    background: '#349',
    border: 0,
    borderRadius: 3,
    color: '#fff',
    cursor: 'pointer',
    height: 32,
    padding: '0 20px',
    fontSize: 16,

    '&:hover': {
      background: '#55A',
    }
  },
});
