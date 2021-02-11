import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    boxShadow: '0 0 30px rgba(0, 0, 0, .1)',
    position: 'relative',

    '& > canvas': {
      float: 'left',
    },
  },
  score: {
    position: 'absolute',
    left: 10,
    top: -30,
  },
  gameOver: {
    background: 'rgba(0, 0, 0, .5)',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
