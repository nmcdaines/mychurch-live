import { Typography } from "@material-ui/core";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function DeviceCard({ productIdentifier, device }: any) {
  return (
    <Card className="shadow-md">
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
      <CardFooter className="space-x-2 justify-end">
        <Button>Edit</Button>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default DeviceCard;
