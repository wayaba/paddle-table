import { PlayerRecord } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Badge } from "./badge";

interface PlayerTableProps {
    date: string;
    players: PlayerRecord[];
  }
  
  export const PlayerTable: React.FC<PlayerTableProps> = ({ date, players }) => (
    <div className="m-auto max-w-md">
      <Badge className="mb-3" variant="outline">{date}</Badge>
      <Table className="m-auto max-w-md border">
            <TableHeader>
              <TableRow className="text-center align-middle">
                <TableHead className="text-center">Jug</TableHead>
                <TableHead className="text-center">Game</TableHead>
                <TableHead className="text-center">A</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">E</TableHead>
                <TableHead className="text-center">Z</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map(
                ({name, game, ace, drop, errors, zapatero}, index) => (
                  <TableRow className="text-center align-middle" key={index}>
                    <TableCell className="p-2">{name}</TableCell>
                    <TableCell className="p-2">{game}</TableCell>
                    <TableCell className="p-2">{ace}</TableCell>
                    <TableCell className="p-2">{drop}</TableCell>
                    <TableCell>{errors}</TableCell>
                    <TableCell>{zapatero}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
    </div>
  );