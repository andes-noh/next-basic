import { FC } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

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

export const FakeShoppingList: FC = (props) => {
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

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Fake Store (product)</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">description</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data ?? []).map((row: Product) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default FakeShoppingList
