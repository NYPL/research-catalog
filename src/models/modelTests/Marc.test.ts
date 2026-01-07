import {
  classicMarcResult,
  everythingMarcResult,
} from "../../../__test__/fixtures/marcFixtures"
import MarcModel from "../Marc"

describe("Marc model", () => {
  const everythingMarcModel = new MarcModel(everythingMarcResult)
  const classicMarcModel = new MarcModel(classicMarcResult)

  it("has expected leader", () => {
    expect(classicMarcModel.leader).toStrictEqual({
      content: "00000cam  2200505I  4500",
    })
  })
  it("has expected control fields in ascending order", () => {
    expect(classicMarcModel.controlFields).toStrictEqual([
      { marcTag: "001", content: "2386894" },
      { marcTag: "003", content: "OCoLC" },
      { marcTag: "005", content: "20000629191647.0" },
      {
        marcTag: "008",
        content: "760820m18881906nyuaf         000 0 eng  camI  ",
      },
    ])
  })
  it("has formatted data fields in ascending order", () => {
    expect(classicMarcModel.dataFields).toStrictEqual([
      {
        ind1: "_",
        ind2: "_",
        content: null,
        marcTag: "010",
        fieldTag: "l",
        subfields: [{ tag: "|a", content: "06024910" }],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "100",
        fieldTag: "a",
        subfields: [
          { tag: "|a", content: "Shakespeare, William," },
          { tag: "|d", content: "1564-1616." },
        ],
      },

      {
        ind1: "0",
        ind2: "4",
        content: null,
        marcTag: "245",
        fieldTag: "t",
        subfields: [
          {
            tag: "|a",
            content:
              "The comedies, histories, and tragedies of Mr. William Shakespeare as presented at the Globe and Blackfriars theatres, circa 1591-1623;",
          },
          {
            tag: "|b",
            content:
              "being the text furnished the players, in parallel pages with the first revised folio text, with critical introductions.",
          },
        ],
      },

      {
        ind1: "_",
        ind2: "_",
        content: null,
        marcTag: "250",
        fieldTag: "e",
        subfields: [
          { tag: "|a", content: "The Bankside Shakespeare," },
          { tag: "|b", content: "ed. by Appleton Morgan." },
        ],
      },

      {
        ind1: "_",
        ind2: "_",
        content: null,
        marcTag: "260",
        fieldTag: "p",
        subfields: [
          { tag: "|a", content: "New York," },
          { tag: "|b", content: "The Shakespeare Society of New York" },
          { tag: "|c", content: "[1888] 1906 [v. 21, 1906]" },
        ],
      },

      {
        ind1: "_",
        ind2: "_",
        content: null,
        marcTag: "300",
        fieldTag: "r",
        subfields: [
          { tag: "|a", content: "22 v." },
          { tag: "|b", content: "front (v. 15) illus., fold. plates." },
          { tag: "|c", content: "23 cm." },
        ],
      },

      {
        ind1: "_",
        ind2: "_",
        content: null,
        marcTag: "500",
        fieldTag: "n",
        subfields: [
          {
            tag: "|a",
            content: "Limited edition of 500 volumes.  This set no. 255.",
          },
        ],
      },

      {
        ind1: "_",
        ind2: "_",
        content: null,
        marcTag: "500",
        fieldTag: "n",
        subfields: [
          { tag: "|a", content: "Each volume has also a special t.-p." },
        ],
      },

      {
        ind1: "_",
        ind2: "_",
        content: null,
        marcTag: "500",
        fieldTag: "n",
        subfields: [
          {
            tag: "|a",
            content:
              'Title of v. 22 reads: The comedies ... of ... Shakespeare ... being the first revised folio text of 1623, in parallel pages with the "Globe" text, with critical introductions. A sequel to the Bankside Shakespeare ... 1894.',
          },
        ],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "590",
        fieldTag: "n",
        subfields: [{ tag: "|a", content: "Shakespeare Soc. of N.Y." }],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [
          { tag: "|a", content: "Morgan, Appleton," },
          { tag: "|d", content: "1845-1928." },
        ],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [
          { tag: "|a", content: "Frey, Albert R." },
          { tag: "|q", content: "(Albert Romer)," },
          { tag: "|d", content: "1858-1926." },
        ],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [
          { tag: "|a", content: "Reynolds, William," },
          { tag: "|d", content: "1842-" },
        ],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [
          { tag: "|a", content: "Field, Benjamin Rush," },
          { tag: "|d", content: "1861-1935." },
        ],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [
          { tag: "|a", content: "Fleming, William Hansell," },
          { tag: "|d", content: "1844-1915." },
        ],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [
          { tag: "|a", content: "Price, Thomas R." },
          { tag: "|q", content: "(Thomas Randolph)," },
          { tag: "|d", content: "1839-1903." },
        ],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [
          { tag: "|a", content: "Adee, Alvey A." },
          { tag: "|q", content: "(Alvey Augustus)," },
          { tag: "|d", content: "1842-1924." },
        ],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [
          { tag: "|a", content: "Vining, Edward Payson," },
          { tag: "|d", content: "1847-1920." },
        ],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [{ tag: "|a", content: "Calkins, Elias A." }],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [
          { tag: "|a", content: "Stokes, H. P." },
          { tag: "|q", content: "(Henry Paine)," },
          { tag: "|d", content: "1849-1931." },
        ],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [{ tag: "|a", content: "Waites, Alfred." }],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [{ tag: "|a", content: "Thomas, Chas. W." }],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "700",
        fieldTag: "b",
        subfields: [
          { tag: "|a", content: "Platt, Isaac Hull," },
          { tag: "|d", content: "1853-1912." },
        ],
      },

      {
        ind1: "2",
        ind2: "_",
        content: null,
        marcTag: "710",
        fieldTag: "b",
        subfields: [{ tag: "|a", content: "Shakespeare Society of New York." }],
      },

      {
        ind1: "1",
        ind2: "_",
        content: null,
        marcTag: "800",
        fieldTag: "s",
        subfields: [
          { tag: "|a", content: "Shakespeare, William," },
          { tag: "|d", content: "1564-1616." },
          { tag: "|t", content: "Plays (Shakespeare Society of New York)" },
        ],
      },

      {
        ind1: "8",
        ind2: "_",
        content: null,
        marcTag: "852",
        fieldTag: "c",
        subfields: [
          {
            tag: "|h",
            content:
              "*NCM (Bankside) (Shakespeare, W. Collected works. 1888-1906. Comedies, histories, and tragedies)",
          },
        ],
      },

      {
        ind1: "8",
        ind2: "_",
        content: null,
        marcTag: "852",
        fieldTag: "q",
        subfields: [
          {
            tag: "|h",
            content:
              "*NCM (Bankside) (Shakespeare, W. Collected works. 1888-1906. Comedies, histories, and tragedies)",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://hdl.handle.net/2027/nyp.33433089902252",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://hdl.handle.net/2027/nyp.33433089902468",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://hdl.handle.net/2027/nyp.33433089902427",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://hdl.handle.net/2027/nyp.33433089902385",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://hdl.handle.net/2027/nyp.33433089902344",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://hdl.handle.net/2027/nyp.33433089902302",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://hdl.handle.net/2027/nyp.33433089909547",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://hdl.handle.net/2027/nyp.33433089902260",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://hdl.handle.net/2027/nyp.33433089902229",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://hdl.handle.net/2027/nyp.33433089902351",
          },
        ],
      },

      {
        ind1: "4",
        ind2: "1",
        content: null,
        marcTag: "856",
        fieldTag: "y",
        subfields: [
          {
            tag: "|u",
            content: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433074894290",
          },
        ],
      },

      {
        ind1: "_",
        ind2: "_",
        content: null,
        marcTag: "959",
        fieldTag: "v",
        subfields: [
          { tag: "|a", content: ".b50489380" },
          { tag: "|b", content: "08-16-07" },
          { tag: "|c", content: "02-03-98" },
        ],
      },
    ])
  })
})
