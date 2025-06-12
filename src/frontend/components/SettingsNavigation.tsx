import React from "react";

import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import AppsIcon from '@material-ui/icons/Apps';


import {Link, useParams} from "react-router-dom";
import {Button} from "@/components/ui/button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function ListItemLink(props: ListItemProps<Link, { button?: true, to: string }>) {
  return (
    <Link to={props.to}>
      <Button variant="secondary" className="w-full">
        {props.children}
      </Button>
    </Link>
  );
}

function SettingsItem({name, icon, onClick}: any) {
  const IconComponent = icon;
  const itemId = String(name).toLowerCase();

  let {settingId} = useParams();

  return (
    <ListItemLink
      button
      selected={itemId === settingId}
      onClick={onClick}
      to={`/settings/${itemId}`}
    >
      {!!IconComponent &&
          <IconComponent/>
      }
      <div className="w-full text-left ml-2">{name}</div>
    </ListItemLink>
  );
}

export default function SettingsNavigation() {
  const classes = useStyles();

  return (
    <div className="flex flex-col w-full space-y-2">
      <SettingsItem name="Devices" icon={DeviceHubIcon}/>
      <SettingsItem name="Livestream" icon={LiveTvIcon}/>
      <div>
        <Divider/>
      </div>
      <SettingsItem name="Macros" icon={CallToActionIcon}/>
      <SettingsItem name="Shortcuts" icon={AppsIcon}/>
    </div>
  );
}
