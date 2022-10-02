import {Button, Container, MenuItem, TextField, Typography, Stack, Card} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from "@mui/material/Divider";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimePickerCPN from "./TimePickerCPN";
import UploadImage from "./UploadImage";
import CalendarCPN from "./CalendarCPN";
import formValidate from "../../utils/validation";
import React from "react";


export default function EventPost() {

    const categories = [
        {
            value: 'NSW',
            label: 'NSW'
        },
        {
            value: 'VIC',
            label: 'VIC'
        },
        {
            value: 'ACT',
            label: 'ACT'
        },
        {
            value: 'QLD',
            label: 'QLD'
        },
    ];

    const [category, setCurrency] = useState('NSW');
    const participant_regex = /(^[1-9]\d*$)/

    const [event, setEvent] = useState({
        eventTitle: "",
        participant: 1,
        category: "",
        description: "",
        image: "",
        address1: "",
        address2: "",
        suburb: "",
        state: 'NSW',
        postcode: "",
        dateAndTime: ""

    })
    const [isValidated, setIsValidated] = useState({
        eventTitle: true,
        address1: true,
        suburb: true,
        postcode: true
    })


    const [eventTitleError, setEventTitleError] = useState(
        {
            show: false,
            content: "Please enter your event title"
        }
    )
    const [address1Error, setAddress1Error] = useState({
        show: false,
        content: "enter the street address"
    })

    const [participantError, setParticipantError] = useState({
        show: false,
        content: "enter the participant number"
    })

    const [suburbError, setSuburbError] = useState({
        show: false,
        content: ""
    })
    const [postcodeError, setPostcodeError] = useState({
        show: false,
        content: ""
    })


    const validation = () => {
        const validate = {
            eventTitle: event.eventTitle,
            address1: event.address1,
            suburb: event.suburb,
            postcode: event.postcode
        }
        const result = formValidate(validate)

        // setting helper text



        if (event.postcode !== "") setPostcodeError("Please enter correct phone format")


        setIsValidated(result)
        return result
    }
    const onClick = () => {
        console.log(event)
        const result = validation()
        console.log(result)

        if (!result.eventTitle) {
            setEventTitleError(
                {
                    show: true,
                    content: "please enter the right event title"
                }
            )


        }
        if (!result.address1) {

            setAddress1Error(
                {
                    show: true,
                    content: "please enter the address"
                }
            )

        }
        if (!result.suburb) {

            setSuburbError(
                {
                    show: true,
                    content: "suburb is incorrect"
                }
            )

        }
        if (!result.postcode) {

            setPostcodeError(

                {
                    show: true,
                    content: "postcode is incorrect"
                }

            )
        }

    }


    const handleSateChange = (e) => {
        setCurrency(e.target.value)
        setEvent({...event, ["state"]: e.target.value})
    };
    const onChange = (e) => {
        setEvent({...event, [e.target.name]: e.target.value})

        if (!isValidated.eventTitle || !isValidated.address1
            || !isValidated.suburb || !isValidated.postcode
        ) validation()
        console.log(event)
    }

    const handleParticipantChange = (e) => {
        let value = true
        if (e.target.value != null && e.target.value != '') {
            value = participant_regex.test(e.target.value)
            if (value) {
                setParticipantError({
                        show: false,
                        content: "enter the participant number"
                    }
                )
                setEvent({...event, ["participant"]: e.target.value})
            } else {
                setParticipantError(
                    {
                        show: true,
                        content: "number is not correct"
                    }
                )
                e.target.value = 0
            }
        }
    }

    const onClickEventTitleError = (e) => {
        setEventTitleError(
            {
                show: false,
                content: "please enter the event title"
            }
        )
    }
    const onClickAddressLine1Error = (e) => {
        setAddress1Error(
            {
                show: false,
                content: "please enter the address"
            }
        )
    }

    const onClickSuburbError = (e) =>{
        setSuburbError(
            {
                show: false,
                content: ""
            }
        )
    }

    const onClickPostcodeError = (e) =>{
        setPostcodeError(
            {
                show: false,
                content: ""
            }
        )
    }


    return (

        <Container>
            <Stack>
                <Paper sx={{marginX: 10, marginTop: 3, marginBottom: 8}}>

                    {/*      *****       The top message     *****      */}
                    <Stack sx={{padding: 1, marginX: 6}}>
                        <Typography fontSize={30} fontWeight={500}> Post Your Own Event </Typography>
                    </Stack>
                    <Stack sx={{padding: 1, marginX: 6}}>

                        <Typography fontSize={18}> Fulfill the information to publish an new event </Typography>
                    </Stack>

                    {/*      *****       Basic Info part     *****      */}
                    <Stack direction={"row"} sx={{padding: 1, marginX: 6}}>
                        <AssignmentIcon fontSize={"large"}> </AssignmentIcon>
                        <Typography fontSize={26} fontWeight={500}> Basic Info</Typography>
                    </Stack>

                    {/*          Line 1:   EventTitle TextField         */}
                    <Stack sx={{padding: 1, marginLeft: 6, marginRight: 72}}>
                        <TextField
                            name={"eventTitle"}
                            required
                            error={eventTitleError.show}
                            helperText={eventTitleError.content}
                            label="Event title"
                            maxRows={5}
                            multiline
                            onChange={onChange}
                            onClick={onClickEventTitleError}
                        />
                    </Stack>

                    {/*          Line 2:             */}
                    <Stack direction={"row"} sx={{padding: 1, marginLeft: 6,}}>

                        {/*         Participant number selector        */}
                        <Stack width={135}>
                            <TextField
                                required
                                name={"participant"}
                                label="Participant"
                                defaultValue={1}
                                onChange={handleParticipantChange}
                                error={participantError.show}
                                helperText={participantError.content}
                                type={"number"}

                            />
                        </Stack>

                        {/*         Category selector        */}
                        <Stack sx={{marginLeft: 6}}>
                            <TextField
                                name={"category"}
                                select
                                required
                                label="Category"
                                value={category}
                                onChange={handleSateChange}
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

                    {/*         Line 3: description textfield        */}
                    <Stack sx={{padding: 1, marginLeft: 6, marginRight: 40}}>
                        <TextField
                            name={"description"}
                            label="Description"
                            multiline
                            rows={4}
                            onChange={onChange}
                            helperText="Give a brief introduction about your event to attract more partners"
                        />
                    </Stack>

                    {/*         Line 4: image upload        */}
                    <Stack spacing={1} sx={{padding: 1, marginLeft: 6, marginRight: 40, marginTop: 1}}>
                        <Typography fontSize={20} fontWeight={300}> Upload an image:</Typography>
                        <Card>
                            <UploadImage name={"image"}></UploadImage>
                        </Card>
                    </Stack>


                    <Divider sx={{marginX: 6, marginY: 2}} variant="middle"/>

                    {/*      *****       Location part     *****      */}
                    <Stack direction={"row"} sx={{padding: 1, marginX: 6, marginTop: 2}}>
                        <LocationOnIcon fontSize={"large"}> </LocationOnIcon>
                        <Typography fontSize={26} fontWeight={500}>Location</Typography>
                    </Stack>

                    {/*         Line 1: address textfield     */}
                    <Stack direction={"row"} sx={{padding: 1, marginLeft: 6, marginRight: 40}}>

                        {/*     address1   */}
                        <TextField
                            name={"address1"}
                            required
                            fullWidth
                            label="Address line 1"
                            error={address1Error.show}
                            helperText={address1Error.content}
                            onChange={onChange}
                            onClick={onClickAddressLine1Error}
                        />
                        {/*     address2   */}
                        <TextField sx={{marginLeft: 6}}
                                   name={"address2"}
                                   fullWidth
                                   onChange={onChange}
                                   label="Address line 2"
                        />
                    </Stack>

                    {/*         Line 2:          */}
                    <Stack direction={"row"} sx={{padding: 1, marginLeft: 6, marginRight: 40}}>

                        {/*    suburb    */}
                        <TextField
                            name={"suburb"}
                            required
                            fullWidth
                            label="Suburb"
                            onChange={onChange}
                            onClick={onClickSuburbError}
                            error={suburbError.show}
                            helperText={suburbError.content}
                        />

                        {/*    state    */}
                        <TextField sx={{marginLeft: 6}}
                                   name={"state"}
                                   id="outlined-select-currency"
                                   select
                                   required
                                   fullWidth
                                   label="State"
                                   value={category}
                                   onChange={handleSateChange}

                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/*    postcode    */}
                        <TextField sx={{marginLeft: 6}}
                                   name={"postcode"}
                                   required
                                   fullWidth
                                   label="Postcode"
                                   onChange={onChange}
                                   onClick={onClickPostcodeError}
                                   error={postcodeError.show}
                                   helperText={postcodeError.content}
                        />
                    </Stack>

                    <Divider sx={{marginX: 6, marginY: 2}} variant="middle"/>

                    {/*      *****       Date and Time part     *****      */}
                    <Stack direction={"row"} sx={{padding: 1, marginX: 6, marginTop: 2}}>
                        <CalendarMonthIcon fontSize={"large"}> </CalendarMonthIcon>
                        <Typography fontSize={26} fontWeight={500}>Date and time</Typography>
                    </Stack>

                    {/*         Line 1: start date and time     */}
                    <Stack direction={"row"} sx={{padding: 1, marginLeft: 6, marginRight: 40}}>

                        <Stack>
                            <CalendarCPN label={"Start time"}></CalendarCPN>
                        </Stack>
                        <Stack sx={{marginLeft: 3}}>
                            <TimePickerCPN></TimePickerCPN>
                        </Stack>

                    </Stack>

                    {/*         Line 2: end date and time     */}
                    <Stack direction={"row"} sx={{padding: 1, marginLeft: 6, marginRight: 40, marginTop: 2}}>
                        <Stack>
                            <CalendarCPN label={"End time"}></CalendarCPN>
                        </Stack>
                        <Stack sx={{marginLeft: 3}}>
                            <TimePickerCPN></TimePickerCPN>
                        </Stack>
                    </Stack>

                    {/*      *****       Last two buttons    *****      */}
                    <Stack direction={"row"} sx={{padding: 1, marginLeft: 6, marginRight: 50, marginY: 5}}>

                        {/*        cancel button      */}
                        <Button variant={"outlined"} align={"right"}> Cancel </Button>

                        {/*        confirm button      */}
                        <Button onClick={onClick} variant={"contained"} align={"right"}
                                sx={{marginLeft: 2}}> Confirm </Button>
                    </Stack>

                </Paper>

            </Stack>
        </Container>


    );


}