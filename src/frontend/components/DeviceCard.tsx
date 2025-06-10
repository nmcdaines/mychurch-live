import { Typography } from "@material-ui/core";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardAction, CardFooter } from "@/components/ui/card";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Button } from "@/components/ui/button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

function DeviceCard({ productIdentifier, device }: any) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader>
        <CardTitle>{device.name}</CardTitle>
        <CardDescription>{device.ipAddress}</CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <div>
            Id: { productIdentifier }
          </div>
          <div>
            Type: { device.type }
          </div>
        </Typography>
      </CardContent>
      <CardFooter>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  );
}

export default DeviceCard;
