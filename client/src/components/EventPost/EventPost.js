import {
    Button,
    Container,
    MenuItem,
    TextField,
    Typography,
    Stack,
    Card,
    Dialog,
    DialogContent,
    DialogContentText, DialogTitle, DialogActions
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from "@mui/material/Divider";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UploadImage from "./UploadImage";
import CalendarCPN from "./CalendarCPN";
import formValidate from "../../utils/validation";
import React from "react";
import dayjs from "dayjs";
import {postEvent} from "../../api/EventAPI";
import {useUser} from "../../context/UserContext";

export default function EventPost() {

    const [category, setCategory] = useState('Sports');
    const categories = [
        {
            value: 'Sports',
            label: 'Sports'
        },
        {
            value: 'Music',
            label: 'Music'
        },
        {
            value: 'Arts',
            label: 'Arts'
        },

    ];

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
        setEvent({...event, ["category"]: e.target.value})
    };



    const [state, setState] = useState('NSW');
    const states = [
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
    const handleSateChange = (e) => {
        setState(e.target.value)
        setEvent({...event, ["state"]: e.target.value})
    };



    const participant_regex = /(^[1-9]\d*$)/
    const [uploadingImageFlag, setUploadingImageFlag] = useState(0)

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
        dateAndTime: dayjs('2022-11-01T00:00')

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
        content: "How many participant"
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

        if(result.suburb&&result.postcode&&result.eventTitle&&result.address1){
            let address = ""
            if(event.address2!=null&&event.address2!="") {
                address = event.address1 + "+" + event.address2 + "+" + event.suburb + "+" + event.state + "+" + event.postcode
            }else {
                address = event.address1 + "+" + "NoAddress2" + "+" + event.suburb + "+" + event.state + "+" + event.postcode
            }
            const databaseEvent = {

                title:event.eventTitle,
                image:event.image,
                status:"1",
                startDate: event.dateAndTime,
                maxParticipant: event.participant ,
                description:event.description,
                location:address
            }
            postEvent(databaseEvent)
        }
    }



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
                        content: "How many participant"
                    }
                )
                setEvent({...event, ["participant"]: e.target.value})
            } else {
                e.target.value = 1
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

    const onClickSuburbError = (e) => {
        setSuburbError(
            {
                show: false,
                content: ""
            }
        )
    }

    const onClickPostcodeError = (e) => {
        setPostcodeError(
            {
                show: false,
                content: ""
            }
        )
    }

    const [open, setOpen] = useState(false);
    const onCancelClick = (e) => {
        setOpen(true);
    }
    const handleCancelNo = () => {
        setOpen(false);
    };

    const handleCancelYes = () => {
        setOpen(false);
        // go back to the previous page
    };


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
                                onChange={handleCategoryChange}
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
                            <UploadImage onImage={(image) => setEvent({...event, ["image"]: image})}
                                         onFlag={(uploadingFlag) => setUploadingImageFlag(uploadingFlag)}
                                         name={"image"}></UploadImage>
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
                                   value={state}
                                   onChange={handleSateChange}

                        >
                            {states.map((option) => (
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
                    <Stack sx={{padding: 1, marginLeft: 6, marginRight: 40}}>
                        <Stack sx={{marginBottom: 2}}>
                            <Typography fontSize={18}> Please select the Date and Time: </Typography>
                        </Stack>
                        <Stack sx={{marginRight: 40}}>
                            <CalendarCPN
                                onTime={(time) => setEvent({...event, ["dateAndTime"]: time})}
                                         ></CalendarCPN>
                        </Stack>
                    </Stack>


                    {/*      *****       Last two buttons    *****      */}
                    <Stack direction={"row"}
                           sx={{padding: 1, marginLeft: 85, marginRight: 6, marginTop: 8, marginBottom: 4}}>

                        {/*        cancel button      */}
                        <Button variant={"outlined"} align={"right"} onClick={onCancelClick}> Cancel </Button>
                        <Dialog
                            open={open}
                            onClose={handleCancelNo}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Do you want to Cancel?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Click Yes to confirm cancel, the information will not be saved.
                                    Click No to go back
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCancelNo}>No</Button>
                                <Button onClick={handleCancelYes} autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {/*        confirm button      */}
                        {console.log(uploadingImageFlag)}
                        {uploadingImageFlag === 1 ?

                            <Button disabled variant={"contained"} align={"right"}
                                    sx={{marginLeft: 2}}
                            > Confirm </Button>

                            : <Button onClick={onClick} variant={"contained"} align={"right"}
                                      sx={{marginLeft: 2}}
                            > Confirm </Button>

                        }
                    </Stack>

                </Paper>

            </Stack>
        </Container>


    );


}