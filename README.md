# police-brutality-site

## TODO

- Embeds
  - Twitter
  - Youtube
  - Reddit
  - Streamable
  - Gfycat
  - Imgur (+ gallery)
- All incidents (ordered by most recent desc)
  - Primitive Pagination
- Incidents by state
- Incidents by city
- Individual incident page
- Quick jump select to city or state (from home page)
- Updates after data is improved:
  - Use supplied id (once it is supplied)
  - Tags; tag pages

## Data

Dataset: https://github.com/2020PB/police-brutality

Converted into `PbIncident` GraphQL nodes.

Fields:
- id (internal)
- name
- links (array)
- date
- date_text
- city
- state
- edit_at
