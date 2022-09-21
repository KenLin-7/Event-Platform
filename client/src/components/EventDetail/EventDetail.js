import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardMedia, Chip,
    Container, Divider,
    Grid, imageListClasses,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import img from "./xxxxxxxx.png"
import Grid2 from "@mui/material/Unstable_Grid2";
import ParticipantCPN from "./ParticipantCPN";


export default function EventDetail() {

    const eventIntro = "See the night sky light up with spectacular fireworks displays every Saturday night.\n" +
        "\n" +
        "Grab yourself a ringside seat around Cockle Bay, or a bite to eat in one of the many harbour side restaurants, and enjoy an amazing fireworks display every Saturday night in Darling Harbour!\n" +
        "\n" +
        "Time: 8.30pm then at 9pm from 8 October 2022"


    return (

        <div>
            <Container maxWidth={"lg"}>
                <Stack sx={{padding: 1, marginX: 20, marginBottom: 10}}>
                    <Paper justifyContent="space-evenly" sx={{padding: 2}}>
                        <Box sx={{flexGrow: 1}}>
                            <Grid2 container spacing={2}>
                                <Grid2 xs={6}>
                                    <Card elevation={1}>
                                        <CardMedia
                                            component="img"
                                            height="450"
                                            image={img}
                                            alt="eventpic"
                                        />
                                    </Card>
                                </Grid2>
                                <Grid2 xs={6}>

                                    <Stack direction={"row"} sx={{marginLeft: 2, marginTop: 8}} spacing={1}>
                                        <Avatar sx={{width: 50, height: 50}} src={img}/>
                                        <Stack>
                                            <Typography align={"left"} fontSize={16}> Hoster name </Typography>
                                            <Typography align={"left"} fontSize={12} fontWeight={500}> @xxxxx Account
                                                Number </Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack sx={{marginTop: 5, marginX: 2}}>
                                        <Card elevation={5}>
                                            <Typography fontSize={25} sx={{marginTop: 4, marginBottom: 2}}> EVENT
                                                NAME </Typography>
                                            <Typography fontWeight={500}> Event Time </Typography>
                                            <Button variant="contained" size="large" sx={{marginY: 5}}>Regist
                                                Now</Button>
                                        </Card>
                                    </Stack>

                                </Grid2>
                            </Grid2>
                        </Box>
                    </Paper>
                    <Stack sx={{marginTop: 5}}>

                        <Typography fontSize={25} fontWeight={500}> Event Introduction </Typography>
                        <Typography fontSize={18} sx={{marginTop: 2}}> {eventIntro} </Typography>

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


        </div>


    )
        ;


}