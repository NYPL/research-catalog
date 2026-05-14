import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"

import { useRouter } from "next/router"
import ListDisplay from "./ListDisplay"
import ListsDisplay from "./ListsDisplay"
import List from "../../../models/List"

const ListsTab = () => {
  const {
    updatedAccountData: { lists: listResults, patron },
  } = useContext(PatronDataContext)

  const router = useRouter()
  const index = router.query.index as string[] | undefined
  const isSingleList = index && index[0] === "lists" && index.length > 1
  const listId = isSingleList ? index[1] : null

  const [lists, setLists] = useState(
    listResults.map((list: any) => new List(list))
  )

  if (isSingleList) {
    const list = lists.find((l) => l.id === listId)
    return <ListDisplay list={list} />
  } else return <ListsDisplay />
}

export default ListsTab
