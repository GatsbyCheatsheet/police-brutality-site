# police-brutality-site

## TODO

- Primitive pagination
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

## Data

Dataset: https://github.com/2020PB/police-brutality

Converted into `PbIncident` GraphQL nodes.

Fields:
- id (internal)
- name
- links ([String])
- date
- city (City)
- state (State)
- edit_at
