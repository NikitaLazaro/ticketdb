"use client"

//Imports
import React, { useState } from 'react'
import { Form, FormField, FormLabel, FormItem, FormControl } from "./ui/form";
import { Input } from "@/components/ui/input"
import { ticketSchema } from '@/ValidationSchemas/ticket';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Ticket } from '@prisma/client';

type TicketFormData = z.infer<typeof ticketSchema>


interface Props {
    ticket?: Ticket
}

//Formato del Ticket
const TicketForm = ({ticket}: Props) => {

    const[isSubmitting, setIsSubmitting] = useState(false)
    const[error, setError] = useState("")
    const router = useRouter

    const form = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema)
    })

async function onSubmit(values: z.infer<typeof ticketSchema>){
    try {
        setIsSubmitting(true)
        setError("")

        if(ticket){
            await axios.patch("/api/tickets/" + ticket.id, values)
        }else{
            await axios.post("/api/tickets", values)
        }

        setIsSubmitting(false)
    } catch (error) {
        setError("Unknow Error Occured")
        setIsSubmitting(false)
    }
}

  return (
    <div className='rounded-md border w-full p-4'>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
            <FormField control={form.control} 
            name= "title" 
            defaultValue={ticket?.title}
            render={({field}) =>(
                <FormItem>
                    <FormLabel>Titulo del Ticket</FormLabel>
                    <FormControl>
                        <Input placeholder="Titulo del Ticket" {...field}/>
                    </FormControl>
                </FormItem>
                )}
            />
            <Controller name="description" 
            control={form.control} 
            defaultValue={ticket?.description}
            render={({field}) => (
                <SimpleMDE placeholder="Descripción" {...field} />
            )}
            
            />

            <div className='flex w-full space-x-4'>
                <FormField defaultValue={ticket?.status} control={form.control} name="status" render={({field}) =>(
                    <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Estado..."  defaultValue={ticket?.status}/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Abierto">Abierto</SelectItem>
                                <SelectItem value="Empezado">Procesando</SelectItem>
                                <SelectItem value="Cerrado">Cerrado</SelectItem>
                            </SelectContent>
                            
                        </Select>
                    </FormItem>
                )}/>
                <FormField defaultValue={ticket?.priority} control={form.control} name="priority" render={({field}) =>(
                    <FormItem>
                        <FormLabel>Prioridad</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Prioridad..."  defaultValue={ticket?.priority}/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Baja">Baja</SelectItem>
                                <SelectItem value="Media">Media</SelectItem>
                                <SelectItem value="Alta">Alta</SelectItem>
                            </SelectContent>
                            
                        </Select>
                    </FormItem>
                )}/>
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {ticket ? "Actualizar Ticket" : "Crear Ticket"}
            </Button>
        </form>
    </Form>
    <p className="text-destructive">{error}</p>
    </div>
  )
}

export default TicketForm;