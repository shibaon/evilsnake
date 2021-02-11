import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontFamily: 'sans-serif',
    fontSize: 16,
    color: '#333',
  },
  '@global': {
    'html, body, #root': {
      background: '#eee',
      height: '100%',
    },
  },
});
