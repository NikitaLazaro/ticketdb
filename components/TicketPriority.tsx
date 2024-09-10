import { Priority } from '@prisma/client'
import { Flame } from 'lucide-react'
import React from 'react'

interface Props {
    priority: Priority
}

const priorityMap : Record<Priority, {label :string, level :1 | 2 | 3}> = {
    Alta: {label: "Alta", level:3},
    Media: {label: "Media", level:2},
    Baja: {label: "Baja", level:1},
}

const TicketPriority = ({priority}: Props) => {
  return (
    <div className="flex justify-between">
      <Flame className={`${priorityMap[priority].level >=1 ? "text-red-500" : "text-muted" }`}/>
      <Flame className={`${priorityMap[priority].level >=2 ? "text-red-500" : "text-muted" }`}/>
      <Flame className={`${priorityMap[priority].level >=3 ? "text-red-500" : "text-muted" }`}/>
    </div>
  )
}

export default TicketPriority;