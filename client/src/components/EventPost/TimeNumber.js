import {useState} from "react";
import {MenuItem, TextField} from "@mui/material";


export default function TimeNumber() {
    const timeNumber = [
        {
            value: '01:00',
        },
        {
            value: '01:30',
        },
        {
            value: '02:00',
        },
        {
            value: '02:30',
        },
        {
            value: '03:00',
        },
        {
            value: '03:30',
        },
        {
            value: '04:00',
        },
        {
            value: '04:30',
        },
        {
            value: '05:00',
        },
        {
            value: '05:30',
        },
        {
            value: '06:00',
        },
        {
            value: '06:30',
        },
        {
            value: '07:00',
        },
        {
            value: '07:30',
        },
        {
            value: '08:00',
        },
        {
            value: '08:30',
        },
        {
            value: '09:00',
        },
        {
            value: '09:30',
        },
        {
            value: '10:00',
        },
        {
            value: '10:30',
        },
        {
            value: '11:00',
        },
        {
            value: '11:30',
        },
        {
            value: '12:00',
        },
        {
            value: '12:30',
        },


    ];


    const [time, setTime] = useState('01:00');

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    return(

        <TextField sx={{marginLeft: 6}}
                   id="outlined-select-currency"
                   select
                   required
                   fullWidth
                   label="Time"

                   value={time}
                   onChange={handleTimeChange}

        >
            {timeNumber.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
        </TextField>









    );


}