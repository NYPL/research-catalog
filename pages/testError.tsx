import { useEffect } from "react"

function TestError() {
  //throw new Error("Throwing a client side test error")
  useEffect(() => {
    throw new Error("Throwing a client side error after mount")
  }, [])
}

// TestError.getInitialProps = () => {
//   throw new Error("Throwing a server test error")
// }

export default TestError
