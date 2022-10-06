import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardMedia,
    Container, Divider, MenuItem,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import img from "./xxxxxxxx.png"
import Grid2 from "@mui/material/Unstable_Grid2";
import ParticipantCPN from "./ParticipantCPN";
import {getEventDetail} from "../../api/EventAPI";
import avatar from '../EventDetail/avatar.jpg';
import RegistBtn from "./RegistBtn";


export default function EventDetail(effect, deps) {

    const eventIntro = "See the night sky light up with spectacular fireworks displays every Saturday night.\n" +
        "\n" +
        "Grab yourself a ringside seat around Cockle Bay, or a bite to eat in one of the many harbour side restaurants, and enjoy an amazing fireworks display every Saturday night in Darling Harbour!\n" +
        "\n" +
        "Time: 8.30pm then at 9pm from 8 October 2022  "


    const [eventId, setEventId] = useState(8)
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null)
    const [eventDate, setEventDate] = useState("")
    const [eventImg, setEventImg] = useState(img)
    const [registFlag, setRegistFlag] = useState("")
    const [registrationList, setRegistrationList] = useState(null)

    useEffect(() => {
        getEventDetail(eventId).then(
            (res) => {
                setEvent(res.data)
                setRegistrationList(res.data["registrationList"])
                setRegistFlag(res.data["registBtnFlag"])
                // setRegistFlag("rejected")
                setLoading(false)
            })

    }, [eventId])

    useEffect(() => {
        if (!loading) {
            processTime(event.time)
            processImage(event.image)
            if (registrationList.length >= event.maxParticipant) {
                setRegistFlag("full")
            }
        }
    }, [event])

    useEffect(() => {


    }, [registFlag])


    const processTime = (timeString) => {
        const timeDate = new Date(timeString)
        const date = timeDate.getUTCFullYear() + "/" + timeDate.getUTCMonth() + "/" + timeDate.getUTCDay()
        let hours = ""
        if (timeDate.getMinutes() === 0) {

            hours = timeDate.getUTCHours() + ":" + "00"
        } else {
            hours = timeDate.getUTCHours() + ":" + timeDate.getMinutes()
        }
        setEventDate(date + " " + hours)
    }


    const processImage = (imageURL) => {
        if (imageURL && imageURL != "") {
            setEventImg(imageURL)
        }
    }


    return (

        <div>{

            loading ?
                (
                    <div></div>
                ) :

                (
                    <Container maxWidth={"lg"}>
                        <Stack sx={{padding: 2, marginX: 20, marginBottom: 20}}>
                            <Paper sx={{padding: 2}}>
                                <Box sx={{flexGrow: 1}}>
                                    <Grid2 container spacing={2}>
                                        <Grid2 xs={6}>
                                            <Card elevation={1}>
                                                <CardMedia
                                                    component="img"
                                                    height="450"
                                                    width="100%"
                                                    alt="green iguana"
                                                    image={eventImg}
                                                />

                                                {/*<img src={eventImg}*/}
                                                {/*    width="100%" alt="iphone11"  height={450}/>*/}
                                            </Card>
                                        </Grid2>

                                        <Grid2 xs={6}>

                                            <Container>
                                                <Stack direction={"row"} sx={{marginLeft: 2, marginTop: 8}} spacing={1}>
                                                    <Avatar sx={{width: 50, height: 50}} src={avatar}/>
                                                    <Stack>
                                                        <Typography align={"left"}
                                                                    fontSize={16}> {event["owner"].nickname} </Typography>
                                                        <Typography align={"left"} fontSize={12}
                                                                    fontWeight={500}> {event["owner"].email}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                                <Container>
                                                    <Stack sx={{marginTop: 4}}>

                                                        <Card elevation={5}>
                                                            <Container>

                                                                <Typography align={'center'} sx={{marginTop: 3}}
                                                                            fontSize={25}> {event.title} </Typography>

                                                                <Typography align={'center'} sx={{marginTop: 2}}
                                                                            fontWeight={500}> {eventDate} </Typography>
                                                                <Typography align={'center'} sx={{marginTop: 2}}
                                                                > {event["location"].street} </Typography>
                                                                <Typography align={'center'}
                                                                > {event["location"].suburb + ", " + event["location"].state + " " + event["location"].postcode} </Typography>
                                                                <Typography align={'center'} sx={{marginTop: 2}}
                                                                            fontWeight={500}>Available: {registrationList.length} / {event.maxParticipant} </Typography>
                                                                <RegistBtn
                                                                    updateRegistFlag={(newRegistFlag) => setRegistFlag(newRegistFlag)}
                                                                    registFlag={registFlag}
                                                                    eventId={eventId}
                                                                ></RegistBtn>

                                                            </Container>
                                                        </Card>

                                                    </Stack>
                                                </Container>
                                            </Container>
                                        </Grid2>

                                    </Grid2>
                                </Box>
                            </Paper>
                            <Stack sx={{marginTop: 5}}>

                                <Typography align={'center'} fontSize={25} fontWeight={500}> Event
                                    Introduction </Typography>
                                <Typography align={'center'} fontSize={18}
                                            sx={{marginTop: 2}}> {event.description} </Typography>

                            </Stack>

                            <Divider sx={{marginTop: 3}} variant="middle"/>

                            <Stack sx={{marginTop: 3, marginX: 6}}>
                                <Typography align={"left"} fontSize={18} fontWeight={500}>Participants: </Typography>
                                <Grid2 container direction={"row"} sx={{marginTop: 2, marginX: 2}} spacing={2}>
                                    {registrationList.map((reg) => (
                                        <ParticipantCPN key={reg.requester.email}
                                                        requester={reg["requester"]}></ParticipantCPN>
                                    ))}
                                </Grid2>
                            </Stack>
                        </Stack>
                    </Container>

                )}
        </div>


    )
        ;


}