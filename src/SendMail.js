import { Close } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import './SendMail.css'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { closeSendMessage } from './features/mailSlice'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';





const SendMail = () => {
const { register, handleSubmit, formState: { errors }} = useForm();

const dispatch = useDispatch();



const onSubmit = async (formData) => {
    console.log(formData); 

     addDoc(collection(db, 'emails'),{
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        dispatch(closeSendMessage());
  }

    
  return (
    <div className='sendMail'>
        <div className="sendMail_header">
            <h3>New Message</h3>
            <Close onClick={() => dispatch(closeSendMessage())} className='sendMail_close' />
        </div>

        <form shouldFocusError onSubmit={handleSubmit(onSubmit)}>

            <input 
            name='to' 
            placeholder='To' 
            type="email"
            {...register('to',{
                required: "To is required" 
                })} 
                />
             {errors.to && <p className='sendMail_error'>To is Required!</p>}
            <input 
            name='subject' 
            placeholder='Subject' 
            type="text" 
            {...register('subject',{
                required: "Subject is required"
                })}
                />
            {errors.subject && <p className='sendMail_error'>Subject is Required!</p>}
            <input 
            name='message' 
            placeholder='Message...' 
            type="text" 
            className='sendMail_message' 
            {...register('message',{
                required: "Message is required"
            })}
            />
            {errors.subject && <p className='sendMail_error'>Message is Required!</p>}
            <div className="sendMail_options">
                <Button
                 variant="contained"
                 color="primary"
                 type="submit" 
                 className='sendMail_send'>
                    Send</Button>
            </div>
        </form>
    </div>
  )
}

export default SendMail