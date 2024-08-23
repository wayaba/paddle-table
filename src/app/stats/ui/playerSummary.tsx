import { PlayerStats } from '@/types'
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

export function PlayerSummary({ playerStats }: { playerStats: PlayerStats[] }) {

    console.log('playerStats',playerStats)
  return (
    <Table className="m-auto max-w-md border">
      <TableHeader>
        <TableRow className="text-center align-middle">
          <TableHead className="text-center">Jugador</TableHead>
          <TableHead className="text-center">Total</TableHead>
          <TableHead className="p-2 text-center">Ver</TableHead>
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
                  </AlertDialogHeader>
                  <div className='p-1'>
                    <BarContainer  playerStats={item} total={item.total}></BarContainer>
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
