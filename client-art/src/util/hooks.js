import  { useState } from 'react'


export const useForm =(callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

        //! si la valuer d'un chanps change alors (set) une  nouvelle value dans lobjet values
    const onValueChange = (event) => {

        setValues({ ...values, [event.target.name]: event.target.value }); 
    }


        
    const onSubmitForm = (event)=> {

        event.preventDefault();
        
        //console.log(event.target )
        callback();

    }

    return {
        onValueChange,
        onSubmitForm,
        values
    };
    
}