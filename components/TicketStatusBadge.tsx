import React from 'react'
import {Badge} from './ui/badge'
import { Status } from '@prisma/client';



interface Props {
    status : Status
}

const statusMap: Record<
    Status, {label: string, color: 'bg-red-400' | 'bg-blue-400' | 'bg-green-400'}
> = {
    Abierto : {label:"Abierto", color:"bg-red-400"},
    Empezado : {label:"Empezado", color:"bg-blue-400"},
    Cerrado : {label:"Cerrado", color:"bg-green-400"}
};

const TicketStatusBadge = ({status}: Props) => {
  return (
    <Badge className={`${statusMap[status].color} text-background hover:${statusMap[status].color}`}>
        {statusMap[status].label}
    </Badge>
  )
}

export default TicketStatusBadge;