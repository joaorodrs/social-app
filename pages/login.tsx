import Container from '@material-ui/core/Container'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

const Login = () => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Card className={classes.card}>
        <Typography className={classes.title}>Entrar</Typography>
        <Box className={classes.buttonsWrapper}>
          <Button variant="outlined" color="primary">
            Entrar com Facebook
          </Button>
          <Button variant="outlined" color="primary">
            Entrar com Google
          </Button>
        </Box>
        <Box>
          <Typography>Entrar com email e senha</Typography>
        </Box>
      </Card>
    </Container>
  )
}

export default Login
