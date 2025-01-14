import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow } from "@/components/ui/table"
import { User } from '@prisma/client';
import Link from 'next/link';

interface Props {
    users: User[]
}

const DataTableSimple = ({users}: Props) => {
  return (
    <div className='w-full mt-5'>
        <div className='rounded-md sm:border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='font-medium'>Nombre</TableHead>
                        <TableHead className='font-medium'>Usuario</TableHead>
                        <TableHead className='font-medium'>Rol</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users ? users.map((user) => (
                        <TableRow key ={user.id} data-href="/">
                            <TableCell>
                                <Link href={`/Users/${user.id}`}>{user.name}</Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/Users/${user.id}`}>{user.username}</Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/Users/${user.id}`}>{user.role}</Link>
                            </TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default DataTableSimple;