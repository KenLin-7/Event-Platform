import { Container, Link, Stack, Typography } from '@mui/material'
import React from 'react'
export default function NotFound() {

  return (
    <Container>
        <Stack alignItems="center" spacing={2}>
            <Typography variant='h2'>Page Not Found</Typography>
            <Typography>Click here to <Link href="/" underline='hover'>Home page</Link></Typography>
        </Stack>
    </Container>
  )
}
