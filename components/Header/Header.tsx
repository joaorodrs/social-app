import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import MenuIcon from '@material-ui/icons/Menu'

import { useStyles } from './styles'

const Header = () => {
  const classes = useStyles()
  console.log(classes)

  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Typography>
          Social app
        </Typography>
        <Button>Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
