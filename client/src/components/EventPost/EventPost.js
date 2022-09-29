import {Container, MenuItem, TextField, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import {Stack} from "@mui/system";
import {useState} from "react";

export default function EventPost() {

    const categories = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];

    const [category, setCurrency] = useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (

        <Container>
            <Paper sx={{marginX: 10, marginY:3}}>

                <Stack sx={{padding: 1, marginX: 6}}>

                    <Typography fontSize={30} fontWeight={500}> Post Your Own Event </Typography>
                </Stack>
                <Stack sx={{padding: 1, marginX: 6}}>

                    <Typography fontSize={20}> Fulfill the information to publish an new event: </Typography>
                </Stack>


                <Stack sx={{padding: 1, marginLeft: 6, marginRight: 72}}>
                    <TextField
                        required
                        label="Event name"
                        maxRows={5}
                        multiline
                        helperText="Please enter your event name"
                    />
                </Stack>

                <Stack direction={"row"} sx={{padding: 1, marginLeft: 6, }}>
                    <Stack width={135}>
                        <TextField
                            required
                            label="Participant"

                            helperText="How many people?"
                        />
                    </Stack>

                    <Stack  sx={{marginLeft: 6}}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            required
                            label="Category"
                            value={category}
                            onChange={handleChange}
                            helperText="Please select a category"
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                    </Stack>
                </Stack>

                <Stack sx={{padding: 1, marginLeft: 6, marginRight:40}}>
                    <TextField

                        label="Description"
                        multiline
                        rows={4}
                        helperText="Give a brief introduction about your event to attract more partners"
                    />

                </Stack>

                <Stack sx={{padding: 1, marginLeft: 6, marginRight:40}}>
                    <TextField
                        label="Location"
                        helperText="Give a brief introduction about your event to attract more partners"
                    />

                </Stack>


            </Paper>


        </Container>


    );


}