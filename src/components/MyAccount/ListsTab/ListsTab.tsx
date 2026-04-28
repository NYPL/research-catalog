import { useContext } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import List from "../../../models/List"

const ListsTab = () => {
  const {
    updatedAccountData: { lists: listResults },
  } = useContext(PatronDataContext)
  const lists = listResults.map((list: any) => new List(list))
  return <>{JSON.stringify(lists)}</>
}

export default ListsTab
