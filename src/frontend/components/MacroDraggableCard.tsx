import React from 'react';
import { Container, Grid, Drawer, Typography } from '@material-ui/core';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDrag } from 'react-dnd';

export function MacroDraggableCard(props: any) {
  const [collectedProps, drag] = useDrag({
    type: 'macro',
    item: { id: props.id }
  });

  return (
    <div ref={drag}>
      <Card className='min-h-42 max-w-full'>
        <CardHeader>
          <CardTitle>
            {props.name}
          </CardTitle>
          { props.type === 'camera' && (
            <CardDescription>
            <div>
              Pan: { (props.macro?.steps[0]?.properties?.pan || props.macro?.steps[1]?.properties?.pan) || 0 },
              Tilt: { props.macro?.steps[0]?.properties?.tilt || props.macro?.steps[1]?.properties?.tilt || 0 },
              Zoom: { ((10 / 16384) * (props.macro?.steps[0]?.properties?.zoom || props.macro?.steps[1]?.properties?.zoom || 0)).toFixed(1) }x
            </div>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          { props.macro?.description }
        </CardContent>
      </Card>
    </div>
  );
}
