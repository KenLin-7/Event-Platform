import * as React from 'react';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {useState} from "react";
import {MobileDateTimePicker} from "@mui/x-date-pickers";

export default function CalendarCPN(props) {
    const [value, setValue] = useState(dayjs(props.oldTime));


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    props.onTime(newValue)
                }}
                label="Date and Time"
                onError={console.log}
                minDate={dayjs('2022-11-01T00:00')}
                inputFormat="YYYY/MM/DD hh:mm a"
                mask="____/__/__ __:__ _M"
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
