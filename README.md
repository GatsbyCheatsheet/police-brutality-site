# police-brutality-site

## TODO

- All incidents (ordered by most recent desc)
- Incidents by state
- Incidents by city
- Individual incident page
- Filter all by city, state, tag, etc
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
