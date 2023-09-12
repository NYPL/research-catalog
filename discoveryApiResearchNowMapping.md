# Discovery API - ResearchNow API mapping

## Discovery API

[Github](https://github.com/NYPL/discovery-api/blob/master/README.md#searching)

### Parameters

[GET `/v0.1/discovery/resources`](https://platformdocs.nypl.org/#/discovery/get_v0_1_discovery_resources)

- `q` string
- `page` string
- `per_page` integer
- `sort` integer
  - "relevance", "title", "creator", "date"
- `sort_direction` string
  - "asc", "desc"
  - title defaults to asc, date defaults to desc, creator defaults to asc, relevance is fixed desc
- `search_scope` string
  - "all", "title", "contributor", "subject", "series", "callnumber", "standard_number"
- `filters` string
  - "owner", "subjectLiteral", "holdingLocation", "deliveryLocation", "language", "materialType", "mediaType", "carrierType", "publisher", "contributor", "creator", "issuance", "createdYear", "dateAfter"', or "dateBefore"
  - Specify a hash of filters to apply, where keys are from terms above

## ResearchNow API

[Github](https://github.com/NYPL/sfr-ingest-pipeline/tree/development/app/sfr-search-api#searching)

[GET `/v0.1/research-now/v3/search-api`](https://dev-platformdocs.nypl.org/#/research-now/get_v0_1_research_now_v3_search_api)

[POST `/v0.1/research-now/v3/search-api`](https://dev-platformdocs.nypl.org/#/research-now/post_v0_1_research_now_v3_search_api)

### Parameters

- `queries` array of objects
  - Objects for the queries are formatted as `{"field": filter, "value": value}`
- `filters` array of objects
  - Objects for the filters are formatted as `{"filter": filter, "value": value}`
- `field` string
  - "keyword", "title", "author", "standardNumber" (ISBN, ISSN, LCCN and OCLC) and "subject"
- `query` string
- `recordType`
  - Internal record type to return with the work. Either instances or editions.
- `page` integer (0 indexed)
- `per_page` integer
- `sort` array of objects
  - Objects are formatted as `{"field": field, "dir": dir}`
- `language` array of languages
- `years`
  - This should be formatted as `{"start": year, "end": year}`.

For the DRBB/SCC integration, the DRBB data is fetched using a POST request with a body containing `page`, `per_page`, `filters` (years, languages), and `queries` (author/contributor, subject).

## Example Translation

A GET request to the Discovery API endpoint detailed above with this query

```
?q=hello&filters[subjectLiteral][0]=United%20States&sort=title&sort_direction=asc&search_scope=title&page=1&filters[language][0]=lang%3Aeng&filters[language][1]=lang%3Ager&filters[dateAfter]=1993&filters[dateBefore]=2020
```

would translate to a POST request with this body for ResearchNow's search endpoint:

```json
{
	"queries":[
		{"field":"title","query":"hello"},
		{"field":"subject","query":"United States"}
	],
	"page":0,
	"sort":[{"field":"title","dir":"asc"}],
  "filters":[
    {"field":"language","value":"eng"},
    {"field":"language","value":"ger"},
    {"field":"years","value":{
      "start": 1993,
      "end": 2020,
    }},
  ]}
}
```

<!-- <style>
  table ul {
    list-style: none;
  }
</style> -->

## API Parameters Comparison

This table lists, in the first column, the frontend features related to searching and search filters available from the frontend. The 2nd and 3rd column list out the Discovery API and ResearchNow API parameters that correlate to that frontend functionality.

Single quotes (') are used for frontend terminology. Italics are used to describe frontend features. Code styling (e.g. `filters`) is used for the parameters the respective APIs except.

| Discovery front end                           | Discovery API                                         | ResearchNow API                                 |
| --------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| _Search field_                                | `q`                                                   | `queries`, "value"                              |
| _Search field dropdown_                       | `search_scope`                                        | `queries`, "field"                              |
| <ul>'All Fields'                              | <ul>"all"                                             | <ul>"keyword"                                   |
| <ul>'Title'                                   | <ul>"title"                                           | <ul>"title"                                     |
| <ul>'Author/Contributor'                      | <ul>"contributor"                                     | <ul>"author"                                    |
| <ul>'Standard Number'                         | <ul>"standard_number"                                 | <ul> "standardNumber"                           |
| _Search page filters_                         | `filters`                                             |                                                 |
| <ul>'Format'                                  | <ul>`filters[materialType]`                           | <ul>N/A\*                                       |
| <ul>'Date':<ul><li>'Start Year'<li>'End Year' | <ul><br>`filters[dateAfter]`<br>`filters[dateBefore]` | `filters`<br><ul>`years[start]`<br>`years[end]` |
| <ul>'Language'                                | <ul>`filters[language]`                               | <ul>`filters` `language`                        |
| _Filters linked to from a bib page_           |
| <ul>'Author'                                  | <ul>`filters[creatorLiteral]`                         | <ul>`queries` `"field":"author"`                |
| <ul>'Additional Authors'                      | <ul>`filters[creatorLiteral]`                         | <ul>`queries` `"field":"author"`                |
| <ul>'Subject'                                 | <ul>`filters[subjectLiteral]`                         | <ul>`queries` `"field":"subject"`               |
| _Pagination_                                  | `page`                                                | `page`                                          |
|                                               | `per_page`                                            | `per_page`                                      |
| _Sorting_                                     | `sort`                                                | `sort[field]`                                   |
|                                               | `sort_direction`                                      | `sort[direction]`                               |

\* ResearchNow's `format` parameter does not correspond to the `materialType` in Discovery API. The former relates to digital formats (pdf, epub, and html). The latter to physical material type.

## API Response Structure

### Discovery API

```json
{
  "@context": "string",
  "@type": "itemList",
  "itemListElement": [
    {
      "@type": "searchResult",
      "result": {
        "@type": ["string"],
        "@id": "string",
        "carrierType": [
          {
            "@type": "string",
            "@id": "string",
            "prefLabel": "string"
          }
        ],
        "creatorLiteral": ["string"],
        "contributorLiteral": ["string"],
        "created": "string",
        "createdYear": 0,
        "dateStartYear": 0,
        "depiction": "string",
        "description": "string",
        "endYear": 0,
        "extent": ["string"],
        "holdingCount": 0,
        "issuance": [
          {
            "@type": "string",
            "@id": "string",
            "prefLabel": "string"
          }
        ],
        "items": [
          {
            "@id": "string",
            "accessMessage": [
              {
                "@type": "string",
                "@id": "string",
                "prefLabel": "string"
              }
            ],
            "deliveryLocation": [
              {
                "@type": "string",
                "@id": "string",
                "prefLabel": "string"
              }
            ],
            "holdingLocation": [
              {
                "@type": "string",
                "@id": "string",
                "prefLabel": "string"
              }
            ],
            "idBarcode": "string",
            "identifier": ["string"],
            "owner": [
              {
                "@type": "string",
                "@id": "string",
                "prefLabel": "string"
              }
            ],
            "requestable": [true],
            "eddRequestable": true,
            "shelfMark": ["string"],
            "status": [
              {
                "@type": "string",
                "@id": "string",
                "prefLabel": "string"
              }
            ],
            "uri": "string"
          }
        ],
        "^id": "string",
        "language": [
          {
            "@type": "string",
            "@id": "string",
            "prefLabel": "string"
          }
        ],
        "materialType": [
          {
            "@type": "string",
            "@id": "string",
            "prefLabel": "string"
          }
        ],
        "mediaType": [
          {
            "@type": "string",
            "@id": "string",
            "prefLabel": "string"
          }
        ],
        "note": [
          {
            "@type": "bf:Note",
            "noteType": "string",
            "label": "string"
          }
        ],
        "numAvailable": 0,
        "placeOfPublication": ["string"],
        "prefLabel": ["string"],
        "roles:ROLE": ["string"],
        "startYear": 0,
        "subject": [
          {
            "@type": "string",
            "@id": "string",
            "prefLabel": "string"
          }
        ],
        "suppressed": true,
        "title": ["string"],
        "titleDisplay": ["string"],
        "type": ["nypl:Item"],
        "uri": "string"
      }
    }
  ]
}
```

### ResearchNow API

```json
{
  "status": 0,
  "timestamp": "2020-06-01T20:30:37.458Z",
  "responseType": "string",
  "data": {
    "totalWorks": 0,
    "facets": {
      "facet": [
        {
          "value": "string",
          "count": 0
        }
      ]
    },
    "paging": {
      "prev_page_sort": ["string"],
      "next_page_sort": ["string"]
    },
    "works": [
      {
        "date_modified": "2020-06-01T20:30:37.458Z",
        "date_created": "2020-06-01T20:30:37.458Z",
        "id": 0,
        "uuid": "string",
        "title": "string",
        "sort_title": "string",
        "sub_title": ["string"],
        "medium": "string",
        "series": "string",
        "series_position": 0,
        "edition_count": 0,
        "edition_range": "string",
        "sort": ["string"],
        "agents": [
          {
            "name": "string",
            "sort_name": "string",
            "viaf": "string",
            "lcnaf": "string",
            "role": "string",
            "birth_date_display": "string",
            "death_date_display": "string"
          }
        ],
        "alt_titles": ["string"],
        "instances": [
          {
            "date_modified": "2020-06-01T20:30:37.458Z",
            "date_created": "2020-06-01T20:30:37.458Z",
            "id": 0,
            "title": "string",
            "sort_title": "string",
            "sub_title": "string",
            "pub_place": "string",
            "edition": "string",
            "edition_statement": "string",
            "volume": "string",
            "table_of_contents": "string",
            "copyright_date": "string",
            "extent": "string",
            "summary": "string",
            "work_id": 0,
            "edition_id": 0,
            "agents": [
              {
                "name": "string",
                "sort_name": "string",
                "viaf": "string",
                "lcnaf": "string",
                "role": "string",
                "birth_date_display": "string",
                "death_date_display": "string"
              }
            ],
            "items": [
              {
                "source": "string",
                "content_type": "string",
                "modified": "2020-06-01T20:30:37.458Z",
                "drm": "string",
                "links": [
                  {
                    "url": "string",
                    "media_type": "string",
                    "content": "string",
                    "thumbnail": "string",
                    "local": true,
                    "download": true,
                    "images": true,
                    "ebook": true
                  }
                ]
              }
            ],
            "languages": [
              {
                "language": "string",
                "iso_2": "string",
                "iso_3": "string"
              }
            ],
            "identifiers": [
              {
                "id_type": "string",
                "identifier": "string"
              }
            ]
          }
        ],
        "languages": [
          {
            "language": "string",
            "iso_2": "string",
            "iso_3": "string"
          }
        ],
        "editions": [
          {
            "date_modified": "2020-06-01T20:30:37.460Z",
            "date_created": "2020-06-01T20:30:37.460Z",
            "id": 0,
            "publication_place": "string",
            "publication_date": "string",
            "edition": "string",
            "edition_statement": "string",
            "volume": "string",
            "table_of_contents": "string",
            "extent": "string",
            "summary": "string",
            "work_id": 0,
            "agents": [
              {
                "name": "string",
                "sort_name": "string",
                "viaf": "string",
                "lcnaf": "string",
                "role": "string",
                "birth_date_display": "string",
                "death_date_display": "string"
              }
            ],
            "items": [
              {
                "source": "string",
                "content_type": "string",
                "modified": "2020-06-01T20:30:37.461Z",
                "drm": "string",
                "links": [
                  {
                    "url": "string",
                    "media_type": "string",
                    "content": "string",
                    "thumbnail": "string",
                    "local": true,
                    "download": true,
                    "images": true,
                    "ebook": true
                  }
                ]
              }
            ],
            "languages": [
              {
                "language": "string",
                "iso_2": "string",
                "iso_3": "string"
              }
            ]
          }
        ],
        "identifiers": [
          {
            "id_type": "string",
            "identifier": "string"
          }
        ],
        "subjects": [
          {
            "subject": "string",
            "authority": "string",
            "uri": "string"
          }
        ],
        "measurements": [
          {
            "quantity": "string",
            "value": 0,
            "weight": 0,
            "taken_at": "2020-06-01T20:30:37.461Z"
          }
        ]
      }
    ]
  }
}
```
