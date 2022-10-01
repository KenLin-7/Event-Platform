import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {useState} from "react";

export default function TimePickerCPN() {
    const [value, setValue] = useState(dayjs('2022-01-01T00:00:00.000Z'),);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                label=""
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}