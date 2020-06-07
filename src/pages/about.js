import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ExternalLinkButton from "../components/external-link-button"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h2>About</h2>
    <p>
      Law enforcement officers across the nation have been brutalizing peaceful
      protesters and rapidly escalating tensions in response to unrest over the
      murder of George Floyd.
    </p>
    <p>
      This website exists to compile evidence of the crimes committed by law
      enforcement across the country so that the media and others may have a
      repository documenting these historic events.
    </p>
    <h3>Contribute</h3>
    <p>
      Contributions can be made on{" "}
      <ExternalLinkButton
        href="https://github.com/2020PB/police-brutality/blob/master/CONTRIBUTING.md#How-to-Contribute-1"
        title="Contribute to 2020PB/police-brutality on GitHub"
        isButton={false}
      >
        GitHub
      </ExternalLinkButton>
      , on{" "}
      <ExternalLinkButton
        href="https://www.reddit.com/r/2020PoliceBrutality/"
        title="r/2020PoliceBrutality on Reddit"
        isButton={false}
      >
        r/2020PoliceBrutality
      </ExternalLinkButton>
      , or via{" "}
      <ExternalLinkButton
        href="https://forms.gle/Npcykamuqz8UEcE58"
        title="Anonymous Report Form"
        isButton={false}
      >
        anonymous report form
      </ExternalLinkButton>
      .
    </p>
    <h3>Website</h3>
    <p>
      This website is a front-end for the data compiled at the{" "}
      <ExternalLinkButton
        href="https://github.com/2020PB/police-brutality"
        title="2020PB/police-brutality on GitHub"
        isButton={false}
      >
        2020PB/police-brutality
      </ExternalLinkButton>{" "}
      project.
    </p>
  </Layout>
)

export default AboutPage
