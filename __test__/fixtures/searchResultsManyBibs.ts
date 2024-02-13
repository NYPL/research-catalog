export const results = {
  "@context":
    "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
  "@type": "itemList",
  itemListElement: [
    {
      "@type": "searchResult",
      searchResultScore: 91.80683,
      result: {
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
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 86.01255,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b17170369",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Barry, Katharina,"],
        createdString: ["1965"],
        createdYear: 1965,
        creatorLiteral: ["Joslin, Sesyle."],
        dateStartYear: 1965,
        dateString: ["1965"],
        electronicResources: [],
        extent: ["1v. (unpaged) illus."],
        idLccn: ["   65012333"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "17170369",
          },
          {
            "@type": "bf:Lccn",
            "@value": "   65012333",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i22471083",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:2",
                prefLabel: "book non-circ",
              },
            ],
            eddRequestable: true,
            holdingLocation: [
              {
                "@id": "loc:mal92",
                prefLabel: "Schwarzman Building M2 - General Research Room 315",
              },
            ],
            idBarcode: ["33333069027734"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "J 458.3 J",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33333069027734",
              },
            ],
            m2CustomerCode: ["NH"],
            physRequestable: true,
            physicalLocation: ["J 458.3 J"],
            requestable: [true],
            shelfMark: ["J 458.3 J"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i22471083",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "22471083",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
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
        placeOfPublication: ["New York :"],
        publicationStatement: ["New York : Harcourt, Brace & World, [c1965]"],
        publisherLiteral: ["Harcourt, Brace & World,"],
        subjectLiteral: ["Italian language -- Conversation and phrase books."],
        title: ["Spaghetti for breakfast. Spaghetti per prima colazione,"],
        titleAlt: ["Spaghetti per prima colazione."],
        titleDisplay: [
          "Spaghetti for breakfast. Spaghetti per prima colazione, and other useful phrases in Italian and English for young ladies and gentlemen going abroad or staying at home. Illustrated by Katharina Barry.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1636738831637,
        uri: "b17170369",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 86.01255,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b12810991",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1955"],
        createdYear: 1955,
        creatorLiteral: ["Prezzolini, Giuseppe, 1882-"],
        dateStartYear: 1955,
        dateString: ["1955"],
        dimensions: ["22 cm."],
        electronicResources: [],
        extent: ["148 p. illus."],
        idLccn: ["55006407 /L"],
        idOclc: ["787361"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "D-11 2906",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "12810991",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "787361",
          },
          {
            "@type": "bf:Lccn",
            "@value": "55006407 /L",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)nyp2791238",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i10572545",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:55",
                prefLabel: "book, limited circ, MaRLI",
              },
            ],
            eddRequestable: true,
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:mal82",
                prefLabel: "Schwarzman Building - Main Reading Room 315",
              },
            ],
            idBarcode: ["33433090622188"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "D-11 2906",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433090622188",
              },
            ],
            owner: [
              {
                "@id": "orgs:1101",
                prefLabel: "General Research Division",
              },
            ],
            physRequestable: true,
            physicalLocation: ["D-11 2906"],
            requestable: [true],
            shelfMark: ["D-11 2906"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i10572545",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "10572545",
            },
          },
          {
            "@id": "res:i10572546",
            "@type": ["bf:Item"],
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
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:rc2ma",
                prefLabel: "Offsite",
              },
            ],
            idBarcode: ["33433077546822"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value":
                  "VTI (Prezzolini, G. History of spaghetti eating and cooking for: spaghetti dinner)",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433077546822",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: [
              "VTI (Prezzolini, G. History of spaghetti eating and cooking for: spaghetti dinner)",
            ],
            recapCustomerCode: ["NA"],
            requestable: [true],
            shelfMark: [
              "VTI (Prezzolini, G. History of spaghetti eating and cooking for: spaghetti dinner)",
            ],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i10572546",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "10572546",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["TS2157 .P7"],
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
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItemsMatched: 2,
        numItemsTotal: 2,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["New York"],
        publicationStatement: ["New York, Abelard-Schuman [1955]"],
        publisherLiteral: ["Abelard-Schuman"],
        shelfMark: ["D-11 2906"],
        subjectLiteral: ["Pasta products.", "Cooking (Pasta)"],
        title: [
          "A history of spaghetti eating and cooking for: spaghetti dinner.",
        ],
        titleAlt: ["Spaghetti dinner."],
        titleDisplay: [
          "A history of spaghetti eating and cooking for: spaghetti dinner.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1696279034748,
        uri: "b12810991",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.51551,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b12554093",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Brown, David, journalist."],
        createdString: ["1943"],
        createdYear: 1943,
        creatorLiteral: ["Wagg, Alfred."],
        dateStartYear: 1943,
        dateString: ["1943"],
        dimensions: ["23 cm."],
        electronicResources: [],
        extent: ["231 p."],
        idLccn: ["44003956"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "BZAS (Wagg, A. No spaghetti for breakfast)",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "12554093",
          },
          {
            "@type": "bf:Lccn",
            "@value": "44003956",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)nyp2536432",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i16098463",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
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
                "@id": "loc:mal92",
                prefLabel: "Schwarzman Building M2 - General Research Room 315",
              },
            ],
            idBarcode: ["33433106233533"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "BZAS (Wagg, A. No spaghetti for breakfast)",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433106233533",
              },
            ],
            m2CustomerCode: ["XA"],
            physRequestable: true,
            physicalLocation: ["BZAS (Wagg, A. No spaghetti for breakfast)"],
            requestable: [true],
            shelfMark: ["BZAS (Wagg, A. No spaghetti for breakfast)"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i16098463",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "16098463",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["D763.I8 W3"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: '"First published in 1943."',
          },
        ],
        numAvailable: 1,
        numElectronicResources: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["London,"],
        publicationStatement: ["London, Nicholson & Watson [1943]"],
        publisherLiteral: ["Nicholson & Watson"],
        shelfMark: ["BZAS (Wagg, A. No spaghetti for breakfast)"],
        subjectLiteral: [
          "World War, 1939-1945 -- Campaigns -- Italy.",
          "World War, 1939-1945 -- Naval operations.",
          "World War, 1939-1945 -- Personal narratives.",
        ],
        title: ["No spaghetti for breakfast"],
        titleDisplay: [
          "No spaghetti for breakfast [by] Alfred Wagg and David Brown.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1636295234564,
        uri: "b12554093",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.51551,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b22133121",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: [
          "Acosta, María",
          "Gomez, Vanessa, 1984-",
          "OverDrive, Inc.",
        ],
        createdString: ["2019"],
        createdYear: 2019,
        creatorLiteral: ["Persico, Nicky"],
        dateStartYear: 2019,
        dateString: ["2019"],
        description: [
          "Un abogado en prácticas inexperto y un poco torpe se ve involucrado en la defensa de dos mujeres muy diferentes entre ellas por edad y clase social, unidas por el hecho de ser ambas víctimas de la violencia. A partir de aquí se desenmaraña, aderezado por intrigantes mezclas culinarias, un denso entramado de historias y personas que, entre el suspense y la gravedad, se adentra en el fenómeno del acoso y de la manipulación por medio de una sucesión de eventos destinados a revelar una realidad insospechable. En una encantadora Puglia, descripta de manera cuanto menos original, Nicky Persico guía al lector a través de un mundo de individuos peligrosos (enemigos invisibles ante los ojos de todo el mundo, y sin embargo envidiosos de la vida y la vitalidad de las víctimas que persiguen) proponiendo la receta que su protagonista ha ideado para transformar elementos triviales en filosofía de vida: los Spaghetti Paradiso.",
        ],
        electronicResources: [
          {
            url: "http://link.overdrive.com/?websiteId=37&titleId=5312492",
            prefLabel: "Access eNYPL",
          },
        ],
        extent: [
          "1 online resource (1 sound file (06 hr., 55 min., 34 sec.)) : digital",
        ],
        genreForm: ["Audiobooks.", "Fiction."],
        idIsbn: ["9788835401155", "8835401151"],
        idOclc: ["1144496190"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "22133121",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788835401155",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8835401151",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "1144496190",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "1144496190",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)1144496190",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [],
        language: [
          {
            "@id": "lang:spa",
            prefLabel: "Spanish",
          },
        ],
        lccClassification: ["PQ4916.E778 S63 2019"],
        materialType: [
          {
            "@id": "resourcetypes:aud",
            prefLabel: "Audio",
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
        placeOfPublication: ["[Solon, Ohio]"],
        publicationStatement: ["[Solon, Ohio] : Tektime, 2019."],
        publisherLiteral: ["Tektime"],
        subjectLiteral: [
          "Sexual harassment of women -- Fiction.",
          "Sexual harassment of women.",
          "Puglia (Italy) -- Fiction.",
          "Italy -- Puglia.",
        ],
        title: ["Spaghetti paradiso"],
        titleDisplay: [
          "Spaghetti paradiso / Nicky Persico ; traducción por: María Acosta.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1681346906709,
        uri: "b22133121",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.51551,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b17922236",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1978"],
        createdYear: 1978,
        creatorLiteral: ["Frascino, Edward"],
        dateStartYear: 1978,
        dateString: ["1978"],
        electronicResources: [],
        idIsbn: ["0060219084 "],
        idLccn: ["   77011850"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "17922236",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0060219084 :",
          },
          {
            "@type": "bf:Lccn",
            "@value": "   77011850",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i22323584",
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
            idBarcode: ["33333026891123"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "J FIC F",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33333026891123",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["J FIC F"],
            recapCustomerCode: ["NH"],
            requestable: [true],
            shelfMark: ["J FIC F"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i22323584",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "22323584",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PZ7.F8596 Ed 1978"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Illustrations by the author.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              "Ten episodes in the life of a nine-year-old boy growing up in Yonkers during the early 1940's.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Sequel: Eddie Spaghetti on the homefront.",
          },
        ],
        numAvailable: 1,
        numElectronicResources: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        publicationStatement: ["Harper & Row, c1978."],
        publisherLiteral: ["Harper & Row"],
        subjectLiteral: [
          "Families -- Yonkers -- Fiction.",
          "Yonkers (N.Y.) -- Fiction.",
        ],
        title: ["Eddie Spaghetti."],
        titleDisplay: ["Eddie Spaghetti."],
        type: ["nypl:Item"],
        updatedAt: 1652368876644,
        uri: "b17922236",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.51551,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b10822143",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Garcia, Tom."],
        createdString: ["1982"],
        createdYear: 1982,
        creatorLiteral: ["Glazer, Tom."],
        dateStartYear: 1982,
        dateString: ["1982"],
        description: [
          'A parody, sung to the tune of "On Top of Old Smokey," tracing the meanderings of a meatball that was sneezed off a plate of spaghetti.',
        ],
        dimensions: ["29 cm."],
        electronicResources: [],
        extent: ["[32] p. : chiefly ill., music ;"],
        idIsbn: ["0385142501 ", "038514251X (lib. bdg.)"],
        idLccn: ["81043042 /AC"],
        idOclc: ["7460003", "NYPG83-B7402"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JNF 83-31",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "10822143",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0385142501 :",
          },
          {
            "@type": "bf:Isbn",
            "@value": "038514251X (lib. bdg.)",
          },
          {
            "@type": "bf:Lccn",
            "@value": "81043042 /AC",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "7460003",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "7460003",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "NYPG83-B7402",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)nyp0829107",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)7460003",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i13919667",
            "@type": ["bf:Item"],
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
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:rcpm2",
                prefLabel: "Offsite",
              },
            ],
            idBarcode: ["33433047216829"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JNF 83-31",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433047216829",
              },
            ],
            owner: [
              {
                "@id": "orgs:1002",
                prefLabel:
                  "New York Public Library for the Performing Arts, Dorothy and Lewis B. Cullman Center",
              },
            ],
            physRequestable: true,
            physicalLocation: ["JNF 83-31"],
            recapCustomerCode: ["NP"],
            requestable: [true],
            shelfMark: ["JNF 83-31"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i13919667",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "13919667",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PZ8.3.G427 On 1982"],
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
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["Garden City, N.Y."],
        publicationStatement: ["Garden City, N.Y. : Doubleday, c1982."],
        publisherLiteral: ["Doubleday"],
        shelfMark: ["JNF 83-31"],
        subjectLiteral: ["Children's songs.", "Humorous songs."],
        title: ["On top of spaghetti"],
        titleDisplay: [
          "On top of spaghetti / Tom Glazer ; illustrated by Tom Garcia.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1689722756592,
        uri: "b10822143",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.51551,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b20940876",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Lyons, George (Harpist)", "Yosco, Bob"],
        createdString: ["1910"],
        createdYear: 1910,
        dateEndString: ["1910"],
        dateEndYear: 1910,
        dateStartYear: 1910,
        dateString: ["1910"],
        dimensions: ["36 cm"],
        electronicResources: [],
        extent: ["1 score (5 pages) ;"],
        genreForm: ["Music.", "Ragtime music."],
        idOclc: ["50680760"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "P.I. (Rag) (Lyons. Spaghetti rag. Copy 1)",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "20940876",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "50680760",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "50680760",
          },
          {
            "@type": "bf:Identifier",
            "@value": "Spaghetti rag 3 Shapiro Music Publisher",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)50680760",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i33957686",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:u",
                prefLabel: "Supervised use",
              },
            ],
            aeonUrl: [
              "https://specialcollections.nypl.org/aeon/Aeon.dll?Action=10&Form=30&Title=Spaghetti+rag&Site=LPAMR&CallNumber=P.I.+(Rag)+(Lyons.+Spaghetti+rag.+Copy+1)&ItemInfo3=https://catalog.nypl.org/record=b20940876&ReferenceNumber=b209408765&ItemInfo1=SUPERVISED+USE&ItemNumber=33433118092406&ItemISxN=i339576868&Genre=Score&Location=Performing+Arts+Music+and+Recorded+Sound",
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:7",
                prefLabel: "printed music, non-circ",
              },
            ],
            eddRequestable: false,
            formatLiteral: ["Notated music"],
            holdingLocation: [
              {
                "@id": "loc:pam38",
                prefLabel: "Performing Arts Research Collections - Music",
              },
            ],
            idBarcode: ["33433118092406"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "P.I. (Rag) (Lyons. Spaghetti rag. Copy 1)",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433118092406",
              },
            ],
            physRequestable: false,
            physicalLocation: ["P.I. (Rag) (Lyons. Spaghetti rag. Copy 1)"],
            requestable: [true],
            shelfMark: ["P.I. (Rag) (Lyons. Spaghetti rag. Copy 1)"],
            specRequestable: true,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i33957686",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "33957686",
            },
          },
        ],
        language: [
          {
            "@id": "lang:zxx",
            prefLabel: "No linguistic content",
          },
        ],
        materialType: [
          {
            "@id": "resourcetypes:not",
            prefLabel: "Notated music",
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "For piano.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Cover title.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              "Cover design includes drawing of a man eating spaghetti with his hands near a canal in Venice; includes photograph inset of George Lyons (seated by a harp) and Bob Yosco.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Price: 6.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Publisher's advertisments on p. [2 & 6].",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["New York"],
        publicationStatement: ["New York : Shapiro Music, [1910]", "©1910"],
        publisherLiteral: ["Shapiro Music"],
        shelfMark: ["P.I. (Rag) (Lyons. Spaghetti rag. Copy 1)"],
        subjectLiteral: [
          "1901-1910",
          "Popular instrumental music -- United States -- 1901-1910.",
          "Food -- Songs and music.",
          "Ragtime music.",
          "Piano music (Ragtime)",
          "Food.",
          "Popular instrumental music.",
          "United States.",
        ],
        title: ["Spaghetti rag"],
        titleDisplay: [
          "Spaghetti rag / composed, played and introduced by Lyons & Yosco.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1690396218783,
        uri: "b20940876",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.03153,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b17411159",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["2002"],
        createdYear: 2002,
        creatorLiteral: ["DiSalvo, DyAnne."],
        dateStartYear: 2002,
        dateString: ["2002"],
        description: [
          "Angelo and his grandfather help rejuvenate a local park.",
        ],
        dimensions: ["29 cm."],
        electronicResources: [],
        extent: ["1 v. (unpaged) : col. ill. ;"],
        genreForm: ["Picture books."],
        idIsbn: ["0823416828"],
        idLccn: ["  2001040605"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "17411159",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0823416828",
          },
          {
            "@type": "bf:Lccn",
            "@value": "  2001040605",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i19112911",
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
            idBarcode: ["33333170808014"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "J PIC D",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33333170808014",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["J PIC D"],
            recapCustomerCode: ["NH"],
            requestable: [true],
            shelfMark: ["J PIC D"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i19112911",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "19112911",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PZ7.D6224 Sp 2002"],
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
        placeOfPublication: ["New York :"],
        publicationStatement: ["New York : Holiday House, c2002."],
        publisherLiteral: ["Holiday House,"],
        subjectLiteral: [
          "City and town life -- Fiction.",
          "Grandfathers -- Fiction.",
          "Parks -- Fiction.",
        ],
        title: ["Spaghetti park"],
        titleDisplay: ["Spaghetti park / Dyanne DiSalvo-Ryan."],
        type: ["nypl:Item"],
        updatedAt: 1636738833862,
        uri: "b17411159",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.03153,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b16750706",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Do-Re-Mi Children's Chorus. prf"],
        createdString: ["1963"],
        createdYear: 1963,
        creatorLiteral: ["Glazer, Tom."],
        dateStartYear: 1963,
        dateString: ["1963"],
        dimensions: ["12 in."],
        electronicResources: [],
        extent: ["1 sound disc (31 min.) : analog, 33 1/3 rpm, mono. ;"],
        idOclc: ["14928827"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*LZR 62542",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "16750706",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "14928827",
          },
          {
            "@type": "bf:Identifier",
            "@value": "KL-1331 Kapp",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)A150000114",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i17431243",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:12",
                prefLabel: "musical sound recording",
              },
            ],
            eddRequestable: false,
            formatLiteral: ["Audio"],
            holdingLocation: [
              {
                "@id": "loc:pah22",
                prefLabel:
                  "Performing Arts Research Collections - Recorded Sound",
              },
            ],
            idBarcode: ["33433035756018"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "*LZR 62542 [Disc]",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433035756018",
              },
            ],
            physRequestable: false,
            physicalLocation: ["*LZR 62542 [Disc]"],
            requestable: [false],
            shelfMark: ["*LZR 62542 [Disc]"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i17431243",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "17431243",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        materialType: [
          {
            "@id": "resourcetypes:aud",
            prefLabel: "Audio",
          },
        ],
        mediaType: [
          {
            "@id": "mediatypes:n",
            prefLabel: "unmediated",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["New York"],
        publicationStatement: ["New York : Kapp, [1963]"],
        publisherLiteral: ["Kapp"],
        shelfMark: ["*LZR 62542"],
        subjectLiteral: ["Children's songs."],
        tableOfContents: [
          "On top of spaghetti -- Puff (the magic dragon) -- From the halls of Montezuma (To the shores of P.T.A.) -- When the dust mops go rolling along -- Be kind to your webfooted friends -- Dance with a dolly -- Dunderbeck --Battle hymn of the children -- There's a hole in the bottom of the sea -- The barbers anthem -- A capital ship -- Oh, how I hate to get up in the morning.",
        ],
        title: ["On top of spaghetti"],
        titleAlt: [
          "On top of spaghetti and more songs children love to sing",
          "Puff (the magic dragon)",
          "From the halls of Montezuma (To the snores of P.T.A.)",
          "When the dust mops go rolling along.",
          "Be kind to your webfooted friends.",
          "Dance with a dolly.",
          "Dunderbeck.",
          "Battle hymn of the children.",
          "There's a hole in the bottom of the sea.",
          "Barbers anthem.",
          "Capital ship.",
          "Oh, how I hate to get up in the morning.",
        ],
        titleDisplay: ["On top of spaghetti [sound recording] / Tom Glazer."],
        type: ["nypl:Item"],
        updatedAt: 1690392356079,
        uri: "b16750706",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.03153,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b22186798",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["2010"],
        createdYear: 2010,
        creatorLiteral: ["Hughes, Howard, 1971-"],
        dateStartYear: 2010,
        dateString: ["2010"],
        dimensions: ["20 cm."],
        electronicResources: [],
        extent: ["160 p., [8] p. of plates : col. ill. ;"],
        idIsbn: ["9781842433034 (pbk.)", "1842433032 (pbk.)"],
        idOclc: ["312626619"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "MFL 10-4218",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "22186798",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9781842433034 (pbk.)",
          },
          {
            "@type": "bf:Isbn",
            "@value": "1842433032 (pbk.)",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "312626619",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "312626619",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)312626619",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i37907042",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:2",
                prefLabel: "book non-circ",
              },
            ],
            eddRequestable: true,
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:pat32",
                prefLabel: "Performing Arts Research Collections - Theatre",
              },
            ],
            idBarcode: ["33433036540494"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "MFL 10-4218",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433036540494",
              },
            ],
            physRequestable: false,
            physicalLocation: ["MFL 10-4218"],
            requestable: [true],
            shelfMark: ["MFL 10-4218"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i37907042",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "37907042",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
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
            noteType: "Bibliography",
            "@type": "bf:Note",
            prefLabel:
              "Includes bibliographical references (p. 145-155) and index.",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["Harpenden"],
        publicationStatement: ["Harpenden : Kamera Books, 2010."],
        publisherLiteral: ["Kamera Books"],
        shelfMark: ["MFL 10-4218"],
        subjectLiteral: ["Spaghetti Westerns.", "Western films -- History."],
        tableOfContents: [
          "Spaghetti westerns: introducing the gang -- Rome on the range: 1964-65 -- Coffers full of dollars: 1966 -- Box-office dynamite: 1967-69 -- End of the trail: 1970-76.",
        ],
        title: ["Spaghetti westerns"],
        titleDisplay: ["Spaghetti westerns / Howard Hughes."],
        type: ["nypl:Item"],
        updatedAt: 1690398020458,
        uri: "b22186798",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.03153,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b14925955",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1995"],
        createdYear: 1995,
        dateStartYear: 1995,
        dateString: ["1995"],
        dimensions: ["4 3/4 in."],
        electronicResources: [],
        extent: ["2 sound discs : digital ;"],
        idLccn: ["2147129052"],
        idOclc: ["36206384"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*LDC 14244 (F)",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "14925955",
          },
          {
            "@type": "bf:Lccn",
            "@value": "2147129052",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "36206384",
          },
          {
            "@type": "bf:Identifier",
            "@value": "32905 DRG Movies",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)M140000321",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i14521076",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:12",
                prefLabel: "musical sound recording",
              },
            ],
            eddRequestable: false,
            formatLiteral: ["Audio"],
            holdingLocation: [
              {
                "@id": "loc:pah32",
                prefLabel:
                  "Performing Arts Research Collections - Recorded Sound",
              },
            ],
            idBarcode: ["33433047738186"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "*LDC 14244 (F)",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433047738186",
              },
            ],
            physRequestable: false,
            physicalLocation: ["*LDC 14244 (F)"],
            requestable: [false],
            shelfMark: ["*LDC 14244 (F)"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i14521076",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "14521076",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        materialType: [
          {
            "@id": "resourcetypes:aud",
            prefLabel: "Audio",
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              '"Music composed & conducted by Ennio Morricone, Riz Ortolani, Franco Bixio, Pino Donaggio, Enrico Simonetti, Carlo Rustichelli, Carlo Savina, & others"--Container.',
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Includes some previously released material.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Compact disc.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              "Program notes by Didier C. Deutsch ([12] folded p.) inserted in container.",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["New York"],
        publicationStatement: ["New York : DRG Movies, p1995."],
        publisherLiteral: ["DRG Movies"],
        seriesStatement: ["Classic Italian soundtracks"],
        shelfMark: ["*LDC 14244 (F)"],
        subjectLiteral: [
          "Motion picture music -- Excerpts.",
          "West (U.S.) -- Songs and music.",
        ],
        tableOfContents: [
          "Shango = The invincible gun : 1970. Jeff Bloom ; Fiesta, fiesta! ; Pistole che scottano -- Quanto costa morire : 1968. Quanto costa morire ; Una colt bruciata ; C'e sempre una vita -- Amore piombo e furore : 1978. Tema di Clayton ; Tema d'amore -- Ed ora raccomanda l'anima a Dio = And now recommend your soul to God : 1971. Just a coward ; Just a coward : instrumental -- Wanted Johnny Texas : 1966. Main titles ; M 22 ; Finale -- Quei disperati che puzzano di sudore e di morte = Los desparados : 1969. Tema per una vendetta ; Oltre il confine ; Tema per un amore ; Cento cavalleggeri -- Kid il monello del West : 1974. Black Jack -- Deserto di fuoco : 1970. Main titles ; Ombre sulla sabbia ; Finale -- Carambola : 1974. Main titles ; Mexican cantina ; Finale -- Carambola filotto tutti in buca : 1975. Tema principale ; Funny town -- Amico stammi lontano almeno un palmo = Ben and Charlie : 1973. Let it rain, let it pour ; Un passaggio per Red Rock ; Sensazioni ; Ridendo e scherzando ; Addio, Sarah ; Controluce -- Giu' la testa = Duck you sucker : 1971. Giu' la testa --",
          "Uno straniero a Paso Bravo : 1967. Main titles, single version ; Main titles, film version ; Main titles, vocal version -- Prega Dio e scavati la fossa = Pray to God and dig your grave : 1968. Main titles ; M 26 III ; M 9 V -- La notte dei serpenti : 1969. Main titles XIII ; Canzone VI ; M2 I ; M 38 XI ; M 3 I ; M 25/XVII and M 42 II -- Requiem per un gringo : 1967. Sandstorm ; Twilight ; The moon and you ; Pistols galore -- Vado vedo e sparo : I tre che sconvolsero il West : 1969. Vado vedo e sparo ; Galoppa Susanna! -- Johnny West il mancino = The left handed gunfighter : 1966. Disco western III ; M 4 III and M 6 I ; M 21 I and M 65 III ; Finale -- Roy Colt & Winchester Jack : l970. Suite -- Sartana nella valle degli avvoltoi : 1970. M 6, M 7, and M 8 ; A king for a day ; M 18 V -- Ancora dollari per i McGregors : 1970. M 5, M 9, M 15 and M33 III -- La collera del vento : 1970. M 9 and M 15 V -- Sella d'argento : 1978. M 34 -- Franco e Ciccio sul sentiero di guerra : 1970. Fantasia western -- I quattro dell'Ave Maria = Ace high : 1968. Main titles -- La collina degli stivali = The hill of the boots : 1970. Suite -- I 4 dell'Apocalisse : 1976. Slow violence -- Occhio alla penna : 1981. L'estasi de miracolo.",
        ],
        title: ["Spaghetti westerns."],
        titleDisplay: ["Spaghetti westerns. Volume one [sound recording]."],
        type: ["nypl:Item"],
        updatedAt: 1690387844494,
        uri: "b14925955",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.03153,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b19028235",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1995"],
        createdYear: 1995,
        dateStartYear: 1995,
        dateString: ["1995"],
        dimensions: ["4 3/4 in."],
        electronicResources: [],
        extent: ["2 sound discs (151 min.) : digital ;"],
        idLccn: ["021471290929"],
        idOclc: ["34072584", "34072584 "],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*LDC 14245",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "19028235",
          },
          {
            "@type": "bf:Lccn",
            "@value": "021471290929",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "34072584",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "34072584 ",
          },
          {
            "@type": "bf:Identifier",
            "@value": "32909 DRG Records",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)34072584",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i26523880",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:2",
                prefLabel: "book non-circ",
              },
            ],
            eddRequestable: true,
            formatLiteral: ["Audio"],
            holdingLocation: [
              {
                "@id": "loc:pah32",
                prefLabel:
                  "Performing Arts Research Collections - Recorded Sound",
              },
            ],
            idBarcode: ["33433085319774"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "*LDC 14245",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433085319774",
              },
            ],
            physRequestable: false,
            physicalLocation: ["*LDC 14245"],
            requestable: [true],
            shelfMark: ["*LDC 14245"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i26523880",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "26523880",
            },
          },
          {
            "@id": "res:i26523879",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            aeonUrl: [
              "https://specialcollections.nypl.org/aeon/Aeon.dll?Action=10&Form=30&Title=Spaghetti+westerns.&Site=LPAMRAMI&CallNumber=*LDC+14245&ItemPlace=[New+York?]+:&ItemPublisher=DRG+Records+Inc.,&Date=p1995.&ItemInfo3=https://catalog.nypl.org/record=b19028235&ReferenceNumber=b190282356&ItemInfo1=USE+IN+LIBRARY&ItemNumber=33433085319782&ItemISxN=i265238791&Genre=Music+CD&Location=Performing+Arts+Music+Division",
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:12",
                prefLabel: "musical sound recording",
              },
            ],
            eddRequestable: false,
            formatLiteral: ["Audio"],
            holdingLocation: [
              {
                "@id": "loc:pah22",
                prefLabel:
                  "Performing Arts Research Collections - Recorded Sound",
              },
            ],
            idBarcode: ["33433085319782"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "*LDC 14245",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433085319782",
              },
            ],
            physRequestable: false,
            physicalLocation: ["*LDC 14245"],
            requestable: [true],
            shelfMark: ["*LDC 14245"],
            specRequestable: true,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i26523879",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "26523879",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ita",
            prefLabel: "Italian",
          },
        ],
        materialType: [
          {
            "@id": "resourcetypes:aud",
            prefLabel: "Audio",
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Excerpts from motion picture soundtracks.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Compact disc.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              "Program notes in English by Didier C. Deutsch ([12] folded p.) in container.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              '"On disc one and two the unreleased tracks that have no title are indicated with the "M number" (music take number) as they were called on the original recording sessions"--Notes.',
          },
          {
            noteType: "Credits",
            "@type": "bf:Note",
            prefLabel:
              "Album production supervised by Claudio Fuiano, courtesy of GDM Music.",
          },
        ],
        numAvailable: 2,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 2,
        numItemsMatched: 2,
        numItemsTotal: 2,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["[New York?]"],
        publicationStatement: ["[New York?] : DRG Records Inc., p1995."],
        publisherLiteral: ["DRG Records Inc."],
        seriesStatement: ["Classic Italian soundtracks"],
        shelfMark: ["*LDC 14245"],
        subjectLiteral: ["Motion picture music."],
        title: ["Spaghetti westerns."],
        titleDisplay: ["Spaghetti westerns. Volume two [sound recording]."],
        type: ["nypl:Item"],
        uniformTitle: ["Classic Italian soundtracks."],
        updatedAt: 1690394129930,
        uri: "b19028235",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.03153,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b19818343",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["2013"],
        createdYear: 2013,
        creatorLiteral: ["Persico, Nicky, 1964-"],
        dateStartYear: 2013,
        dateString: ["2013"],
        dimensions: ["21 cm."],
        electronicResources: [],
        extent: ["279 p. ;"],
        idIsbn: ["9788866209959 "],
        idOclc: ["0836773459"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "ReCAP 13-23808",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "19818343",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788866209959 :",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "0836773459",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)0836773459",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i30511611",
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
            idBarcode: ["33433109865547"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "ReCAP 13-23808",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433109865547",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["ReCAP 13-23808"],
            recapCustomerCode: ["NA"],
            requestable: [true],
            shelfMark: ["ReCAP 13-23808"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i30511611",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "30511611",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ita",
            prefLabel: "Italian",
          },
        ],
        lccClassification: ["PQ4916.E778 S63 2013"],
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
        placeOfPublication: ["Milano"],
        publicationStatement: ["Milano : Baldini&Castoldi, c2013."],
        publisherLiteral: ["Baldini&Castoldi"],
        seriesStatement: ["Pepe nero"],
        shelfMark: ["ReCAP 13-23808"],
        supplementaryContent: [
          {
            "@type": "nypl:SupplementaryContent",
            label: "TOC",
            url: "http://www.ilibri.casalini.it/toc/13671251.pdf",
          },
        ],
        title: ["Spaghetti Paradiso"],
        titleDisplay: ["Spaghetti Paradiso / Nicky Persico."],
        type: ["nypl:Item"],
        uniformTitle: ["Pepe nero."],
        updatedAt: 1652327036111,
        uri: "b19818343",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.03153,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b20761123",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["2015"],
        createdYear: 2015,
        creatorLiteral: ["Genisi, Maria Gabriella"],
        dateEndString: ["6"],
        dateEndYear: 6,
        dateStartYear: 2015,
        dateString: ["2015"],
        dimensions: ["22 cm"],
        electronicResources: [],
        extent: ["189 pages ;"],
        idIsbn: ["9788845426049 "],
        idOclc: ["914470920"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "ReCAP 15-33692",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "20761123",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788845426049 :",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "914470920",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)914470920",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i33387967",
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
            idBarcode: ["33433117151518"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "ReCAP 15-33692",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433117151518",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["ReCAP 15-33692"],
            recapCustomerCode: ["NA"],
            requestable: [true],
            shelfMark: ["ReCAP 15-33692"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i33387967",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "33387967",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ita",
            prefLabel: "Italian",
          },
        ],
        lccClassification: ["PQ4907.E54 S63 2015"],
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
        placeOfPublication: ["[Milan]"],
        publicationStatement: ["[Milan] : Sonzogno, giugno 2015."],
        publisherLiteral: ["Sonzogno"],
        shelfMark: ["ReCAP 15-33692"],
        supplementaryContent: [
          {
            "@type": "nypl:SupplementaryContent",
            label: "TOC",
            url: "http://ilibri.casalini.it/toc/3047693",
          },
        ],
        title: ["Spaghetti all'assassina"],
        titleDisplay: ["Spaghetti all'assassina / Gabriella Genisi."],
        type: ["nypl:Item"],
        updatedAt: 1652329959088,
        uri: "b20761123",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 83.03153,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b15976955",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: [
          "Martin, Judith, 1918-2012.",
          "Martin, Judith, 1918-2012",
          "Ashwander, Donald",
          "Brackett, Ted",
          "Canty-Samuel, Laura",
          "Woodall, Kevin Richard",
          "Rogers, Bob, 1951-",
          "Teel, Mary Lou",
          "Paper Bag Players, producer.",
        ],
        createdString: ["1996"],
        createdYear: 1996,
        dateStartYear: 1996,
        dateString: ["1996"],
        description: [
          "Songs and skits for preschool-age children performed by the Paper Bag Players, a children's theater group founded in the 1950s.",
        ],
        dimensions: ["1/2 in."],
        electronicResources: [],
        extent: ["1 videocassette (VHS) (56 min.) : sd., col. SP ;"],
        genreForm: ["Musicals."],
        idOclc: ["NYPG04-F488"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "NCOV 2803",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "15976955",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "NYPG04-F488",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)G200000035",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i17193499",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:4",
                prefLabel: "Restricted use",
              },
            ],
            aeonUrl: [
              "https://specialcollections.nypl.org/aeon/Aeon.dll?Action=10&Form=30&Title=On+top+of+spaghetti+[videorecording];The+Paper+Bag+Players+[present]+written,+designed,+choreographed+and+directed+by+Judith+Martin+video+produced+and+directed+by+Mary+Lou+Teel.&Site=LPATF&CallNumber=NCOV+2803&ItemPlace=Tarrytown,+N.Y.,&Date=c1996.&ItemInfo3=https://catalog.nypl.org/record=b15976955&ReferenceNumber=b159769553&ItemInfo1=RESTRICTED+USE&ItemInfo2=Restricted+to+qualified+researchers.&ItemISxN=i171934994&Genre=VHS&Location=Library+for+the+Performing+Arts+Theatre+on+Film+and+Tape+Archive",
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:24",
                prefLabel: "archival video recording",
              },
            ],
            eddRequestable: false,
            formatLiteral: ["Moving image"],
            holdingLocation: [
              {
                "@id": "loc:paf28",
                prefLabel: "Performing Arts Research Collections - TOFT",
              },
            ],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "NCOV 2803",
              },
            ],
            physRequestable: false,
            physicalLocation: ["NCOV 2803"],
            requestable: [true],
            shelfMark: ["NCOV 2803"],
            specRequestable: true,
            status: [
              {
                "@id": "status:k",
                prefLabel: "Check with staff",
              },
            ],
            uri: "i17193499",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "17193499",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        materialType: [
          {
            "@id": "resourcetypes:mov",
            prefLabel: "Moving image",
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Credits at end of tape.",
          },
          {
            noteType: "Access",
            "@type": "bf:Note",
            prefLabel: "Restricted to qualified researchers.",
          },
          {
            noteType: "Credits",
            "@type": "bf:Note",
            prefLabel: "Music composed by Donald Ashwander.",
          },
          {
            noteType: "Performer",
            "@type": "bf:Note",
            prefLabel:
              "Featuring Ted Brackett, Laura Canty-Samuel, Judith Martin, Kevin Richard Woodall, and Bob Rogers at the keyboard.",
          },
          {
            noteType: "Event",
            "@type": "bf:Note",
            prefLabel:
              "Videotaped at the Tarrytown Music Hall, Tarrytown, N.Y., 1996.",
          },
        ],
        numAvailable: 0,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["Tarrytown, N.Y."],
        publicationStatement: ["Tarrytown, N.Y., c1996."],
        shelfMark: ["NCOV 2803"],
        subjectLiteral: [
          "Children's plays.",
          "Children's plays, American.",
          "Musical theater -- Tarrytown.",
          "Musical revues & comedies -- Tarrytown -- 1991-2000.",
        ],
        title: ["On top of spaghetti"],
        titleDisplay: [
          "On top of spaghetti [videorecording] / The Paper Bag Players [present] ; written, designed, choreographed and directed by Judith Martin ; video produced and directed by Mary Lou Teel.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1694804957650,
        uri: "b15976955",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 82.31663,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:pb2608686",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Brown, David, journalist, joint author."],
        createdString: ["1943"],
        createdYear: 1943,
        creatorLiteral: ["Wagg, Alfred."],
        dateStartYear: 1943,
        dateString: ["1943"],
        dimensions: ["23 cm."],
        electronicResources: [],
        extent: ["231 p."],
        idLccn: ["   44003956  "],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "2608686",
          },
          {
            "@type": "bf:Lccn",
            "@value": "   44003956  ",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)ocm02088006",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:pi5153471",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:1",
                prefLabel: "non-circ",
              },
            ],
            eddRequestable: true,
            idBarcode: ["32101067443802"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "D763.I8 W3 1943",
              },
              {
                "@type": "bf:Barcode",
                "@value": "32101067443802",
              },
            ],
            owner: [
              {
                "@id": "orgs:0003",
                prefLabel: "Princeton University Library",
              },
            ],
            physRequestable: true,
            requestable: [true],
            shelfMark: ["D763.I8 W3 1943"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "pi5153471",
            idNyplSourceId: {
              "@type": "RecapPul",
              "@value": "5153471",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["D763.I8 W3"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: '"First published in 1943."',
          },
        ],
        numAvailable: 1,
        numElectronicResources: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        placeOfPublication: ["London,"],
        publicationStatement: ["London, Nicholson & Watson [1943]"],
        publisherLiteral: ["Nicholson & Watson"],
        subjectLiteral: [
          "World War, 1939-1945 -- Campaigns -- Italy.",
          "World War, 1939-1945 -- Naval operations.",
          "World War, 1939-1945 -- Personal narratives.",
        ],
        title: ["No spaghetti for breakfast"],
        titleDisplay: [
          "No spaghetti for breakfast [by] Alfred Wagg and David Brown.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1543536484228,
        uri: "pb2608686",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 82.31663,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b22180182",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Glazer, Tom."],
        createdString: ["2006"],
        createdYear: 2006,
        creatorLiteral: ["Johnson, Paul Brett."],
        dateStartYear: 2006,
        dateString: ["2006"],
        description: [
          "In an adaptation of the original parody, the hound Yodeler Jones tells what happened when his beloved meatball escaped from a plateful of spaghetti and ended up under a bush outside his restaurant.",
        ],
        dimensions: ["25 x 29 cm."],
        electronicResources: [],
        extent: ["1 v. (unpaged) : col. ill. ;"],
        genreForm: ["Humorous fiction."],
        idIsbn: ["0439749441 (lib. bdg.)"],
        idLccn: ["  2005014311", "9780439749442"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "J PIC J",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "22180182",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0439749441 (lib. bdg.)",
          },
          {
            "@type": "bf:Lccn",
            "@value": "  2005014311",
          },
          {
            "@type": "bf:Lccn",
            "@value": "9780439749442",
          },
          {
            "@type": "bf:Lccn",
            "@value": "9780439749442",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i37899965",
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
            idBarcode: ["33333202563405"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "J PIC J",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33333202563405",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["J PIC J"],
            recapCustomerCode: ["NH"],
            requestable: [true],
            shelfMark: ["J PIC J"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i37899965",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "37899965",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PZ7.J6354 Onat 2006"],
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
        placeOfPublication: ["New York"],
        publicationStatement: ["New York : Scholastic Press, c2006."],
        publisherLiteral: ["Scholastic Press"],
        shelfMark: ["J PIC J"],
        subjectLiteral: ["Meatballs -- Fiction."],
        title: ["On top of spaghetti"],
        titleDisplay: [
          "On top of spaghetti / written and illustrated by Paul Brett Johnson ; with lyrics by Tom Glazer.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1652334964739,
        uri: "b22180182",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 82.31663,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b15080796",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1999"],
        createdYear: 1999,
        dateEndString: ["9999"],
        dateEndYear: 9999,
        dateStartYear: 1999,
        dateString: ["1999"],
        dimensions: ["22 cm."],
        donor: [
          "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
        ],
        electronicResources: [],
        extent: ["v. : ill. ;"],
        holdings: [
          {
            holdingStatement: ["1(1998)-4(2001)."],
            checkInBoxes: [
              {
                coverage: "Vol. 1  No. 1",
                position: "1",
                type: "nypl:CheckInBox",
                shelfMark: ["JFK 01-374"],
                status: "Arrived",
              },
              {
                coverage: "Vol. 2 No. 1 (1999)",
                position: "2",
                type: "nypl:CheckInBox",
                shelfMark: ["JFK 01-374"],
                status: "Arrived",
              },
              {
                coverage: "No. 3 (2000)",
                position: "3",
                type: "nypl:CheckInBox",
                shelfMark: ["JFK 01-374"],
                status: "Arrived",
              },
              {
                coverage: "No. 4",
                position: "4",
                type: "nypl:CheckInBox",
                shelfMark: ["JFK 01-374"],
                status: "Arrived",
              },
            ],
            identifier: [
              {
                type: "bf:shelfMark",
                value: "JFK 01-374",
              },
            ],
            physicalLocation: ["JFK 01-374"],
            format: ["PRINT"],
            location: [
              {
                code: "loc:rc2ma",
                label: "Offsite",
              },
            ],
            uri: "h1046398",
            shelfMark: ["JFK 01-374"],
          },
        ],
        idIssn: ["1521-1371"],
        idLccn: ["sn 98001765"],
        idOclc: ["39690507"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFK 01-374",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "15080796",
          },
          {
            "@type": "bf:Issn",
            "@value": "1521-1371",
          },
          {
            "@type": "bf:Lccn",
            "@value": "sn 98001765",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "39690507",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)S310000006",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:s",
            prefLabel: "serial",
          },
        ],
        items: [
          {
            "@id": "res:i39333697",
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
                gte: "2001",
                lte: "2001",
              },
            ],
            eddRequestable: false,
            enumerationChronology: ["no. 4 (2001)"],
            formatLiteral: ["Text"],
            idBarcode: ["33433130221975"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFK 01-374 no. 4 (2001)",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433130221975",
              },
            ],
            physRequestable: false,
            physicalLocation: ["JFK 01-374"],
            requestable: [false],
            shelfMark: ["JFK 01-374 no. 4 (2001)"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i39333697",
            volumeRange: [
              {
                gte: 4,
                lte: 4,
              },
            ],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "39333697",
            },
          },
          {
            "@id": "res:i-h1046398-2",
            "@type": ["nypl:CheckinCardItem"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["No. 4"],
            holdingLocation: [
              {
                "@id": "loc:rc2ma",
                prefLabel: "Offsite",
              },
            ],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFK 01-374",
              },
            ],
            physRequestable: false,
            requestable: [true],
            shelfMark: ["JFK 01-374"],
            specRequestable: false,
            status: [
              {
                "@id": "status:na",
                prefLabel: "Not available",
              },
            ],
            uri: "i-h1046398-2",
            volumeRange: [
              {
                gte: 4,
                lte: 4,
              },
            ],
            volumeRaw: ["No. 4"],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "-h1046398-2",
            },
          },
          {
            "@id": "res:i-h1046398-1",
            "@type": ["nypl:CheckinCardItem"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            dateRange: [
              {
                gte: "2000-01-01",
                lte: "2000-01-01",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["No. 3 (2000)"],
            holdingLocation: [
              {
                "@id": "loc:rc2ma",
                prefLabel: "Offsite",
              },
            ],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFK 01-374",
              },
            ],
            physRequestable: false,
            requestable: [true],
            shelfMark: ["JFK 01-374"],
            specRequestable: false,
            status: [
              {
                "@id": "status:na",
                prefLabel: "Not available",
              },
            ],
            uri: "i-h1046398-1",
            volumeRange: [
              {
                gte: 3,
                lte: 3,
              },
            ],
            volumeRaw: ["No. 3"],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "-h1046398-1",
            },
          },
          {
            "@id": "res:i39333648",
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
                gte: "2000",
                lte: "2000",
              },
            ],
            eddRequestable: false,
            enumerationChronology: ["no. 3 (2000)"],
            formatLiteral: ["Text"],
            idBarcode: ["33433130221983"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFK 01-374 no. 3 (2000)",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433130221983",
              },
            ],
            physRequestable: false,
            physicalLocation: ["JFK 01-374"],
            requestable: [false],
            shelfMark: ["JFK 01-374 no. 3 (2000)"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i39333648",
            volumeRange: [
              {
                gte: 3,
                lte: 3,
              },
            ],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "39333648",
            },
          },
          {
            "@id": "res:i-h1046398-0",
            "@type": ["nypl:CheckinCardItem"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            dateRange: [
              {
                gte: "1999-01-01",
                lte: "1999-01-01",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["Vol. 2 No. 1 (1999)"],
            holdingLocation: [
              {
                "@id": "loc:rc2ma",
                prefLabel: "Offsite",
              },
            ],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFK 01-374",
              },
            ],
            physRequestable: false,
            requestable: [true],
            shelfMark: ["JFK 01-374"],
            specRequestable: false,
            status: [
              {
                "@id": "status:na",
                prefLabel: "Not available",
              },
            ],
            uri: "i-h1046398-0",
            volumeRange: [
              {
                gte: 2,
                lte: 2,
              },
            ],
            volumeRaw: ["Vol. 2 No. 1"],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "-h1046398-0",
            },
          },
          {
            "@id": "res:i29990380",
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
                gte: "1999",
                lte: "1999",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["v. 2, no. 1 (1999)"],
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:rc2ma",
                prefLabel: "Offsite",
              },
            ],
            idBarcode: ["33433106905643"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFK 01-374 v. 2, no. 1 (1999)",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433106905643",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["JFK 01-374"],
            recapCustomerCode: ["NH"],
            requestable: [true],
            shelfMark: ["JFK 01-374 v. 2, no. 1 (1999)"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i29990380",
            volumeRange: [
              {
                gte: 2,
                lte: 2,
              },
            ],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "29990380",
            },
          },
          {
            "@id": "res:i29990385",
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
                gte: "1998",
                lte: "1998",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["v. 1, no. 1 (1998)"],
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:rc2ma",
                prefLabel: "Offsite",
              },
            ],
            idBarcode: ["33433106905650"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFK 01-374 v. 1, no. 1 (1998)",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433106905650",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["JFK 01-374"],
            recapCustomerCode: ["NH"],
            requestable: [true],
            shelfMark: ["JFK 01-374 v. 1, no. 1 (1998)"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i29990385",
            volumeRange: [
              {
                gte: 1,
                lte: 1,
              },
            ],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "29990385",
            },
          },
          {
            "@id": "res:i-h1046398-3",
            "@type": ["nypl:CheckinCardItem"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["Vol. 1  No. 1"],
            holdingLocation: [
              {
                "@id": "loc:rc2ma",
                prefLabel: "Offsite",
              },
            ],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFK 01-374",
              },
            ],
            physRequestable: false,
            requestable: [true],
            shelfMark: ["JFK 01-374"],
            specRequestable: false,
            status: [
              {
                "@id": "status:na",
                prefLabel: "Not available",
              },
            ],
            uri: "i-h1046398-3",
            volumeRange: [
              {
                gte: 1,
                lte: 1,
              },
            ],
            volumeRaw: ["Vol. 1  No. 1"],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "-h1046398-3",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["IN PROCESS"],
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
        numAvailable: 8,
        numCheckinCardItems: 4,
        numElectronicResources: 0,
        numItemDatesParsed: 6,
        numItemVolumesParsed: 8,
        numItems: 4,
        numItemsMatched: 8,
        numItemsTotal: 8,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["Mansfield, Ohio"],
        publicationStatement: ["Mansfield, Ohio : Urban Spaghetti, [1999?-"],
        publisherLiteral: ["Urban Spaghetti"],
        serialPublicationDates: ["Vol. 1, issue 1-"],
        shelfMark: ["JFK 01-374"],
        subjectLiteral: [
          "Arts, Modern -- United States -- Periodicals.",
          "American literature -- 20th ccentury -- Periodicals.",
        ],
        title: ["Urban spaghetti."],
        titleAlt: ["Urban spaghetti", "Urban spaghetti literary arts journal"],
        titleDisplay: ["Urban spaghetti."],
        type: ["nypl:Item"],
        updatedAt: 1687444362717,
        uri: "b15080796",
        suppressed: false,
        hasItemVolumes: true,
        hasItemDates: true,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 82.31663,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b11983833",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1994"],
        createdYear: 1994,
        creatorLiteral: ["Guns n' Roses (Musical group)"],
        dateStartYear: 1994,
        dateString: ["1994"],
        dimensions: ["30 cm."],
        electronicResources: [],
        extent: ["1 score (93 p.) : ill. ;"],
        idIsbn: ["0895248263"],
        idOclc: ["31096140", "NYPG94-C6082"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JNF 94-268",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "11983833",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0895248263",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "31096140",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "31096140",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "NYPG94-C6082",
          },
          {
            "@type": "bf:Identifier",
            "@value": "02501233 H. Leonard",
          },
          {
            "@type": "bf:Identifier",
            "@value": "MLC 1994",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)nyp1973165",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)31096140",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i14207684",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:2",
                prefLabel: "Request in advance",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:57",
                prefLabel: "printed music limited circ MaRLI",
              },
            ],
            eddRequestable: true,
            formatLiteral: ["Notated music"],
            holdingLocation: [
              {
                "@id": "loc:rcpm2",
                prefLabel: "Offsite",
              },
            ],
            idBarcode: ["33433047331198"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JNF 94-268",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433047331198",
              },
            ],
            owner: [
              {
                "@id": "orgs:1002",
                prefLabel:
                  "New York Public Library for the Performing Arts, Dorothy and Lewis B. Cullman Center",
              },
            ],
            physRequestable: true,
            physicalLocation: ["JNF 94-268"],
            recapCustomerCode: ["NP"],
            requestable: [true],
            shelfMark: ["JNF 94-268"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i14207684",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "14207684",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        materialType: [
          {
            "@id": "resourcetypes:not",
            prefLabel: "Notated music",
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Minimal level cataloging.",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["Port Chester, NY : Milwaukee, WI"],
        publicationStatement: [
          "Port Chester, NY : Cherry Lane Music ; Milwaukee, WI : H. Leonard, c1994.",
        ],
        publisherLiteral: ["Cherry Lane Music ; H. Leonard"],
        shelfMark: ["JNF 94-268"],
        subjectLiteral: ["Heavy metal (Music)"],
        title: ["The spaghetti incident?"],
        titleDisplay: ["The spaghetti incident? / Guns n' Roses."],
        type: ["nypl:Item"],
        updatedAt: 1689731226397,
        uri: "b11983833",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 82.31663,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b19711264",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Švábenický, Jan, 1981-"],
        createdString: ["2012"],
        createdYear: 2012,
        creatorLiteral: ["Mancini, Matteo, 1981-"],
        dateEndString: ["2016"],
        dateEndYear: 2016,
        dateStartYear: 2012,
        dateString: ["2012"],
        dimensions: ["19-21 cm."],
        electronicResources: [],
        extent: ["volumes <1-4> : illustrations ;"],
        genreForm: ["Criticism, interpretation, etc."],
        idIsbn: [
          "9788876063565",
          "8876063560",
          "9788876065033",
          "8876065032",
          "9788876066238",
          "8876066233",
          "9788876067815",
          "8876067817",
        ],
        idLccn: ["  2012455734"],
        idOclc: ["796781456"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "MFL 12-4059",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "19711264",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788876063565",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8876063560",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788876065033",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8876065032",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788876066238",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8876066233",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788876067815",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8876067817",
          },
          {
            "@type": "bf:Lccn",
            "@value": "  2012455734",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "796781456",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "796781456",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)796781456",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)947945771 (OCoLC)1200831458 (OCoLC)1201694754",
          },
          {
            identifierStatus: "canceled/invalid",
            "@type": "bf:Isbn",
            "@value": "9788876063566",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i38100133",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:55",
                prefLabel: "book, limited circ, MaRLI",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["v. 4"],
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:pat32",
                prefLabel: "Performing Arts Research Collections - Theatre",
              },
            ],
            idBarcode: ["33433130870862"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "MFL 12-4059 v. 4",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433130870862",
              },
            ],
            physRequestable: false,
            physicalLocation: ["MFL 12-4059"],
            requestable: [true],
            shelfMark: ["MFL 12-4059 v. 4"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i38100133",
            volumeRange: [
              {
                gte: 4,
                lte: 4,
              },
            ],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "38100133",
            },
          },
          {
            "@id": "res:i34065030",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:55",
                prefLabel: "book, limited circ, MaRLI",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["v. 3"],
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:pat32",
                prefLabel: "Performing Arts Research Collections - Theatre",
              },
            ],
            idBarcode: ["33433118580269"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "MFL 12-4059 v. 3",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433118580269",
              },
            ],
            physRequestable: false,
            physicalLocation: ["MFL 12-4059"],
            requestable: [true],
            shelfMark: ["MFL 12-4059 v. 3"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i34065030",
            volumeRange: [
              {
                gte: 3,
                lte: 3,
              },
            ],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "34065030",
            },
          },
          {
            "@id": "res:i32358335",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:55",
                prefLabel: "book, limited circ, MaRLI",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["v. 2"],
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:pat32",
                prefLabel: "Performing Arts Research Collections - Theatre",
              },
            ],
            idBarcode: ["33433112645225"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "MFL 12-4059 v. 2",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433112645225",
              },
            ],
            physRequestable: false,
            physicalLocation: ["MFL 12-4059"],
            requestable: [true],
            shelfMark: ["MFL 12-4059 v. 2"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i32358335",
            volumeRange: [
              {
                gte: 2,
                lte: 2,
              },
            ],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "32358335",
            },
          },
          {
            "@id": "res:i29588288",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:55",
                prefLabel: "book, limited circ, MaRLI",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["v. 1"],
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:pat32",
                prefLabel: "Performing Arts Research Collections - Theatre",
              },
            ],
            idBarcode: ["33433106936614"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "MFL 12-4059 v. 1",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433106936614",
              },
            ],
            physRequestable: false,
            physicalLocation: ["MFL 12-4059"],
            requestable: [true],
            shelfMark: ["MFL 12-4059 v. 1"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i29588288",
            volumeRange: [
              {
                gte: 1,
                lte: 1,
              },
            ],
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "29588288",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ita",
            prefLabel: "Italian",
          },
        ],
        lccClassification: ["PN1995.9.W4 M325 2012"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              'Volume 3 - "Con la collaborazione di Jan Švábenický."--Title page verso.',
          },
          {
            noteType: "Bibliography",
            "@type": "bf:Note",
            prefLabel: "Includes bibliographical references.",
          },
        ],
        numAvailable: 4,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 4,
        numItems: 4,
        numItemsMatched: 4,
        numItemsTotal: 4,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["Piombino (Livorno)"],
        publicationStatement: [
          "Piombino (Livorno) : Edizioni Il Foglio, 2012-2016.",
        ],
        publisherLiteral: ["Edizioni Il Foglio"],
        seriesStatement: ["Cinema (Edizioni il foglio)"],
        shelfMark: ["MFL 12-4059"],
        subjectLiteral: [
          "Spaghetti Westerns -- History and criticism.",
          "Motion pictures -- Italy.",
          "Motion pictures.",
          "Spaghetti Westerns.",
          "Italy.",
        ],
        supplementaryContent: [
          {
            "@type": "nypl:SupplementaryContent",
            label: "Contents",
            url: "http://www.ilibri.casalini.it/toc/12623180.pdf",
          },
          {
            "@type": "nypl:SupplementaryContent",
            label: "TOC, v. 2",
            url: "http://ilibri.casalini.it/toc/2954604",
          },
          {
            "@type": "nypl:SupplementaryContent",
            label: "TOC, v. 3",
            url: "http://ilibri.casalini.it/toc/3114404",
          },
          {
            "@type": "nypl:SupplementaryContent",
            label: "TOC, v. 4",
            url: "http://ilibri.casalini.it/toc/4589129",
          },
        ],
        tableOfContents: [
          "v. 1. L'alba e il primo splendore del genere, anni '63-'66 -- v.2. La proliferazione del genere (anno 1967) -- v. 3. Il mezzogiorno di fuoco del genere (anni '68-'71) -- v. 4. Il crepuscolo e la notte : tra western kung fu e western nostalgici (anni '72 a oggi).",
        ],
        title: ["Spaghetti western"],
        titleDisplay: ["Spaghetti western / Matteo Mancini."],
        type: ["nypl:Item"],
        uniformTitle: ["Cinema (Edizioni il foglio)"],
        updatedAt: 1690394567973,
        uri: "b19711264",
        suppressed: false,
        hasItemVolumes: true,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 79.751976,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b22240428",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Shani, Shoshana, 1935-", "OverDrive, Inc."],
        createdString: ["2017"],
        createdYear: 2017,
        creatorLiteral: ["Oren, Rut, 1973-"],
        dateStartYear: 2017,
        dateString: ["2017"],
        description: [
          "Etti is a little girl who only wants to eat spaghetti.  Her parents take her to the doctor who suggests that they let her eat as much pasta as she wants.  Eventually she gets tired of pasta and wants something else.",
        ],
        electronicResources: [
          {
            url: "http://link.overdrive.com/?websiteId=37&titleId=3341213",
            prefLabel: "Access eNYPL",
          },
        ],
        extent: ["1 online resource (1 sound file (3 min., 16 sec.))"],
        genreForm: ["Audiobooks."],
        idIsbn: ["9781509469765", "1509469761"],
        idOclc: ["1157208694"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "22240428",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9781509469765",
          },
          {
            "@type": "bf:Isbn",
            "@value": "1509469761",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "1157208694",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "1157208694",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)1157208694",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [],
        language: [
          {
            "@id": "lang:heb",
            prefLabel: "Hebrew",
          },
        ],
        lccClassification: ["PZ40.O74 E85 2017"],
        materialType: [
          {
            "@id": "resourcetypes:aud",
            prefLabel: "Audio",
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
        parallelContributorLiteral: ["‏שני, שושיק, 1935-"],
        parallelCreatorLiteral: ["‏אורן, רות, 1973-"],
        parallelDescription: [
          "‏הילדה אתי רוצה רק ספגטי! הוריה המיואשים פונים לדוקטור בר, הרופא מזנזיבר,והוא נותן להם מתכון מיוחד במינו לתפריט של בתם הסרבנית.ספור קליל ומשעשע על ילדים עקשנים, על הורים מיואשים ועל פתרונות יצירתיים.רותי אורן היא סופרת ילדים, ספרנית ואמא לשתי אכלניות פסטה גדולות.מושיק לין הוא קריקטוריסט ומאייר, חתן פרס מוזיאון ישראל לאיור ספרי ילדים.",
        ],
        parallelTitle: ["‏אתי ספגטי = Etti Spaghetti"],
        parallelTitleDisplay: ["‏אתי ספגטי = Etti Spaghetti / רות אורן."],
        subjectLiteral: [
          "Nutrition -- Juvenile fiction.",
          "Children -- Psychological aspects -- Juvenile fiction.",
          "Girls -- Juvenile fiction.",
        ],
        title: ["Eti Spageṭi = Etti Spaghetti"],
        titleAlt: ["Etti Spaghetti", "Spaghtti Betty"],
        titleDisplay: ["Eti Spageṭi = Etti Spaghetti / Rut Oren."],
        type: ["nypl:Item"],
        updatedAt: 1681361525761,
        uri: "b22240428",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 76.177734,
      result: {
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
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 76.177734,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b19328889",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["2011"],
        createdYear: 2011,
        creatorLiteral: ["Pepe, Marthita."],
        dateStartYear: 2011,
        dateString: ["2011"],
        dimensions: ["20 cm."],
        electronicResources: [],
        extent: ["114 p. ;"],
        idIsbn: ["9788806205584", "8806205587"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "ReCAP 11-36171",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "19328889",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788806205584",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8806205587",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)753870795",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i27768412",
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
            idBarcode: ["33433092881576"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "ReCAP 11-36171",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433092881576",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["ReCAP 11-36171"],
            recapCustomerCode: ["NA"],
            requestable: [true],
            shelfMark: ["ReCAP 11-36171"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i27768412",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "27768412",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ita",
            prefLabel: "Italian",
          },
        ],
        lccClassification: ["PQ4916.E668 L33 2011"],
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
        placeOfPublication: ["Torino :"],
        publicationStatement: ["Torino : Einaudi, 2011."],
        publisherLiteral: ["Einaudi,"],
        seriesStatement: ["Einaudi. Stile libero extra"],
        shelfMark: ["ReCAP 11-36171"],
        title: ["La ladra di spaghetti"],
        titleDisplay: ["La ladra di spaghetti / Marthita Pepe."],
        type: ["nypl:Item"],
        uniformTitle: ["Einaudi tascabili. Stile libero extra."],
        updatedAt: 1636718221212,
        uri: "b19328889",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 76.177734,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b22465391",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["2020"],
        createdYear: 2020,
        creatorLiteral: ["Vareille, Marie,"],
        dateEndString: ["2020"],
        dateEndYear: 2020,
        dateStartYear: 2020,
        dateString: ["2020"],
        dimensions: ["23 cm"],
        electronicResources: [],
        extent: ["283 pages ;"],
        idIsbn: ["9782266296267"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "ReCAP 21-110395",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "22465391",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9782266296267",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)1242017255",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [],
        language: [
          {
            "@id": "lang:fre",
            prefLabel: "French",
          },
        ],
        lccClassification: ["PQ2722.A734 S96 2020"],
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
        numElectronicResources: 0,
        numItems: 0,
        numItemsMatched: 0,
        numItemsTotal: 0,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["[Paris] :"],
        publicationStatement: ["2020", "[Paris] : Pocket jeunesse PKJ, [2020]"],
        publisherLiteral: ["Pocket jeunesse PKJ,"],
        shelfMark: ["ReCAP 21-110395"],
        title: ["Le syndrome du spaghetti"],
        titleDisplay: ["Le syndrome du spaghetti / Marie Vareille."],
        type: ["nypl:Item"],
        updatedAt: 1636857102077,
        uri: "b22465391",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 76.177734,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:cb1160304",
        carrierType: [
          {
            "@id": "carriertypes:undefined",
            prefLabel: "volume",
          },
        ],
        createdString: ["1992"],
        createdYear: 1992,
        creatorLiteral: ["Plessen, Elisabeth."],
        dateEndString: ["1992"],
        dateEndYear: 1992,
        dateStartYear: 1992,
        dateString: ["1992"],
        dimensions: ["20 cm"],
        electronicResources: [],
        extent: ["236 pages ;"],
        idIsbn: ["3100617045"],
        idOclc: ["ocm26915798"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "1160304",
          },
          {
            "@type": "bf:Isbn",
            "@value": "3100617045",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "ocm26915798",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)ocm26915798",
          },
          {
            "@type": "bf:Identifier",
            "@value": "1160304",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:ci1628993",
            accessMessage: [
              {
                "@id": "accessMessage:2",
                prefLabel: "Request in advance",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:1",
                prefLabel: "non-circ",
              },
            ],
            eddRequestable: true,
            idBarcode: ["CU63051249"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "PT2676.L395 L3 1992g",
              },
              {
                "@type": "bf:Barcode",
                "@value": "CU63051249",
              },
            ],
            owner: [
              {
                "@id": "orgs:0002",
                prefLabel: "Columbia University Libraries",
              },
            ],
            physRequestable: true,
            physicalLocation: ["PT2676.L395 L3 1992g"],
            recapCustomerCode: ["CU"],
            requestable: [true],
            shelfMark: ["PT2676.L395 L3 1992g"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "ci1628993",
            idNyplSourceId: {
              "@type": "RecapCul",
              "@value": "1628993",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ger",
            prefLabel: "German",
          },
        ],
        materialType: [
          {
            "@id": "resourcetypes:txt",
            prefLabel: "Text",
          },
        ],
        mediaType: [
          {
            "@id": "mediatypes:undefined",
            prefLabel: "unmediated",
          },
        ],
        numAvailable: 1,
        numElectronicResources: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["recap-cul"],
        placeOfPublication: ["Frankfurt am Main"],
        publicationStatement: ["Frankfurt am Main : Fischer, [1992], ©1992."],
        publisherLiteral: ["Fischer"],
        tableOfContents: [
          "Lady Spaghetti -- Blutdruck -- Der Dorftrottel -- Die Klage -- Spielregeln -- Parcheggio Cormor Est -- Die Austernesserin -- Et toujours le chien oder Immer der Hund -- Zwei Hasen jagen -- Rebeccas Leben -- Was machst du, Benny? -- Der Anzug -- Die Treppe.",
        ],
        title: ["Lady Spaghetti : Erzählungen"],
        titleDisplay: ["Lady Spaghetti : Erzählungen / Elisabeth Plessen."],
        type: ["nypl:Item"],
        updatedAt: 1654216289902,
        uri: "cb1160304",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 76.177734,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b16469659",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["2006"],
        createdYear: 2006,
        creatorLiteral: ["Fridlund, Bert., 1947-"],
        dateStartYear: 2006,
        dateString: ["2006"],
        description: [
          '"This book analyzes the construction of the stories presented in spaghetti westerns. It examines the content of the Italian western using concepts and constructs borrowed from scholars studying pre-industrial narratives. Plot, the constellation of characters, their relationship to each other, and their motives are studied"--Provided by publisher.',
        ],
        dimensions: ["23 cm."],
        electronicResources: [
          {
            url: "http://www.loc.gov/catdir/toc/ecip0616/2006022309.html",
            prefLabel: "Table of contents only",
          },
        ],
        extent: ["vii, 296 p. : ill. ;"],
        idIsbn: ["0786425075 (softcover : alk. paper)"],
        idLccn: ["2006022309", "9780786425075"],
        idOclc: ["70267173", "vendorOCM70267173"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "MFL 07-383",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "16469659",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0786425075 (softcover : alk. paper)",
          },
          {
            "@type": "bf:Lccn",
            "@value": "2006022309",
          },
          {
            "@type": "bf:Lccn",
            "@value": "9780786425075",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "70267173",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "70267173",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "vendorOCM70267173",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)70267173",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i17269502",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:2",
                prefLabel: "book non-circ",
              },
            ],
            eddRequestable: true,
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:pat32",
                prefLabel: "Performing Arts Research Collections - Theatre",
              },
            ],
            idBarcode: ["33433073736997"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "MFL 07-383",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433073736997",
              },
            ],
            physRequestable: false,
            physicalLocation: ["MFL 07-383"],
            requestable: [true],
            shelfMark: ["MFL 07-383"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i17269502",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "17269502",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PN1995.9.W4 F75 2006"],
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
            noteType: "Bibliography",
            "@type": "bf:Note",
            prefLabel:
              "Includes bibliographical references (p. 287-289) and index.",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 1,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["Jefferson, N.C."],
        publicationStatement: ["Jefferson, N.C. : McFarland & Co., c2006."],
        publisherLiteral: ["McFarland & Co."],
        shelfMark: ["MFL 07-383"],
        subjectLiteral: ["Spaghetti Westerns -- History and criticism."],
        title: ["The spaghetti Western : a thematic analysis"],
        titleDisplay: [
          "The spaghetti Western : a thematic analysis / Bert Fridlund.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1690390720273,
        uri: "b16469659",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 76.177734,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:cb10097352",
        carrierType: [
          {
            "@id": "carriertypes:undefined",
            prefLabel: "volume",
          },
        ],
        createdString: ["2006"],
        createdYear: 2006,
        creatorLiteral: ["Daugherty, Michael, 1954-"],
        dateEndString: ["1998"],
        dateEndYear: 1998,
        dateStartYear: 2006,
        dateString: ["2006"],
        dimensions: ["31 cm"],
        electronicResources: [],
        extent: ["1 score (28 pages) + 1 part (10 pages) ;"],
        idIsbn: ["1476805253", "9781476805252"],
        idLccn: ["884088664442", "M051106905", "9790051106905"],
        idOclc: ["ocn809236116", "809236116", "SCSB-14522594"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "10097352",
          },
          {
            "@type": "bf:Isbn",
            "@value": "1476805253",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9781476805252",
          },
          {
            "@type": "bf:Lccn",
            "@value": "884088664442",
          },
          {
            "@type": "bf:Lccn",
            "@value": "M051106905",
          },
          {
            "@type": "bf:Lccn",
            "@value": "9790051106905",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "ocn809236116",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "809236116",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "SCSB-14522594",
          },
          {
            "@type": "bf:Identifier",
            "@value": "HL48022364 Hal Leonard Corporation",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)ocn809236116",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)809236116",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(NNC)10097352",
          },
          {
            "@type": "bf:Identifier",
            "@value": "10097352",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:ci8148699",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:2",
                prefLabel: "Request in advance",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:1",
                prefLabel: "non-circ",
              },
            ],
            eddRequestable: false,
            formatLiteral: ["Notated music"],
            idBarcode: ["MR75708230"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "32.2 D265 Sp13",
              },
              {
                "@type": "bf:Barcode",
                "@value": "MR75708230",
              },
            ],
            owner: [
              {
                "@id": "orgs:0002",
                prefLabel: "Columbia University Libraries",
              },
            ],
            physRequestable: true,
            physicalLocation: ["32.2 D265 Sp13"],
            recapCustomerCode: ["MR"],
            requestable: [true],
            shelfMark: ["32.2 D265 Sp13"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "ci8148699",
            idNyplSourceId: {
              "@type": "RecapCul",
              "@value": "8148699",
            },
          },
        ],
        language: [
          {
            "@id": "lang:zxx",
            prefLabel: "No linguistic content",
          },
        ],
        lccClassification: ["M1035.E5 D38 2006"],
        materialType: [
          {
            "@id": "resourcetypes:not",
            prefLabel: "Notated music",
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              "Accompaniment originally for orchestra; arranged for piano.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "With program and biographical notes.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "At bottom of page [1] of part: Revised 11/06/06.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Duration: about 20 min.",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["recap-cul"],
        placeOfPublication: ["[New York, N.Y.]", "Milwaukee, WI"],
        publicationStatement: [
          "[New York, N.Y.] : Hendon Music : Boosey & Hawkes, [2006?]",
          "Milwaukee, WI : Distributed by Hal Leonard Corporation",
          "♭1998",
        ],
        publisherLiteral: [
          "Hendon Music : Boosey & Hawkes",
          "Distributed by Hal Leonard Corporation",
        ],
        subjectLiteral: ["English horn with orchestra -- Solo with piano."],
        tableOfContents: [
          "Strade vuote = (Empty streets) -- Assalto all'oro/La diligenza fantasma = (Gold rush)/(The phantom stagecoach) -- Mezzogiorno di fuoco = (Noon of fire).",
        ],
        title: ["Spaghetti western : (1998)"],
        titleAlt: ["Spaghetti western;"],
        titleDisplay: [
          "Spaghetti western : (1998) / Michael Daugherty ; reduction for English horn and piano.",
        ],
        type: ["nypl:Item"],
        uniformTitle: ["Spaghetti western; arranged"],
        updatedAt: 1692482612371,
        uri: "cb10097352",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 76.177734,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b13701641",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Siravo, George."],
        createdString: ["1967"],
        createdYear: 1967,
        creatorLiteral: ["Cooper, Pat, comedian."],
        dateStartYear: 1967,
        dateString: ["1967"],
        description: [
          "Humorist Pat Cooper delivers his comedy routine and sings humorous songs, often poking good-natured fun at Italian-Americans.",
        ],
        dimensions: ["12 in."],
        electronicResources: [],
        extent: ["1 sound disc : analog, 33 1/3 rpm ;"],
        idLccn: ["97701797 /R"],
        idOclc: ["21131098"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*LZR 6853 (C)",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "13701641",
          },
          {
            "@type": "bf:Lccn",
            "@value": "97701797 /R",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "21131098",
          },
          {
            "@type": "bf:Identifier",
            "@value": "T-91029 United Artists",
          },
          {
            "@type": "bf:Identifier",
            "@value": "UAL 3548 United Artists",
          },
          {
            "@type": "bf:Identifier",
            "@value": "UAS 3548 United Artists",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)nyp3669610",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i17567052",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:12",
                prefLabel: "musical sound recording",
              },
            ],
            eddRequestable: false,
            formatLiteral: ["Audio"],
            holdingLocation: [
              {
                "@id": "loc:pah22",
                prefLabel:
                  "Performing Arts Research Collections - Recorded Sound",
              },
            ],
            idBarcode: ["33433077562233"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "*LZR 6853",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433077562233",
              },
            ],
            physRequestable: false,
            physicalLocation: ["*LZR 6853"],
            requestable: [false],
            shelfMark: ["*LZR 6853"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i17567052",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "17567052",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        materialType: [
          {
            "@id": "resourcetypes:aud",
            prefLabel: "Audio",
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "United Artists: T 91029 (also issued as: UAL 3548).",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              '"Manufactured by Capitol Records, Inc. U.S.A" -- on label.',
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Issued also as stereo. LP: UAS 3548.",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["New York"],
        publicationStatement: ["New York : United Artists, [1967?]"],
        publisherLiteral: ["United Artists"],
        shelfMark: ["*LZR 6853 (C)"],
        subjectLiteral: [
          "Italian Americans -- Humor.",
          "Humorous songs.",
          "Stand-up comedy.",
        ],
        tableOfContents: [
          "Spaghetti sauce and other delights (12:01) -- Pepperoni kid (1:15) -- And then the sun goes down (1:54) -- Poppa's home-made wine (2:16) -- Lu zampogna = The Italian bagpipe man (2:10) -- Little red scooter (2:28).",
        ],
        title: ["Spaghetti sauce and other delights"],
        titleAlt: ["Spaghetti sauce & other delights"],
        titleDisplay: [
          "Spaghetti sauce and other delights [sound recording] / Pat Cooper.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1690386814718,
        uri: "b13701641",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.83217,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:hb990132839380203941",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Švábenický, Jan, 1981-"],
        createdString: ["2012"],
        createdYear: 2012,
        creatorLiteral: ["Mancini, Matteo, 1981-"],
        dateEndString: ["2016"],
        dateEndYear: 2016,
        dateStartYear: 2012,
        dateString: ["2012"],
        dimensions: ["19-21 cm."],
        electronicResources: [],
        extent: ["4 volumes : illustrations ;"],
        genreForm: ["Criticism, interpretation, etc."],
        idIsbn: [
          "9788876063565",
          "8876063560",
          "9788876065033",
          "8876065032",
          "9788876066238",
          "8876066233",
          "9788876067815",
          "8876067817",
        ],
        idLccn: ["  2012455734"],
        idOclc: ["796781456"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "990132839380203941",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788876063565",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8876063560",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788876065033",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8876065032",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788876066238",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8876066233",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788876067815",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8876067817",
          },
          {
            "@type": "bf:Lccn",
            "@value": "  2012455734",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "796781456",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)796781456",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)947945771 (OCoLC)1200831458 (OCoLC)1201694754",
          },
          {
            identifierStatus: "canceled/invalid",
            "@type": "bf:Isbn",
            "@value": "9788876063566",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:hi232158592840003941",
            accessMessage: [
              {
                "@id": "accessMessage:2",
                prefLabel: "Request in advance",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:1",
                prefLabel: "non-circ",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["v.3"],
            idBarcode: ["32044135801371"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "PN1995.9.W4 M325 2012 v.3",
              },
              {
                "@type": "bf:Barcode",
                "@value": "32044135801371",
              },
            ],
            owner: [
              {
                "@id": "orgs:0004",
                prefLabel: "Harvard Library",
              },
            ],
            physRequestable: true,
            physicalLocation: ["PN1995.9.W4 M325 2012"],
            recapCustomerCode: ["HW"],
            requestable: [true],
            shelfMark: ["PN1995.9.W4 M325 2012 v.3"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "hi232158592840003941",
            idNyplSourceId: {
              "@type": "RecapHl",
              "@value": "232158592840003941",
            },
          },
          {
            "@id": "res:hi232158592860003941",
            accessMessage: [
              {
                "@id": "accessMessage:2",
                prefLabel: "Request in advance",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:1",
                prefLabel: "non-circ",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["v.2"],
            idBarcode: ["32044135800936"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "PN1995.9.W4 M325 2012 v.2",
              },
              {
                "@type": "bf:Barcode",
                "@value": "32044135800936",
              },
            ],
            owner: [
              {
                "@id": "orgs:0004",
                prefLabel: "Harvard Library",
              },
            ],
            physRequestable: true,
            physicalLocation: ["PN1995.9.W4 M325 2012"],
            recapCustomerCode: ["HW"],
            requestable: [true],
            shelfMark: ["PN1995.9.W4 M325 2012 v.2"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "hi232158592860003941",
            idNyplSourceId: {
              "@type": "RecapHl",
              "@value": "232158592860003941",
            },
          },
          {
            "@id": "res:hi232158592890003941",
            accessMessage: [
              {
                "@id": "accessMessage:2",
                prefLabel: "Request in advance",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:1",
                prefLabel: "non-circ",
              },
            ],
            eddRequestable: true,
            enumerationChronology: ["v.1"],
            idBarcode: ["32044127016863"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "PN1995.9.W4 M325 2012 v.1",
              },
              {
                "@type": "bf:Barcode",
                "@value": "32044127016863",
              },
            ],
            owner: [
              {
                "@id": "orgs:0004",
                prefLabel: "Harvard Library",
              },
            ],
            physRequestable: true,
            physicalLocation: ["PN1995.9.W4 M325 2012"],
            recapCustomerCode: ["HW"],
            requestable: [true],
            shelfMark: ["PN1995.9.W4 M325 2012 v.1"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "hi232158592890003941",
            idNyplSourceId: {
              "@type": "RecapHl",
              "@value": "232158592890003941",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ita",
            prefLabel: "Italian",
          },
        ],
        lccClassification: ["PN1995.9.W4 M325 2012"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              'Volume 3 - "Con la collaborazione di Jan Švábenický."--Title page verso.',
          },
          {
            noteType: "Bibliography",
            "@type": "bf:Note",
            prefLabel: "Includes bibliographical references.",
          },
          {
            noteType: "Processing Action",
            "@type": "bf:Note",
            prefLabel: "committed to retain",
          },
        ],
        numAvailable: 3,
        numElectronicResources: 0,
        numItems: 3,
        numItemsMatched: 3,
        numItemsTotal: 3,
        nyplSource: ["recap-hl"],
        placeOfPublication: ["Piombino (Livorno)"],
        publicationStatement: [
          "Piombino (Livorno) : Edizioni Il Foglio, 2012-2016.",
        ],
        publisherLiteral: ["Edizioni Il Foglio"],
        seriesStatement: ["Cinema (Edizioni il foglio)"],
        subjectLiteral: [
          "Spaghetti Westerns -- History and criticism.",
          "Motion pictures -- Italy",
          "Motion pictures",
          "Spaghetti Westerns",
          "Italy",
        ],
        tableOfContents: [
          "v. 1. L'alba e il primo splendore del genere, anni '63-'66 -- v.2. La proliferazione del genere (anno 1967) -- v. 3. Il mezzogiorno di fuoco del genere (anni '68-'71) -- v. 4. Il crepuscolo e la notte : tra western kung fu e western nostalgici (anni '72 a oggi) / con saggi di Jan Švábenický.",
        ],
        title: ["Spaghetti western / Matteo Mancini."],
        titleDisplay: ["Spaghetti western / Matteo Mancini."],
        type: ["nypl:Item"],
        uniformTitle: ["Cinema (Edizioni il foglio)"],
        updatedAt: 1656306143478,
        uri: "hb990132839380203941",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.83217,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b11976216",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1994"],
        createdYear: 1994,
        creatorLiteral: ["Harang, Jean-Baptiste."],
        dateStartYear: 1994,
        dateString: ["1994"],
        dimensions: ["21 cm."],
        electronicResources: [],
        extent: ["212 p. ;"],
        idIsbn: ["2246498015"],
        idLccn: ["94228861 //r95"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFD 95-9759",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "11976216",
          },
          {
            "@type": "bf:Isbn",
            "@value": "2246498015",
          },
          {
            "@type": "bf:Lccn",
            "@value": "94228861 //r95",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)nyp1965670",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i13309192",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
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
                "@id": "loc:mal82",
                prefLabel: "Schwarzman Building - Main Reading Room 315",
              },
            ],
            idBarcode: ["33433041469200"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFD 95-9759",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433041469200",
              },
            ],
            owner: [
              {
                "@id": "orgs:1101",
                prefLabel: "General Research Division",
              },
            ],
            physRequestable: true,
            physicalLocation: ["JFD 95-9759"],
            requestable: [true],
            shelfMark: ["JFD 95-9759"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i13309192",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "13309192",
            },
          },
        ],
        language: [
          {
            "@id": "lang:fre",
            prefLabel: "French",
          },
        ],
        lccClassification: ["PQ2668.A569 S63 1994"],
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
        placeOfPublication: ["Paris :"],
        publicationStatement: ["Paris : B. Grasset, c1994."],
        publisherLiteral: ["B. Grasset,"],
        shelfMark: ["JFD 95-9759"],
        title: ["Les spaghettis d'Hitler : roman"],
        titleDisplay: [
          "Les spaghettis d'Hitler : roman / Jean-Baptiste Harang.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1636289522826,
        uri: "b11976216",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.83217,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b12869945",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1964"],
        createdYear: 1964,
        creatorLiteral: ["Waldo, Myra."],
        dateStartYear: 1964,
        dateString: ["1964"],
        dimensions: ["22 cm."],
        electronicResources: [],
        extent: ["263 p. : ill. ;"],
        idLccn: ["64011286"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "D-15 1107",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "12869945",
          },
          {
            "@type": "bf:Lccn",
            "@value": "64011286",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)nyp2849740",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i13501050",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
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
                "@id": "loc:mal82",
                prefLabel: "Schwarzman Building - Main Reading Room 315",
              },
            ],
            idBarcode: ["33433045065806"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "D-15 1107",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433045065806",
              },
            ],
            owner: [
              {
                "@id": "orgs:1101",
                prefLabel: "General Research Division",
              },
            ],
            physRequestable: true,
            physicalLocation: ["D-15 1107"],
            requestable: [true],
            shelfMark: ["D-15 1107"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i13501050",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "13501050",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["TX809.M17 W3"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Includes index.",
          },
        ],
        numAvailable: 1,
        numElectronicResources: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["Garden City, N.Y. :"],
        publicationStatement: ["Garden City, N.Y. : Doubleday, 1964"],
        publisherLiteral: ["Doubleday,"],
        shelfMark: ["D-15 1107"],
        subjectLiteral: ["Cooking (Pasta)"],
        title: ["The art of spaghetti cookery"],
        titleDisplay: ["The art of spaghetti cookery / by Myra Waldo."],
        type: ["nypl:Item"],
        updatedAt: 1636392627292,
        uri: "b12869945",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.83217,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b11478768",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1986"],
        createdYear: 1986,
        creatorLiteral: ["Fox, John Esmond."],
        dateStartYear: 1986,
        dateString: ["1986"],
        dimensions: ["21 cm."],
        electronicResources: [],
        extent: ["iv, 172 p. : ill., 1 map, 3 facsims., 2 plans, ports. ;"],
        idIsbn: ["0951310909 (pbk.) "],
        idLccn: ["gb 89057775"],
        idOclc: ["20753378"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFD 91-11209",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "11478768",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0951310909 (pbk.) :",
          },
          {
            "@type": "bf:Lccn",
            "@value": "gb 89057775",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "20753378",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "20753378",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)nyp0336005",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)20753378",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i13198058",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
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
                "@id": "loc:mal92",
                prefLabel: "Schwarzman Building M2 - General Research Room 315",
              },
            ],
            idBarcode: ["33433040775771"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFD 91-11209",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433040775771",
              },
            ],
            m2CustomerCode: ["XA"],
            physRequestable: true,
            physicalLocation: ["JFD 91-11209"],
            requestable: [true],
            shelfMark: ["JFD 91-11209"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i13198058",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "13198058",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["D805.I8"],
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
        placeOfPublication: ["[Derbyshire]"],
        publicationStatement: ["[Derbyshire] : J.E. Fox, c1986"],
        publisherLiteral: ["J.E. Fox"],
        shelfMark: ["JFD 91-11209"],
        subjectLiteral: [
          "Fox, John Esmond.",
          "World War, 1939-1945 -- Prisoners and prisons, Italian.",
          "World War, 1939-1945 -- Personal narratives, British.",
          "Escapes -- Italy.",
        ],
        title: ["Spaghetti & barbed wire"],
        titleAlt: ["Spaghetti and barbed wire."],
        titleDisplay: ["Spaghetti & barbed wire / by John Esmond Fox."],
        type: ["nypl:Item"],
        updatedAt: 1659342522717,
        uri: "b11478768",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.83217,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b20861534",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Montanari, Massimo, 1949-"],
        createdString: ["2015"],
        createdYear: 2015,
        creatorLiteral: ["Piumini, Roberto"],
        dateStartYear: 2015,
        dateString: ["2015"],
        dimensions: ["25 cm."],
        electronicResources: [],
        extent: ["59 pages : color illustrations ;"],
        idIsbn: ["9788858121269 "],
        idOclc: ["931870602"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "ReCAP 16-2178",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "20861534",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9788858121269 :",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "931870602",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "931870602",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)931870602",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i33678284",
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
            idBarcode: ["33433117996714"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "ReCAP 16-2178",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433117996714",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["ReCAP 16-2178"],
            recapCustomerCode: ["NA"],
            requestable: [true],
            shelfMark: ["ReCAP 16-2178"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i33678284",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "33678284",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ita",
            prefLabel: "Italian",
          },
        ],
        lccClassification: ["PZ44.9 .P58 2015"],
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
        placeOfPublication: ["Roma"],
        publicationStatement: ["Roma : Editori GLF Laterza, [2015]"],
        publisherLiteral: ["Editori GLF Laterza"],
        seriesStatement: ["Celacanto"],
        shelfMark: ["ReCAP 16-2178"],
        subjectLiteral: ["Children's stories, Italian.", "Noodles -- Fiction."],
        title: ["Spaghetti e pomodori"],
        titleDisplay: [
          "Spaghetti e pomodori / Roberto Piumini, Massimo Montanari , illustrazioni di Allegra Agliardi.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1652328708670,
        uri: "b20861534",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.83217,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b20940875",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: [
          "Lyons, George (Harpist)",
          "Yosco, Bob",
          "Rogers, Dick (Vocalist)",
        ],
        createdString: ["1950"],
        createdYear: 1950,
        dateEndString: ["1950"],
        dateEndYear: 1950,
        dateStartYear: 1950,
        dateString: ["1950"],
        dimensions: ["30 cm"],
        electronicResources: [],
        extent: ["1 score (5 pages) ;"],
        genreForm: ["Music.", "Ragtime music.", "Songs."],
        idOclc: ["62697724"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "P.I. (Rag) (Lyons. Spaghetti rag. Copy 2)",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "20940875",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "62697724",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "62697724",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)62697724",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i33957683",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:u",
                prefLabel: "Supervised use",
              },
            ],
            aeonUrl: [
              "https://specialcollections.nypl.org/aeon/Aeon.dll?Action=10&Form=30&Title=Spaghetti+rag+:+song&Site=LPAMR&CallNumber=P.I.+(Rag)+(Lyons.+Spaghetti+rag.+Copy+2)&ItemInfo3=https://catalog.nypl.org/record=b20940875&ReferenceNumber=b209408753&ItemInfo1=SUPERVISED+USE&ItemNumber=33433118092414&ItemISxN=i339576832&Genre=Score&Location=Performing+Arts+Music+and+Recorded+Sound",
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:7",
                prefLabel: "printed music, non-circ",
              },
            ],
            eddRequestable: false,
            formatLiteral: ["Notated music"],
            holdingLocation: [
              {
                "@id": "loc:pam38",
                prefLabel: "Performing Arts Research Collections - Music",
              },
            ],
            idBarcode: ["33433118092414"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "P.I. (Rag) (Lyons. Spaghetti rag. Copy 2)",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433118092414",
              },
            ],
            physRequestable: false,
            physicalLocation: ["P.I. (Rag) (Lyons. Spaghetti rag. Copy 2)"],
            requestable: [true],
            shelfMark: ["P.I. (Rag) (Lyons. Spaghetti rag. Copy 2)"],
            specRequestable: true,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i33957683",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "33957683",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["M1630.2.L96 S63 1950"],
        materialType: [
          {
            "@id": "resourcetypes:not",
            prefLabel: "Notated music",
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "For voice and piano.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Caption title.",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["New York"],
        publicationStatement: [
          "New York : Shapiro, Bernstein & Co., [1950]",
          "©1950",
        ],
        publisherLiteral: ["Shapiro, Bernstein & Co."],
        shelfMark: ["P.I. (Rag) (Lyons. Spaghetti rag. Copy 2)"],
        subjectLiteral: [
          "1941 - 1950",
          "Popular music -- United States -- 1941-1950.",
          "Food -- Songs and music.",
          "Pasta products -- Songs and music.",
          "Ragtime music.",
          "Food.",
          "Popular music.",
          "United States.",
        ],
        title: ["Spaghetti rag : song"],
        titleAlt: ["There's a new sensation that is sweeping the land"],
        titleDisplay: [
          "Spaghetti rag : song / words by Dick Rogers ; music by George Lyons and Bob Yosco.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1690396218783,
        uri: "b20940875",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.83217,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b17650107",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1970"],
        createdYear: 1970,
        creatorLiteral: ["Krahn, Fernando."],
        dateStartYear: 1970,
        dateString: ["1970"],
        electronicResources: [],
        idIsbn: ["0525299696"],
        idLccn: ["   75116883"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "17650107",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0525299696",
          },
          {
            "@type": "bf:Lccn",
            "@value": "   75116883",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i22504950",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:2",
                prefLabel: "book non-circ",
              },
            ],
            eddRequestable: true,
            holdingLocation: [
              {
                "@id": "loc:mal92",
                prefLabel: "Schwarzman Building M2 - General Research Room 315",
              },
            ],
            idBarcode: ["33333081062149"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "J FIC K",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33333081062149",
              },
            ],
            m2CustomerCode: ["NH"],
            physRequestable: true,
            physicalLocation: ["J FIC K"],
            requestable: [true],
            shelfMark: ["J FIC K"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i22504950",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "22504950",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PZ7.K8585 Fl"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              "No one who saw the flying saucer could guess what was inside or where it was going.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Illustrations by the author.",
          },
        ],
        numAvailable: 1,
        numElectronicResources: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["New York,"],
        publicationStatement: ["New York, c1970."],
        subjectLiteral: ["Stories without words."],
        title: ["A flying saucer full of spaghetti."],
        titleDisplay: ["A flying saucer full of spaghetti."],
        type: ["nypl:Item"],
        updatedAt: 1636678830948,
        uri: "b17650107",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.83217,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b22158104",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1986"],
        createdYear: 1986,
        creatorLiteral: ["Hines, Anna Grossnickle."],
        dateStartYear: 1986,
        dateString: ["1986"],
        description: [
          "Not only does Corey's father make the best spaghetti, but he also dresses up as Bathman and acts like a barking dog.",
        ],
        dimensions: ["20 cm."],
        electronicResources: [],
        extent: ["1 v. (unpaged) : col. ill. ;"],
        idIsbn: [
          "0899193889",
          "9780899193885",
          "0395980364",
          "9780395980361",
          "0899197949",
          "9780899197944",
        ],
        idLccn: ["   85013993"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "J PIC H",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "22158104",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0899193889",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9780899193885",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0395980364",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9780395980361",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0899197949",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9780899197944",
          },
          {
            "@type": "bf:Lccn",
            "@value": "   85013993",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)12216696",
          },
          {
            "@type": "bf:Identifier",
            "@value":
              "(OCoLC)42063402 (OCoLC)42269291 (OCoLC)43116636 (OCoLC)47757184 (OCoLC)233616502 (OCoLC)432328227 (OCoLC)438339553",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i37873169",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:2",
                prefLabel: "book non-circ",
              },
            ],
            eddRequestable: true,
            holdingLocation: [
              {
                "@id": "loc:mal92",
                prefLabel: "Schwarzman Building M2 - General Research Room 315",
              },
            ],
            idBarcode: ["33333024213544"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "J PIC H",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33333024213544",
              },
            ],
            m2CustomerCode: ["NH"],
            physRequestable: true,
            physicalLocation: ["J PIC H"],
            requestable: [true],
            shelfMark: ["J PIC H"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i37873169",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "37873169",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PZ7.H572 Dad 1986"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Title on cover.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Board pages.",
          },
        ],
        numAvailable: 1,
        numElectronicResources: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["New York :"],
        publicationStatement: ["New York : Clarion Books, c1986."],
        publisherLiteral: ["Clarion Books,"],
        shelfMark: ["J PIC H"],
        subjectLiteral: [
          "Board books.",
          "Fathers -- Fiction.",
          "Fathers -- Juvenile fiction.",
        ],
        title: ["Daddy makes the best spaghetti"],
        titleDisplay: [
          "Daddy makes the best spaghetti / Anna Grossnickle Hines.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1636784171209,
        uri: "b22158104",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.83217,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b21561785",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["OverDrive, Inc."],
        createdString: ["2017"],
        createdYear: 2017,
        creatorLiteral: ["Nails, Jen"],
        dateStartYear: 2017,
        dateString: ["2017"],
        description: [
          "Since Steffy was little, she and her older sister, Nina, have lived with beloved Auntie Gina. But when Steffy and Nina's dad comes home to live with them, everything changes. So Steffy does what she does best: she cooks her way through the hardest year of her life. But sometimes her life feels like a kitchen-sink meal--too many ingredients that don't quite work. All Steffy wants is for her family to be whole again. Can her recipes help bring them back together?--Provided by Publisher.",
        ],
        electronicResources: [
          {
            url: "http://link.overdrive.com/?websiteID=37&titleID=2875658",
            prefLabel: "Access eNYPL",
          },
        ],
        extent: ["1 online resource (298 pages)"],
        genreForm: ["Fiction.", "Juvenile works."],
        idIsbn: ["9780062427625", "0062427628"],
        idOclc: ["982249196"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "21561785",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9780062427625",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0062427628",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "982249196",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "982249196",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)982249196",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PZ7.1.N342 On 2017eb"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Includes recipes (pages 257-298)",
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
          "New York, NY : Harper, an imprint of HarperCollinsPublishers, 2017.",
        ],
        publisherLiteral: ["Harper, an imprint of HarperCollinsPublishers"],
        subjectLiteral: [
          "Cooking -- Juvenile fiction.",
          "Families -- Juvenile fiction.",
          "Cooking -- Fiction.",
          "Family relationships -- Fiction.",
          "Cooking.",
          "Families.",
        ],
        title: ["One hundred spaghetti strings"],
        titleAlt: ["100 spaghetti strings"],
        titleDisplay: ["One hundred spaghetti strings / Jen Nails."],
        type: ["nypl:Item"],
        updatedAt: 1681296173576,
        uri: "b21561785",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.14619,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b11658754",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1992"],
        createdYear: 1992,
        creatorLiteral: ["Plessen, Elisabeth."],
        dateStartYear: 1992,
        dateString: ["1992"],
        dimensions: ["20 cm."],
        electronicResources: [],
        extent: ["236 p. ;"],
        idIsbn: ["3100617045"],
        idOclc: ["26915798"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFC 92-993",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "11658754",
          },
          {
            "@type": "bf:Isbn",
            "@value": "3100617045",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "26915798",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "26915798",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)26915798",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i13241293",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
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
                "@id": "loc:mal92",
                prefLabel: "Schwarzman Building M2 - General Research Room 315",
              },
            ],
            idBarcode: ["33433043482516"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFC 92-993",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433043482516",
              },
            ],
            m2CustomerCode: ["XA"],
            physRequestable: true,
            physicalLocation: ["JFC 92-993"],
            requestable: [true],
            shelfMark: ["JFC 92-993"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i13241293",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "13241293",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ger",
            prefLabel: "German",
          },
        ],
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
        placeOfPublication: ["Frankfurt am Main"],
        publicationStatement: ["Frankfurt am Main : S.Fischer, c1992."],
        publisherLiteral: ["S.Fischer"],
        shelfMark: ["JFC 92-993"],
        title: ["Lady Spaghetti : Erzählungen"],
        titleDisplay: ["Lady Spaghetti : Erzählungen / Elisabeth Plessen."],
        type: ["nypl:Item"],
        updatedAt: 1659500376686,
        uri: "b11658754",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.14619,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b21490790",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Eiden, Andrew, 1983-", "OverDrive, Inc."],
        createdString: ["2016"],
        createdYear: 2016,
        creatorLiteral: ["Watson, Tom, 1965-"],
        dateStartYear: 2016,
        dateString: ["2016"],
        description: [
          "It's slippery. It's slurpable. It's spaghetti!Perfect for fans of Big Nate, Diary of a Wimpy Kid, and the previous Stick Dog books, Tom Watson's hilarious Stick Dog Slurps Spaghetti is not to be missed.Stick Dog and his gang of hungry hounds want to play tug-of-war. Their search for rope leads to something even better--spaghetti! Once they get a taste, they must get some more.It will be their most difficult mission ever--and will demand all of Stick Dog's problem-solving skills. They'll need to scale the tallest mountain in the suburbs and sneak into a restaurant filled with people.Dangerous humans--a strange-talking girl, a huge chef, and a penguin-man--lurk around every corner. But there's more than danger in the air. Stick Dog has caught the scent of something even more scrumptious than spaghetti. And he'll risk everything to find out what it is.",
        ],
        electronicResources: [
          {
            url: "http://link.overdrive.com/?websiteID=37&titleID=2637531",
            prefLabel: "Access eNYPL",
          },
        ],
        extent: [
          "1 online resource (1 sound file (2 hr., 2 min., 31 sec.)) : digital.",
        ],
        genreForm: ["Audiobooks.", "Fiction.", "Juvenile works."],
        idIsbn: ["9780062570550", "0062570552"],
        idOclc: ["959960723"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "21490790",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9780062570550",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0062570552",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "959960723",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "959960723",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)959960723",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PZ7.W3298 Sts 2016ab"],
        materialType: [
          {
            "@id": "resourcetypes:aud",
            prefLabel: "Audio",
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
        placeOfPublication: ["New York", "New York, NY"],
        publicationStatement: [
          "New York : HarperCollins, 2016.",
          "New York, NY : Harper Audio, [2016]",
        ],
        publisherLiteral: ["HarperCollins", "Harper Audio"],
        subjectLiteral: [
          "Dogs -- Juvenile fiction.",
          "Pasta products -- Juvenile fiction.",
          "Dogs -- Fiction.",
          "Spaghetti -- Fiction.",
          "Dogs.",
          "Pasta products.",
        ],
        supplementaryContent: [
          {
            "@type": "nypl:SupplementaryContent",
            label: "Image",
            url: "http://images.contentreserve.com/ImageType-100/0293-1/{7AD40487-7F82-4A8A-B406-16CF26F60B5C}Img100.jpg",
          },
        ],
        title: ["Stick dog slurps spaghetti"],
        titleDisplay: ["Stick dog slurps spaghetti / Tom Watson."],
        type: ["nypl:Item"],
        updatedAt: 1681377281389,
        uri: "b21490790",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.14619,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b12357972",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1995"],
        createdYear: 1995,
        creatorLiteral: ["Stricker, Tiny."],
        dateStartYear: 1995,
        dateString: ["1995"],
        dimensions: ["21 cm."],
        electronicResources: [],
        extent: ["111 p. ;"],
        idIsbn: ["3875122321"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFD 96-4321",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "12357972",
          },
          {
            "@type": "bf:Isbn",
            "@value": "3875122321",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i13368027",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
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
                "@id": "loc:mal82",
                prefLabel: "Schwarzman Building - Main Reading Room 315",
              },
            ],
            idBarcode: ["33433041796891"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFD 96-4321",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433041796891",
              },
            ],
            owner: [
              {
                "@id": "orgs:1101",
                prefLabel: "General Research Division",
              },
            ],
            physRequestable: true,
            physicalLocation: ["JFD 96-4321"],
            requestable: [true],
            shelfMark: ["JFD 96-4321"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i13368027",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "13368027",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ger",
            prefLabel: "German",
          },
        ],
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
        placeOfPublication: ["Augsburg :"],
        publicationStatement: ["Augsburg : Maro, 1995."],
        publisherLiteral: ["Maro,"],
        shelfMark: ["JFD 96-4321"],
        title: ["Spaghetti Junction : Roman"],
        titleAlt: ["Spaghetti-Junction"],
        titleDisplay: ["Spaghetti Junction : Roman / Tiny Stricker."],
        type: ["nypl:Item"],
        updatedAt: 1636309056026,
        uri: "b12357972",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.14619,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b13978403",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1998"],
        createdYear: 1998,
        creatorLiteral: ["Pisi, Giuseppe."],
        dateStartYear: 1998,
        dateString: ["1998"],
        dimensions: ["21 cm."],
        electronicResources: [],
        extent: ["247 p. ;"],
        idIsbn: ["8886585322"],
        idLccn: ["99164114"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JBD 99-322",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "13978403",
          },
          {
            "@type": "bf:Isbn",
            "@value": "8886585322",
          },
          {
            "@type": "bf:Lccn",
            "@value": "99164114",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i11340350",
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
            idBarcode: ["33433022241313"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JBD 99-322",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433022241313",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["JBD 99-322"],
            recapCustomerCode: ["NA"],
            requestable: [true],
            shelfMark: ["JBD 99-322"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i11340350",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "11340350",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ita",
            prefLabel: "Italian",
          },
        ],
        lccClassification: ["HF5415 .P57 1998"],
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
            prefLabel: "In Italian.",
          },
        ],
        numAvailable: 1,
        numElectronicResources: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["Vicenza :"],
        publicationStatement: ["Vicenza : EGIDA, [1998]"],
        publisherLiteral: ["EGIDA,"],
        shelfMark: ["JBD 99-322"],
        subjectLiteral: ["Marketing."],
        title: ["Spaghetti marketing : on the road"],
        titleDisplay: ["Spaghetti marketing : on the road / Giuseppe Pisi."],
        type: ["nypl:Item"],
        updatedAt: 1636473906700,
        uri: "b13978403",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.14619,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b17198910",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1991"],
        createdYear: 1991,
        creatorLiteral: ["Kobayashi, Robert."],
        dateStartYear: 1991,
        dateString: ["1991"],
        description: [
          "Two adventures--one involving a hungry mouse, the other a magic plant--in the life of an unusual old lady butcher.",
        ],
        dimensions: ["26 cm."],
        electronicResources: [],
        extent: ["[32] p. ;"],
        genreForm: ["Picture books."],
        idIsbn: ["0679816593 (trade) ", "0679916598 (Gibraltar lib. ed.)"],
        idLccn: ["   90020015"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "17198910",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0679816593 (trade) :",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0679916598 (Gibraltar lib. ed.)",
          },
          {
            "@type": "bf:Lccn",
            "@value": "   90020015",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i22500620",
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
            idBarcode: ["33333068637095"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "J PIC K",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33333068637095",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["J PIC K"],
            recapCustomerCode: ["NH"],
            requestable: [true],
            shelfMark: ["J PIC K"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i22500620",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "22500620",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PZ7.K7877 Mar 1991"],
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
        placeOfPublication: ["New York"],
        publicationStatement: ["New York : Knopf, c1991."],
        publisherLiteral: ["Knopf"],
        subjectLiteral: ["Butchers -- Fiction."],
        title: ["Maria Mazaretti loves spaghetti"],
        titleDisplay: [
          "Maria Mazaretti loves spaghetti / by Robert Kobayashi.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1652336086121,
        uri: "b17198910",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.14619,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b17478325",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1983"],
        createdYear: 1983,
        creatorLiteral: ["Frascino, Edward."],
        dateStartYear: 1983,
        dateString: ["1983"],
        description: [
          "Eddie does as much as a boy can for the war effort during World War II.",
        ],
        electronicResources: [],
        idIsbn: ["0060218940 ", "0060218959 (lib. bdg.) "],
        idLccn: ["   82048847"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "17478325",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0060218940 :",
          },
          {
            "@type": "bf:Isbn",
            "@value": "0060218959 (lib. bdg.) :",
          },
          {
            "@type": "bf:Lccn",
            "@value": "   82048847",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i22323583",
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
            idBarcode: ["33333005707985"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "J FIC F",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33333005707985",
              },
            ],
            owner: [
              {
                "@id": "orgs:1000",
                prefLabel: "Stephen A. Schwarzman Building",
              },
            ],
            physRequestable: true,
            physicalLocation: ["J FIC F"],
            recapCustomerCode: ["NH"],
            requestable: [true],
            shelfMark: ["J FIC F"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i22323583",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "22323583",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["PZ7.F8596 Eg 1983"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Illustrations by the author.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Sequel to Eddie Spaghetti.",
          },
        ],
        numAvailable: 1,
        numElectronicResources: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["New York"],
        publicationStatement: ["New York : Harper & Row, c1983."],
        publisherLiteral: ["Harper & Row"],
        subjectLiteral: [
          "World War, 1939-1945 -- Fiction.",
          "Yonkers (N.Y.) -- Fiction.",
        ],
        title: ["Eddie Spaghetti on the homefront"],
        titleDisplay: [
          "Eddie Spaghetti on the homefront / by Edward Frascino.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1652337554752,
        uri: "b17478325",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.14619,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b18587933",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: [
          "New York Public Library for the Performing Arts. Billy Rose Theatre Division. com",
        ],
        electronicResources: [],
        genreForm: ["Reviews (document genre)."],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*T-NBL+ Collection 2007/08 (Spaghetti & matzo balls)",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "18587933",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i37672644",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:22",
                prefLabel: "clipping files",
              },
            ],
            eddRequestable: false,
            formatLiteral: ["Text"],
            holdingLocation: [
              {
                "@id": "loc:pat11",
                prefLabel:
                  "Performing Arts Research Collections - Theatre - Reference",
              },
            ],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value":
                  "*T-NBL+ Collection 2007/08 (Spaghetti & matzo balls)",
              },
            ],
            physRequestable: false,
            physicalLocation: [
              "*T-NBL+ Collection 2007/08 (Spaghetti & matzo balls)",
            ],
            requestable: [false],
            shelfMark: ["*T-NBL+ Collection 2007/08 (Spaghetti & matzo balls)"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i37672644",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "37672644",
            },
          },
        ],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              "Compiled by The Billy Rose Theatre Division, The New York Public Library.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              "One review of Spaghetti & Matzo Balls by Rena Strober and Dean Strober. A one-woman play with songs (not original) performed by Rena Strober.  Reviewed November 14, 2007, when it ws produced at The Triad, 158 West 72nd Street, New York, N.Y.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Reviewed by Julie Colthorne in Show Business.",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        partOf: [
          "Collection of newspaper clippings of dramatic criticism, 2007/08.",
        ],
        shelfMark: ["*T-NBL+ Collection 2007/08 (Spaghetti & matzo balls)"],
        subjectLiteral: [
          "Strober, Rena.",
          "Strober, Dean.",
          "Triad Theater (New York, N.Y.)",
          "Theater -- New York -- Reviews.",
        ],
        title: ["Spaghetti & matzo balls (Strober)"],
        titleAlt: ["Spaghetti and matzo balls (Strober), 2007/08 : reviews."],
        titleDisplay: ["Spaghetti & matzo balls (Strober), 2007/08 : reviews."],
        type: ["nypl:Item"],
        updatedAt: 1690393854759,
        uri: "b18587933",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 75.14619,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b19976707",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Dickinson, Paul, 1965-"],
        createdString: ["2006"],
        createdYear: 2006,
        creatorLiteral: ["Daugherty, Michael, 1954-"],
        dateEndString: ["1998"],
        dateEndYear: 1998,
        dateStartYear: 2006,
        dateString: ["2006"],
        dimensions: ["31 cm"],
        electronicResources: [],
        extent: ["1 score (28 pages) + 1 part (10 pages) ;"],
        idIsbn: ["1476805253", "9781476805252"],
        idLccn: ["884088664442", "M051106905", "9790051106905"],
        idOclc: ["809236116"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JNG 13-220",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "19976707",
          },
          {
            "@type": "bf:Isbn",
            "@value": "1476805253",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9781476805252",
          },
          {
            "@type": "bf:Lccn",
            "@value": "884088664442",
          },
          {
            "@type": "bf:Lccn",
            "@value": "M051106905",
          },
          {
            "@type": "bf:Lccn",
            "@value": "9790051106905",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "809236116",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "809236116",
          },
          {
            "@type": "bf:Identifier",
            "@value": "HL48022364 Hal Leonard Corporation",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)809236116",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i31037805",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:7",
                prefLabel: "printed music, non-circ",
              },
            ],
            eddRequestable: false,
            formatLiteral: ["Notated music"],
            holdingLocation: [
              {
                "@id": "loc:pam32",
                prefLabel: "Performing Arts Research Collections - Music",
              },
            ],
            idBarcode: ["33433111200063"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JNG 13-220",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433111200063",
              },
            ],
            physRequestable: false,
            physicalLocation: ["JNG 13-220"],
            requestable: [false],
            shelfMark: ["JNG 13-220"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i31037805",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "31037805",
            },
          },
        ],
        language: [
          {
            "@id": "lang:zxx",
            prefLabel: "No linguistic content",
          },
        ],
        lccClassification: ["M1035.E5 D38 2006"],
        materialType: [
          {
            "@id": "resourcetypes:not",
            prefLabel: "Notated music",
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              "Accompaniment originally for orchestra; arranged for piano by Paul Dickinson.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "With program and biographical notes.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "At bottom of page [1] of part: Revised 11/06/06.",
          },
          {
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel: "Duration: about 20 min.",
          },
        ],
        numAvailable: 1,
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["[New York, NY]", "Milwaukee, WI"],
        publicationStatement: [
          "[New York, NY] : Hendon Music : Boosey & Hawkes, [2006?]",
          "Milwaukee, WI : Distributed by Hal Leonard Corporation.",
          "©1998",
        ],
        publisherLiteral: [
          "Hendon Music : Boosey & Hawkes",
          "Distributed by Hal Leonard Corporation.",
        ],
        shelfMark: ["JNG 13-220"],
        subjectLiteral: [
          "English horn with orchestra -- Solo with piano.",
          "Spaghetti Westerns -- Songs and music.",
        ],
        tableOfContents: [
          "Strade vuote = (Empty streets) -- Assalto all'oro/La diligenza fantasma = (Gold rush)/(The phantom stagecoach) -- Mezzogiorno di fuoco = (Noon of fire).",
        ],
        title: ["Spaghetti western : (1998)"],
        titleAlt: ["Spaghetti western;"],
        titleDisplay: [
          "Spaghetti western : (1998) / Michael Daugherty ; reduction for English horn and piano.",
        ],
        type: ["nypl:Item"],
        uniformTitle: ["Spaghetti western; arranged"],
        updatedAt: 1690395487178,
        uri: "b19976707",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 70.881996,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b10486337",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["1976"],
        createdYear: 1976,
        creatorLiteral: ["Mariotti, Maximiliano."],
        dateStartYear: 1976,
        dateString: ["1976"],
        dimensions: ["20 cm."],
        electronicResources: [],
        extent: ["223 p. ;"],
        genreForm: ["Western fiction."],
        idLccn: ["77470172"],
        idOclc: ["3071531"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFC 78-969",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "10486337",
          },
          {
            "@type": "bf:Lccn",
            "@value": "77470172",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "3071531",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "3071531",
          },
          {
            "@type": "bf:Identifier",
            "@value": "NN784301283",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(WaOLN)nyp0490879",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)3071531",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i12993011",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
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
                "@id": "loc:mal92",
                prefLabel: "Schwarzman Building M2 - General Research Room 315",
              },
            ],
            idBarcode: ["33433043111214"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFC 78-969",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433043111214",
              },
            ],
            m2CustomerCode: ["XA"],
            physRequestable: true,
            physicalLocation: ["JFC 78-969"],
            requestable: [true],
            shelfMark: ["JFC 78-969"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i12993011",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "12993011",
            },
          },
        ],
        language: [
          {
            "@id": "lang:spa",
            prefLabel: "Spanish",
          },
        ],
        lccClassification: ["PQ7798.23.A657 C8"],
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
        placeOfPublication: ["Buenos Aires"],
        publicationStatement: ["Buenos Aires : Ediciones de la Flor, c1976."],
        publisherLiteral: ["Ediciones de la Flor"],
        shelfMark: ["JFC 78-969"],
        tableOfContents: [
          "Saloon se vende.--Reunión de familia.--Dos mil dólares.--Vaquero se necesita.--La borrachera.--Cuestión de cortesía.--El hombrecito de oro.--El competidor.--Obstinación.--El pacífico Peter.--La apuesta.--Pistoleros.--Adiós, vaquero.",
        ],
        title: ["Cuentos de vaqueros y spaghetti"],
        titleDisplay: ["Cuentos de vaqueros y spaghetti / Max Mariotti."],
        type: ["nypl:Item"],
        updatedAt: 1659139769217,
        uri: "b10486337",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 70.881996,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:pb99110647763506421",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        createdString: ["2017"],
        createdYear: 2017,
        creatorLiteral: ["Hennig, Tessa, 1963-"],
        dateStartYear: 2017,
        dateString: ["2017"],
        dimensions: ["19 cm"],
        electronicResources: [],
        extent: ["355 pages ;"],
        genreForm: ["Novels."],
        idIsbn: ["9783548611495", "3548611494"],
        idOclc: ["on1097216162", "SCSB-9468867"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "99110647763506421",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9783548611495",
          },
          {
            "@type": "bf:Isbn",
            "@value": "3548611494",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "on1097216162",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "SCSB-9468867",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(GyWOH)har130560633",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(NjP)11064776-princetondb",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)on1097216162",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(NjP)Voyager11064776",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:pi23722292570006421",
            "@type": ["bf:Item"],
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
              },
            ],
            catalogItemType: [
              {
                "@id": "catalogItemType:1",
                prefLabel: "non-circ",
              },
            ],
            eddRequestable: true,
            formatLiteral: ["Text"],
            idBarcode: ["32101102566179"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "PT2708.E4878 M36 2017",
              },
              {
                "@type": "bf:Barcode",
                "@value": "32101102566179",
              },
            ],
            owner: [
              {
                "@id": "orgs:0003",
                prefLabel: "Princeton University Library",
              },
            ],
            physRequestable: true,
            physicalLocation: ["PT2708.E4878 M36 2017"],
            recapCustomerCode: ["PA"],
            requestable: [true],
            shelfMark: ["PT2708.E4878 M36 2017"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "pi23722292570006421",
            idNyplSourceId: {
              "@type": "RecapPul",
              "@value": "23722292570006421",
            },
          },
        ],
        language: [
          {
            "@id": "lang:ger",
            prefLabel: "German",
          },
        ],
        lccClassification: ["PT2708.E4878 M36 2017"],
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
        numCheckinCardItems: 0,
        numElectronicResources: 0,
        numItemDatesParsed: 0,
        numItemVolumesParsed: 0,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["recap-pul"],
        placeOfPublication: ["Berlin"],
        publicationStatement: ["Berlin : List Taschenbuch, 2017."],
        publisherLiteral: ["List Taschenbuch"],
        title: ["Mama mag keine Spaghetti : Roman"],
        titleDisplay: ["Mama mag keine Spaghetti : Roman / Tessa Hennig."],
        type: ["nypl:Item"],
        updatedAt: 1696127544427,
        uri: "pb99110647763506421",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 70.62499,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b22691811",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: ["Conti, Gregory, 1952-"],
        createdString: ["2021"],
        createdYear: 2021,
        creatorLiteral: ["Montanari, Massimo, 1949-"],
        dateEndString: ["2021"],
        dateEndYear: 2021,
        dateStartYear: 2021,
        dateString: ["2021"],
        description: [
          '"Is it possible to identify a starting point in history from which everything else unfolds--a single moment that can explain the present and reveal the essence of our identities? According to Massimo Montanari, this is just a myth: by themselves, origins explain very little and historical phenomena can only be understood dynamically--by looking at how events and identities develop and change as a result of encounters and combinations that are often unexpected.  As Montanari shows in this lively, brilliant, and surprising essay, all you need to debunk the "origins myth" is a plate of spaghetti. By tracing the history of the one of Italy\'s "national dishes"--from Asia to America, from Africa to Europe; from the beginning of agriculture to the Middle Ages and up to the 20th century--he shows that in order to understand who we are (our identity) we almost always need to look beyond ourselves to other cultures, peoples, and traditions." --',
        ],
        dimensions: ["22 cm"],
        electronicResources: [],
        extent: ["119 pages : illustrations ;"],
        genreForm: ["History.", "Informational works."],
        idIsbn: ["9781609457099", "1609457099"],
        idOclc: ["1235870379"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFD 22-1543",
          },
          {
            "@type": "nypl:Bnumber",
            "@value": "22691811",
          },
          {
            "@type": "bf:Isbn",
            "@value": "9781609457099",
          },
          {
            "@type": "bf:Isbn",
            "@value": "1609457099",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "1235870379",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)1235870379",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [
          {
            "@id": "res:i39179700",
            accessMessage: [
              {
                "@id": "accessMessage:1",
                prefLabel: "Use in library",
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
                "@id": "loc:mal82",
                prefLabel: "Schwarzman Building - Main Reading Room 315",
              },
            ],
            idBarcode: ["33433133784219"],
            identifier: [
              {
                "@type": "bf:ShelfMark",
                "@value": "JFD 22-1543",
              },
              {
                "@type": "bf:Barcode",
                "@value": "33433133784219",
              },
            ],
            owner: [
              {
                "@id": "orgs:1101",
                prefLabel: "General Research Division",
              },
            ],
            physRequestable: true,
            physicalLocation: ["JFD 22-1543"],
            requestable: [true],
            shelfMark: ["JFD 22-1543"],
            specRequestable: false,
            status: [
              {
                "@id": "status:a",
                prefLabel: "Available",
              },
            ],
            uri: "i39179700",
            idNyplSourceId: {
              "@type": "SierraNypl",
              "@value": "39179700",
            },
          },
        ],
        language: [
          {
            "@id": "lang:eng",
            prefLabel: "English",
          },
        ],
        lccClassification: ["GT2868.68 .M66 2021"],
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
            noteType: "Note",
            "@type": "bf:Note",
            prefLabel:
              '"The unbelievable true story of the world\'s most beloved dish"--Cover.',
          },
          {
            noteType: "Bibliography",
            "@type": "bf:Note",
            prefLabel:
              "Includes bibliographical references (pages [105]-116) and index.",
          },
          {
            noteType: "Language",
            "@type": "bf:Note",
            prefLabel: "Text in English, translated from the Italian.",
          },
        ],
        numAvailable: 1,
        numElectronicResources: 0,
        numItems: 1,
        numItemsMatched: 1,
        numItemsTotal: 1,
        nyplSource: ["sierra-nypl"],
        placeOfPublication: ["New York, NY"],
        publicationStatement: [
          "New York, NY : Europa Editions, 2021.",
          "©2021",
        ],
        publisherLiteral: ["Europa Editions"],
        shelfMark: ["JFD 22-1543"],
        subjectLiteral: [
          "Food habits -- History.",
          "Cooking (Pasta) -- History.",
          "Food -- History.",
          "Cooking (Pasta)",
          "Food habits.",
          "Food -- Social aspects.",
        ],
        tableOfContents: [
          "Words: handle with care -- Recipes and products, or rather, time and space -- Reflecting on a plate of pasta -- Marco Polo and spaghetti: the birth of a fake news item -- Bread and pasta: from the Middle East to Europe -- New names for a new product -- The Sicilian melting pot and the birth of the pasta industry -- When spaghetti were called macaroni -- A new category of food -- How do you cook pasta? -- Cheese on macaroni -- Another way to eat: the fork -- Pasta changes its status -- Al dente -- We are what we eat -- White and red -- Spanish tomato sauce -- A felicitous encounter -- A spice for everyone -- Olive oil and the invention of the Mediterranean diet -- Garlic and onion, peasant aromas -- A touch of green -- The spaghetti tree.",
        ],
        title: ["A short history of spaghetti with tomato sauce"],
        titleAlt: ["Mito delle origini."],
        titleDisplay: [
          "A short history of spaghetti with tomato sauce / Massimo Montanari ; translated from the Italian by Gregory Conti.",
        ],
        type: ["nypl:Item"],
        uniformTitle: ["Mito delle origini. English"],
        updatedAt: 1652386326273,
        uri: "b22691811",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
    {
      "@type": "searchResult",
      searchResultScore: 70.62499,
      result: {
        "@type": ["nypl:Item", "nypl:Resource"],
        "@id": "res:b21860299",
        carrierType: [
          {
            "@id": "carriertypes:nc",
            prefLabel: "volume",
          },
        ],
        contributorLiteral: [
          "Mandonico, Claudio.",
          "Bono, Alessandro.",
          "Mazzonetto, Maura.",
          "Bosio, Daniele.",
          "Italian Mando-Rag Club Citta di Brescia. prf",
          "Center Boys' Rag Band. prf",
          "Raffaele Calace Plectrum Quintet. prf",
        ],
        createdString: ["2006"],
        createdYear: 2006,
        creatorLiteral: ["Orlandi, Ugo."],
        dateEndString: ["2004"],
        dateEndYear: 2004,
        dateStartYear: 2006,
        dateString: ["2006"],
        electronicResources: [
          {
            url: "https://nypl.naxosmusiclibrary.com/catalogue/item.asp?cid=8.557999",
            prefLabel: "Access Naxos Music Library",
          },
        ],
        extent: ["1 online resource (1 sound file)"],
        idLccn: [
          "HKI190607401",
          "HKI190607402",
          "HKI190607403",
          "HKI190607404",
          "HKI190607405",
          "HKI190607406",
          "HKI190607407",
          "HKI190607408",
          "HKI190607409",
          "HKI190607413",
          "HKI190607416",
          "HKI190607410",
          "HKI190607411",
          "HKI190607412",
          "HKI190607414",
          "HKI190607415",
          "HKI190607417",
          "HKI190607418",
          "HKI190607419",
          "HKI190607420",
        ],
        idOclc: ["814061596"],
        identifier: [
          {
            "@type": "nypl:Bnumber",
            "@value": "21860299",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607401",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607402",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607403",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607404",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607405",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607406",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607407",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607408",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607409",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607413",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607416",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607410",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607411",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607412",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607414",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607415",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607417",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607418",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607419",
          },
          {
            "@type": "bf:Lccn",
            "@value": "HKI190607420",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "814061596",
          },
          {
            "@type": "nypl:Oclc",
            "@value": "814061596",
          },
          {
            "@type": "bf:Identifier",
            "@value": "8.557999 Naxos",
          },
          {
            "@type": "bf:Identifier",
            "@value": "(OCoLC)814061596",
          },
        ],
        issuance: [
          {
            "@id": "urn:biblevel:m",
            prefLabel: "monograph/item",
          },
        ],
        items: [],
        language: [
          {
            "@id": "lang:zxx",
            prefLabel: "No linguistic content",
          },
        ],
        lccClassification: ["M1630.2 .S63 2007"],
        materialType: [
          {
            "@id": "resourcetypes:aud",
            prefLabel: "Audio",
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
            noteType: "Event",
            "@type": "bf:Note",
            prefLabel:
              "Recorded June,  2004 at the Auditorium Orchestra di Mandolini e Chitarre, Italy and Accademia Musicale, Ome.",
          },
          {
            noteType: "Source of Description",
            "@type": "bf:Note",
            prefLabel: "Description based on hard copy version record.",
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
        placeOfPublication: ["Canada"],
        publicationStatement: ["Canada : Naxos, p2006."],
        publisherLiteral: ["Naxos, p2006."],
        subjectLiteral: [
          "Ragtime music.",
          "Mandolin orchestra music, Arranged.",
          "Mandolin orchestra music.",
          "Mandolin ensembles.",
        ],
        tableOfContents: [
          "That italian rag / Al Piantadosi (3:08) -- Bunch o'blackberries / Abe Holzmann (3:27) -- A' frangesa / Edward George (1:44) -- Spaghetti rag / George Lyons (2:54) -- Lady of my hearts rag / Nicola Moleti (3:34) -- The entertainer (4:36) ; Solace, a mexican serenade (6:30) ; The maple leaf rag (3:48) / Scott Joplin -- Ragtime / Ermenegildo Carosio (2:45) -- Rubber plant rag (2:56) ; Russian rag (2:56) / George Linus Cobb -- The funny old fakir / A. Piantadosi (4:11) -- Detective rag / E. Carosio (4:09) -- Mando rag / Robert George Ingraham (4:02) -- Operatic rag / Julius Lenzberg (3:29) -- Flirtation rag / E. Carosio (4:20) -- The red Bach book : three rags after Bach / Neil Gladd -- Calace rag / Claudio Mandonico (3:59).",
        ],
        title: ["Spaghetti rag rag music with mandolins"],
        titleDisplay: [
          "Spaghetti rag [electronic resource] : rag music with mandolins / by Ugo Orlandini and Claudio Mandonico.",
        ],
        type: ["nypl:Item"],
        updatedAt: 1681370146688,
        uri: "b21860299",
        suppressed: false,
        hasItemVolumes: false,
        hasItemDates: false,
      },
    },
  ],
  totalResults: 423,
}

export const emptyAggregationsResults = {
  itemListElement: [
    {
      "@type": "nypl:Aggregation",
      "@id": "res:owner",
      id: "owner",
      field: "owner",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:contributorLiteral",
      id: "contributorLiteral",
      field: "contributorLiteral",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:materialType",
      id: "materialType",
      field: "materialType",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:issuance",
      id: "issuance",
      field: "issuance",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:publisher",
      id: "publisher",
      field: "publisher",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:language",
      id: "language",
      field: "language",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:mediaType",
      id: "mediaType",
      field: "mediaType",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:subjectLiteral",
      id: "subjectLiteral",
      field: "subjectLiteral",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:creatorLiteral",
      id: "creatorLiteral",
      field: "creatorLiteral",
      values: [],
    },
  ],
}

export const aggregationsResults = {
  "@context":
    "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
  "@type": "itemList",
  itemListElement: [
    {
      "@type": "nypl:Aggregation",
      "@id": "res:owner",
      id: "owner",
      field: "owner",
      values: [
        {
          value: "orgs:0002",
          count: 56,
          label: "Columbia University Libraries",
        },
        {
          value: "orgs:1000",
          count: 54,
          label: "Stephen A. Schwarzman Building",
        },
        {
          value: "orgs:0004",
          count: 52,
          label: "Harvard Library",
        },
        {
          value: "orgs:1101",
          count: 33,
          label: "General Research Division",
        },
        {
          value: "orgs:0003",
          count: 25,
          label: "Princeton University Library",
        },
        {
          value: "orgs:1002",
          count: 25,
          label:
            "New York Public Library for the Performing Arts, Dorothy and Lewis B. Cullman Center",
        },
        {
          value: "orgs:1114",
          count: 6,
          label:
            "Schomburg Center for Research in Black Culture, Jean Blackwell Hutson Research and Reference Division",
        },
        {
          value: "orgs:1110",
          count: 3,
          label:
            "The Miriam and Ira D. Wallach Division of Art, Prints and Photographs: Art & Architecture Collection",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:contributorLiteral",
      id: "contributorLiteral",
      field: "contributorLiteral",
      values: [
        {
          value: "OverDrive, Inc.",
          count: 53,
          label: "OverDrive, Inc.",
        },
        {
          value: "OverDrive, Inc., distributor",
          count: 9,
          label: "OverDrive, Inc., distributor",
        },
        {
          value: "Mistretta, Gaetano.",
          count: 6,
          label: "Mistretta, Gaetano.",
        },
        {
          value: "Bibliotheca (Firm)",
          count: 3,
          label: "Bibliotheca (Firm)",
        },
        {
          value: "Bibliotheca (Firm), distributor.",
          count: 3,
          label: "Bibliotheca (Firm), distributor.",
        },
        {
          value: "Festi, Roberto.",
          count: 3,
          label: "Festi, Roberto.",
        },
        {
          value: "Brown, Morgan",
          count: 2,
          label: "Brown, Morgan",
        },
        {
          value: "Bruschini, Antonio.",
          count: 2,
          label: "Bruschini, Antonio.",
        },
        {
          value: "Crnkovich, Tony, 1962-",
          count: 2,
          label: "Crnkovich, Tony, 1962-",
        },
        {
          value: "Cullen, Adam, 1986-",
          count: 2,
          label: "Cullen, Adam, 1986-",
        },
        {
          value: "Curti, Roberto, 1971-",
          count: 2,
          label: "Curti, Roberto, 1971-",
        },
        {
          value: "Edwards, Matthew, 1978-",
          count: 2,
          label: "Edwards, Matthew, 1978-",
        },
        {
          value: "Farrel, Pam, 1959-",
          count: 2,
          label: "Farrel, Pam, 1959-",
        },
        {
          value: "Gastaldi, Ernesto, 1934-",
          count: 2,
          label: "Gastaldi, Ernesto, 1934-",
        },
        {
          value: "Getty Publications.",
          count: 2,
          label: "Getty Publications.",
        },
        {
          value: "Goode, Diane.",
          count: 2,
          label: "Goode, Diane.",
        },
        {
          value: "Graziosi, Maurizio Cesare.",
          count: 2,
          label: "Graziosi, Maurizio Cesare.",
        },
        {
          value: "Klein, Thomas.",
          count: 2,
          label: "Klein, Thomas.",
        },
        {
          value: "Krug, Neil.",
          count: 2,
          label: "Krug, Neil.",
        },
        {
          value: "Martin, Dawn Lundy",
          count: 2,
          label: "Martin, Dawn Lundy",
        },
        {
          value: "Morrocchi, Riccardo.",
          count: 2,
          label: "Morrocchi, Riccardo.",
        },
        {
          value: "New Museum of Contemporary Art (New York, N.Y.)",
          count: 2,
          label: "New Museum of Contemporary Art (New York, N.Y.)",
        },
        {
          value: "Norton, Margot,",
          count: 2,
          label: "Norton, Margot,",
        },
        {
          value: "Piselli, Stefano.",
          count: 2,
          label: "Piselli, Stefano.",
        },
        {
          value: "Tentori, Antonio, 1960-",
          count: 2,
          label: "Tentori, Antonio, 1960-",
        },
        {
          value: "Viganò, Aldo.",
          count: 2,
          label: "Viganò, Aldo.",
        },
        {
          value: "3 Hole Press, publisher.",
          count: 1,
          label: "3 Hole Press, publisher.",
        },
        {
          value:
            "3 Hole Press, publisher. http://id.loc.gov/vocabulary/relators/pbl",
          count: 1,
          label:
            "3 Hole Press, publisher. http://id.loc.gov/vocabulary/relators/pbl",
        },
        {
          value: "Ackerley, Sarah, 1981-",
          count: 1,
          label: "Ackerley, Sarah, 1981-",
        },
        {
          value: "Acosta, María",
          count: 1,
          label: "Acosta, María",
        },
        {
          value: "Adams Media.",
          count: 1,
          label: "Adams Media.",
        },
        {
          value: "America's Test Kitchen (Firm)",
          count: 1,
          label: "America's Test Kitchen (Firm)",
        },
        {
          value: "America's Test Kitchen (Firm), author.",
          count: 1,
          label: "America's Test Kitchen (Firm), author.",
        },
        {
          value: "Aperture Foundation.",
          count: 1,
          label: "Aperture Foundation.",
        },
        {
          value: "Arezzo (Italy : Province)",
          count: 1,
          label: "Arezzo (Italy : Province)",
        },
        {
          value: "Ashwander, Donald",
          count: 1,
          label: "Ashwander, Donald",
        },
        {
          value: "Ayres, Mitchell, 1910-1969",
          count: 1,
          label: "Ayres, Mitchell, 1910-1969",
        },
        {
          value: "B Real, 1970-",
          count: 1,
          label: "B Real, 1970-",
        },
        {
          value: "Bacciarelli, Antonella.",
          count: 1,
          label: "Bacciarelli, Antonella.",
        },
        {
          value: "Backbone (Musician)",
          count: 1,
          label: "Backbone (Musician)",
        },
        {
          value: "Badu, Erykah.",
          count: 1,
          label: "Badu, Erykah.",
        },
        {
          value: "Bales, Allen.",
          count: 1,
          label: "Bales, Allen.",
        },
        {
          value:
            "Balthasar-Neumann-Chor, singer. http://id.loc.gov/vocabulary/relators/sng",
          count: 1,
          label:
            "Balthasar-Neumann-Chor, singer. http://id.loc.gov/vocabulary/relators/sng",
        },
        {
          value:
            "Balthasar-Neumann-Ensemble, instrumentalist. http://id.loc.gov/vocabulary/relators/itr",
          count: 1,
          label:
            "Balthasar-Neumann-Ensemble, instrumentalist. http://id.loc.gov/vocabulary/relators/itr",
        },
        {
          value: "Barnard, William Steven.",
          count: 1,
          label: "Barnard, William Steven.",
        },
        {
          value: "Barruel, Laurence",
          count: 1,
          label: "Barruel, Laurence",
        },
        {
          value: "Barry, Katharina,",
          count: 1,
          label: "Barry, Katharina,",
        },
        {
          value: "Bart, Lionel.",
          count: 1,
          label: "Bart, Lionel.",
        },
        {
          value: "Bassett, Leslie, 1923-2016.",
          count: 1,
          label: "Bassett, Leslie, 1923-2016.",
        },
        {
          value: "Baumgarten, Oliver.",
          count: 1,
          label: "Baumgarten, Oliver.",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:materialType",
      id: "materialType",
      field: "materialType",
      values: [
        {
          value: "resourcetypes:txt",
          count: 371,
          label: "Text",
        },
        {
          value: "resourcetypes:aud",
          count: 37,
          label: "Audio",
        },
        {
          value: "resourcetypes:mov",
          count: 8,
          label: "Moving image",
        },
        {
          value: "resourcetypes:not",
          count: 7,
          label: "Notated music",
        },
        {
          value: "resourcetypes:mix",
          count: 1,
          label: "Mixed material",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:issuance",
      id: "issuance",
      field: "issuance",
      values: [
        {
          value: "urn:biblevel:m",
          count: 417,
          label: "monograph/item",
        },
        {
          value: "urn:biblevel:b",
          count: 2,
          label: "serial component part",
        },
        {
          value: "urn:biblevel:c",
          count: 1,
          label: "collection",
        },
        {
          value: "urn:biblevel:s",
          count: 1,
          label: "serial",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:publisher",
      id: "publisher",
      field: "publisher",
      values: [
        {
          value: "Clarkson Potter",
          count: 5,
          label: "Clarkson Potter",
        },
        {
          value: "McFarland & Company, Inc., Publishers",
          count: 5,
          label: "McFarland & Company, Inc., Publishers",
        },
        {
          value: "Hendon Music : Boosey & Hawkes",
          count: 4,
          label: "Hendon Music : Boosey & Hawkes",
        },
        {
          value: "Chronicle Books",
          count: 3,
          label: "Chronicle Books",
        },
        {
          value: "Dutton Children's Books",
          count: 3,
          label: "Dutton Children's Books",
        },
        {
          value: "Houghton Mifflin Harcourt",
          count: 3,
          label: "Houghton Mifflin Harcourt",
        },
        {
          value: "L'Harmattan",
          count: 3,
          label: "L'Harmattan",
        },
        {
          value: "M&P",
          count: 3,
          label: "M&P",
        },
        {
          value: "McFarland & Co.",
          count: 3,
          label: "McFarland & Co.",
        },
        {
          value: "Random House Audio",
          count: 3,
          label: "Random House Audio",
        },
        {
          value: "Schwarzkopf & Schwarzkopf,",
          count: 3,
          label: "Schwarzkopf & Schwarzkopf,",
        },
        {
          value: "3 Hole Press",
          count: 2,
          label: "3 Hole Press",
        },
        {
          value: "Alfred A. Knopf",
          count: 2,
          label: "Alfred A. Knopf",
        },
        {
          value: "Alfred A. Knopf,",
          count: 2,
          label: "Alfred A. Knopf,",
        },
        {
          value: "America's Test Kitchen",
          count: 2,
          label: "America's Test Kitchen",
        },
        {
          value: "Atria Books",
          count: 2,
          label: "Atria Books",
        },
        {
          value: "Carl Hanser Verlag",
          count: 2,
          label: "Carl Hanser Verlag",
        },
        {
          value: "Distributed by Hal Leonard Corporation",
          count: 2,
          label: "Distributed by Hal Leonard Corporation",
        },
        {
          value: "Distributed by Hal Leonard Corporation.",
          count: 2,
          label: "Distributed by Hal Leonard Corporation.",
        },
        {
          value: "Edinburgh University Press",
          count: 2,
          label: "Edinburgh University Press",
        },
        {
          value: "Editori GLF Laterza",
          count: 2,
          label: "Editori GLF Laterza",
        },
        {
          value: "Editorial Unicornio,",
          count: 2,
          label: "Editorial Unicornio,",
        },
        {
          value: "Edizioni Il Foglio",
          count: 2,
          label: "Edizioni Il Foglio",
        },
        {
          value: "F. Motta",
          count: 2,
          label: "F. Motta",
        },
        {
          value: "Falsopiano",
          count: 2,
          label: "Falsopiano",
        },
        {
          value: "Fremantle Arts Centre Press",
          count: 2,
          label: "Fremantle Arts Centre Press",
        },
        {
          value: "Glittering images",
          count: 2,
          label: "Glittering images",
        },
        {
          value: "Glénat",
          count: 2,
          label: "Glénat",
        },
        {
          value: "Harper & Row",
          count: 2,
          label: "Harper & Row",
        },
        {
          value: "HarperCollins",
          count: 2,
          label: "HarperCollins",
        },
        {
          value: "Houghton Mifflin Harcourt,",
          count: 2,
          label: "Houghton Mifflin Harcourt,",
        },
        {
          value: "John Wiley & Sons",
          count: 2,
          label: "John Wiley & Sons",
        },
        {
          value: "LifeWay Press",
          count: 2,
          label: "LifeWay Press",
        },
        {
          value: "Longo",
          count: 2,
          label: "Longo",
        },
        {
          value: "MACK",
          count: 2,
          label: "MACK",
        },
        {
          value: "MGM Records",
          count: 2,
          label: "MGM Records",
        },
        {
          value: "Maro,",
          count: 2,
          label: "Maro,",
        },
        {
          value: "Mercury",
          count: 2,
          label: "Mercury",
        },
        {
          value: "New Museum,",
          count: 2,
          label: "New Museum,",
        },
        {
          value: "Residenz Verlag",
          count: 2,
          label: "Residenz Verlag",
        },
        {
          value: "Universtiy of Chicago Press",
          count: 2,
          label: "Universtiy of Chicago Press",
        },
        {
          value: "W.W. Norton",
          count: 2,
          label: "W.W. Norton",
        },
        {
          value: "Yale Universtiy Press",
          count: 2,
          label: "Yale Universtiy Press",
        },
        {
          value: "A. Sacco,",
          count: 1,
          label: "A. Sacco,",
        },
        {
          value: "Abelard-Schuman",
          count: 1,
          label: "Abelard-Schuman",
        },
        {
          value: "Abrams Books for Young Readers",
          count: 1,
          label: "Abrams Books for Young Readers",
        },
        {
          value: "Actes sud,",
          count: 1,
          label: "Actes sud,",
        },
        {
          value: "Adams Media",
          count: 1,
          label: "Adams Media",
        },
        {
          value: "Alternative Comics",
          count: 1,
          label: "Alternative Comics",
        },
        {
          value: "American Palate,",
          count: 1,
          label: "American Palate,",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:language",
      id: "language",
      field: "language",
      values: [
        {
          value: "lang:eng",
          count: 262,
          label: "English",
        },
        {
          value: "lang:ita",
          count: 59,
          label: "Italian",
        },
        {
          value: "lang:fre",
          count: 34,
          label: "French",
        },
        {
          value: "lang:ger",
          count: 29,
          label: "German",
        },
        {
          value: "lang:spa",
          count: 13,
          label: "Spanish",
        },
        {
          value: "lang:zxx",
          count: 11,
          label: "No linguistic content",
        },
        {
          value: "lang:dut",
          count: 4,
          label: "Dutch",
        },
        {
          value: "lang:heb",
          count: 2,
          label: "Hebrew",
        },
        {
          value: "lang:pol",
          count: 1,
          label: "Polish",
        },
        {
          value: "lang:por",
          count: 1,
          label: "Portuguese",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:mediaType",
      id: "mediaType",
      field: "mediaType",
      values: [
        {
          value: "mediatypes:n",
          count: 412,
          label: "unmediated",
        },
        {
          value: "mediatypes:s",
          count: 6,
          label: "audio",
        },
        {
          value: "mediatypes:undefined",
          count: 4,
          label: "unmediated",
        },
        {
          value: "mediatypes:v",
          count: 2,
          label: "video",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:subjectLiteral",
      id: "subjectLiteral",
      field: "subjectLiteral",
      values: [
        {
          value: "Spaghetti Westerns -- History and criticism.",
          count: 42,
          label: "Spaghetti Westerns -- History and criticism.",
        },
        {
          value: "Cooking, Italian.",
          count: 19,
          label: "Cooking, Italian.",
        },
        {
          value: "Cooking (Pasta)",
          count: 16,
          label: "Cooking (Pasta)",
        },
        {
          value: "Cooking.",
          count: 14,
          label: "Cooking.",
        },
        {
          value: "Spaghetti Westerns.",
          count: 10,
          label: "Spaghetti Westerns.",
        },
        {
          value: "Horror films -- Italy -- History and criticism.",
          count: 5,
          label: "Horror films -- Italy -- History and criticism.",
        },
        {
          value: "Italy.",
          count: 4,
          label: "Italy.",
        },
        {
          value: "Motion pictures -- Italy -- Interviews.",
          count: 4,
          label: "Motion pictures -- Italy -- Interviews.",
        },
        {
          value: "Ragtime music.",
          count: 4,
          label: "Ragtime music.",
        },
        {
          value: "United States.",
          count: 4,
          label: "United States.",
        },
        {
          value: "Western films.",
          count: 4,
          label: "Western films.",
        },
        {
          value: "1900-1999",
          count: 3,
          label: "1900-1999",
        },
        {
          value: "Motion pictures -- Italy",
          count: 3,
          label: "Motion pictures -- Italy",
        },
        {
          value: "Motion pictures.",
          count: 3,
          label: "Motion pictures.",
        },
        {
          value: "2000-2099",
          count: 2,
          label: "2000-2099",
        },
        {
          value: "African Americans -- Drama.",
          count: 2,
          label: "African Americans -- Drama.",
        },
        {
          value: "Appetizers.",
          count: 2,
          label: "Appetizers.",
        },
        {
          value: "Appropriation (Art)",
          count: 2,
          label: "Appropriation (Art)",
        },
        {
          value: "Appropriation (Art) -- Pictorial works.",
          count: 2,
          label: "Appropriation (Art) -- Pictorial works.",
        },
        {
          value: "Art -- Reproduction.",
          count: 2,
          label: "Art -- Reproduction.",
        },
        {
          value: "Buildings.",
          count: 2,
          label: "Buildings.",
        },
        {
          value: "COOKING / Regional & Ethnic / Japanese.",
          count: 2,
          label: "COOKING / Regional & Ethnic / Japanese.",
        },
        {
          value: "California -- Los Angeles.",
          count: 2,
          label: "California -- Los Angeles.",
        },
        {
          value: "Casserole cooking.",
          count: 2,
          label: "Casserole cooking.",
        },
        {
          value: "Children's songs -- Texts.",
          count: 2,
          label: "Children's songs -- Texts.",
        },
        {
          value: "Children's songs.",
          count: 2,
          label: "Children's songs.",
        },
        {
          value: "Cincinnati (Ohio) -- History.",
          count: 2,
          label: "Cincinnati (Ohio) -- History.",
        },
        {
          value: "City planning -- 21st century.",
          count: 2,
          label: "City planning -- 21st century.",
        },
        {
          value: "Civilization -- Influence.",
          count: 2,
          label: "Civilization -- Influence.",
        },
        {
          value: "Comic strip characters in motion pictures.",
          count: 2,
          label: "Comic strip characters in motion pictures.",
        },
        {
          value: "Community life -- Seattle.",
          count: 2,
          label: "Community life -- Seattle.",
        },
        {
          value: "Community life.",
          count: 2,
          label: "Community life.",
        },
        {
          value: "Cooking (Natural foods)",
          count: 2,
          label: "Cooking (Natural foods)",
        },
        {
          value: "Cooking (Pasta) -- History.",
          count: 2,
          label: "Cooking (Pasta) -- History.",
        },
        {
          value: "Cooking -- United States.",
          count: 2,
          label: "Cooking -- United States.",
        },
        {
          value: "Cooking, American.",
          count: 2,
          label: "Cooking, American.",
        },
        {
          value: "Cooking, French.",
          count: 2,
          label: "Cooking, French.",
        },
        {
          value: "Creative ability -- Pictorial works.",
          count: 2,
          label: "Creative ability -- Pictorial works.",
        },
        {
          value: "Dance orchestra music.",
          count: 2,
          label: "Dance orchestra music.",
        },
        {
          value: "Diet therapy -- Popular works.",
          count: 2,
          label: "Diet therapy -- Popular works.",
        },
        {
          value: "Economic development -- Social aspects -- Seattle.",
          count: 2,
          label: "Economic development -- Social aspects -- Seattle.",
        },
        {
          value: "Economic development -- Social aspects.",
          count: 2,
          label: "Economic development -- Social aspects.",
        },
        {
          value: "Families -- Fiction.",
          count: 2,
          label: "Families -- Fiction.",
        },
        {
          value: "Film posters, Italian -- Catalogs.",
          count: 2,
          label: "Film posters, Italian -- Catalogs.",
        },
        {
          value: "Film posters, Italian.",
          count: 2,
          label: "Film posters, Italian.",
        },
        {
          value: "Food habits.",
          count: 2,
          label: "Food habits.",
        },
        {
          value: "Food.",
          count: 2,
          label: "Food.",
        },
        {
          value: "HISTORY / Europe / Italy.",
          count: 2,
          label: "HISTORY / Europe / Italy.",
        },
        {
          value: "Health.",
          count: 2,
          label: "Health.",
        },
        {
          value: "Historic buildings -- Seattle.",
          count: 2,
          label: "Historic buildings -- Seattle.",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:creatorLiteral",
      id: "creatorLiteral",
      field: "creatorLiteral",
      values: [
        {
          value: "Palmerini, Luca M.",
          count: 5,
          label: "Palmerini, Luca M.",
        },
        {
          value: "Daugherty, Michael, 1954-",
          count: 4,
          label: "Daugherty, Michael, 1954-",
        },
        {
          value: "Alberini, Massimo.",
          count: 3,
          label: "Alberini, Massimo.",
        },
        {
          value: "Bruckner, Ulrich P., 1962-",
          count: 3,
          label: "Bruckner, Ulrich P., 1962-",
        },
        {
          value: "Frayling, Christopher.",
          count: 3,
          label: "Frayling, Christopher.",
        },
        {
          value: "Harris, Aleshea",
          count: 3,
          label: "Harris, Aleshea",
        },
        {
          value: "Abugattas, Luis.",
          count: 2,
          label: "Abugattas, Luis.",
        },
        {
          value: "August, Jan, 1912-",
          count: 2,
          label: "August, Jan, 1912-",
        },
        {
          value: "Beatrice, Luca, 1961-",
          count: 2,
          label: "Beatrice, Luca, 1961-",
        },
        {
          value: "Bunbury, Bill.",
          count: 2,
          label: "Bunbury, Bill.",
        },
        {
          value: "Buonassisi, Vincenzo.",
          count: 2,
          label: "Buonassisi, Vincenzo.",
        },
        {
          value: "Callahan, Peter, 1959-",
          count: 2,
          label: "Callahan, Peter, 1959-",
        },
        {
          value: "Casadio, Gianfranco.",
          count: 2,
          label: "Casadio, Gianfranco.",
        },
        {
          value: "Casale, Jana",
          count: 2,
          label: "Casale, Jana",
        },
        {
          value: "Curti, Roberto, 1971-",
          count: 2,
          label: "Curti, Roberto, 1971-",
        },
        {
          value: "D'Amicone, Giulio.",
          count: 2,
          label: "D'Amicone, Giulio.",
        },
        {
          value: "Dahl, Roald",
          count: 2,
          label: "Dahl, Roald",
        },
        {
          value: "DiCamillo, Kate",
          count: 2,
          label: "DiCamillo, Kate",
        },
        {
          value: "España, Rafael de.",
          count: 2,
          label: "España, Rafael de.",
        },
        {
          value: "Farrel, Bill, 1959-",
          count: 2,
          label: "Farrel, Bill, 1959-",
        },
        {
          value: "Fox, John Esmond.",
          count: 2,
          label: "Fox, John Esmond.",
        },
        {
          value: "Fridlund, Bert., 1947-",
          count: 2,
          label: "Fridlund, Bert., 1947-",
        },
        {
          value: "Gaberscek, Carlo.",
          count: 2,
          label: "Gaberscek, Carlo.",
        },
        {
          value: "García, Juan Gabriel.",
          count: 2,
          label: "García, Juan Gabriel.",
        },
        {
          value: "Gayte, Francis Cisco",
          count: 2,
          label: "Gayte, Francis Cisco",
        },
        {
          value: "Giré, Jean-François.",
          count: 2,
          label: "Giré, Jean-François.",
        },
        {
          value: "Glazer, Tom.",
          count: 2,
          label: "Glazer, Tom.",
        },
        {
          value: "Halpern, Greg",
          count: 2,
          label: "Halpern, Greg",
        },
        {
          value: "Harbeck, Joni.",
          count: 2,
          label: "Harbeck, Joni.",
        },
        {
          value: "Hennig, Tessa, 1963-",
          count: 2,
          label: "Hennig, Tessa, 1963-",
        },
        {
          value: "Hohler, Franz.",
          count: 2,
          label: "Hohler, Franz.",
        },
        {
          value: "Hughes, Howard, 1971-",
          count: 2,
          label: "Hughes, Howard, 1971-",
        },
        {
          value: "Kinnard, Roy, 1952-",
          count: 2,
          label: "Kinnard, Roy, 1952-",
        },
        {
          value: "Lawson, Nigella, 1960-",
          count: 2,
          label: "Lawson, Nigella, 1960-",
        },
        {
          value: "Mancini, Matteo, 1981-",
          count: 2,
          label: "Mancini, Matteo, 1981-",
        },
        {
          value: "Mariotti, Maximiliano.",
          count: 2,
          label: "Mariotti, Maximiliano.",
        },
        {
          value: "Montanari, Massimo, 1949-",
          count: 2,
          label: "Montanari, Massimo, 1949-",
        },
        {
          value: "Morton, Drew, 1983-",
          count: 2,
          label: "Morton, Drew, 1983-",
        },
        {
          value: "Palm, Kurt",
          count: 2,
          label: "Palm, Kurt",
        },
        {
          value: "Rottenberg, Mika, 1976-",
          count: 2,
          label: "Rottenberg, Mika, 1976-",
        },
        {
          value: "Acajou.",
          count: 1,
          label: "Acajou.",
        },
        {
          value: "Afeltra, Gaetano, 1937-",
          count: 1,
          label: "Afeltra, Gaetano, 1937-",
        },
        {
          value: "Afeltra, Gaetano.",
          count: 1,
          label: "Afeltra, Gaetano.",
        },
        {
          value: "America's Test Kitchen (COR)",
          count: 1,
          label: "America's Test Kitchen (COR)",
        },
        {
          value: "Arrazola, Amaia, 1984-",
          count: 1,
          label: "Arrazola, Amaia, 1984-",
        },
        {
          value: "Bagshaw, Mel.",
          count: 1,
          label: "Bagshaw, Mel.",
        },
        {
          value: "Baker, Barbara, 1947-",
          count: 1,
          label: "Baker, Barbara, 1947-",
        },
        {
          value: "Battini, Pierre.",
          count: 1,
          label: "Battini, Pierre.",
        },
        {
          value: "Beanland, Christopher",
          count: 1,
          label: "Beanland, Christopher",
        },
        {
          value: "Biella, Federico",
          count: 1,
          label: "Biella, Federico",
        },
      ],
    },
  ],
  totalResults: 424,
}
