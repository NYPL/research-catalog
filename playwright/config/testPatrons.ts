// One test patron per browser, so account tests in different browsers
// never edit the same patron record.
// name and cardNumber are stored in Sierra; displayName and
// displayCardNumber are how the account page shows them.
const TEST_PATRONS = {
  chromium: {
    patronId: "10070467",
    name: "CHROMIUM, LOCALTESTINGPLAYWRIGHT",
    displayName: "Localtestingplaywright Chromium",
    cardNumber: "25555001759888",
    displayCardNumber: "2 5555 00175 9888",
    username: "playwrightlocalchromium",
    newUsername: "editchromium",
  },
  firefox: {
    patronId: "10070466",
    name: "FIREFOX, LOCALTESTINGPLAYWRIGHT",
    displayName: "Localtestingplaywright Firefox",
    cardNumber: "25555001759870",
    displayCardNumber: "2 5555 00175 9870",
    username: "playwrightlocalfirefox",
    newUsername: "editfirefox",
  },
  webkit: {
    patronId: "10070468",
    name: "WEBKIT, LOCALTESTINGPLAYWRIGHT",
    displayName: "Localtestingplaywright Webkit",
    cardNumber: "25555001759896",
    displayCardNumber: "2 5555 00175 9896",
    username: "playwrightlocalwebkit",
    newUsername: "editwebkit",
  },
}

export type BrowserName = keyof typeof TEST_PATRONS
export type TestPatron = ReturnType<typeof getTestPatron>

export const getTestPatron = (browserName: BrowserName) => ({
  ...TEST_PATRONS[browserName],
  password: process.env.QA_PASSWORD,
})
