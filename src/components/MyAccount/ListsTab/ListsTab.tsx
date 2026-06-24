import { useContext } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"

import { useRouter } from "next/router"
import ListDisplay from "./ListDisplay"
import ListsDisplay from "./ListsDisplay"

const ListsTab = () => {
  const {
    updatedAccountData: { lists },
  } = useContext(PatronDataContext)

  const router = useRouter()
  const index = router.query.index as string[] | undefined
  const isSingleList = index && index[0] === "lists" && index.length > 1
  const listId = isSingleList ? index[1] : null

  if (isSingleList) {
    const list = lists.find((l) => l.id === listId)
    return <ListDisplay list={list} />
  } else return <ListsDisplay />
}

export default ListsTab
