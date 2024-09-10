"use client"
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"                                                         
import { buttonVariants } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
  

const DeleteButton = ({ticketId}:{ticketId: number}) => {

    const router = useRouter();
    const[error, setError] = useState("");
    const [isDeleting, setIsDeleting]= useState(false);

    const deleteTicket = async() => {
        try {
            setIsDeleting(true);
            await axios.delete("/api/tickets/" + ticketId);
            router.push("/tickets");
            router.refresh();
        } catch (error) {
            setIsDeleting(false)
            setError("Ha ocurrido un error desconocido")
        }
    }

    return (
        <>
        <AlertDialog>
            <AlertDialogTrigger className={buttonVariants({variant: "destructive"})} disabled={isDeleting} >Borrar Ticket</AlertDialogTrigger>
            <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
                Esta acción no se puede deshacer.
            </AlertDialogDescription>
        </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className={buttonVariants({variant: "destructive"})} disabled={isDeleting} onClick={deleteTicket}>Borrar</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    <p className="text-destructive">{error}</p>
    </>
  )
}

export default DeleteButton;