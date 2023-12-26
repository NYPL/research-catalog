export const bibWithSupplementaryContent = {
  "@context":
    "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
  "@type": ["nypl:Item", "nypl:Resource"],
  "@id": "res:b21255464",
  carrierType: [
    {
      "@id": "carriertypes:nc",
      prefLabel: "volume",
    },
  ],
  contributorLiteral: ["Long, Ethan", "OverDrive, Inc."],
  createdString: ["2016"],
  createdYear: 2016,
  creatorLiteral: ["Watson, Tom, 1965-"],
  dateStartYear: 2016,
  dateString: ["2016"],
  description: [
    "When they come across spaghetti in their search for a tug-of-war rope, Stick Dog and his hungry friends go on a quest for more pasta that sees them scale their suburb's tallest mountain and sneak into a restaurant filled with humans.",
  ],
  electronicResources: [
    {
      url: "http://link.overdrive.com/?websiteID=37&titleID=2559851",
      prefLabel: "Access eNYPL",
    },
  ],
  extent: ["1 online resource (238 pages) : illustrations."],
  genreForm: ["Humorous fiction."],
  idIsbn: ["9780062343239", "0062343238"],
  idOclc: ["959966725"],
  identifier: [
    {
      "@type": "nypl:Bnumber",
      "@value": "21255464",
    },
    {
      "@type": "bf:Isbn",
      "@value": "9780062343239",
    },
    {
      "@type": "bf:Isbn",
      "@value": "0062343238",
    },
    {
      "@type": "nypl:Oclc",
      "@value": "959966725",
    },
    {
      "@type": "nypl:Oclc",
      "@value": "959966725",
    },
    {
      "@type": "bf:Identifier",
      "@value": "(OCoLC)959966725",
    },
  ],
  issuance: [
    {
      "@id": "urn:biblevel:m",
      prefLabel: "monograph/item",
    },
  ],
  itemAggregations: [
    {
      "@type": "nypl:Aggregation",
      "@id": "res:location",
      id: "location",
      field: "location",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:format",
      id: "format",
      field: "format",
      values: [
        {
          value: "Text",
          count: 1,
          label: "Text",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:status",
      id: "status",
      field: "status",
      values: [],
    },
  ],
  items: [],
  language: [
    {
      "@id": "lang:eng",
      prefLabel: "English",
    },
  ],
  lccClassification: ["FICTION WAT"],
  materialType: [
    {
      "@id": "resourcetypes:txt",
      prefLabel: "Text",
    },
  ],
  mediaType: [
    {
      "@id": "mediatypes:n",
      prefLabel: "unmediated",
    },
  ],
  numAvailable: 0,
  numCheckinCardItems: 0,
  numElectronicResources: 1,
  numItemDatesParsed: 0,
  numItemVolumesParsed: 0,
  numItems: 0,
  numItemsMatched: 0,
  numItemsTotal: 0,
  nyplSource: ["sierra-nypl"],
  placeOfPublication: ["New York, NY"],
  publicationStatement: [
    "New York, NY : Harper, An Imprint of HarperCollinsPublishers, [2016]",
  ],
  publisherLiteral: ["Harper, An Imprint of HarperCollinsPublishers"],
  subjectLiteral: [
    "Dogs -- Fiction.",
    "Pasta products -- Fiction.",
    "Friendship -- Fiction.",
    "Illustrated children's books.",
  ],
  supplementaryContent: [
    {
      "@type": "nypl:SupplementaryContent",
      label: "Image",
      url: "http://images.contentreserve.com/ImageType-100/0293-1/{C87D2BB9-0E13-4851-A9E2-547643F41A0E}Img100.jpg",
    },
  ],
  title: ["Stick Dog slurps spaghetti"],
  titleDisplay: [
    "Stick Dog slurps spaghetti / by Tom Watson ; [illustrations by Ethan Long based on original sketches by Tom Watson].",
  ],
  type: ["nypl:Item"],
  updatedAt: 1681297059060,
  uri: "b21255464",
  suppressed: false,
  hasItemVolumes: false,
  hasItemDates: false,
}
export const parallelsBibAnnotatedMarc = {
  bib: {
    id: "15349955",
    nyplSource: "sierra-nypl",
    fields: [
      {
        label: "Title",
        values: [
          {
            content: "Povelja.",
            source: {
              fieldTag: "t",
              marcTag: "245",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Povelja.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Title",
        values: [
          {
            content: "Повеља.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Повеља.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Publisher",
        values: [
          {
            content: "Kraljevo : Slovo, 1985-",
            source: {
              fieldTag: "p",
              marcTag: "264",
              ind1: " ",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Kraljevo :",
                },
                {
                  tag: "b",
                  content: "Slovo,",
                },
                {
                  tag: "c",
                  content: "1985-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Publisher",
        values: [
          {
            content: "Краљево : Слово, 1985-",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: " ",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Краљево :",
                },
                {
                  tag: "b",
                  content: "Слово,",
                },
                {
                  tag: "c",
                  content: "1985-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Latest Publisher",
        values: [
          {
            content:
              '<2012-2016>: Kraljevo : Narodna biblioteka "Stefan Prvovenčani"',
            source: {
              fieldTag: "p",
              marcTag: "264",
              ind1: "3",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "3",
                  content: "<2012-2016>:",
                },
                {
                  tag: "a",
                  content: "Kraljevo :",
                },
                {
                  tag: "b",
                  content: 'Narodna biblioteka "Stefan Prvovenčani"',
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Latest Publisher",
        values: [
          {
            content:
              '<2012-2016>: Краљево : Народна библиотека "Стефан Првовенчани"',
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "3",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "3",
                  content: "<2012-2016>:",
                },
                {
                  tag: "a",
                  content: "Краљево :",
                },
                {
                  tag: "b",
                  content: 'Народна библиотека "Стефан Првовенчани"',
                },
              ],
            },
          },
        ],
      },
      {
        label: "Description",
        values: [
          {
            content: "volumes ; 25 cm",
            source: {
              fieldTag: "r",
              marcTag: "300",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "volumes ;",
                },
                {
                  tag: "c",
                  content: "25 cm",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Current Frequency",
        values: [
          {
            content: "Three no. a year, <1998>-",
            source: {
              fieldTag: "r",
              marcTag: "310",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Three no. a year,",
                },
                {
                  tag: "b",
                  content: "<1998>-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Former Frequency",
        values: [
          {
            content: "Four no. a year, 1986-1997.",
            source: {
              fieldTag: "r",
              marcTag: "321",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Four no. a year,",
                },
                {
                  tag: "b",
                  content: "1986-1997.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Type of Content",
        values: [
          {
            content: "text",
            source: {
              fieldTag: "r",
              marcTag: "336",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "text",
                },
                {
                  tag: "b",
                  content: "[redacted]",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Type of Medium",
        values: [
          {
            content: "unmediated",
            source: {
              fieldTag: "r",
              marcTag: "337",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "unmediated",
                },
                {
                  tag: "b",
                  content: "[redacted]",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Type of Carrier",
        values: [
          {
            content: "volume",
            source: {
              fieldTag: "r",
              marcTag: "338",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "volume",
                },
                {
                  tag: "b",
                  content: "[redacted]",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Publication Date",
        values: [
          {
            content:
              "Nova serija g. 15, br. 1 (1985)-nova serija 27, br. 4 (1997); g. 28, br. 1 (1998)-",
            source: {
              fieldTag: "r",
              marcTag: "362",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    "Nova serija g. 15, br. 1 (1985)-nova serija 27, br. 4 (1997); g. 28, br. 1 (1998)-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Publication Date",
        values: [
          {
            content:
              "Нова серија г. 15, бр. 1 (1985)-нова серија 27, бр. 4 (1997); г. 28, бр. 1 (1998)-",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    "Нова серија г. 15, бр. 1 (1985)-нова серија 27, бр. 4 (1997); г. 28, бр. 1 (1998)-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Summary",
        values: [
          {
            content:
              '"Časopis za književnosti, umetnost, kulturu, prosvetna i društvena pitanja."',
            source: {
              fieldTag: "n",
              marcTag: "520",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    '"Časopis za književnosti, umetnost, kulturu, prosvetna i društvena pitanja."',
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Summary",
        values: [
          {
            content:
              '"Часопис за књижевности, уметност, културу, просветна и друштвена питања."',
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    '"Часопис за књижевности, уметност, културу, просветна и друштвена питања."',
                },
              ],
            },
          },
        ],
      },
      {
        label: "Supplement",
        values: [
          {
            content: "Has supplement, <2012-2016>: Pojedinačno.",
            source: {
              fieldTag: "n",
              marcTag: "525",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Has supplement, <2012-2016>: Pojedinačno.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Supplement",
        values: [
          {
            content: "Has supplement, <2012-2016>: Појединачно.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Has supplement, <2012-2016>: Појединачно.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Language",
        values: [
          {
            content: "Serbian; Cyrillic alphabet.",
            source: {
              fieldTag: "n",
              marcTag: "546",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Serbian;",
                },
                {
                  tag: "b",
                  content: "Cyrillic alphabet.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Issued By",
        values: [
          {
            content: "Issued by: Narodna biblioteka Kraljevo.",
            source: {
              fieldTag: "n",
              marcTag: "550",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Issued by: Narodna biblioteka Kraljevo.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Issued By",
        values: [
          {
            content: "Issued by: Народна библиотека Краљево.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Issued by: Народна библиотека Краљево.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Linking Entry",
        values: [
          {
            content: "Has supplement, <2005-> : Preporučeno, ISSN 1452-3531",
            source: {
              fieldTag: "n",
              marcTag: "580",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    "Has supplement, <2005-> : Preporučeno, ISSN 1452-3531",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Linking Entry",
        values: [
          {
            content: "Has supplement, <2005-> : Препоручено, ISSN 1452-3531",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    "Has supplement, <2005-> : Препоручено, ISSN 1452-3531",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Linking Entry",
        values: [
          {
            content: "Has supplement, <2006-> : Vidi čuda, ISSN 1452-7316",
            source: {
              fieldTag: "n",
              marcTag: "580",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    "Has supplement, <2006-> : Vidi čuda, ISSN 1452-7316",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Linking Entry",
        values: [
          {
            content: "Has supplement, <2006-> : Види чуда, ISSN 1452-7316",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    "Has supplement, <2006-> : Види чуда, ISSN 1452-7316",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Latest issue consulted",
        values: [
          {
            content: "G. 46, 3 (2016).",
            source: {
              fieldTag: "n",
              marcTag: "588",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "G. 46, 3 (2016).",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Serbia -- Civilization -- Periodicals.",
            source: {
              fieldTag: "d",
              marcTag: "651",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Serbia",
                },
                {
                  tag: "x",
                  content: "Civilization",
                },
                {
                  tag: "v",
                  content: "Periodicals.",
                },
              ],
            },
          },
          {
            content: "Civilization.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Civilization.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
          {
            content: "Serbia.",
            source: {
              fieldTag: "d",
              marcTag: "651",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Serbia.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Genre/Form",
        values: [
          {
            content: "Periodicals.",
            source: {
              fieldTag: "d",
              marcTag: "655",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Periodicals.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Serbia and Montenegro.",
            source: {
              fieldTag: "d",
              marcTag: "651",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Serbia and Montenegro.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Added Author",
        values: [
          {
            content: 'Narodna biblioteka "Stefan Prvovenčani", issuing body.',
            source: {
              fieldTag: "b",
              marcTag: "710",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: 'Narodna biblioteka "Stefan Prvovenčani",',
                },
                {
                  tag: "e",
                  content: "issuing body.",
                },
              ],
            },
          },
          {
            content: "Narodna biblioteka Kraljevo, issuing body.",
            source: {
              fieldTag: "b",
              marcTag: "710",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Narodna biblioteka Kraljevo,",
                },
                {
                  tag: "e",
                  content: "issuing body.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Added Author",
        values: [
          {
            content: "Народна библиотека Краљево, issuing body.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Народна библиотека Краљево,",
                },
                {
                  tag: "e",
                  content: "issuing body.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Added Author",
        values: [
          {
            content:
              'Narodna biblioteka "Radoslav Vesnić" Kraljevo, issuing body.',
            source: {
              fieldTag: "b",
              marcTag: "710",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: 'Narodna biblioteka "Radoslav Vesnić" Kraljevo,',
                },
                {
                  tag: "e",
                  content: "issuing body.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Added Author",
        values: [
          {
            content:
              'Народна библиотека "Радослав Веснић Краљево, issuing body.',
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: 'Народна библиотека "Радослав Веснић Краљево,',
                },
                {
                  tag: "e",
                  content: "issuing body.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Abbreviated Title",
        values: [
          {
            content: "Povelja (1985)",
            source: {
              fieldTag: "u",
              marcTag: "210",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Povelja",
                },
                {
                  tag: "b",
                  content: "(1985)",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Added Title",
        values: [
          {
            content: "Pojedinačno.",
            source: {
              fieldTag: "u",
              marcTag: "740",
              ind1: "0",
              ind2: "2",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Pojedinačno.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Added Title",
        values: [
          {
            content: "Појединачно.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: "2",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Појединачно.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Donor/Sponsor",
        values: [
          {
            content:
              "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
            source: {
              fieldTag: "u",
              marcTag: "799",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content:
                    "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Continues",
        values: [
          {
            content: "Povelja oktobra",
            source: {
              fieldTag: "x",
              marcTag: "780",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "t",
                  content: "Povelja oktobra",
                },
                {
                  tag: "x",
                  content: "[redacted]",
                },
                {
                  tag: "w",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Continues",
        values: [
          {
            content: "Повеља октобра",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "t",
                  content: "Повеља октобра",
                },
                {
                  tag: "x",
                  content: "[redacted]",
                },
                {
                  tag: "w",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Has Supplement:",
        values: [
          {
            content: "Preporučeno 2005- 1452-3531",
            source: {
              fieldTag: "w",
              marcTag: "770",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "t",
                  content: "Preporučeno",
                },
                {
                  tag: "g",
                  content: "2005-",
                },
                {
                  tag: "x",
                  content: "1452-3531",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Has Supplement:",
        values: [
          {
            content: "Препоручено 2005- 1452-3531",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "t",
                  content: "Препоручено",
                },
                {
                  tag: "g",
                  content: "2005-",
                },
                {
                  tag: "x",
                  content: "1452-3531",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Has Supplement:",
        values: [
          {
            content: "Vidi čuda 2006- 1452-7316",
            source: {
              fieldTag: "w",
              marcTag: "770",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "t",
                  content: "Vidi čuda",
                },
                {
                  tag: "g",
                  content: "2006-",
                },
                {
                  tag: "x",
                  content: "1452-7316",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Has Supplement:",
        values: [
          {
            content: "Види чуда 2006- 1452-7316",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "t",
                  content: "Види чуда",
                },
                {
                  tag: "g",
                  content: "2006-",
                },
                {
                  tag: "x",
                  content: "1452-7316",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Other Form:",
        values: [
          {
            content: "Online version: Povelja (OCoLC)760047199",
            source: {
              fieldTag: "w",
              marcTag: "776",
              ind1: "0",
              ind2: "8",
              content: null,
              subfields: [
                {
                  tag: "i",
                  content: "Online version:",
                },
                {
                  tag: "t",
                  content: "Povelja",
                },
                {
                  tag: "w",
                  content: "(OCoLC)760047199",
                },
              ],
            },
          },
        ],
      },
      {
        label: "LCCN",
        values: [
          {
            content: "sn 95033418",
            source: {
              fieldTag: "l",
              marcTag: "010",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "sn 95033418",
                },
              ],
            },
          },
        ],
      },
      {
        label: "ISSN",
        values: [
          {
            content: "0352-7751 0352-7751 b1",
            source: {
              fieldTag: "i",
              marcTag: "022",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "0352-7751",
                },
                {
                  tag: "l",
                  content: "0352-7751",
                },
                {
                  tag: "2",
                  content: "b1",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Research Call Number",
        values: [
          {
            content: "*QKKA 08-490",
            source: {
              fieldTag: "q",
              marcTag: "852",
              ind1: "8",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "h",
                  content: "*QKKA 08-490",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}
export const parallelsBib = {
  "@context":
    "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
  "@type": ["nypl:Item", "nypl:Resource"],
  "@id": "res:b15349955",
  carrierType: [
    {
      "@id": "carriertypes:nc",
      prefLabel: "volume",
    },
  ],
  contributorLiteral: [
    'Narodna biblioteka "Stefan Prvovenčani", issuing body.',
    "Narodna biblioteka Kraljevo, issuing body.",
    'Narodna biblioteka "Radoslav Vesnić" Kraljevo, issuing body.',
  ],
  createdString: ["1985"],
  createdYear: 1985,
  dateEndString: ["9999"],
  dateEndYear: 9999,
  dateStartYear: 1985,
  dateString: ["1985"],
  description: [
    '"Časopis za književnosti, umetnost, kulturu, prosvetna i društvena pitanja."',
  ],
  dimensions: ["25 cm"],
  donor: [
    "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
  ],
  electronicResources: [],
  extent: ["volumes ;"],
  genreForm: ["Periodicals."],
  holdings: [
    {
      checkInBoxes: [
        {
          coverage: "Vol. 43 No. 1 (2013)",
          position: 1,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 43 No. 2 (2013)",
          position: 2,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 43 No. 3 (2013)",
          position: 3,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Missing",
        },
        {
          coverage: "Vol. 44 No. 1 (2014)",
          position: 4,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 44 No. 2 (2014)",
          position: 5,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 44 No. 3 (2014)",
          position: 6,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 45 No. 1 (2015)",
          position: 7,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 45 No. 3 (2015)",
          position: 8,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 46 No. 1 (2016)",
          position: 9,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 46 No. 2 (2016)",
          position: 10,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 46 No. 3 (2016)",
          position: 11,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 47 No. 1 (2017)",
          position: 12,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 47 No. 2 (2017)",
          position: 13,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Expected",
        },
        {
          coverage: "Vol. 47 No. 3 (2017)",
          position: 14,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 48 No. 1 (2018)",
          position: 15,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 48 No. 2 (2018)",
          position: 16,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 48 No. 3 (2018)",
          position: 17,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 49 No. 1 (2019)",
          position: 18,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 49 No. 2 (2019)",
          position: 19,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 49 No. 3 (2019)",
          position: 20,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 50 No. 1 (2020)",
          position: 21,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Expected",
        },
        {
          coverage: "Vol. 50 No. 2 (2020)",
          position: 22,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Expected",
        },
        {
          coverage: "Vol. 50 No. 3 (2020)",
          position: 23,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Expected",
        },
        {
          coverage: "Vol. 51 No. 1 (2021)",
          position: 24,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Expected",
        },
        {
          coverage: "Vol. 51 No. 2 (2021)",
          position: 25,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Expected",
        },
        {
          coverage: "Vol. 51 No. 3 (2021)",
          position: 26,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Arrived",
        },
        {
          coverage: "Vol. 52 No. 1 (2022)",
          position: 27,
          type: "nypl:CheckInBox",
          shelfMark: ["*QKKA 08-490"],
          status: "Expected",
        },
      ],
      holdingStatement: [
        "29(1999)-36:1(2006), 39:1(2009)-43:2(2013), 44(2014), 45:2(2015)-47:1(2017), 47:3(2017)-49(2019), 51:3(2021)- [incomplete]-",
      ],
      identifier: [
        {
          type: "bf:shelfMark",
          value: "*QKKA 08-490",
        },
      ],
      physicalLocation: ["*QKKA 08-490"],
      location: [
        {
          code: "loc:rc2ma",
          label: "Offsite",
        },
      ],
      shelfMark: ["*QKKA 08-490"],
      uri: "h1047859",
    },
  ],
  idIssn: ["0352-7751"],
  idLccn: ["sn 95033418"],
  idOclc: ["32768016"],
  identifier: [
    {
      "@type": "bf:ShelfMark",
      "@value": "*QKKA 08-490",
    },
    {
      "@type": "nypl:Bnumber",
      "@value": "15349955",
    },
    {
      "@type": "nypl:Oclc",
      "@value": "32768016",
    },
    {
      "@type": "bf:Lccn",
      "@value": "sn 95033418",
    },
    {
      "@type": "bf:Issn",
      "@value": "0352-7751",
    },
    {
      "@type": "bf:Identifier",
      "@value": "(OCoLC)32768016",
    },
  ],
  issuance: [
    {
      "@id": "urn:biblevel:s",
      prefLabel: "serial",
    },
  ],
  itemAggregations: [
    {
      "@type": "nypl:Aggregation",
      "@id": "res:location",
      id: "location",
      field: "location",
      values: [
        {
          value: "loc:rc2ma",
          count: 29,
          label: "Offsite",
        },
        {
          value: "loc:rcma2",
          count: 4,
          label: "Offsite",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:format",
      id: "format",
      field: "format",
      values: [
        {
          value: "Text",
          count: 33,
          label: "Text",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:status",
      id: "status",
      field: "status",
      values: [
        {
          value: "status:a",
          count: 33,
          label: "Available",
        },
      ],
    },
  ],
  items: [
    {
      "@id": "res:i39598083",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2021",
          lte: "2021",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 51, no. 3 (2021)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433133804421"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 51, no. 3 (2021)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433133804421",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 51, no. 3 (2021)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i39598083",
      volumeRange: [
        {
          gte: 51,
          lte: 51,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "39598083",
      },
    },
    {
      "@id": "res:i37781503",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2019",
          lte: "2019",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 49, no. 1 (2019)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433128574252"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 49, no. 1 (2019)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433128574252",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 49, no. 1 (2019)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i37781503",
      volumeRange: [
        {
          gte: 49,
          lte: 49,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "37781503",
      },
    },
    {
      "@id": "res:i37750298",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2019",
          lte: "2019",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 49, no. 2 (2019)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433128572629"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 49, no. 2 (2019)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433128572629",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 49, no. 2 (2019)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i37750298",
      volumeRange: [
        {
          gte: 49,
          lte: 49,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "37750298",
      },
    },
    {
      "@id": "res:i38171379",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2019",
          lte: "2019",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 49, no. 3 (2019)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433130183837"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 49, no. 3 (2019)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433130183837",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 49, no. 3 (2019)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i38171379",
      volumeRange: [
        {
          gte: 49,
          lte: 49,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "38171379",
      },
    },
    {
      "@id": "res:i37781404",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2018",
          lte: "2018",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 48, no. 1 (2018)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433128574229"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 48, no. 1 (2018)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433128574229",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 48, no. 1 (2018)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i37781404",
      volumeRange: [
        {
          gte: 48,
          lte: 48,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "37781404",
      },
    },
    {
      "@id": "res:i37781426",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2018",
          lte: "2018",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 48, no. 2 (2018)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433128574237"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 48, no. 2 (2018)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433128574237",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 48, no. 2 (2018)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i37781426",
      volumeRange: [
        {
          gte: 48,
          lte: 48,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "37781426",
      },
    },
    {
      "@id": "res:i37781460",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2018",
          lte: "2018",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 48, no. 3 (2018)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433128574245"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 48, no. 3 (2018)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433128574245",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 48, no. 3 (2018)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i37781460",
      volumeRange: [
        {
          gte: 48,
          lte: 48,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "37781460",
      },
    },
    {
      "@id": "res:i36148948",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2017",
          lte: "2017",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 47, no. 1 (2017)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433121646594"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 47, no. 1 (2017)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433121646594",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 47, no. 1 (2017)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i36148948",
      volumeRange: [
        {
          gte: 47,
          lte: 47,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "36148948",
      },
    },
    {
      "@id": "res:i36707995",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2017",
          lte: "2017",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 47, no. 3 (2017)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433121678811"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 47, no. 3 (2017)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433121678811",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 47, no. 3 (2017)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i36707995",
      volumeRange: [
        {
          gte: 47,
          lte: 47,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "36707995",
      },
    },
    {
      "@id": "res:i35541890",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2016",
          lte: "2016",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 46, no. 1 (2016)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433121625903"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 46, no. 1 (2016)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433121625903",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 46, no. 1 (2016)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i35541890",
      volumeRange: [
        {
          gte: 46,
          lte: 46,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "35541890",
      },
    },
    {
      "@id": "res:i35541893",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2016",
          lte: "2016",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 46, no. 2 (2016)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433121625911"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 46, no. 2 (2016)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433121625911",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 46, no. 2 (2016)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i35541893",
      volumeRange: [
        {
          gte: 46,
          lte: 46,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "35541893",
      },
    },
    {
      "@id": "res:i35541897",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2016",
          lte: "2016",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 46, no. 3 (2016)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433121625929"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 46, no. 3 (2016)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433121625929",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 46, no. 3 (2016)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i35541897",
      volumeRange: [
        {
          gte: 46,
          lte: 46,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "35541897",
      },
    },
    {
      "@id": "res:i35339948",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2015",
          lte: "2015",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 45, no. 2 (2015)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433118739402"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 45, no. 2 (2015)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433118739402",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NH"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 45, no. 2 (2015)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i35339948",
      volumeRange: [
        {
          gte: 45,
          lte: 45,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "35339948",
      },
    },
    {
      "@id": "res:i35026629",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2015",
          lte: "2015",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 45, no. 3 (2015)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433121359222"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 45, no. 3 (2015)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433121359222",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 45, no. 3 (2015)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i35026629",
      volumeRange: [
        {
          gte: 45,
          lte: 45,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "35026629",
      },
    },
    {
      "@id": "res:i35339925",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2014",
          lte: "2014",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 44, no. 1 (2014)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433118739576"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 44, no. 1 (2014)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433118739576",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NH"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 44, no. 1 (2014)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i35339925",
      volumeRange: [
        {
          gte: 44,
          lte: 44,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "35339925",
      },
    },
    {
      "@id": "res:i35339932",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2014",
          lte: "2014",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 44, no. 2 (2014)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433118739394"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 44, no. 2 (2014)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433118739394",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NH"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 44, no. 2 (2014)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i35339932",
      volumeRange: [
        {
          gte: 44,
          lte: 44,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "35339932",
      },
    },
    {
      "@id": "res:i35339941",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2014",
          lte: "2014",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 44. no. 3 (2014)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433118739568"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 44. no. 3 (2014)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433118739568",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NH"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 44. no. 3 (2014)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i35339941",
      volumeRange: [
        {
          gte: 44,
          lte: 44,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "35339941",
      },
    },
    {
      "@id": "res:i35328127",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2013",
          lte: "2013",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 43, no. 1 (2013)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433118739584"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 43, no. 1 (2013)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433118739584",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NH"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 43, no. 1 (2013)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i35328127",
      volumeRange: [
        {
          gte: 43,
          lte: 43,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "35328127",
      },
    },
    {
      "@id": "res:i37234070",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2013",
          lte: "2013",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 43, no. 2 (2013)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433127828808"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 43, no. 2 (2013)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433127828808",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 43, no. 2 (2013)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i37234070",
      volumeRange: [
        {
          gte: 43,
          lte: 43,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "37234070",
      },
    },
    {
      "@id": "res:i32534074",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:u",
          prefLabel: "Supervised use",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:29",
          prefLabel: "bundled materials (vols.)",
        },
      ],
      dateRange: [
        {
          gte: "2012",
          lte: "2012",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 42 (2012)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433116773122"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 42 (2012)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433116773122",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NH"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 42 (2012)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i32534074",
      volumeRange: [
        {
          gte: 42,
          lte: 42,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "32534074",
      },
    },
    {
      "@id": "res:i29633948",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:4",
          prefLabel: "serial, loose",
        },
      ],
      dateRange: [
        {
          gte: "2011",
          lte: "2011",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 41, no. 1 (2011)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433106833985"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 41, no. 1 (2011)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433106833985",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NH"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 41, no. 1 (2011)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i29633948",
      volumeRange: [
        {
          gte: 41,
          lte: 41,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "29633948",
      },
    },
    {
      "@id": "res:i32534068",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:u",
          prefLabel: "Supervised use",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:29",
          prefLabel: "bundled materials (vols.)",
        },
      ],
      dateRange: [
        {
          gte: "2011",
          lte: "2011",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 41, no. 2-3 (2011)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433116773114"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 41, no. 2-3 (2011)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433116773114",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NH"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 41, no. 2-3 (2011)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i32534068",
      volumeRange: [
        {
          gte: 41,
          lte: 41,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "32534068",
      },
    },
    {
      "@id": "res:i30979713",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2010",
          lte: "2010",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 40, no. 1 (2010)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433110348475"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 40, no. 1 (2010)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433110348475",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 40, no. 1 (2010)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i30979713",
      volumeRange: [
        {
          gte: 40,
          lte: 40,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "30979713",
      },
    },
    {
      "@id": "res:i30979714",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2010",
          lte: "2010",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 40, no. 2 (2010)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433110348483"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 40, no. 2 (2010)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433110348483",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 40, no. 2 (2010)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i30979714",
      volumeRange: [
        {
          gte: 40,
          lte: 40,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "30979714",
      },
    },
    {
      "@id": "res:i30979715",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2010",
          lte: "2010",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 40, no. 3 (2010)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433110348491"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 40, no. 3 (2010)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433110348491",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 40, no. 3 (2010)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i30979715",
      volumeRange: [
        {
          gte: 40,
          lte: 40,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "30979715",
      },
    },
    {
      "@id": "res:i30979719",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2009",
          lte: "2009",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 39, no. 1 (2009)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433110348509"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 39, no. 1 (2009)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433110348509",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 39, no. 1 (2009)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i30979719",
      volumeRange: [
        {
          gte: 39,
          lte: 39,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "30979719",
      },
    },
    {
      "@id": "res:i30979720",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2009",
          lte: "2009",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 39, no. 2 (2009)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433110348517"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 39, no. 2 (2009)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433110348517",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 39, no. 2 (2009)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i30979720",
      volumeRange: [
        {
          gte: 39,
          lte: 39,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "30979720",
      },
    },
    {
      "@id": "res:i30979721",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2009",
          lte: "2009",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 39, no. 3 (2009)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433110348525"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 39, no. 3 (2009)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433110348525",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 39, no. 3 (2009)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i30979721",
      volumeRange: [
        {
          gte: 39,
          lte: 39,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "30979721",
      },
    },
    {
      "@id": "res:i31157821",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2006",
          lte: "2006",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 36, no. 1 (2006)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433115816088"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 36, no. 1 (2006)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433115816088",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 36, no. 1 (2006)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i31157821",
      volumeRange: [
        {
          gte: 36,
          lte: 36,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "31157821",
      },
    },
    {
      "@id": "res:i17595234",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2005",
          lte: "2005",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 35 (2005)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rcma2",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433083243927"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 35 (2005)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433083243927",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 35 (2005)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i17595234",
      volumeRange: [
        {
          gte: 35,
          lte: 35,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "17595234",
      },
    },
    {
      "@id": "res:i17595233",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2004",
          lte: "2004",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 34 (2004)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rcma2",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433083243919"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 34 (2004)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433083243919",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 34 (2004)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i17595233",
      volumeRange: [
        {
          gte: 34,
          lte: 34,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "17595233",
      },
    },
    {
      "@id": "res:i17595232",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "2003",
          lte: "2003",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 33 (2003)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rcma2",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433083243901"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 33 (2003)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433083243901",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 33 (2003)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i17595232",
      volumeRange: [
        {
          gte: 33,
          lte: 33,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "17595232",
      },
    },
    {
      "@id": "res:i17595231",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:3",
          prefLabel: "serial",
        },
      ],
      dateRange: [
        {
          gte: "1999",
          lte: "2002",
        },
      ],
      eddRequestable: true,
      enumerationChronology: ["v. 29-32, inc. (1999-2002)"],
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:rcma2",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433083243893"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*QKKA 08-490 v. 29-32, inc. (1999-2002)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433083243893",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["*QKKA 08-490"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["*QKKA 08-490 v. 29-32, inc. (1999-2002)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i17595231",
      volumeRange: [
        {
          gte: 29,
          lte: 32,
        },
      ],
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "17595231",
      },
    },
  ],
  language: [
    {
      "@id": "lang:srp",
      prefLabel: "Serbian",
    },
  ],
  lccClassification: ["DR1932 .P68"],
  materialType: [
    {
      "@id": "resourcetypes:txt",
      prefLabel: "Text",
    },
  ],
  mediaType: [
    {
      "@id": "mediatypes:n",
      prefLabel: "unmediated",
    },
  ],
  note: [
    {
      noteType: "Supplement",
      "@type": "bf:Note",
      prefLabel: "Has supplement, <2012-2016>: Pojedinačno.",
    },
    {
      noteType: "Language",
      "@type": "bf:Note",
      prefLabel: "Serbian;",
    },
    {
      noteType: "Issued By",
      "@type": "bf:Note",
      prefLabel: "Issued by: Narodna biblioteka Kraljevo.",
    },
    {
      noteType: "Linking Entry",
      "@type": "bf:Note",
      prefLabel: "Has supplement, <2005-> : Preporučeno, ISSN 1452-3531",
    },
    {
      noteType: "Linking Entry",
      "@type": "bf:Note",
      prefLabel: "Has supplement, <2006-> : Vidi čuda, ISSN 1452-7316",
    },
    {
      noteType: "Source of Description",
      "@type": "bf:Note",
      prefLabel: "G. 46, 3 (2016).",
    },
  ],
  numCheckinCardItems: 0,
  numElectronicResources: 0,
  numItemDatesParsed: 33,
  numItemVolumesParsed: 33,
  numItemsMatched: 33,
  numItemsTotal: 33,
  nyplSource: ["sierra-nypl"],
  parallelContributorLiteral: [
    'Народна библиотека "Стефан Првовенчани," issuing body.',
    "Народна библиотека Краљево, issuing body.",
    'Народна библиотека "Радослав Веснић Краљево, issuing body.',
  ],
  parallelDescription: [
    '"Часопис за књижевности, уметност, културу, просветна и друштвена питања."',
  ],
  parallelNote: [
    null,
    null,
    null,
    null,
    "Has supplement, <2006-> : Види чуда, ISSN 1452-7316",
  ],
  parallelPlaceOfPublication: ["Краљево"],
  parallelPublicationStatement: [
    null,
    'Краљево : Народна библиотека "Стефан Првовенчани"',
  ],
  parallelPublisherLiteral: [
    "Слово",
    'Народна библиотека "Стефан Првовенчани"',
  ],
  parallelTitle: ["Повеља."],
  parallelTitleAlt: ["", "Појединачно."],
  parallelTitleDisplay: ["Повеља."],
  placeOfPublication: ["Kraljevo"],
  publicationStatement: [
    "Kraljevo : Slovo, 1985-",
    'Kraljevo : Narodna biblioteka "Stefan Prvovenčani"',
  ],
  publisherLiteral: ["Slovo", 'Narodna biblioteka "Stefan Prvovenčani"'],
  serialPublicationDates: [
    "Nova serija g. 15, br. 1 (1985)-nova serija 27, br. 4 (1997); g. 28, br. 1 (1998)-",
  ],
  shelfMark: ["*QKKA 08-490"],
  subjectLiteral: [
    "Civilization.",
    "Serbia -- Civilization -- Periodicals.",
    "Serbia.",
    "Serbia and Montenegro.",
  ],
  title: ["Povelja."],
  titleAlt: ["Povelja (1985)", "Pojedinačno."],
  titleDisplay: ["Povelja."],
  type: ["nypl:Item"],
  updatedAt: 1701800645919,
  uri: "b15349955",
  suppressed: false,
  hasItemVolumes: true,
  hasItemDates: true,
}

export const noParallels = {
  "@context":
    "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
  "@type": ["nypl:Item", "nypl:Resource"],
  "@id": "res:b16145054",
  carrierType: [
    {
      "@id": "carriertypes:nc",
      prefLabel: "volume",
    },
  ],
  createdString: ["2005"],
  createdYear: 2005,
  creatorLiteral: ["Cortanze, Gérard de."],
  dateStartYear: 2005,
  dateString: ["2005"],
  dimensions: ["19 cm."],
  electronicResources: [],
  extent: ["193 p. : ill. ;"],
  idIsbn: ["2070775178"],
  idLccn: ["2005483039"],
  identifier: [
    {
      "@type": "bf:ShelfMark",
      "@value": "JFC 06-438",
    },
    {
      "@type": "nypl:Bnumber",
      "@value": "16145054",
    },
    {
      "@type": "bf:Isbn",
      "@value": "2070775178",
    },
    {
      "@type": "bf:Lccn",
      "@value": "2005483039",
    },
    {
      "@type": "bf:Identifier",
      "@value": "(WaOLN)M040000221",
    },
  ],
  issuance: [
    {
      "@id": "urn:biblevel:m",
      prefLabel: "monograph/item",
    },
  ],
  itemAggregations: [
    {
      "@type": "nypl:Aggregation",
      "@id": "res:location",
      id: "location",
      field: "location",
      values: [
        {
          value: "loc:rc2ma",
          count: 1,
          label: "Offsite",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:format",
      id: "format",
      field: "format",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:status",
      id: "status",
      field: "status",
      values: [
        {
          value: "status:a",
          count: 1,
          label: "Available",
        },
      ],
    },
  ],
  items: [
    {
      "@id": "res:i15550040",
      accessMessage: [
        {
          "@id": "accessMessage:2",
          prefLabel: "Request in advance",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:55",
          prefLabel: "book, limited circ, MaRLI",
        },
      ],
      eddRequestable: true,
      holdingLocation: [
        {
          "@id": "loc:rc2ma",
          prefLabel: "Offsite",
        },
      ],
      idBarcode: ["33433073236758"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "JFC 06-438",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433073236758",
        },
      ],
      owner: [
        {
          "@id": "orgs:1000",
          prefLabel: "Stephen A. Schwarzman Building",
        },
      ],
      physRequestable: true,
      physicalLocation: ["JFC 06-438"],
      recapCustomerCode: ["NA"],
      requestable: [true],
      shelfMark: ["JFC 06-438"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i15550040",
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "15550040",
      },
    },
  ],
  language: [
    {
      "@id": "lang:fre",
      prefLabel: "French",
    },
  ],
  lccClassification: ["PQ2663.O7223 Z46 2005"],
  materialType: [
    {
      "@id": "resourcetypes:txt",
      prefLabel: "Text",
    },
  ],
  mediaType: [
    {
      "@id": "mediatypes:n",
      prefLabel: "unmediated",
    },
  ],
  numAvailable: 1,
  numElectronicResources: 0,
  numItems: 1,
  numItemsMatched: 1,
  numItemsTotal: 1,
  nyplSource: ["sierra-nypl"],
  placeOfPublication: ["[Paris, France] :"],
  publicationStatement: ["[Paris, France] : Gallimard, c2005."],
  publisherLiteral: ["Gallimard,"],
  seriesStatement: ["Haute enfance"],
  shelfMark: ["JFC 06-438"],
  subjectLiteral: [
    "Authors, French -- 20th century -- Biography.",
    "Autobiographical Narrative",
    "Cortanze, Gérard de -- Childhood and youth.",
  ],
  title: ["Spaghetti!"],
  titleDisplay: ["Spaghetti! / Gérard de Cortanze."],
  type: ["nypl:Item"],
  uniformTitle: ["Haute enfance (Gallimard (Firm))"],
  updatedAt: 1636662031868,
  uri: "b16145054",
  suppressed: false,
  hasItemVolumes: false,
  hasItemDates: false,
}

export const yiddishBib = {
  "@context":
    "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
  "@type": ["nypl:Item", "nypl:Resource"],
  "@id": "res:b13966759",
  carrierType: [
    {
      "@id": "carriertypes:nc",
      prefLabel: "volume",
    },
  ],
  contributorLiteral: ["Sztokfisz, David."],
  createdString: ["1968"],
  createdYear: 1968,
  dateStartYear: 1968,
  dateString: ["1968"],
  dimensions: ["25 cm."],
  electronicResources: [
    {
      url: "https://digitalcollections.nypl.org/items/f9706f90-64a7-0133-547d-00505686a51c",
      prefLabel: "NYPL Digital Collections",
    },
    {
      url: "https://www.yiddishbookcenter.org/collections/yizkor-books/yzk-nybc313724",
      prefLabel: "Yiddish Book Center",
    },
  ],
  extent: ["418 p. : ill., facsims., ports. ;"],
  genreForm: ["Memorial books (Holocaust)"],
  idLccn: ["he 68003086"],
  idOclc: ["19207169", "NYPH98-B4722"],
  identifier: [
    {
      "@type": "bf:ShelfMark",
      "@value": "*PXW (Khorostkov) (Sefer Ḥorosṭḳov. 1968)",
    },
    {
      "@type": "nypl:Bnumber",
      "@value": "13966759",
    },
    {
      "@type": "bf:Lccn",
      "@value": "he 68003086",
    },
    {
      "@type": "nypl:Oclc",
      "@value": "19207169",
    },
    {
      "@type": "nypl:Oclc",
      "@value": "19207169",
    },
    {
      "@type": "nypl:Oclc",
      "@value": "NYPH98-B4722",
    },
    {
      "@type": "bf:Identifier",
      "@value": "(WaOLN)nyp0553876",
    },
    {
      "@type": "bf:Identifier",
      "@value": "(OCoLC)19207169",
    },
  ],
  issuance: [
    {
      "@id": "urn:biblevel:m",
      prefLabel: "monograph/item",
    },
  ],
  itemAggregations: [
    {
      "@type": "nypl:Aggregation",
      "@id": "res:location",
      id: "location",
      field: "location",
      values: [
        {
          value: "loc:maf82",
          count: 1,
          label: "Schwarzman Building - Dorot Jewish Division Room 111",
        },
        {
          value: "loc:maff3",
          count: 1,
          label: "Schwarzman Building - Dorot Jewish Division Desk Room 111",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:format",
      id: "format",
      field: "format",
      values: [
        {
          value: "Text",
          count: 3,
          label: "Text",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:status",
      id: "status",
      field: "status",
      values: [
        {
          value: "status:a",
          count: 2,
          label: "Available",
        },
      ],
    },
  ],
  items: [
    {
      "@id": "res:i16894049",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:1",
          prefLabel: "Use in library",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:65",
          prefLabel: "book, good condition, non-MaRLI",
        },
      ],
      eddRequestable: false,
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:maf82",
          prefLabel: "Schwarzman Building - Dorot Jewish Division Room 111",
        },
      ],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*PXW (Khorostkov) (Sefer Horostkov. 1968)",
        },
      ],
      owner: [
        {
          "@id": "orgs:1103",
          prefLabel: "Dorot Jewish Division",
        },
      ],
      physRequestable: false,
      physicalLocation: ["*PXW (Khorostkov) (Sefer Horostkov. 1968)"],
      requestable: [false],
      shelfMark: ["*PXW (Khorostkov) (Sefer Horostkov. 1968)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i16894049",
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "16894049",
      },
    },
    {
      "@id": "res:i25791623",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:1",
          prefLabel: "Use in library",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:65",
          prefLabel: "book, good condition, non-MaRLI",
        },
      ],
      eddRequestable: true,
      formatLiteral: ["Text"],
      holdingLocation: [
        {
          "@id": "loc:maff3",
          prefLabel:
            "Schwarzman Building - Dorot Jewish Division Desk Room 111",
        },
      ],
      idBarcode: ["33433084745110"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "*P (Yizkor books. Reprint. Khorostkov)",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433084745110",
        },
      ],
      owner: [
        {
          "@id": "orgs:1103",
          prefLabel: "Dorot Jewish Division",
        },
      ],
      physRequestable: false,
      physicalLocation: ["*P (Yizkor books. Reprint. Khorostkov)"],
      requestable: [true],
      shelfMark: ["*P (Yizkor books. Reprint. Khorostkov)"],
      specRequestable: false,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i25791623",
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "25791623",
      },
    },
  ],
  language: [
    {
      "@id": "lang:heb",
      prefLabel: "Hebrew",
    },
  ],
  lccClassification: ["DS135.R93 K42 1968"],
  materialType: [
    {
      "@id": "resourcetypes:txt",
      prefLabel: "Text",
    },
  ],
  mediaType: [
    {
      "@id": "mediatypes:n",
      prefLabel: "unmediated",
    },
  ],
  note: [
    {
      noteType: "Language",
      "@type": "bf:Note",
      prefLabel: "Hebrew orYiddish.",
    },
  ],
  numAvailable: 2,
  numCheckinCardItems: 0,
  numElectronicResources: 2,
  numItemDatesParsed: 0,
  numItemVolumesParsed: 0,
  numItems: 2,
  numItemsMatched: 2,
  numItemsTotal: 2,
  nyplSource: ["sierra-nypl"],
  parallelContributorLiteral: ["‏שטאקפיש, דוד."],
  parallelPlaceOfPublication: ["‏תל אביב"],
  parallelPublicationStatement: [
    "‏תל אביב : ועד ארגון יוצאי חורוסטוב בישראל, 8691.",
  ],
  parallelPublisherLiteral: ["‏ועד ארגון יוצאי חורוסטוב בישראל"],
  parallelTitle: ["‏ספר חורוסטוב = Chrostkow book"],
  parallelTitleAlt: ["‏חורוסטקוב; ספר-זכרון"],
  parallelTitleDisplay: [
    "‏ספר חורוסטוב = Chrostkow book / העורך, דוד שטאקפיש.",
  ],
  placeOfPublication: ["Tel Aviv"],
  publicationStatement: [
    "Tel Aviv : Ṿaʻad irgun yotsʼe Ḥorosṭḳov be-Yiśraʼel, 1968.",
  ],
  publisherLiteral: ["Ṿaʻad irgun yotsʼe Ḥorosṭḳov be-Yiśraʼel"],
  shelfMark: ["*PXW (Khorostkov) (Sefer Ḥorosṭḳov. 1968)"],
  subjectLiteral: [
    "Jews -- Khorostkov -- History.",
    "Holocaust, Jewish (1939-1945) -- Khorostkov.",
    "Khorostkov (Ukraine) -- Ethnic relations.",
  ],
  title: ["Sefer Ḥorosṭḳov = Chorostkow book"],
  titleAlt: ["Horosṭḳov; sefer zikaron"],
  titleDisplay: [
    "Sefer Ḥorosṭḳov = Chorostkow book / ha-ʻorekh, Daṿid Shṭoḳfish.",
  ],
  type: ["nypl:Item"],
  updatedAt: 1678659577819,
  uri: "b13966759",
  suppressed: false,
  hasItemVolumes: false,
  hasItemDates: false,
}
