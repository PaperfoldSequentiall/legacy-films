import "./deliverables.css"

const Deliverables = () => {
  return (
     <section className="deliverables-section">

      <h2 className="deliverables-title">
        Deliverables
      </h2>

      <p className="deliverables-subtitle">
        How the legacy lives on
      </p>

      <div className="deliverables-grid">

        {/* Card 1 */}
        <div className="deliverable-card">

          <h3>The Film</h3>

          <p className="visual">
            A theatre screen lights up.
          </p>

          <div className="items">
            <span>60–90 min Founders’ Film</span>
          </div>

        </div>

        {/* Card 2 */}
        <div className="deliverable-card highlight">

          <h3>The Reach</h3>

          <p className="visual">
            Across phones, rooms, continents.
          </p>

          <div className="items">
            <span>5-min Highlight</span>
            <span>60-sec Social Film</span>
          </div>

        </div>

        {/* Card 3 */}
        <div className="deliverable-card">

          <h3>Tangible Legacy</h3>

          <p className="visual">
            Preserved for generations.
          </p>

          <div className="items">
            <span>Cinematic Stills</span>
            <span>Coffee Table Book (Optional)</span>
            <span>Digital Archive</span>
          </div>

        </div>

      </div>

      <p className="deliverables-footer">
        Legacy doesn’t live in one format.
        <br />
        It lives everywhere.
      </p>

    </section>
  )
}

export default Deliverables