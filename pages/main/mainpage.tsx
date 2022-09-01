import { FC } from 'react'
import { Header } from '../../page/Header/header'
import { Menu } from '../../component/MenuBox'
import { FakeShoppingList } from '../../page/Dashboard/dashboard'

export const Page: FC = (props) => {
  return (
    <>
      <Header />
      <Menu />
      <FakeShoppingList />
    </>
  )
}

export default Page
