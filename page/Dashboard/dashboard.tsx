import { FC, useCallback } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Router, useRouter } from 'next/router'

export interface _rating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: _rating
}

const theme = createTheme()

export const FakeShoppingList: FC = (props) => {
  const router = useRouter()
  const { data } = useQuery(
    ['product'],
    async () => {
      const { data } = await axios.get('https://fakestoreapi.com/products')
      console.log('axios return: ', data)
      return data
    },
    {
      // 새로고침 시간 5s
      refetchInterval: 5000,
    }
  )

  // const onDetail = (e: Product) => {
  //   router.push({
  //     pathname: '/DETAIL/[id]',
  //     query: { id: e.id },
  //   })
  // }

  const onDetail = useCallback(
    (e: Product) => {
      router.push({
        //
        pathname: '/DETAIL/[id]',
        query: { id: e.id },
      })
    },
    [router]
  )

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Fake Store (product)</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">detail info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data ?? []).map((row: Product) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">
                      {' '}
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          //
                          onDetail(row)
                        }}
                      >
                        상세정보
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default FakeShoppingList
