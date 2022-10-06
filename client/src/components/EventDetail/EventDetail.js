import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardMedia,
    Container, Divider,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import img from "./xxxxxxxx.png"
import Grid2 from "@mui/material/Unstable_Grid2";
import ParticipantCPN from "./ParticipantCPN";
import {getEvent} from "../../api/EventAPI";
import avatar from '../EventDetail/avatar.jpg';
import RegistBtn from "./RegistBtn";



export default function EventDetail(effect, deps) {

    const eventIntro = "See the night sky light up with spectacular fireworks displays every Saturday night.\n" +
        "\n" +
        "Grab yourself a ringside seat around Cockle Bay, or a bite to eat in one of the many harbour side restaurants, and enjoy an amazing fireworks display every Saturday night in Darling Harbour!\n" +
        "\n" +
        "Time: 8.30pm then at 9pm from 8 October 2022  "


    const [eventId, setEventId] = useState(6)
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null)
    const [eventDate, setEventDate] = useState("")
    const [eventImg, setEventImg] = useState(img)
    const [location, setLocation] = useState({street: "", suburb: "", state: "", postcode: ""})
    const [eventPoster, setEventPoster] = useState({nickname: "", email: "", avatar: avatar})
    const [participants,setParticipants] =useState("")
    const [pendFlag,setPendFlag] = useState(true)
    const [registration,setRegistration] = useState(null)

    useEffect(() => {
        getEvent(eventId).then(
            (res) => {
                setEvent(res.data)

                setLoading(false)
            })

    }, [eventId])

    useEffect(() => {
        if (!loading) {
            processTime(event.startDate)
            processLocation(event.location)
            processImage(event.image)
            processOwner(event.owner)
            setRegistration(event.registrationList)


        }
    }, [event],[pendingFlag],[pendFlag])

    useEffect(   () =>{

        processParticipants()



        },[registration],[eventPoster])


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

    const processLocation = (locationString) => {

        const splitString = locationString.split("+")
        if (splitString.length === 5) {
            if (splitString[1] === "NoAddress2") {
                setLocation({
                    street: splitString[0],
                    suburb: splitString[2],
                    state: splitString[3],
                    postcode: splitString[4]
                })
            } else {
                const street = splitString[0] + " " + splitString[1]
                setLocation({street: street, suburb: splitString[2], state: splitString[3], postcode: splitString[4]})
            }
        }
    }

    const processImage = (imageURL) => {
        if (imageURL && imageURL != "") {
            setEventImg(imageURL)
        }
    }

    const processOwner = (owner) => {
        setEventPoster({nickname: owner.nickname, email: owner.email, avatar: owner.avatar})
    }

    const processParticipants= () =>{

        if(registration!=null){

            setParticipants(registration.length)

            if (participants>=event.maxParticipant){
                setPendFlag("full")
            }
            else{
                setPendFlag("available")
            }
        }
    }


    const onPendClick = () =>{
        setPendingFlag(true)
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
                                                    <Avatar sx={{width: 50, height: 50}} src={eventPoster.avatar}/>
                                                    <Stack>
                                                        <Typography align={"left"}
                                                                    fontSize={16}> {eventPoster.nickname} </Typography>
                                                        <Typography align={"left"} fontSize={12}
                                                                    fontWeight={500}> {eventPoster.email}
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
                                                                > {location.street} </Typography>
                                                                <Typography align={'center'}
                                                                > {location.suburb + ", " + location.state + " " + location.postcode} </Typography>
                                                                <Typography align={'center'} sx={{marginTop: 2}}
                                                                            fontWeight={500}>Available: {participants} / {event.maxParticipant} </Typography>
                                                                <RegistBtn pendingFlag={pendingFlag} pendFlag={[pendFlag]} ></RegistBtn>




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
                                    <ParticipantCPN></ParticipantCPN>
                                    <ParticipantCPN></ParticipantCPN>
                                    <ParticipantCPN></ParticipantCPN>
                                    <ParticipantCPN></ParticipantCPN>
                                    <ParticipantCPN></ParticipantCPN>
                                    <ParticipantCPN></ParticipantCPN>
                                    <ParticipantCPN></ParticipantCPN>

                                </Grid2>
                            </Stack>
                        </Stack>
                    </Container>

                )}
        </div>


    )
        ;


}