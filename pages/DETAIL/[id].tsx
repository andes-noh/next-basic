import { Product } from '../../page/Dashboard/dashboard'
import { DetailDashBoard } from '../../page/DetailDashboard/detaildashboard'
import type { GetServerSideProps } from 'next'
import axios from 'axios'

export const getServerSideProps: GetServerSideProps<Product> = async (context) => {
  const id = context.query.id

  const data = await axios.get(`https://fakestoreapi.com/products/${id}`).then((e) => {
    return e.data
  })

  return {
    props: {
      product: data,
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.image,
      rating: data.rating,
    },
  }
}

export default DetailDashBoard
