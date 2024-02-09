export const checkouts = {
  total: 2,
  start: 0,
  entries: [
    {
      id: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/checkouts/65060571",
      patron: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/2772226",
      item: {
        id: "36633383",
        updatedDate: "2024-02-06T03:08:46Z",
        createdDate: "2018-11-19T14:01:00Z",
        deleted: false,
        bibIds: ["21678146"],
        location: {
          code: "sna9n",
          name: "Stavros Niarchos Foundation Library - Adult Non-Fiction",
        },
        status: {
          code: "-",
          display: "AVAILABLE",
          duedate: "2024-02-09T09:00:00Z",
        },
        volumes: [],
        barcode: "33333432264691",
        callNumber: "972.93 D",
      },
      dueDate: "2024-02-09T09:00:00Z",
      numberOfRenewals: 2,
      outDate: "2023-12-18T21:04:19Z",
    },
    {
      id: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/checkouts/65060570",
      patron: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/2772226",
      item: {
        id: "40648363",
        updatedDate: "2024-02-06T03:08:50Z",
        createdDate: "2023-12-06T21:11:00Z",
        deleted: false,
        bibIds: ["17699134"],
        location: {
          code: "sna4l",
          name: "Stavros Niarchos Foundation Library - Adult World Language",
        },
        status: {
          code: "-",
          display: "AVAILABLE",
          duedate: "2024-02-09T09:00:00Z",
        },
        volumes: [],
        barcode: "33333455520789",
        callNumber: "Spa FIC ALVAREZ",
      },
      dueDate: "2024-02-09T09:00:00Z",
      numberOfRenewals: 2,
      outDate: "2023-12-18T21:04:18Z",
    },
  ],
}

export const patron = {
  id: 2772226,
  names: ["KAHN, VERA RUTH"],
  barcodes: ["23333121538324"],
  expirationDate: "2025-03-28",
  emails: ["veraruthkahn@gmail.com", "veggievera@gmail.com"],
  homeLibrary: {
    code: "sn",
    name: "Stavros Niarchos Foundation Library (SNFL)",
  },
  phones: [
    {
      number: "646-660-0432",
      type: "t",
    },
  ],
}

export const holdBibs = {
  total: 1,
  start: 0,
  entries: [
    {
      id: "22002760",
      updatedDate: "2024-02-06T12:15:43Z",
      createdDate: "2019-10-16T16:18:33Z",
      deleted: false,
      suppressed: false,
      isbn: "9781984825056",
      lang: {
        code: "eng",
        name: "English",
      },
      title:
        "Quit like a woman : the radical choice to not drink in a culture obsessed with alcohol",
      author: "Whitaker, Holly, author.",
      materialType: {
        code: "a  ",
        value: "BOOK/TEXT",
      },
      bibLevel: {
        code: "m",
        value: "MONOGRAPH",
      },
      publishYear: 2019,
      catalogDate: "2019-12-20",
      country: {
        code: "nyu",
        name: "New York (State)",
      },
      callNumber: "616.861 W",
      varFields: [
        {
          fieldTag: "a",
          marcTag: "100",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Whitaker, Holly,",
            },
            {
              tag: "e",
              content: "author.",
            },
          ],
        },
        {
          fieldTag: "c",
          marcTag: "091",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "616.861",
            },
            {
              tag: "c",
              content: "W",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "650",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Women alcoholics",
            },
            {
              tag: "x",
              content: "Rehabilitation.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "650",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Women drug addicts",
            },
            {
              tag: "x",
              content: "Rehabilitation.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "650",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Twelve-step programs.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "650",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Male domination (Social structure).",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "650",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Social control.",
            },
          ],
        },
        {
          fieldTag: "e",
          marcTag: "250",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "First edition.",
            },
          ],
        },
        {
          fieldTag: "i",
          marcTag: "020",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "9781984825056",
            },
          ],
        },
        {
          fieldTag: "i",
          marcTag: "020",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "1984825054",
            },
          ],
        },
        {
          fieldTag: "l",
          marcTag: "010",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "  2019029710",
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "504",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Includes bibliographical references (pages 333-351).",
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "520",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content:
                '"For years, Holly Whitaker wore her workaholic-party-girl persona as a badge of honor, while privately feeling increasingly miserable. She believed that if she could just eat cleaner, save more money, and be more perfect, her life would finally snap into place. Yet all of her attempts to fix herself just added up to more chaos and the chaos added up to more pain and so she added more wine. When she finally had enough and started looking around for help, she was shocked to find that the only systems in place to support her quitting drinking were archaic, patriarchal, and ineffective for the unique needs of women. The Alcoholics Anonymous model focused on strict anonymity, making the ego the enemy, and surrendering power, voice, and agency to a male concept of God. But Holly instinctively knew that what she needed was a deeper understanding of her own identity, the courage to take control of her own life, and to be embraced by a supportive and vocal community. What\'s more, she could not ignore the ways that alcohol companies were targeting women, just as the tobacco industry had successfully done generations before. Holly became resolute--not only did she have to find her way out of her own addiction, she felt a calling to create something bigger, so that women anywhere on the drinking continuum might find their way as well. The result is her company, Tempest, which provides the education to address the root cause of addiction, the tools to break the cycle of addiction, and the community necessary to build a life free from alcohol. Written in a unique voice that is relatable, honest, and witty, Quit Like a Woman is a groundbreaking look at the insidious role alcohol plays in our lives. Holly offers up a clear-eyed recovery model that banishes the punitive approach to quitting espoused by male-centric programs like AA and provides a positive alternative to living our best lives without the crutch of intoxication. Holly details what makes us sick, keeps us out of our power, and what is possible when we remove alcohol and destroy our belief system around it"--',
            },
            {
              tag: "c",
              content: "Provided by publisher.",
            },
          ],
        },
        {
          fieldTag: "o",
          marcTag: "001",
          ind1: " ",
          ind2: " ",
          content: "  2019029710",
        },
        {
          fieldTag: "p",
          marcTag: "264",
          ind1: " ",
          ind2: "1",
          subfields: [
            {
              tag: "a",
              content: "New York :",
            },
            {
              tag: "b",
              content: "The Dial Press,",
            },
            {
              tag: "c",
              content: "[2019]",
            },
          ],
        },
        {
          fieldTag: "r",
          marcTag: "300",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "351 pages ;",
            },
            {
              tag: "c",
              content: "22 cm",
            },
          ],
        },
        {
          fieldTag: "r",
          marcTag: "336",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "text",
            },
            {
              tag: "b",
              content: "txt",
            },
            {
              tag: "2",
              content: "rdacontent",
            },
          ],
        },
        {
          fieldTag: "r",
          marcTag: "337",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "unmediated",
            },
            {
              tag: "b",
              content: "n",
            },
            {
              tag: "2",
              content: "rdamedia",
            },
          ],
        },
        {
          fieldTag: "r",
          marcTag: "338",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "volume",
            },
            {
              tag: "b",
              content: "nc",
            },
            {
              tag: "2",
              content: "rdacarrier",
            },
          ],
        },
        {
          fieldTag: "t",
          marcTag: "245",
          ind1: "1",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Quit like a woman :",
            },
            {
              tag: "b",
              content:
                "the radical choice to not drink in a culture obsessed with alcohol /",
            },
            {
              tag: "c",
              content: "Holly Whitaker.",
            },
          ],
        },
        {
          fieldTag: "w",
          marcTag: "776",
          ind1: "0",
          ind2: "8",
          subfields: [
            {
              tag: "i",
              content: "Online version:",
            },
            {
              tag: "a",
              content: "Whitaker, Holly.",
            },
            {
              tag: "t",
              content: "Quit like a woman",
            },
            {
              tag: "d",
              content: "New York : The Dial Press, [2019]",
            },
            {
              tag: "z",
              content: "9781984825063",
            },
            {
              tag: "w",
              content: "(DLC)  2019029711",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "003",
          ind1: " ",
          ind2: " ",
          content: "DLC",
        },
        {
          fieldTag: "y",
          marcTag: "005",
          ind1: " ",
          ind2: " ",
          content: "20191217084236.0",
        },
        {
          fieldTag: "y",
          marcTag: "008",
          ind1: " ",
          ind2: " ",
          content: "190712s2019    nyu      b    000 0 eng  pam i ",
        },
        {
          fieldTag: "y",
          marcTag: "040",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "DLC",
            },
            {
              tag: "b",
              content: "eng",
            },
            {
              tag: "e",
              content: "rda",
            },
            {
              tag: "c",
              content: "DLC",
            },
            {
              tag: "d",
              content: "IMmBT",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "042",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "pcc",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "050",
          ind1: "0",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "HV5278",
            },
            {
              tag: "b",
              content: ".W55 2019",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "908",
          ind1: "0",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "HV5278",
            },
            {
              tag: "b",
              content: ".W55 2019",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "069",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "09385082",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "082",
          ind1: "0",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "616.86/1",
            },
            {
              tag: "2",
              content: "23",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "901",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "LEASED",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "945",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: ".b22002760a",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "910",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "BL",
            },
          ],
        },
        {
          fieldTag: "_",
          content: "00000pam a2200457 i 4500",
        },
      ],
    },
  ],
}

export const checkoutBibs = {
  total: 2,
  start: 0,
  entries: [
    {
      id: "17699134",
      updatedDate: "2024-02-09T13:39:24Z",
      createdDate: "2008-12-24T00:30:42Z",
      deleted: false,
      suppressed: false,
      isbn: "0452286867",
      lang: {
        code: "spa",
        name: "Spanish",
      },
      title: "En el tiempo de las mariposas",
      author: "Alvarez, Julia.",
      materialType: {
        code: "a  ",
        value: "BOOK/TEXT",
      },
      bibLevel: {
        code: "m",
        value: "MONOGRAPH",
      },
      publishYear: 2005,
      catalogDate: "2012-09-24",
      country: {
        code: "nyu",
        name: "New York (State)",
      },
      callNumber: "Spa FIC ALVAREZ",
      varFields: [
        {
          fieldTag: "a",
          marcTag: "100",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Alvarez, Julia.",
            },
          ],
        },
        {
          fieldTag: "c",
          marcTag: "091",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "p",
              content: "Spa",
            },
            {
              tag: "a",
              content: "FIC",
            },
            {
              tag: "c",
              content: "ALVAREZ",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "651",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Dominican Republic",
            },
            {
              tag: "x",
              content: "History",
            },
            {
              tag: "y",
              content: "1930-1961",
            },
            {
              tag: "v",
              content: "Fiction.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "600",
          ind1: "1",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Mirabal, Mara Teresa,",
            },
            {
              tag: "d",
              content: "1935-1960",
            },
            {
              tag: "v",
              content: "Fiction.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "600",
          ind1: "1",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Mirabal, Minerva,",
            },
            {
              tag: "d",
              content: "1926-1960",
            },
            {
              tag: "v",
              content: "Fiction.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "600",
          ind1: "1",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Mirabal, Patria,",
            },
            {
              tag: "d",
              content: "1924-1960",
            },
            {
              tag: "v",
              content: "Fiction.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "650",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Women revolutionaries",
            },
            {
              tag: "z",
              content: "Dominican Republic",
            },
            {
              tag: "v",
              content: "Fiction.",
            },
          ],
        },
        {
          fieldTag: "i",
          marcTag: "020",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "0452286867 (pbk.)",
            },
          ],
        },
        {
          fieldTag: "i",
          marcTag: "020",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "9780452286863 (pbk.)",
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "500",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Translation of: In the time of the butterflies.",
            },
          ],
        },
        {
          fieldTag: "o",
          marcTag: "001",
          ind1: " ",
          ind2: " ",
          content: "63192054 ",
        },
        {
          fieldTag: "p",
          marcTag: "260",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "New York :",
            },
            {
              tag: "b",
              content: "Plume,",
            },
            {
              tag: "c",
              content: "2005.",
            },
          ],
        },
        {
          fieldTag: "r",
          marcTag: "300",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "427 p. ;",
            },
            {
              tag: "c",
              content: "20 cm.",
            },
          ],
        },
        {
          fieldTag: "t",
          marcTag: "245",
          ind1: "1",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "En el tiempo de las mariposas /",
            },
            {
              tag: "c",
              content: "Julia Alvarez ; [traduccin, Rolando Costa Picazo].",
            },
          ],
        },
        {
          fieldTag: "v",
          marcTag: "995",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "2549147",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "003",
          ind1: " ",
          ind2: " ",
          content: "OCoLC",
        },
        {
          fieldTag: "y",
          marcTag: "005",
          ind1: " ",
          ind2: " ",
          content: "20071023153122.0",
        },
        {
          fieldTag: "y",
          marcTag: "008",
          ind1: " ",
          ind2: " ",
          content: "060130s2005    nyu           000 1 spa dcamIa ",
        },
        {
          fieldTag: "y",
          marcTag: "040",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "WIA",
            },
            {
              tag: "c",
              content: "WIA",
            },
            {
              tag: "d",
              content: "BAKER",
            },
            {
              tag: "d",
              content: "LNQ",
            },
            {
              tag: "d",
              content: "BTCTA",
            },
            {
              tag: "d",
              content: "BNY",
            },
            {
              tag: "d",
              content: "UtOrBLW",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "041",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "spa",
            },
            {
              tag: "h",
              content: "eng",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "043",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "nwdr---",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "050",
          ind1: "1",
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "PS3551.L845",
            },
            {
              tag: "b",
              content: "I518 2005",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "908",
          ind1: "1",
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "PS3551.L845",
            },
            {
              tag: "b",
              content: "I518 2005",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "082",
          ind1: "0",
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "813./54",
            },
            {
              tag: "2",
              content: "22",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "901",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "BTCLSD120924B",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "945",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: ".o15869118",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "901",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "jmd",
            },
            {
              tag: "a",
              content: "MARS",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "996",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "(OCoLC)63192054",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "910",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "BL",
            },
          ],
        },
        {
          fieldTag: "_",
          content: "00000cam  2200361Ia 4500",
        },
      ],
    },
    {
      id: "21678146",
      updatedDate: "2024-01-06T19:03:27Z",
      createdDate: "2018-10-22T13:47:11Z",
      deleted: false,
      suppressed: false,
      isbn: "9780822356882",
      lang: {
        code: "eng",
        name: "English",
      },
      title: "The Dominican Republic reader : history, culture, politics",
      author: "",
      materialType: {
        code: "a  ",
        value: "BOOK/TEXT",
      },
      bibLevel: {
        code: "m",
        value: "MONOGRAPH",
      },
      publishYear: 2014,
      catalogDate: "2018-10-23",
      country: {
        code: "ncu",
        name: "North Carolina",
      },
      callNumber: "972.93 D",
      varFields: [
        {
          fieldTag: "b",
          marcTag: "700",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Roorda, Eric.",
            },
          ],
        },
        {
          fieldTag: "b",
          marcTag: "700",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Derby, Lauren.",
            },
          ],
        },
        {
          fieldTag: "b",
          marcTag: "700",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "González, Raymundo.",
            },
          ],
        },
        {
          fieldTag: "c",
          marcTag: "091",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "972.93",
            },
            {
              tag: "c",
              content: "D",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "651",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Dominican Republic",
            },
            {
              tag: "x",
              content: "Civilization.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "651",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Dominican Republic",
            },
            {
              tag: "x",
              content: "History.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "651",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Dominican Republic",
            },
            {
              tag: "x",
              content: "Social life and customs.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "650",
          ind1: " ",
          ind2: "7",
          subfields: [
            {
              tag: "a",
              content: "Civilization.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst00862898",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "650",
          ind1: " ",
          ind2: "7",
          subfields: [
            {
              tag: "a",
              content: "Manners and customs.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01007815",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "651",
          ind1: " ",
          ind2: "7",
          subfields: [
            {
              tag: "a",
              content: "Dominican Republic.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01206148",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "655",
          ind1: " ",
          ind2: "7",
          subfields: [
            {
              tag: "a",
              content: "History.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01411628",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "655",
          ind1: " ",
          ind2: "7",
          subfields: [
            {
              tag: "a",
              content: "History.",
            },
            {
              tag: "2",
              content: "lcgft",
            },
          ],
        },
        {
          fieldTag: "i",
          marcTag: "020",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "9780822356882",
            },
            {
              tag: "q",
              content: "(cloth ;",
            },
            {
              tag: "q",
              content: "alk. paper)",
            },
          ],
        },
        {
          fieldTag: "i",
          marcTag: "020",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "0822356880",
            },
            {
              tag: "q",
              content: "(cloth ;",
            },
            {
              tag: "q",
              content: "alk. paper)",
            },
          ],
        },
        {
          fieldTag: "i",
          marcTag: "020",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "9780822357001",
            },
            {
              tag: "q",
              content: "(pbk. ;",
            },
            {
              tag: "q",
              content: "alk. paper)",
            },
          ],
        },
        {
          fieldTag: "i",
          marcTag: "020",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "0822357003",
            },
            {
              tag: "q",
              content: "(pbk. ;",
            },
            {
              tag: "q",
              content: "alk. paper)",
            },
          ],
        },
        {
          fieldTag: "l",
          marcTag: "010",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "  2013047598",
            },
          ],
        },
        {
          fieldTag: "l",
          marcTag: "035",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "(OCoLC)859044888",
            },
            {
              tag: "z",
              content: "(OCoLC)859044890",
            },
            {
              tag: "z",
              content: "(OCoLC)886627775",
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "504",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Includes bibliographical references and index.",
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "505",
          ind1: "0",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content:
                "European encounters -- The people who greeted Columbus / Irving Rouse -- Religion of the Taíno people / Ramón Pané -- First descriptions of the land, first violence against its people / Christopher Columbus -- Death of the Spanish at Navidad / Diego Alvarez Chanca -- The first Christian converts and martyrs in the new world / Ramón Pané -- Founding Santo Domingo / Antonio de Herrera y Tordesillas -- The Indian monarchs / Luís Joseph Peguero -- Criminals as kings / Bartolomé de Las Casas -- A voice in the wilderness: brother Antonio Montesino / Bartolomé de Las Casas -- The Royal response / Ferdinand I -- Pirates, governors, and slaves -- Las Casas blamed for the African slave trade / Augustus Francis MacNutt -- The slave problem in Santo Domingo / Alvaro de Castro -- Lemba and the Maroons of Hispaniola / Alonso López de Cerrato -- Francis Drake's sacking of Santo Domingo / Walter Bigges -- Colonial delinquency / Carlos Esteban Deive -- The bulls / Flérida de Nolasco -- The buccaneers of Hispaniola / Alexander O. Exquemelin -- Business deals with the buccaneers / Jean-Baptiste Labat -- The idea of value on Hispaniola / Antonio Sánchez Valverde -- Revolutions -- The monteros and the guerreros / Manuel Vicente Hernández González -- The border Maroons of Le Maniel / Médéric Louis Élie Moreau de Saint-Méry -- The people-eater / Raymundo González -- The Boca Nigua revolt / David Patrick Geggus -- Hayti and San Domingo / James Franklin -- Toussaint's conquest / Jonathan Brown -- After the war, tertulias / William Walton Jr. -- Stupid Spain / Carlos Urrutia de Montoya -- The Dominican bolívar / José Nuñez de Cáceres -- Profane bell bottoms / César Nicolás Penson -- Dominicans unite! / La Trinitaria -- Caudillos and empires -- Pedro Santana / Miguel Ángel Monclús -- The caudillo of the South / Buenaventura Báez -- In the army camp at Bermejo / Pedro Francisco Bonó",
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "505",
          ind1: "0",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content:
                'The war of the restoration / Carlos Vargas -- Spanish recolonization: a postmortem, US Commission of Inquiry to Santo Domingo -- Making the case for US annexation / Ulysses S. Grant -- Dominican support for annexation, US Commission of Inquiry to Santo Domingo -- Opposition to US annexation / Justin S. Morrill -- Dominican nationalism versus annexation / Gregorio Luperón -- A lesson in "quiet good-breeding" / Samuel Hazard -- Martí\'s travel notes / José Martí -- Ulises "Lilís" Heureaux / Américo Lugo -- Your friend, Ulises / Ulises Heureaux -- The idea of the nation: order and progress -- Street people and godparents / Luis Emilio Gómez Alfau -- From Paris to Santo Domingo / Francisco Moscoso Puello -- Public enemies: the revolutionary and the pig / Emiliano Tejera -- The "master of décimas" / Juan Antonio Alix -- Barriers to progress: revolutions, diseases, holidays, and cockfights / Pedro Francisco Bonó -- Food, race, and nation / Lauren Derby -- Tobacco to the rescue / Pedro Francisco Bonó -- Patrons, peasants, and tobacco / Michiel Baud -- Salomé, Salomé / Ureña de Henríquez -- The case for commerce, 1907, Dominican Department of Promotion and public works -- Dollars, gunboats, and bullets -- Uneasiness about the US Government / Emiliano Tejera.',
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "505",
          ind1: "0",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content:
                'In the midst of revolution, US receivership of Dominican customs -- Gavilleros, listín diario -- A resignation and a machine gun / Frederic Wise and Meigs O. Frost -- The "water torture" and other abuses, US senate, hearings before a select committee on Haiti and Santo Domingo -- The land of bullet holes / Harry Franck -- American sugar kingdom / César J. Ayala -- The universal negro improvement association in San Pedro de Macorís, officers and members of the association -- The crime of Wilson / Fabio Fiallo -- The era of Trujillo -- The Haitian massacre / Eyewitnesses -- Message to Dominican women / Darío Contreras -- The sugar strike of 1946 / Roberto Cassá -- Informal resistance on a Dominican sugar plantation / Catherine C. LeGrand -- Biography of a great leader / Abelardo Nanita -- A diplomat\'s diagnosis of the dictator / Richard A. Johnson -- A British view of the dictatorship / W.W. McVittie -- Exile invasions, anonymous / Armed Forces Magazine -- I am Minerva! / Mu-Kien Adriana Sang -- The long transition to democracy -- "Basta ya!": a peasant woman speaks out / Aurora Rosado -- Without begging god / Joaquín Balaguer -- The masters / Juan Bosch -- The rise and demise of democracy, CIA reports, 1961-1963 -- "Ni mató, ni robó" / Juan Bosch -- Fashion police / Elías Wessin y Wessin -- The revolution of the Magi / José Francisco Peña Gómez -- United States intervention in the revolution of 1965 / William Bennett -- The president of the United States chooses the next president of the Dominican Republic / Lyndon Johnson -- Operation power pack / Lawrence A. Yates -- The twelve years / CIA Special Report.',
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "505",
          ind1: "0",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content:
                'Why not, Dr. Balaguer? / Orlando Martínez -- Dominican, cut the cane! / State Sugar Council -- The blind caudillo / Anonymous -- The "eat alones" of the liberation party / Andres L. Mateo -- The election of 2000 / Central Election Commission -- The sour taste of US-Dominican sugar policy / Matt Peterson -- Leonel, Fidel, and Barack, Leonel Fernández, Fidel Castro, and Barack Obama -- Religious practices -- Mercedes / Flérida de Nolasco -- Altagracia / Anonymous -- The Catholic bishops say no to the dictator, the five bishops of the Dominican Republic -- Liberation theology / Octavio A. Beras -- To die in Villa Mella / Carlos Hernández Soto -- A tire blowout gives entry into the world of spiritism / Martha Ellen Davis -- Díos Olivorio Mateo: the living god, interview with Irio Leonel Ramírez López -- Jesus is calling you / Frances Jane "Fanny" Crosby -- Popular culture -- Carnival and holy week / Luis Emilio Gómez Alfau -- Tribulations of Dominican racial identity / Silvio Torres-Saillant -- Origins of merengue and musical instruments of the republic / J.M. Coopersmith -- Dominican music on the world stage: Eduardo Brito / Arístides Incháustegui -- The people call all of it merengue / Johnny Ventura -- A bachata party / Julio Arzeno -- The tiger / Rafael Damirón -- La montería: the hunt for wild pigs and goats / Martha Ellen Davis -- Everyday life in a poor barrio / Tahira Vargas -- The name is the same as the person / José Labourt -- Juan Luis Guerra: I hope it rains ... / Eric Paul Roorda -- The Dominican diaspora -- The first immigrant to Manhattan, 1613: Jan Rodrigues / Crew Members of the Jonge Tobias and Fortuyn -- Player to be named later: Osvaldo/Ossie/Ozzie Virgil / First Dominican Major-Leaguer / Enrique Rojas -- The Dominican dandy: Juan Marichal / Rob Ruck -- The queen of merengue / Milly Quezada -- Dominican hip-hop in Spain / Arianna Puello -- Black women are confusing, but the hair lets you know / Ginetta Candelario -- Los Domincanyorks / Luis Guarnizo -- The Yola / Milagros Ricourt -- The Dominican who won the Kentucky Derby / Joel Rosario -- You know you\'re Dominican? / Anonymous.',
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "520",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content:
                "\"Despite its significance in the history of Spanish colonialism, the Dominican Republic is familiar to most outsiders through only a few elements of its past and culture. Non-Dominicans may be aware that the country shares the island of Hispaniola with Haiti and that it is where Christopher Columbus chose to build a colony. Some may know that the country produces talented baseball players and musicians; others that it is a prime destination for beach vacations. Little else about the Dominican Republic is common knowledge outside its borders. This Reader seeks to change that. It provides an introduction to the history, politics, and culture of the country, from precolonial times into the early twenty-first century. Among the volume's 118 selections are essays, speeches, journalism, songs, poems, legal documents, testimonials, and short stories, as well as several interviews conducted especially for this Reader. Many of the selections have been translated into English for the first time. All of them are preceded by brief introductions written by the editors. The volume's eighty-five illustrations, ten of which appear in color, include maps, paintings, and photos of architecture, statues, famous figures, and Dominicans going about their everyday lives.\"",
            },
            {
              tag: "c",
              content: "--Amazon.",
            },
          ],
        },
        {
          fieldTag: "o",
          marcTag: "001",
          ind1: " ",
          ind2: " ",
          content: "859044888",
        },
        {
          fieldTag: "p",
          marcTag: "264",
          ind1: " ",
          ind2: "1",
          subfields: [
            {
              tag: "a",
              content: "Durham ;",
            },
            {
              tag: "a",
              content: "London :",
            },
            {
              tag: "b",
              content: "Duke University Press,",
            },
            {
              tag: "c",
              content: "2014.",
            },
          ],
        },
        {
          fieldTag: "r",
          marcTag: "300",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "xv, 536 pages, 8 unnumbered pages of plates :",
            },
            {
              tag: "b",
              content: "illustrations, maps ;",
            },
            {
              tag: "c",
              content: "24 cm",
            },
          ],
        },
        {
          fieldTag: "r",
          marcTag: "336",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "text",
            },
            {
              tag: "b",
              content: "txt",
            },
            {
              tag: "2",
              content: "rdacontent",
            },
          ],
        },
        {
          fieldTag: "r",
          marcTag: "337",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "unmediated",
            },
            {
              tag: "b",
              content: "n",
            },
            {
              tag: "2",
              content: "rdamedia",
            },
          ],
        },
        {
          fieldTag: "r",
          marcTag: "338",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "volume",
            },
            {
              tag: "b",
              content: "nc",
            },
            {
              tag: "2",
              content: "rdacarrier",
            },
          ],
        },
        {
          fieldTag: "s",
          marcTag: "490",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "The latin america readers",
            },
          ],
        },
        {
          fieldTag: "s",
          marcTag: "830",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Latin America readers.",
            },
          ],
        },
        {
          fieldTag: "t",
          marcTag: "245",
          ind1: "0",
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "The Dominican Republic reader :",
            },
            {
              tag: "b",
              content: "history, culture, politics /",
            },
            {
              tag: "c",
              content:
                "Eric Paul Roorda, Lauren Derby, and Raymundo González, editors.",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "003",
          ind1: " ",
          ind2: " ",
          content: "OCoLC",
        },
        {
          fieldTag: "y",
          marcTag: "005",
          ind1: " ",
          ind2: " ",
          content: "20181023121243.0",
        },
        {
          fieldTag: "y",
          marcTag: "008",
          ind1: " ",
          ind2: " ",
          content: "131202s2014    ncuabf   b    001 0 eng ccam i ",
        },
        {
          fieldTag: "y",
          marcTag: "016",
          ind1: "7",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "016760824",
            },
            {
              tag: "2",
              content: "Uk",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "019",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "859044890",
            },
            {
              tag: "a",
              content: "886627775",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "040",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "NcD/DLC",
            },
            {
              tag: "b",
              content: "eng",
            },
            {
              tag: "e",
              content: "rda",
            },
            {
              tag: "c",
              content: "NDD",
            },
            {
              tag: "d",
              content: "DLC",
            },
            {
              tag: "d",
              content: "STF",
            },
            {
              tag: "d",
              content: "YDXCP",
            },
            {
              tag: "d",
              content: "BTCTA",
            },
            {
              tag: "d",
              content: "BDX",
            },
            {
              tag: "d",
              content: "GK8",
            },
            {
              tag: "d",
              content: "UPP",
            },
            {
              tag: "d",
              content: "UKMGB",
            },
            {
              tag: "d",
              content: "WEX",
            },
            {
              tag: "d",
              content: "CDX",
            },
            {
              tag: "d",
              content: "NYP",
            },
            {
              tag: "d",
              content: "OCLCF",
            },
            {
              tag: "d",
              content: "CHVBK",
            },
            {
              tag: "d",
              content: "JYJ",
            },
            {
              tag: "d",
              content: "ZLM",
            },
            {
              tag: "d",
              content: "OCLCQ",
            },
            {
              tag: "d",
              content: "S3O",
            },
            {
              tag: "d",
              content: "OVY",
            },
            {
              tag: "d",
              content: "OCLCA",
            },
            {
              tag: "d",
              content: "OCLCQ",
            },
            {
              tag: "d",
              content: "PVW",
            },
            {
              tag: "d",
              content: "IOG",
            },
            {
              tag: "d",
              content: "VTS",
            },
            {
              tag: "d",
              content: "GILDS",
            },
            {
              tag: "d",
              content: "NJB",
            },
            {
              tag: "d",
              content: "UOK",
            },
            {
              tag: "d",
              content: "ZHM",
            },
            {
              tag: "d",
              content: "DEHBZ",
            },
            {
              tag: "d",
              content: "PAU",
            },
            {
              tag: "d",
              content: "NAM",
            },
            {
              tag: "d",
              content: "SNN",
            },
            {
              tag: "d",
              content: "PEX",
            },
            {
              tag: "d",
              content: "FMU",
            },
            {
              tag: "d",
              content: "NJR",
            },
            {
              tag: "d",
              content: "JDP",
            },
            {
              tag: "d",
              content: "VAN",
            },
            {
              tag: "d",
              content: "YDX",
            },
            {
              tag: "d",
              content: "BHL",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "042",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "pcc",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "043",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "nwdr---",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "049",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "NYPP",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "050",
          ind1: "0",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "F1935",
            },
            {
              tag: "b",
              content: ".D66 2014",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "082",
          ind1: "0",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "972.93",
            },
            {
              tag: "2",
              content: "23",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "901",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "MARS",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "908",
          ind1: "0",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "F1935",
            },
            {
              tag: "b",
              content: ".D66 2014",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "901",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "kts",
            },
            {
              tag: "b",
              content: "CATBL",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "901",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "wch",
            },
            {
              tag: "b",
              content: "CATBL",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "945",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: ".o24989009",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "946",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "m",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "910",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "BL",
            },
          ],
        },
        {
          fieldTag: "_",
          content: "00000cam a2200625 i 4500",
        },
      ],
    },
  ],
}

export const holds = {
  total: 1,
  start: 0,
  entries: [
    {
      id: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/holds/48636910",
      record: {
        id: "37603650",
        updatedDate: "2024-02-07T12:14:57Z",
        createdDate: "2019-12-26T19:28:13Z",
        deleted: false,
        bibIds: ["22002760"],
        location: {
          code: "tha0n",
          name: "Todt Hill-Westerleigh Non-Fiction",
        },
        status: {
          code: "!",
          display: "ON HOLDSHELF",
        },
        volumes: [],
        barcode: "33333857749226",
        callNumber: "616.861 W",
      },
      patron: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/2772226",
      frozen: false,
      pickupByDate: "2024-02-15T09:00:00Z",
      pickupLocation: {
        code: "sn",
        name: "SNFL (formerly Mid-Manhattan)",
      },
      status: {
        code: "i",
        name: "Requested item ready for pickup.",
      },
      canFreeze: false,
    },
  ],
}
