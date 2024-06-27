import type { FixedField } from "../../src/types/myAccountTypes"

export const pickupLocations = [
  {
    code: "ft   ",
    name: "53rd Street",
  },
  {
    code: "fe   ",
    name: "58th Street",
  },
  {
    code: "ss   ",
    name: "67th Street",
  },
  {
    code: "ns   ",
    name: "96th Street (CLOSING 7/11)",
  },
  {
    code: "ag   ",
    name: "Aguilar",
  },
  {
    code: "al   ",
    name: "Allerton",
  },
  {
    code: "lb   ",
    name: "Andrew Heiskell",
  },
  {
    code: "bt   ",
    name: "Battery Park",
  },
  {
    code: "ba   ",
    name: "Baychester",
  },
  {
    code: "be   ",
    name: "Belmont",
  },
  {
    code: "bc   ",
    name: "Bronx Library Center",
  },
  {
    code: "cn   ",
    name: "Charleston",
  },
  {
    code: "ch   ",
    name: "Chatham Square",
  },
  {
    code: "ci   ",
    name: "City Island",
  },
  {
    code: "cp   ",
    name: "Clasons Point",
  },
  {
    code: "cs   ",
    name: "Columbus",
  },
  {
    code: "ht   ",
    name: "Countee Cullen",
  },
  {
    code: "dh   ",
    name: "Dongan Hills",
  },
  {
    code: "ea   ",
    name: "Eastchester",
  },
  {
    code: "ew   ",
    name: "Edenwald",
  },
  {
    code: "ep   ",
    name: "Epiphany",
  },
  {
    code: "fx   ",
    name: "Francis Martin",
  },
  {
    code: "gc   ",
    name: "Grand Central",
  },
  {
    code: "gd   ",
    name: "Grand Concourse",
  },
  {
    code: "gk   ",
    name: "Great Kills",
  },
  {
    code: "hg   ",
    name: "Hamilton Grange",
  },
  {
    code: "hl   ",
    name: "Harlem",
  },
  {
    code: "hu   ",
    name: "Harry Belafonte - 115th Street",
  },
  {
    code: "hb   ",
    name: "High Bridge",
  },
  {
    code: "hp   ",
    name: "Hudson Park",
  },
  {
    code: "hk   ",
    name: "Huguenot Park",
  },
  {
    code: "in   ",
    name: "Inwood",
  },
  {
    code: "jp   ",
    name: "Jerome Park",
  },
  {
    code: "kb   ",
    name: "Kingsbridge",
  },
  {
    code: "kp   ",
    name: "Kips Bay",
  },
  {
    code: "my   ",
    name: "LPA - Circulating",
  },
  {
    code: "myarv",
    name: "LPA Reserve Film and Video",
  },
  {
    code: "mb   ",
    name: "Macombs Bridge",
  },
  {
    code: "mn   ",
    name: "Mariners Harbor",
  },
  {
    code: "cl   ",
    name: "Morningside Heights",
  },
  {
    code: "mp   ",
    name: "Morris Park",
  },
  {
    code: "mr   ",
    name: "Morrisania",
  },
  {
    code: "mo   ",
    name: "Mosholu",
  },
  {
    code: "mh   ",
    name: "Mott Haven",
  },
  {
    code: "ml   ",
    name: "Mulberry Street",
  },
  {
    code: "lm   ",
    name: "New Amsterdam",
  },
  {
    code: "nd   ",
    name: "New Dorp",
  },
  {
    code: "ot   ",
    name: "Ottendorfer",
  },
  {
    code: "pk   ",
    name: "Parkchester",
  },
  {
    code: "pm   ",
    name: "Pelham Bay",
  },
  {
    code: "vn   ",
    name: "Pelham Parkway-Van Nest",
  },
  {
    code: "rt   ",
    name: "Richmondtown",
  },
  {
    code: "rd   ",
    name: "Riverdale",
  },
  {
    code: "rs   ",
    name: "Riverside",
  },
  {
    code: "ri   ",
    name: "Roosevelt Island",
  },
  {
    code: "sa   ",
    name: "Saint Agnes",
  },
  {
    code: "sg   ",
    name: "Saint George (Reopening 7/11)",
  },
  {
    code: "sd   ",
    name: "Sedgwick",
  },
  {
    code: "sn   ",
    name: "SNFL (formerly Mid-Manhattan)",
  },
  {
    code: "se   ",
    name: "Seward Park",
  },
  {
    code: "sv   ",
    name: "Soundview",
  },
  {
    code: "sb   ",
    name: "South Beach",
  },
  {
    code: "dy   ",
    name: "Spuyten Duyvil",
  },
  {
    code: "st   ",
    name: "Stapleton",
  },
  {
    code: "tg   ",
    name: "Throgs Neck",
  },
  {
    code: "th   ",
    name: "Todt Hill",
  },
  {
    code: "ts   ",
    name: "Tompkins Square",
  },
  {
    code: "tv   ",
    name: "Tottenville",
  },
  {
    code: "tm   ",
    name: "Tremont",
  },
  {
    code: "vc   ",
    name: "Van Cortlandt",
  },
  {
    code: "wk   ",
    name: "Wakefield",
  },
  {
    code: "wh   ",
    name: "Washington Heights",
  },
  {
    code: "wb   ",
    name: "Webster",
  },
  {
    code: "wf   ",
    name: "West Farms",
  },
  {
    code: "nb   ",
    name: "West New Brighton",
  },
  {
    code: "wt   ",
    name: "Westchester Square",
  },
  {
    code: "wl   ",
    name: "Woodlawn Heights",
  },
  {
    code: "wo   ",
    name: "Woodstock",
  },
  {
    code: "yv   ",
    name: "Yorkville",
  },
  {
    code: "hd   ",
    name: "125th Street (CLOSED)",
  },
  {
    code: "bl   ",
    name: "Bloomingdale (CLOSED)",
  },
  {
    code: "b1   ",
    name: "Bookmobile 1 (CLOSED)",
  },
  {
    code: "ct   ",
    name: "Castle Hill (CLOSED)",
  },
  {
    code: "fw   ",
    name: "Fort Washington (CLOSED)",
  },
  {
    code: "br   ",
    name: "George Bruce (CLOSED)",
  },
  {
    code: "hf   ",
    name: "Hamilton Fish Park (CLOSED)",
  },
  {
    code: "hs   ",
    name: "Hunt's Point (CLOSED)",
  },
  {
    code: "jm   ",
    name: "Jefferson Market (CLOSED)",
  },
  {
    code: "me   ",
    name: "Melrose (CLOSED)",
  },
  {
    code: "mu   ",
    name: "Muhlenberg (CLOSED)",
  },
  {
    code: "pr   ",
    name: "Port Richmond (CLOSED)",
  },
  {
    code: "ls   ",
    name: "Staff Only - Library Svs Ctr",
  },
  {
    code: "ed   ",
    name: "STAFF ONLY-EDULS Collection",
  },
  {
    code: "sc   ",
    name: "Schomburg Reference ONSITE USE",
  },
  {
    code: "mal  ",
    name: "Schwarzman Room 315 ONSITE USE",
  },
  {
    code: "mag  ",
    name: "Schwarzman Room 121 ONSITE USE",
  },
  {
    code: "mab  ",
    name: "Schwarzman Room 300 ONSITE USE",
  },
  {
    code: "map  ",
    name: "Schwarzman Room 117 ONSITE USE",
  },
  {
    code: "maf  ",
    name: "Schwarzman Room 111 ONSITE USE",
  },
  {
    code: "mala ",
    name: "Schwarzman Allen Room ONSITE USE",
  },
  {
    code: "malc ",
    name: "Schwarzman Cullman ONSITE USE",
  },
  {
    code: "maln ",
    name: "Schwarzman Noma Room ONSITE USE",
  },
  {
    code: "malw ",
    name: "Schwarzman Wertheim ONSITE USE",
  },
  {
    code: "mar92",
    name: "STAFF ONLY-SASB Rare Book Rm324",
  },
  {
    code: "mao92",
    name: "STAFF ONLY-SASB Manuscript Rm328",
  },
  {
    code: "mal17",
    name: "Schwarzman Room 217 ONSITE USE",
  },
  {
    code: "myr  ",
    name: "Performing Arts PDD - 3rd Fl",
  },
  {
    code: "myrs ",
    name: "Performing Arts - Spec Col Desk",
  },
  {
    code: "myaos",
    name: "STAFF ONLY - LPA ORCH",
  },
  {
    code: "rc   ",
    name: "STAFF ONLY - ACCSVC ReCAP",
  },
  {
    code: "qc   ",
    name: "STAFF ONLY - ACCSVC Clancy",
  },
  {
    code: "xfill",
    name: "STAFF ONLY - ILL - SASB S.Court",
  },
  {
    code: "rc   ",
    name: "STAFF ONLY - RESEARCH OFFSITE",
  },
  {
    code: "maedd",
    name: "STAFF ONLY - SASB EDD",
  },
  {
    code: "myedd",
    name: "STAFF ONLY - LPA EDD",
  },
  {
    code: "scedd",
    name: "STAFF ONLY - SCH EDD",
  },
]

export const checkouts = {
  total: 4,
  start: 0,
  entries: [
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/checkouts/66527401",
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/6742743",
      item: {
        id: "40506104",
        updatedDate: "2024-05-09T14:38:47Z",
        createdDate: "2023-10-04T19:13:00Z",
        deleted: false,
        bibIds: ["23129476"],
        location: {
          code: "huj0i",
          name: "Harry Belafonte - 115th Street Children's Picture Book",
        },
        status: {
          code: "-",
          display: "AVAILABLE",
          duedate: "2024-05-30T08:00:00Z",
        },
        volumes: [],
        barcode: "33333455951331",
        callNumber: "J PIC COUSINS",
      },
      dueDate: "2024-05-30T08:00:00Z",
      numberOfRenewals: 10,
      outDate: "2024-05-06T19:11:03Z",
    },
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/checkouts/66527400",
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/6742743",
      item: {
        id: "18062994",
        updatedDate: "2024-05-06T19:11:05Z",
        createdDate: "2009-02-13T19:24:16Z",
        deleted: false,
        bibIds: ["17226308"],
        location: {
          code: "mal92",
          name: "SASB M2 - General Research - Rm 315",
        },
        status: {
          code: "-",
          display: "AVAILABLE",
          duedate: "2024-05-07T08:00:00Z",
        },
        volumes: [],
        barcode: "33333072760735",
        callNumber: "J PIC A",
      },
      dueDate: "2024-05-07T08:00:00Z",
      numberOfRenewals: 0,
      outDate: "2024-05-06T19:11:01Z",
    },
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/checkouts/66527399",
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/6742743",
      item: {
        id: "40875357",
        updatedDate: "2024-05-06T19:11:05Z",
        createdDate: "2024-05-06T18:44:48Z",
        deleted: false,
        bibIds: ["23296884"],
        location: {
          code: "os",
          name: "OFFSITE - ReCAP Partner",
        },
        status: {
          code: "-",
          display: "AVAILABLE",
          duedate: "2024-05-07T08:00:00Z",
        },
        volumes: [],
        barcode: "1715021087264",
        callNumber: "test 5/6 01 xx",
      },
      dueDate: "2024-05-07T08:00:00Z",
      numberOfRenewals: 0,
      outDate: "2024-05-06T19:11:01Z",
    },
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/checkouts/66527379",
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/6742743",
      item: {
        id: "40875347",
        updatedDate: "2024-04-23T20:25:13Z",
        createdDate: "2024-04-23T20:09:12Z",
        deleted: false,
        bibIds: ["23296866"],
        location: {
          code: "os",
          name: "OFFSITE - ReCAP Partner",
        },
        status: {
          code: "-",
          display: "AVAILABLE",
          duedate: "2024-04-24T08:00:00Z",
        },
        volumes: [],
        barcode: "CU25631586",
        callNumber: "PJ5055.37.O4222 H64 2016g",
      },
      dueDate: "2024-04-24T08:00:00Z",
      numberOfRenewals: 0,
      outDate: "2024-04-23T20:25:06Z",
    },
  ],
}

export const checkoutBibs = {
  total: 4,
  start: 0,
  entries: [
    {
      id: "23129476",
      updatedDate: "2024-04-05T01:47:02Z",
      createdDate: "2023-09-05T18:47:07Z",
      deleted: false,
      suppressed: false,
      isbn: "9781536224443",
      lang: {
        code: "eng",
        name: "English",
      },
      title: "Good night, Little Fish",
      author: "Cousins, Lucy, author.",
      materialType: {
        code: "a  ",
        value: "BOOK/TEXT",
      },
      bibLevel: {
        code: "m",
        value: "MONOGRAPH",
      },
      publishYear: 2023,
      catalogDate: "2023-09-28",
      country: {
        code: "mau",
        name: "Massachusetts",
      },
      callNumber: "J PIC COUSINS",
      varFields: [
        {
          fieldTag: "a",
          marcTag: "100",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Cousins, Lucy,",
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
              tag: "p",
              content: "J",
            },
            {
              tag: "a",
              content: "PIC",
            },
            {
              tag: "c",
              content: "COUSINS",
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
              content: "Fishes",
            },
            {
              tag: "v",
              content: "Juvenile fiction.",
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
              content: "Marine animals",
            },
            {
              tag: "v",
              content: "Juvenile fiction.",
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
              content: "Bedtime",
            },
            {
              tag: "v",
              content: "Juvenile fiction.",
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
              content: "Mother and child",
            },
            {
              tag: "v",
              content: "Juvenile fiction.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "655",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Board books.",
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
              content: "Stories in rhyme.",
            },
            {
              tag: "2",
              content: "lcgft",
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
              content: "Picture books.",
            },
            {
              tag: "2",
              content: "lcgft",
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
              content: "Board books.",
            },
            {
              tag: "2",
              content: "lcgft",
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
              content: "Children",
            },
            {
              tag: "v",
              content: "Juvenile fiction.",
            },
            {
              tag: "2",
              content: "homoit",
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
              content: "Family members",
            },
            {
              tag: "v",
              content: "Juvenile fiction.",
            },
            {
              tag: "2",
              content: "homoit",
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
              content: "Mothers",
            },
            {
              tag: "v",
              content: "Juvenile fiction.",
            },
            {
              tag: "2",
              content: "homoit",
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
              content: "Fishes.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst00926361",
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
              content: "Marine animals.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01009386",
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
              content: "Bedtime.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst00829541",
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
              content: "Mother and child.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01026878",
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
              content: "Fiction.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01423787",
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
              content: "Juvenile works.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01411637",
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
              content: "Board books.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01726782",
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
              content: "Stories in rhyme.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01921738",
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
              content: "Picture books.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01726789",
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
              content: "First US edition.",
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
              content: "9781536224443",
            },
            {
              tag: "q",
              content: "(board book)",
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
              content: "1536224448",
            },
            {
              tag: "q",
              content: "(board book)",
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
              content: "  2022922954",
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
              content: "(OCoLC)1397014756",
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
              content: "Cover title.",
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
              content: "On board pages.",
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
              content: '"A perfect bedtime story!"--Cover.',
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
                '"Every day before Little Fish goes to bed, he says good night to all his friends--Red Fish and Blue Fish, Eye Fish and Sky Fish, Bumble Fish and Upside-Down Fish--before cuddling up with Mommy Fish for a long night\'s sleep."--',
            },
            {
              tag: "c",
              content: "Provided by publisher.",
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "521",
          ind1: "8",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Ages 0 - 3.",
            },
          ],
        },
        {
          fieldTag: "o",
          marcTag: "001",
          ind1: " ",
          ind2: " ",
          content: "1397014756",
        },
        {
          fieldTag: "p",
          marcTag: "264",
          ind1: " ",
          ind2: "1",
          subfields: [
            {
              tag: "a",
              content: "Cambridge, Massachusetts :",
            },
            {
              tag: "b",
              content: "Candlewick Press,",
            },
            {
              tag: "c",
              content: "2023.",
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
              content: "1 volume (unpaged) :",
            },
            {
              tag: "b",
              content: "color illustrations ;",
            },
            {
              tag: "c",
              content: "21 cm.",
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
              tag: "2",
              content: "rdacontent",
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
              content: "still image",
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
              content: "Little Fish book",
            },
          ],
        },
        {
          fieldTag: "s",
          marcTag: "800",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Cousins, Lucy.",
            },
            {
              tag: "t",
              content: "Little Fish book.",
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
              content: "Good night, Little Fish /",
            },
            {
              tag: "c",
              content: "Lucy Cousins.",
            },
          ],
        },
        {
          fieldTag: "u",
          marcTag: "246",
          ind1: "3",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Goodnight, Little Fish",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "008",
          ind1: " ",
          ind2: " ",
          content: "230908s2023    maua   a      000 1 eng dcamIi ",
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
          content: "20230928101449.0",
        },
        {
          fieldTag: "y",
          marcTag: "040",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "DAD",
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
              content: "DAD",
            },
            {
              tag: "d",
              content: "RNL",
            },
            {
              tag: "d",
              content: "OCLCO",
            },
            {
              tag: "d",
              content: "SO$",
            },
            {
              tag: "d",
              content: "SDG",
            },
            {
              tag: "d",
              content: "NYP",
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
          ind1: " ",
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "PZ7.C83175",
            },
            {
              tag: "b",
              content: "Gooc 2023",
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
              content: "[E]",
            },
            {
              tag: "2",
              content: "23/eng/20230908",
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
          ind1: " ",
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "PZ7.C83175",
            },
            {
              tag: "b",
              content: "Gooc 2023",
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
              content: "xc",
            },
            {
              tag: "b",
              content: "CATBL",
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
          content: "00000cam a2200709Ii 4500",
        },
      ],
    },
    {
      id: "17226308",
      updatedDate: "2021-11-12T02:52:33Z",
      createdDate: "2008-12-23T03:31:47Z",
      deleted: false,
      suppressed: false,
      isbn: "0803712081",
      lang: {
        code: "eng",
        name: "English",
      },
      title: "Fish, fish, fish",
      author: "Adams, Georgie.",
      materialType: {
        code: "a  ",
        value: "BOOK/TEXT",
      },
      bibLevel: {
        code: "m",
        value: "MONOGRAPH",
      },
      publishYear: 1993,
      catalogDate: "2008-12-22",
      country: {
        code: "nyu",
        name: "New York (State)",
      },
      callNumber: "J PIC A",
      varFields: [
        {
          fieldTag: "a",
          marcTag: "100",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Adams, Georgie.",
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
              content: "Willgoss, Brigitte,",
            },
            {
              tag: "e",
              content: "ill.",
            },
          ],
        },
        {
          fieldTag: "c",
          marcTag: "852",
          ind1: "8",
          ind2: " ",
          subfields: [
            {
              tag: "h",
              content: "J PIC A",
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
              content: "Fishes.",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "655",
          ind1: " ",
          ind2: "0",
          subfields: [
            {
              tag: "a",
              content: "Picture books.",
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
              content: "1st ed.",
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
              content: "0803712081 (tr) :",
            },
            {
              tag: "c",
              content: "$15.00",
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
              content: "   91043748",
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
              content: "Also published as: Fish, fish.",
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
                "Colorful collage illustrations introduce various sizes and shapes of fish.",
            },
          ],
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
              content: "Dial Books for Young Readers,",
            },
            {
              tag: "c",
              content: "1993, c1992.",
            },
          ],
        },
        {
          fieldTag: "q",
          marcTag: "852",
          ind1: "8",
          ind2: " ",
          subfields: [
            {
              tag: "h",
              content: "J PIC A",
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
              content: "1 v. (unpaged) :",
            },
            {
              tag: "b",
              content: "col. ill. ;",
            },
            {
              tag: "c",
              content: "25 cm.",
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
              content: "Fish, fish, fish /",
            },
            {
              tag: "c",
              content: "by Georgie Adams ; pictures by Brigitte Willgoss.",
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
              content: "124012",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "005",
          ind1: " ",
          ind2: " ",
          content: "20060625141021.0",
        },
        {
          fieldTag: "y",
          marcTag: "008",
          ind1: " ",
          ind2: " ",
          content: "930721t19931992nyua   j      000 1 eng  nam   ",
        },
        {
          fieldTag: "y",
          marcTag: "996",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "931220242",
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
              content: "DLC",
            },
            {
              tag: "c",
              content: "DLC",
            },
            {
              tag: "d",
              content: "DLC",
            },
            {
              tag: "d",
              content: "UtOrBLW",
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
              content: "QL617.2",
            },
            {
              tag: "b",
              content: ".A33 1993",
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
              content: "QL617.2",
            },
            {
              tag: "b",
              content: ".A33 1993",
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
              content: "597",
            },
            {
              tag: "2",
              content: "20",
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
              content: "RL",
            },
          ],
        },
        {
          fieldTag: "_",
          content: "00000nam  2200265   4500",
        },
      ],
    },
    {
      id: "23296884",
      updatedDate: "2024-05-07T01:00:08Z",
      createdDate: "2024-05-06T18:44:46Z",
      deleted: false,
      suppressed: false,
      lang: {
        code: "   ",
        name: "---",
      },
      title: "test 5/6 01",
      author: "Spaghetti Monster",
      materialType: {
        code: "-  ",
        value: "MISC",
      },
      bibLevel: {
        code: "-",
        value: "---",
      },
      country: {
        code: "   ",
        name: "No country",
      },
      varFields: [
        {
          fieldTag: "a",
          content: "Spaghetti Monster",
        },
        {
          fieldTag: "t",
          content: "test 5/6 01",
        },
        {
          fieldTag: "y",
          marcTag: "910",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "RLOTF",
            },
          ],
        },
        {
          fieldTag: "_",
          content: "00000nam a2200000 a 4500",
        },
      ],
    },
    {
      id: "23296866",
      updatedDate: "2024-04-24T01:00:13Z",
      createdDate: "2024-04-23T20:09:09Z",
      deleted: false,
      suppressed: false,
      lang: {
        code: "   ",
        name: "---",
      },
      title:
        "[Standard NYPL restrictions apply] HOF HA-KELAVIM HA-MESHUHRARIM = THE BEACH OF FREE DOGS / AVRON POLAKOW. [RECAP]",
      author: "Polakow, Avron, author.",
      materialType: {
        code: "-  ",
        value: "MISC",
      },
      bibLevel: {
        code: "-",
        value: "---",
      },
      country: {
        code: "   ",
        name: "No country",
      },
      varFields: [
        {
          fieldTag: "a",
          content: "Polakow, Avron, author.   ",
        },
        {
          fieldTag: "t",
          content:
            "[Standard NYPL restrictions apply] HOF HA-KELAVIM HA-MESHUHRARIM = THE BEACH OF FREE DOGS / AVRON POLAKOW. [RECAP]",
        },
        {
          fieldTag: "y",
          marcTag: "910",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "RLOTF",
            },
          ],
        },
        {
          fieldTag: "_",
          content: "00000nam a2200000 a 4500",
        },
      ],
    },
  ],
}

export const patron = {
  id: 6742743,
  names: ["NONNA, STREGA"],
  barcodes: ["23333121538324"],
  expirationDate: "2025-03-28",
  emails: ["streganonna@gmail.com", "spaghettigrandma@gmail.com"],
  homeLibrary: { code: "sn   ", name: "SNFL (formerly Mid-Manhattan)" },
  phones: [
    {
      number: "123-456-7890",
      type: "t",
    },
  ],
  fixedFields: {
    "268": { label: "notification preference", value: "z" } as FixedField,
  },
}

export const holdBibs = {
  total: 5,
  start: 0,
  entries: [
    {
      id: "16145054",
      updatedDate: "2021-11-11T09:20:17Z",
      createdDate: "2008-12-20T23:58:32Z",
      deleted: false,
      suppressed: false,
      isbn: "2070775178",
      lang: {
        code: "fre",
        name: "French",
      },
      title: "Spaghetti!",
      author: "Cortanze, Gérard de.",
      materialType: {
        code: "a  ",
        value: "BOOK/TEXT",
      },
      bibLevel: {
        code: "m",
        value: "MONOGRAPH",
      },
      publishYear: 2005,
      catalogDate: "2006-04-05",
      country: {
        code: "fr ",
        name: "France",
      },
      callNumber: "JFC 06-438",
      varFields: [
        {
          fieldTag: "a",
          marcTag: "100",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Cortanze, Gérard de.",
            },
          ],
        },
        {
          fieldTag: "c",
          marcTag: "852",
          ind1: "8",
          ind2: " ",
          subfields: [
            {
              tag: "h",
              content: "JFC 06-438",
            },
          ],
        },
        {
          fieldTag: "d",
          marcTag: "653",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Autobiographical Narrative",
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
              content: "Cortanze, Gérard de",
            },
            {
              tag: "x",
              content: "Childhood and youth.",
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
              content: "Authors, French",
            },
            {
              tag: "y",
              content: "20th century",
            },
            {
              tag: "v",
              content: "Biography.",
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
              content: "2070775178",
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
              content: "2005483039",
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
              content: "(WaOLN)M040000221",
            },
          ],
        },
        {
          fieldTag: "o",
          marcTag: "001",
          ind1: " ",
          ind2: " ",
          content: "61868265",
        },
        {
          fieldTag: "p",
          marcTag: "260",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "[Paris, France] :",
            },
            {
              tag: "b",
              content: "Gallimard,",
            },
            {
              tag: "c",
              content: "c2005.",
            },
          ],
        },
        {
          fieldTag: "q",
          marcTag: "852",
          ind1: "8",
          ind2: " ",
          subfields: [
            {
              tag: "h",
              content: "JFC 06-438",
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
              content: "193 p. :",
            },
            {
              tag: "b",
              content: "ill. ;",
            },
            {
              tag: "c",
              content: "19 cm.",
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
              content: "Haute enfance",
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
              content: "Haute enfance (Gallimard (Firm))",
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
              content: "Spaghetti! /",
            },
            {
              tag: "c",
              content: "Gérard de Cortanze.",
            },
          ],
        },
        {
          fieldTag: "v",
          marcTag: "959",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: ".b78463725",
            },
            {
              tag: "b",
              content: "01-06-09",
            },
            {
              tag: "c",
              content: "10-07-05",
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
          content: "20060405063537.4",
        },
        {
          fieldTag: "y",
          marcTag: "008",
          ind1: " ",
          ind2: " ",
          content: "050929s2005    fr a          000 0afre  cam a ",
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
              tag: "c",
              content: "DLC",
            },
            {
              tag: "d",
              content: "TZT",
            },
            {
              tag: "d",
              content: "NYP",
            },
            {
              tag: "d",
              content: "UtOrBLW",
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
              content: "PQ2663.O7223",
            },
            {
              tag: "b",
              content: "Z46 2005",
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
              content: "PQ2663.O7223",
            },
            {
              tag: "b",
              content: "Z46 2005",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "072",
          ind1: " ",
          ind2: "7",
          subfields: [
            {
              tag: "a",
              content: "PQ",
            },
            {
              tag: "2",
              content: "lcco",
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
              content: "843/.914",
            },
            {
              tag: "a",
              content: "B",
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
              tag: "b",
              content: "hg",
            },
            {
              tag: "c",
              content: "CFT/ANG",
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
          marcTag: "981",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "TZT",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "997",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "hg",
            },
            {
              tag: "b",
              content: "04-05-06",
            },
            {
              tag: "c",
              content: "m",
            },
            {
              tag: "d",
              content: "a",
            },
            {
              tag: "e",
              content: "-",
            },
            {
              tag: "f",
              content: "fre",
            },
            {
              tag: "g",
              content: "fr ",
            },
            {
              tag: "h",
              content: "0",
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
              content: "RL",
            },
          ],
        },
        {
          fieldTag: "_",
          content: "00000cam  2200349 a 4500",
        },
      ],
    },
    {
      id: "22046460",
      updatedDate: "2024-03-21T15:09:38Z",
      createdDate: "2019-12-27T15:37:06Z",
      deleted: false,
      suppressed: false,
      isbn: "9781725090132",
      lang: {
        code: "eng",
        name: "English",
      },
      title: "The house of mirth : large print",
      author: "Wharton, Edith, 1862-1937.",
      materialType: {
        code: "l  ",
        value: "LARGE PRINT",
      },
      bibLevel: {
        code: "m",
        value: "MONOGRAPH",
      },
      publishYear: 2019,
      catalogDate: "2020-01-08",
      country: {
        code: "xx ",
        name: "Unknown or undetermined",
      },
      callNumber: "LG PRINT CLASSICS FIC WHARTON",
      varFields: [
        {
          fieldTag: "a",
          marcTag: "100",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Wharton, Edith,",
            },
            {
              tag: "d",
              content: "1862-1937.",
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
              tag: "f",
              content: "LG PRINT",
            },
            {
              tag: "f",
              content: "CLASSICS",
            },
            {
              tag: "a",
              content: "FIC",
            },
            {
              tag: "c",
              content: "WHARTON",
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
              content: "Single women",
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
              content: "Social classes",
            },
            {
              tag: "v",
              content: "Fiction.",
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
              content: "New York (N.Y.)",
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
          ind2: "7",
          subfields: [
            {
              tag: "a",
              content: "Single women.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01119452",
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
              content: "Social classes.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01122346",
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
              content: "New York (State)",
            },
            {
              tag: "z",
              content: "New York.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01204333",
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
              content: "Fiction.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01423787",
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
              content: "Psychological fiction.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01726481",
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
              content: "Psychological fiction.",
            },
            {
              tag: "2",
              content: "lcgft",
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
              content: "Large print books.",
            },
            {
              tag: "2",
              content: "lcgft",
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
              content: "Large print books.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst02061051",
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
              content: "9781725090132",
            },
            {
              tag: "q",
              content: "(large print ;",
            },
            {
              tag: "q",
              content: "hardcover ;",
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
              content: "1725090139",
            },
            {
              tag: "q",
              content: "(large print ;",
            },
            {
              tag: "q",
              content: "hardcover ;",
            },
            {
              tag: "q",
              content: "alk. paper)",
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
              content: "(OCoLC)1135330228",
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
              content: "Originally published: London : Macmillan, 1905.",
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
                '"She was listening with keen attention. "And yet they fetch fabulous prices, don\'t they? It seems so odd to want to pay a lot for an ugly badly-printed book that one is never going to read And I suppose most of the owners of Americana are not historians either?"--',
            },
            {
              tag: "c",
              content: "Provided by publisher",
            },
          ],
        },
        {
          fieldTag: "o",
          marcTag: "001",
          ind1: " ",
          ind2: " ",
          content: "1135330228",
        },
        {
          fieldTag: "p",
          marcTag: "264",
          ind1: " ",
          ind2: "1",
          subfields: [
            {
              tag: "a",
              content: "[Place of publication not identified] :",
            },
            {
              tag: "b",
              content: "manybooks.net,",
            },
            {
              tag: "c",
              content: "[2019]",
            },
          ],
        },
        {
          fieldTag: "p",
          marcTag: "264",
          ind1: " ",
          ind2: "3",
          subfields: [
            {
              tag: "a",
              content: "[Lavergne, TN],",
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
              content: "1 volume (unpaged : large print) ;",
            },
            {
              tag: "c",
              content: "28 cm",
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
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "The house of mirth :",
            },
            {
              tag: "b",
              content: "large print /",
            },
            {
              tag: "c",
              content: "by Edith Wharton.",
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
          content: "20200108030225.0",
        },
        {
          fieldTag: "y",
          marcTag: "008",
          ind1: " ",
          ind2: " ",
          content: "200108s2019    xx      d     000 f eng dnamIi ",
        },
        {
          fieldTag: "y",
          marcTag: "040",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "NYP",
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
              content: "NYP",
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
              content: "n-us-ny",
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
          ind1: " ",
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "PS3545.H16",
            },
            {
              tag: "b",
              content: "H68 2019",
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
              content: "813/.52",
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
          marcTag: "901",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "jao",
            },
            {
              tag: "b",
              content: "CATBL",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "908",
          ind1: " ",
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "PS3545.H16",
            },
            {
              tag: "b",
              content: "H68 2019",
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
              content: ".b220464601",
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
          content: "00000nam a2200493Ii 4500",
        },
      ],
    },
    {
      id: "23099273",
      updatedDate: "2024-04-04T17:45:46Z",
      createdDate: "2023-07-17T14:08:18Z",
      deleted: false,
      suppressed: false,
      isbn: "9780593529874",
      lang: {
        code: "eng",
        name: "English",
      },
      title: "I want to be spaghetti!",
      author: "Wright-Ruiz, Kiera, author.",
      materialType: {
        code: "a  ",
        value: "BOOK/TEXT",
      },
      bibLevel: {
        code: "m",
        value: "MONOGRAPH",
      },
      publishYear: 2023,
      catalogDate: "2023-08-07",
      country: {
        code: "nyu",
        name: "New York (State)",
      },
      callNumber: "J PIC WRIGHT RUIZ",
      varFields: [
        {
          fieldTag: "a",
          marcTag: "100",
          ind1: "1",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "Wright-Ruiz, Kiera,",
            },
            {
              tag: "e",
              content: "author.",
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
              content: "Lam, Claudia,",
            },
            {
              tag: "e",
              content: "illustrator.",
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
              content: "J",
            },
            {
              tag: "a",
              content: "PIC",
            },
            {
              tag: "c",
              content: "WRIGHT RUIZ",
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
              content: "Ramen",
            },
            {
              tag: "v",
              content: "Juvenile fiction.",
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
              content: "Noodles",
            },
            {
              tag: "v",
              content: "Juvenile fiction.",
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
              content: "Self-esteem",
            },
            {
              tag: "v",
              content: "Juvenile fiction.",
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
              content: "Picture books.",
            },
            {
              tag: "2",
              content: "lcgft",
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
              content: "Ramen.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01904426",
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
              content: "Noodles.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01039060",
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
              content: "Self-esteem.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01111662",
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
              content: "Juvenile works.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01411637",
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
              content: "Fiction.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01423787",
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
              content: "Picture books.",
            },
            {
              tag: "2",
              content: "fast",
            },
            {
              tag: "0",
              content: "(OCoLC)fst01726789",
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
              content: "9780593529874",
            },
            {
              tag: "q",
              content: "lib. bdg.",
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
              content: "0593529871",
            },
            {
              tag: "q",
              content: "lib. bdg.",
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
              content: "bl2023022656",
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
              content: "(OCoLC)1389353503",
            },
            {
              tag: "z",
              content: "(OCoLC)1348139537",
            },
            {
              tag: "z",
              content: "(OCoLC)1392291763",
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
                '"Even from Ramen\'s small shelf in the supermarket, they see spaghetti propaganda everywhere. They want to be celebrated, too. Maybe, Ramen misguidedly thinks, I have to change to be loved like that. "I want to be spaghetti!" they proclaim to the dismay of the rest of the instant noodle section"--',
            },
            {
              tag: "c",
              content: "Provided by publisher.",
            },
          ],
        },
        {
          fieldTag: "n",
          marcTag: "521",
          ind1: "8",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "AD500L",
            },
            {
              tag: "b",
              content: "Lexile",
            },
          ],
        },
        {
          fieldTag: "o",
          marcTag: "001",
          ind1: " ",
          ind2: " ",
          content: "1389353503",
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
              content: "Kokila,",
            },
            {
              tag: "c",
              content: "2023.",
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
              content: "1 volume (unpaged) :",
            },
            {
              tag: "b",
              content: "color illustrations ;",
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
          marcTag: "336",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "still image",
            },
            {
              tag: "b",
              content: "sti",
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
              content: "I want to be spaghetti! /",
            },
            {
              tag: "c",
              content:
                "written by Kiera Wright-Ruiz ; illustrated by Claudia Lam.",
            },
          ],
        },
        {
          fieldTag: "y",
          marcTag: "008",
          ind1: " ",
          ind2: " ",
          content: "230705s2023    nyua   b      000 1 eng dcamIi ",
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
          content: "20230807113140.0",
        },
        {
          fieldTag: "y",
          marcTag: "019",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "1348139537",
            },
            {
              tag: "a",
              content: "1392291763",
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
              content: "NjBwBT",
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
              content: "PCX",
            },
            {
              tag: "d",
              content: "PCX",
            },
            {
              tag: "d",
              content: "JCX",
            },
            {
              tag: "d",
              content: "JAS",
            },
            {
              tag: "d",
              content: "YBM",
            },
            {
              tag: "d",
              content: "TOH",
            },
            {
              tag: "d",
              content: "YDX",
            },
            {
              tag: "d",
              content: "BDX",
            },
            {
              tag: "d",
              content: "ILC",
            },
            {
              tag: "d",
              content: "NYP",
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
          ind1: "1",
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "PZ7.1.W82",
            },
            {
              tag: "b",
              content: "Iw 2023",
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
              content: "[E]",
            },
            {
              tag: "2",
              content: "23/eng/20230627",
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
          ind1: "1",
          ind2: "4",
          subfields: [
            {
              tag: "a",
              content: "PZ7.1.W82",
            },
            {
              tag: "b",
              content: "Iw 2023",
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
              content: "xc",
            },
            {
              tag: "b",
              content: "CATBL",
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
          content: "00000cam a2200529Ii 4500",
        },
      ],
    },
    {
      id: "23296875",
      updatedDate: "2024-05-01T01:00:21Z",
      createdDate: "2024-04-30T14:42:28Z",
      deleted: false,
      suppressed: false,
      lang: {
        code: "   ",
        name: "---",
      },
      title: "Partner record",
      author: "Spaghetti Monster",
      materialType: {
        code: "-  ",
        value: "MISC",
      },
      bibLevel: {
        code: "-",
        value: "---",
      },
      country: {
        code: "   ",
        name: "No country",
      },
      varFields: [
        {
          fieldTag: "a",
          content: "Spaghetti Monster",
        },
        {
          fieldTag: "t",
          content: "Partner record",
        },
        {
          fieldTag: "y",
          marcTag: "910",
          ind1: " ",
          ind2: " ",
          subfields: [
            {
              tag: "a",
              content: "RLOTF",
            },
          ],
        },
        {
          fieldTag: "_",
          content: "00000nam a2200000 a 4500",
        },
      ],
    },
    // Bib level hold
    {
      id: "23167148",
      updatedDate: "2024-05-10T19:47:12Z",
      createdDate: "2023-10-24T18:07:42Z",
      deleted: false,
      suppressed: false,
      isbn: "9780316360562",
      lang: { code: "eng", name: "English" },
      title: "Pasta every day : make it, shape it, sauce it, eat it",
      author: "Feinstein, Meryl, author.",
      materialType: { code: "a  ", value: "BOOK/TEXT" },
      bibLevel: { code: "m", value: "MONOGRAPH" },
      publishYear: 2023,
      catalogDate: "2023-11-22",
      country: { code: "nyu", name: "New York (State)" },
      callNumber: "641.822 F",
    },
  ],
}

export const holds = {
  total: 5,
  start: 0,
  entries: [
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/holds/49438189",
      record: {
        id: "15550040",
        updatedDate: "2024-05-09T14:44:27Z",
        createdDate: "2009-02-10T15:54:04Z",
        deleted: false,
        bibIds: ["16145054"],
        location: {
          code: "rc2ma",
          name: "OFFSITE - Request in Advance",
        },
        status: {
          code: "-",
          display: "AVAILABLE",
        },
        volumes: [],
        barcode: "33433073236758",
        callNumber: "JFC 06-438",
      },
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/6742743",
      frozen: false,
      pickupLocation: {
        code: "mal82",
        name: "Schwarzman Room 315 ONSITE USE",
      },
      status: {
        code: "0",
        name: "on hold.",
      },
      recordType: "i",
      canFreeze: false,
    },
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/holds/49438190",
      record: {
        id: "23167148",
        updatedDate: "2024-05-10T19:47:12Z",
        createdDate: "2023-10-24T18:07:42Z",
        deleted: false,
        suppressed: false,
        isbn: "9780316360562",
        lang: {
          code: "eng",
          name: "English",
        },
        title: "Pasta every day : make it, shape it, sauce it, eat it",
        author: "Feinstein, Meryl, author.",
        materialType: {
          code: "a  ",
          value: "BOOK/TEXT",
        },
        bibLevel: {
          code: "m",
          value: "MONOGRAPH",
        },
        publishYear: 2023,
        catalogDate: "2023-11-22",
        country: {
          code: "nyu",
          name: "New York (State)",
        },
        callNumber: "641.822 F",
      },
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/6742743",
      frozen: false,
      pickupLocation: {
        code: "sn",
        name: "SNFL (formerly Mid-Manhattan)",
      },
      status: {
        code: "0",
        name: "on hold.",
      },
      recordType: "b",
      canFreeze: true,
    },
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/holds/49438191",
      record: {
        id: "37648023",
        updatedDate: "2024-05-09T14:44:28Z",
        createdDate: "2020-01-10T17:34:00Z",
        deleted: false,
        bibIds: ["22046460"],
        location: {
          code: "bca0f",
          name: "Bronx Library Center Fiction",
        },
        status: {
          code: "t",
          name: "Requested item is in transit.",
        },
        volumes: [],
        barcode: "33333437951979",
        callNumber: "LG PRINT CLASSICS FIC WHARTON",
      },
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/6742743",
      frozen: false,
      pickupLocation: {
        code: "sn",
        name: "SNFL (formerly Mid-Manhattan)",
      },
      status: {
        code: "t",
        name: "Requested item is in transit.",
      },
      recordType: "i",
      canFreeze: false,
    },
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/holds/49438192",
      record: {
        id: "40367309",
        updatedDate: "2024-05-09T14:44:32Z",
        createdDate: "2023-08-08T13:19:00Z",
        deleted: false,
        bibIds: ["23099273"],
        location: {
          code: "mbj0i",
          name: "Macomb's Bridge Children's Picture Book",
        },
        status: {
          code: "!",
          display: "ON HOLDSHELF",
        },
        volumes: [],
        barcode: "33333454855160",
        callNumber: "J PIC WRIGHT RUIZ",
      },
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/6742743",
      frozen: false,
      pickupByDate: "2024-05-17T08:00:00Z",
      pickupLocation: {
        code: "sn",
        name: "SNFL (formerly Mid-Manhattan)",
      },
      status: {
        code: "i",
        name: "Requested item ready for pickup.",
      },
      recordType: "i",
      canFreeze: false,
    },
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/holds/49438193",
      record: {
        id: "40875355",
        updatedDate: "2024-05-09T14:44:28Z",
        createdDate: "2024-04-30T14:55:06Z",
        deleted: false,
        bibIds: ["23296875"],
        location: {
          code: "os",
          name: "OFFSITE - ReCAP Partner",
        },
        status: {
          code: "-",
          display: "AVAILABLE",
        },
        volumes: [],
        barcode: "cuspaghetti",
        callNumber: "Spag coll. 89",
      },
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/6742743",
      frozen: false,
      pickupLocation: {
        code: "mal",
        name: "Schwarzman Room 315 ONSITE USE",
      },
      status: {
        code: "0",
        name: "on hold.",
      },
      recordType: "i",
      canFreeze: false,
    },
  ],
}

export const empty = { total: 0, entries: [] }

export const fines = {
  total: 1,
  start: 0,
  entries: [
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/fines/13479583",
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/7804774",
      item: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/items/36762288",
      assessedDate: "2023-06-15T17:34:46Z",
      invoiceNumber: 777911,
      chargeType: {
        code: "3",
        display: "Replacement",
      },
      itemCharge: 14.99,
      processingFee: 0.0,
      billingFee: 0.0,
      paidAmount: 0.0,
      location: {
        code: "baj0v",
        name: "Baychester Children's Non-Print Media",
      },
    },
  ],
}

export const mockPatron = {
  notificationPreference: "Email",
  name: "NONNA, STREGA",
  barcode: "23333121538324",
  expirationDate: "2025-03-28",
  primaryEmail: "streganonna@gmail.com",
  emails: ["streganonna@gmail.com", "spaghettigrandma@gmail.com"],
  primaryPhone: "123-456-7890",
  phones: [
    {
      number: "123-456-7890",
      type: "t",
    },
  ],
  homeLibraryCode: "sn",
  id: 2772226,
}

export const mockFines = {
  total: 14.99,
  entries: [
    {
      detail: "Replacement",
      amount: 14.99,
      date: "2023-06-15T17:34:46Z",
    },
  ],
}
