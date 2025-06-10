import React, { useState } from "react";
import { Container, Grid, Drawer, Card } from '@material-ui/core';
import { Button } from "@/components/ui/button";
import { Pagination } from '@material-ui/lab';
import { useMacros, useShortcuts } from '../../core/SocketContext';
import { MacroDraggableCard } from '../../components/MacroDraggableCard';
import { ShortcutsDropZone } from '../../components/ShortcutsDropZone';

function Shortcuts() {
  const slots = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
  const [page, setPage] = useState<number>(1);
  // const macros = useMacros();
  // const shortcuts = useShortcuts();
  const [isEdit, setIsEdit] = useState(false);

  // console.log('shortcuts', shortcuts)

  // function getShortcut(selectedPage: number, selectedSlot: number) {
  //   const id: any = Object
  //     .keys(shortcuts)
  //     .find((shortcutId: any) => {
  //       const shortcut = shortcuts[shortcutId];
  //       return shortcut.page === selectedPage && shortcut.slot === selectedSlot;
  //     })

  //   return shortcuts[id];
  // }

  const macros = []
  function getShortcut(){}

  return (
    
      <div style={{ marginTop: 60 }}>
        {isEdit && (
          <div className="fixed right-0 w-72 border-l border-t border-b rounded-2xl top-20 bottom-4 shadow-xl bg-white">
<div style={{ width: 320, padding: 10 }}>
            <Grid container spacing={2}>

              { Object.keys(macros).map((macroId: string, index: number) => {


                return (
                  <Grid
                    item
                    xs={12}
                  >
                    <MacroDraggableCard
                      id={macroId}
                      { ...macros[macroId] }
                    />
                  </Grid>
                );
              }) }

            </Grid>
          </div>
          </div>
        )}

        <Container>
          
          <Grid container spacing={2}>
            { slots.map((value) => {
              return (
                <Grid
                  key={value}
                  item
                  sm={3}
                >
                  <ShortcutsDropZone
                    shortcut={getShortcut(page, value)}
                    page={page}
                    slot={value}
                    edit={isEdit}
                  />
                </Grid>
              )
            })}

          </Grid>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <div>
              <Button
                onClick={() => setIsEdit(!isEdit)}
                variant="outlined"
              >
                { !isEdit ? 'Edit' : 'Run' }
              </Button>
            </div>
            {/* <Pagination
              count={5}
              variant="outlined"
              page={page}
              onChange={(event: any, value: number) => { setPage(value) }}
            /> */}
            <div>
              
            </div>
          </div>
        </Container>
      </div>
  );
}

export default Shortcuts;
