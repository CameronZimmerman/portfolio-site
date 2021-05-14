import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Interactive() {
  const history = useHistory();
  history.push('#interactive')
  return (
    <section className="interactive-portfolio-container center" id="interactive">
      <iframe src="/interactive/interactive.html" title="Interactive Portfolio">

      </iframe>
    </section>
  )
}
