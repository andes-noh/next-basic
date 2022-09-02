import { FC, useState } from 'react'
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Product } from '../Dashboard/dashboard'
import { useRouter } from 'next/router'

const theme = createTheme()

export interface PageProps {
  readonly product: Product
}

export const DetailDashBoard: FC<PageProps> = (props) => {
  const router = useRouter()
  const [detail, setDetail] = useState(props.product)

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Detail Product Info</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">rating_count</TableCell>
                  <TableCell align="left">rating_rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={detail.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {detail.id}
                  </TableCell>
                  <TableCell align="left">{detail.title}</TableCell>
                  <TableCell align="left">{detail.price}</TableCell>
                  <TableCell align="left">{detail.category}</TableCell>
                  <TableCell align="left">{detail.description}</TableCell>
                  <TableCell align="left">{detail.image}</TableCell>
                  <TableCell align="left">{detail.rating.count}</TableCell>
                  <TableCell align="left">{detail.rating.rate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={() => {
              //
              router.back()
            }}
          >
            기본페이지로
          </Button>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default DetailDashBoard
