'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { MonthGroup } from '@/types'

interface DropDownProps {
  year: number
  monthGroups: MonthGroup[]
  onValueChange: (value: string) => void
}

function generateMonths(year: number) {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Augosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  return months.map((month, index) => {
    const monthIndex = (index + 1).toString().padStart(2, '0')
    return {
      value: `${monthIndex}/${year}`,
      label: `${month} ${year}`
    }
  })
}

const getLatestMonth = (monthGroups: MonthGroup[]): string => {
  return monthGroups.reduce((max, current) => {
    const currentDate = new Date(current.month.split('/').reverse().join('/'));
    const maxDate = new Date(max.split('/').reverse().join('/'));
    return currentDate > maxDate ? current.month : max;
  }, monthGroups[0].month);
};

export function DropDown({ year, onValueChange, monthGroups }: DropDownProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(getLatestMonth(monthGroups))

  const months = React.useMemo(() => generateMonths(year), [year])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? months.find((month) => month.value === value)?.label
            : 'Select month...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search month..." />
          <CommandList>
            <CommandEmpty>No month found.</CommandEmpty>
            <CommandGroup>
              {months.map((month) => (
                <CommandItem
                  key={month.value}
                  onSelect={() => {
                    const newValue = month.value
                    setValue(newValue === value ? '' : newValue)
                    setOpen(false)
                    onValueChange(newValue)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === month.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {month.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
