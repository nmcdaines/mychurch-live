import {createStyles, makeStyles, Theme, AppBar, Toolbar, Typography} from "@material-ui/core";
import { Button } from "@/components/ui/button";
import {Link} from "react-router-dom";
import { useIsConnected } from '../core/SocketContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 2,
      transform: 'translate(0px)'
    },
    title: {
      flexGrow: 1,
    },
    connected: {
      background: 'green',
      borderRadius: '50%',
      height: 10,
      width: 10,
      marginRight: 10,
    },
    disconnected: {
      background: 'red',
      borderRadius: '50%',
      height: 10,
      width: 10,
      marginRight: 10,
    },
    actionArea: {
      flexGrow: 1,
      textAlign: 'right',
      display: 'flex',
      justifyContent: 'flex-end',
    }
  })
);

const links = [
  {text: 'SURFACE', to: '/surface'},
  {text: 'CAMERA', to: '/camera'},
  {text: 'SHORTCUTS', to: '/shortcuts'},
  {text: 'SETTINGS', to: '/settings'},
  {text: 'LIVESTREAM', to: '/livestream'},
]

export default function () {
  const classes = useStyles();
  const isConnected = useIsConnected();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          MyChurch Live
        </Typography>

        <div className="space-x-2">
          { links.map((link) => (
            <Link
              to={link.to}
            >
            <Button
              key={`menu-link-${link.text}`}
              color="inherit"
            >
              { link.text }
            </Button>
            </Link>
          ))}
        </div>


        <div className={classes.actionArea}>
          <Button variant="ghost">
            <span className={ isConnected ? classes.connected : classes.disconnected }/>
            { isConnected ? 'Connected' : 'Disconnected' }
          </Button>
        </div> 

      </Toolbar>
    </AppBar>
  )
}
