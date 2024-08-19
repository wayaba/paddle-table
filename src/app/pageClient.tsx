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
import { cn } from '@/lib/utils'
import { MonthGroup, PlayerSummary } from '@/types'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// Función para convertir la cadena del mes en un objeto Date
const parseMonth = (monthStr: string) => {
  const [month, year] = monthStr.split('/').map(Number)
  return new Date(year, month - 1) // El mes es 0-indexado en JavaScript
}

// Encontrar el objeto con el mes más alto
const getMaxMonthObject = (array: MonthGroup[]) => {
  return array.reduce((maxObj, currentObj) => {
    return parseMonth(currentObj.month) > parseMonth(maxObj.month)
      ? currentObj
      : maxObj
  }, array[0]) // Inicializa con el primer objeto del array
}

export default function HomeClient({
  monthGroups
}: {
  monthGroups: MonthGroup[]
}) {
  const [selectedMonth, setSelectedMonth] = useState('')
  const [currentPlayerSummary, setCurrentPlayerSummary] = useState<
    PlayerSummary[] | []
  >([])
  const handleMonthChange = (value: string) => {
    setSelectedMonth(value)
    const selectedMonthGroup = monthGroups.find(
      (monthGroup) => monthGroup.month === value
    )

    const sortedPlayers = selectedMonthGroup
      ? [...selectedMonthGroup.players].sort((a, b) => b.total - a.total)
      : []

    setCurrentPlayerSummary(sortedPlayers)
  }

  useEffect(() => {
    const maxMonthObject = getMaxMonthObject(monthGroups)
    const sortedPlayers = maxMonthObject
      ? [...maxMonthObject.players].sort((a, b) => b.total - a.total)
      : []
    setCurrentPlayerSummary(sortedPlayers)
  }, [monthGroups])

  return (
    <div className="flex flex-col w-max-md mx-auto gap-4">
      <div className="m-auto">
        <DropDown year={2024} onValueChange={handleMonthChange}></DropDown>
      </div>
      {currentPlayerSummary.length > 0 ? (
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
            {currentPlayerSummary.map(
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
