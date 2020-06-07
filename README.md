# police-brutality-site

## Develop

```
npm install
npm run develop
```

## Data

Dataset: https://github.com/2020PB/police-brutality

Converted into `PbIncident` GraphQL nodes with these fields:
```
id: String!
name: String!
slug: String!
links: [String!]!
date: Date @dateformat(formatString: "YYYY-MM-DD")
edit_at: String
state_id: String!
state: State! @link(by: "id", from: "state_id")
city_id: String
city: City @link(by: "id", from: "city_id")
```

Also creates `State` and `City` nodes.

## TODO

- Pagination
- Call to action
- Map
- Updates after data is improved:
  - Descriptions (from .md files)
  - Tags; tag pages
- Future
  - More embeds
    - Streamable (5x links as of 2020-06-06)
    - Gfycat (2x links of 2020-06-06)
    - Imgur (2x links as of 2020-06-06)
