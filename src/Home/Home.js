import React from 'react'

export default function Home() {
  return (
    <div className="center-column">

      <section className="interactive-invitation-text center">
        <p>Tired looking through static portfolios? Take a walk with me through my <a href="#interactive-iframe">interactive Portfolio</a> instead.</p>
      </section>

      <section className="main-text center">
        <p>Thank you for taking the time to visit my portfolio. Maybe you're a fellow developer, recruiter, teacher, or hiring manager; regardless, it is my intention to open up a dialogue and generate discussion with you. I'm inclined to not only show you what I have done, but learn and iterate from my accomplishments based off of feedback.</p>
      </section>

      <section className="interactive-portfolio-container center" id="interactive-iframe">
        <iframe src="./interactive/interactive.html" title="Interactive Portfolio">

        </iframe>
      </section>
    </div>
  )
}
