import React, {useEffect, useState} from "react";
import {Card, CardMedia, Container, Paper, Stack, Typography} from "@mui/material";
import img from "./xxxxxxxx.png"






export default function EventDetail() {



        return(

            <div>
                <Container  maxWidth={"lg"}>
                       <Stack spacing={3} sx={{margin:8, padding: 1}}>
                            <Paper  justifyContent="space-evenly" sx={{margin:6, padding: 2}} >

                                     <Stack direction="row" spacing={3}  >


                                            <Card>
                                                <CardMedia
                                                    component="img"
                                                    height="500"
                                                    image={img}
                                                    alt="eventpic"
                                                />
                                            </Card>
                                          <Typography fontSize={25}> EVENT NAME </Typography>

                                        </Stack>

                             </Paper>

                           <Stack> detail  </Stack>
                           <Stack > participants </Stack>
                       </Stack>
                </Container>


            </div>



        );


}