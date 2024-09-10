"use client"

//Imports
import React, { useState } from 'react'
import { Form, FormField, FormLabel, FormItem, FormControl } from "./ui/form";
import { Input } from "@/components/ui/input"
import { userSchema } from '@/ValidationSchemas/users';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import axios from 'axios';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';

type UserFormData = z.infer<typeof userSchema>


interface Props {
    user?: User;
}

//Formato del Ticket
const UserForm = ({user}: Props) => {

    const[isSubmitting, setIsSubmitting] = useState(false)
    const[error, setError] = useState("")
    const router = useRouter

    const form = useForm<UserFormData>({
        resolver: zodResolver(userSchema)
    })

async function onSubmit(values: z.infer<typeof userSchema>){
    try {
        setIsSubmitting(true)
        setError("")

        if(user){
            await axios.patch("/api/users/" + user.id, values)
        }else{
            await axios.post("/api/users", values)
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
            name= "name" 
            defaultValue={user?.name}
            render={({field}) =>(
                <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                        <Input placeholder="Introduce el nombre del usuario" {...field}/>
                    </FormControl>
                </FormItem>
                )}
            />

            <FormField control={form.control} 
            name= "username" 
            defaultValue={user?.username}
            render={({field}) =>(
                <FormItem>
                    <FormLabel>usuario</FormLabel>
                    <FormControl>
                        <Input placeholder="Introduce un usuario" {...field}/>
                    </FormControl>
                </FormItem>
                )}
            />

            <FormField control={form.control} 
            name= "password" 
            defaultValue=""
            render={({field}) =>(
                <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                        <Input type="password" required={user? false : true} placeholder="Introduce la contraseña" {...field}/>
                    </FormControl>
                </FormItem>
                )}
            />
            <div className='flex w-full space-x-4'>
                <FormField defaultValue={user?.role} control={form.control} name="role" render={({field}) =>(
                    <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Role..."  defaultValue={user?.role}/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="TECH">Tech</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                            
                        </Select>
                    </FormItem>
                )}/>
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {user ? "Actualizar Usuario" : "Crear Usuario"}
            </Button>
        </form>
    </Form>
    <p className='text-destructive'>{error}</p>
    </div>
  )
}

export default UserForm;