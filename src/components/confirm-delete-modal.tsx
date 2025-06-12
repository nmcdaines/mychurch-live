import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {DialogActions} from "@material-ui/core";
import {useState} from "react";

export default function ConfirmDeleteModal({ children, entityType, id, deleteFn }){
  const [open, setOpen] = useState(false)

  return (
    <Dialog onOpenChange={(_open) => setOpen(_open)} open={open}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete {entityType}?</DialogTitle>
          <DialogFooter>
            <Button variant="destructive" onClick={() => {
              console.log('id', id, deleteFn)
              deleteFn(id)
              // setOpen(false)
            }}>Yes</Button>
            <Button onClick={() => setOpen(false)}>No</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}