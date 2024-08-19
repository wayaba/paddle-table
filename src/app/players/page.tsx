import api from '@/api'
import { Avatar } from '@/components/ui/avatar'
import WhatsappIcon from '@/components/ui/icons'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import moment from 'moment'
import 'moment/locale/es'
import Link from 'next/link'
moment.locale('es')

export default async function PlayersPage() {
  const players = await api.player.list()
  return (
    <Table className="m-auto max-w-md border">
      <TableHeader>
        <TableRow className="text-center align-middle">
          <TableHead className="text-center">Jugador</TableHead>
          <TableHead className="text-center">Apodo</TableHead>
          <TableHead className="p-2 text-center">Tel</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map(
          ({ nickname, name, lastname, phone, email, imagePath }, index) => (
            <TableRow className="text-center align-middle" key={index}>
              <TableCell>
                <Avatar
                  name={name}
                  lastname={lastname}
                  email={email}
                  imagePath={imagePath}
                ></Avatar>
              </TableCell>
              <TableCell className="p-1">{nickname}</TableCell>
              <TableCell className="p-1">{phone? <Link href={`https://wa.me/${phone}`}><WhatsappIcon/></Link> :'-'}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}
