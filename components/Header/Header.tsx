import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'

import MenuIcon from '@material-ui/icons/Menu'

import { useStyles } from './styles'

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <MenuIcon className={classes.menuButton} />
        </IconButton>
        <Typography variant="h6" className={classes.logoTitle}>Social App</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
