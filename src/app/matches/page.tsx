import api from '@/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
export default async function MatchesPage() {
  
  const matches = await api.match.list();
  const sortedMatches = matches.sort((a, b) => b.matchNumber - a.matchNumber);
  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="text-center align-middle">
          <TableHead className="text-center">Fecha</TableHead>
          <TableHead className='p-2 text-center'>Día</TableHead>
          <TableHead className='p-2 text-center'>Equipo 1</TableHead>
          <TableHead className='p-2 text-center'>Equipo 2</TableHead>
          <TableHead className='p-2 text-center'>G 1</TableHead>
          <TableHead className="p-2 text-center">G 2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedMatches.map(({matchNumber, date, goals1, goals2, team1, team2}, index) => (
          <TableRow className='text-center align-middle' key={index}>
            <TableCell className='p-1'>{matchNumber}</TableCell>
            <TableCell className='p-1'>{ moment(date, 'DD/MM/YYYY').format('D [de] MMMM')}</TableCell>
            <TableCell className='p-1'>{team1}</TableCell>
            <TableCell className='p-1'>{team2}</TableCell>
            <TableCell className={`${cn({"font-bold text-green-500": goals1 > goals2})} p-1`}>
              {goals1}
            </TableCell>
            <TableCell className={`${cn({"font-bold text-green-500": goals2 > goals1})} p-1`}>
              {goals2}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}