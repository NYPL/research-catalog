// import { render, screen, fireEvent, act } from "@testing-library/react"
// import TimedLogoutModal from "./TimedLogoutModal"
// import React from "react"
// import router from "next/router"
// import { deleteCookie } from "../../utils/cookieUtils"

// jest.mock("next/router", () => ({
//   __esModule: true,
//   default: { push: jest.fn() },
// }))
// jest.mock("../../utils/cookieUtils", () => ({
//   deleteCookie: jest.fn(),
// }))
// jest.mock("../../server/auth", () => ({
//   useLogoutRedirect: jest.fn().mockReturnValue("/login"),
// }))

// describe("Logout modal", () => {
//   beforeEach(() => {
//     jest.useFakeTimers()
//     jest.clearAllMocks()
//   })

//   afterEach(() => {
//     jest.useRealTimers()
//   })

//   it("should show the modal after inactivity timeout", async () => {
//     render(<TimedLogoutModal />)

//     expect(screen.queryByRole("dialog")).toBeNull()
//     expect(screen.queryByTestId("logout-modal")).not.toBeInTheDocument()

//     act(() => {
//       jest.advanceTimersByTime(5 * 60 * 1000)
//     })

//     expect(screen.getByRole("dialog")).toBeInTheDocument()
//   })

//   it("should start countdown when the modal opens", async () => {
//     render(<TimedLogoutModal />)

//     act(() => {
//       jest.advanceTimersByTime(5 * 60 * 1000)
//     })

//     expect(screen.getByTestId("logout-modal")).toBeInTheDocument()

//     expect(screen.getByText("2:00")).toBeInTheDocument()

//     act(() => {
//       jest.advanceTimersByTime(1000)
//     })

//     expect(screen.getByText("1:59")).toBeInTheDocument()
//   })

//   it("should log out and redirect when countdown reaches 0", async () => {
//     render(<TimedLogoutModal />)

//     await act(() => {
//       jest.advanceTimersByTime(5 * 60 * 1000)
//       return Promise.resolve()
//     })

//     expect(screen.getByRole("dialog")).toBeInTheDocument()

//     // Have to step through individual ticks
//     for (let i = 0; i < 2 * 60; i++) {
//       await act(() => {
//         jest.advanceTimersByTime(1000)
//         return Promise.resolve()
//       })
//     }

//     expect(deleteCookie).toHaveBeenCalledWith("accountPageExp")
//     expect(router.push).toHaveBeenCalledWith("/login")
//   })

//   it('should reset the timer when "Stay logged in" is clicked', async () => {
//     render(<TimedLogoutModal />)

//     act(() => {
//       jest.advanceTimersByTime(5 * 60 * 1000)
//     })

//     fireEvent.click(screen.getByText("Stay logged in"))

//     expect(screen.queryByTestId("logout-modal")).not.toBeInTheDocument()
//     expect(router.push).not.toHaveBeenCalled()
//   })

//   it("should reset the inactivity timer on user activity", async () => {
//     render(<TimedLogoutModal />)

//     expect(screen.queryByTestId("logout-modal")).not.toBeInTheDocument()

//     act(() => {
//       jest.advanceTimersByTime(2 * 60 * 1000)
//     })

//     expect(screen.queryByTestId("logout-modal")).not.toBeInTheDocument()

//     window.dispatchEvent(new Event("scroll"))

//     act(() => {
//       jest.advanceTimersByTime(4 * 60 * 1000)
//     })

//     expect(screen.queryByTestId("logout-modal")).not.toBeInTheDocument()

//     act(() => {
//       jest.advanceTimersByTime(5 * 60 * 1000)
//     })

//     expect(screen.getByTestId("logout-modal")).toBeInTheDocument()
//   })
// })
