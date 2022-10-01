import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {useState} from "react";

export default function CalendarCPN(props) {
    const [value, setValue] = useState(dayjs('2022-01-01'));
    const timeLabel = props.label
                //not finish yet
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label={timeLabel}
                    value={value}
                    minDate={dayjs('2017-01-01')}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
        </LocalizationProvider>
    );
}
