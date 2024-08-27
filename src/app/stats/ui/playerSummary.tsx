/* eslint-disable @next/next/no-img-element */
import { PlayerInfo, PlayerStats } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { BarContainer } from './barContainer'

export function PlayerSummary({
  playerStats,
  playersInfo
}: {
  playerStats: PlayerStats[]
  playersInfo: PlayerInfo[]
}) {
  console.log('playersInfo', playersInfo)
  return (
    <Table className="m-auto max-w-md border">
      <TableHeader>
        <TableRow className="text-center align-middle">
          <TableHead className="text-center">Jugador</TableHead>
          <TableHead className="text-center">Total</TableHead>
          <TableHead className="p-2 text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playerStats.map((item, index) => (
          <TableRow className="text-center align-middle" key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell className="p-1">{item.total}</TableCell>
            <TableCell className="p-1">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Ver</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>
                    <AlertDialogDescription>
                      
                    </AlertDialogDescription>
                    <div className="flex items-center space-x-4 m-auto">
                      <span className="relative flex shrink-0 overflow-hidden rounded-full h-24 w-24">
                        <img
                          className="aspect-square h-full w-full"
                          alt="Image"
                          src={
                            playersInfo.find(
                              (obj) => obj.nickname === item.name
                            )?.imagePath || '/images/avatarnotfound.webp'
                          }
                        />
                      </span>
                      <div>
                        <p className="text-lg font-normal leading-none">
                          {item.name}
                        </p>
                        <p className="text-base text-muted-foreground">
                          Total: {item.total}
                        </p>
                      </div>
                    </div>
                  </AlertDialogHeader>
                  <div className="p-1">
                    <BarContainer
                      playerStats={item}
                      total={item.total}
                    ></BarContainer>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cerrar</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
