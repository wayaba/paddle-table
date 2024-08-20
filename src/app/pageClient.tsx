'use client'
import { DropDown } from '@/components/ui/dropdown'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { MonthGroup, PlayerRecord, PlayerSummary } from '@/types'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PlayerTable } from '@/components/ui/playerTable'

const parseMonth = (monthStr: string) => {
  const [month, year] = monthStr.split('/').map(Number)
  return new Date(year, month - 1)
}

const getMaxMonthObject = (array: MonthGroup[]) => {
  return array.reduce((maxObj, currentObj) => {
    return parseMonth(currentObj.month) > parseMonth(maxObj.month)
      ? currentObj
      : maxObj
  }, array[0])
}

export default function HomeClient({
  monthGroups,
  tournamentRecords
}: {
  monthGroups: MonthGroup[]
  tournamentRecords: Record<string, PlayerRecord[]>
}) {
  const [currentMonthGroup, setCurrentMonthGroup] = useState<
    PlayerSummary[] | []
  >([])

  const [currentTournamentRecords, setCurrentTournamentRecords] = useState<
    PlayerRecord[] | []
  >([])

  const handleMonthChange = (value: string) => {
    const selectedMonthGroup = monthGroups.find(
      (monthGroup) => monthGroup.month === value
    )

    const sortedPlayers = selectedMonthGroup
      ? [...selectedMonthGroup.players].sort((a, b) => b.total - a.total)
      : []

    setCurrentTournamentRecords(tournamentRecords[value])
    setCurrentMonthGroup(sortedPlayers)
  }

  useEffect(() => {
    const maxMonthObject = getMaxMonthObject(monthGroups)
    const sortedPlayers = maxMonthObject
      ? [...maxMonthObject.players].sort((a, b) => b.total - a.total)
      : []
    setCurrentMonthGroup(sortedPlayers)

    setCurrentTournamentRecords(tournamentRecords[maxMonthObject.month])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getGroupesByDate = (): Record<string, PlayerRecord[]> => {
    return currentTournamentRecords.reduce<Record<string, PlayerRecord[]>>(
      (acc, player) => {
        const { date } = player
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(player)
        return acc
      },
      {}
    )
  }
  return (
    <div className="flex flex-col w-max-md mx-auto gap-4">
      <div className="m-auto">
        <DropDown
          year={2024}
          onValueChange={handleMonthChange}
          monthGroups={monthGroups}
        ></DropDown>
      </div>
      {currentMonthGroup.length > 0 ? (
        <>
          <Table className="m-auto max-w-md border">
            <TableHeader>
              <TableRow className="text-center align-middle">
                <TableHead className="text-center">Jug</TableHead>
                <TableHead className="text-center">Game</TableHead>
                <TableHead className="text-center">A</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">E</TableHead>
                <TableHead className="text-center">Z</TableHead>
                <TableHead className="text-center">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMonthGroup.map(
                ({ name, game, ace, drop, errors, zapatero, total }) => (
                  <TableRow className="text-center align-middle" key={name}>
                    <TableCell className="p-2">{name}</TableCell>
                    <TableCell className="p-2">{game}</TableCell>
                    <TableCell className="p-2">{ace}</TableCell>
                    <TableCell className="p-2">{drop}</TableCell>
                    <TableCell>{errors}</TableCell>
                    <TableCell>{zapatero}</TableCell>
                    <TableCell>{total}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          <div className='flex flex-col gap-4 text-center'>
            {Object.entries(getGroupesByDate()).map(([date, players]) => (
              <PlayerTable key={date} date={date} players={players} />
            ))}
          </div>
        </>
      ) : (
        <div className="m-auto max-w-md">
          <Alert>
            <AlertDescription>No hay info para este mes</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}
