import {useState} from "react";
import {MenuItem, TextField} from "@mui/material";


export default function TimeLabel() {
    const timeLabel = [
        {
            value: 'AM',
        },
        {
            value: 'PM',

        }
    ];


    const [time, setTime] = useState('AM');

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    return(

        <TextField sx={{marginLeft: 6}}
                   id="outlined-select-currency"
                   select
                   required
                   fullWidth
                   label=""

                   value={time}
                   onChange={handleTimeChange}

        >
            {timeLabel.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
        </TextField>









    );


}