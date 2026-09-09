import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Turn Problems Into Solutions</h1>

          <p>
            SamadhanSetu is a digital platform where citizens can report
            societal problems and connect with universities, industries,
            experts and government organizations to solve them.
          </p>

          <div className="hero-buttons">
            <Link to="/citizen/report" className="primary-btn">
              Report a Problem
            </Link>

            <Link to="/register" className="secondary-btn">
              Join SamadhanSetu
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <h2>How SamadhanSetu Works</h2>

        <div className="steps">
          <div className="step-card">
            <span>1</span>
            <h3>Report</h3>
            <p>Citizens report problems from their local communities.</p>
          </div>

          <div className="step-card">
            <span>2</span>
            <h3>AI Analysis</h3>
            <p>Problems are categorized and prioritized intelligently.</p>
          </div>

          <div className="step-card">
            <span>3</span>
            <h3>Smart Matching</h3>
            <p>Problems are matched with suitable universities and experts.</p>
          </div>

          <div className="step-card">
            <span>4</span>
            <h3>Collaboration</h3>
            <p>Universities and industries collaborate to build solutions.</p>
          </div>

          <div className="step-card">
            <span>5</span>
            <h3>Impact</h3>
            <p>Solutions are deployed and their social impact is tracked.</p>
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section className="section light-section">
        <h2>Who Can Participate?</h2>

        <div className="stakeholder-grid">
          <div className="stakeholder-card">
            <div className="icon">👥</div>
            <h3>Citizens</h3>
            <p>Report problems and track their progress.</p>
          </div>

          <div className="stakeholder-card">
            <div className="icon">🎓</div>
            <h3>Universities</h3>
            <p>Find real-world projects for students and researchers.</p>
          </div>

          <div className="stakeholder-card">
            <div className="icon">🏢</div>
            <h3>Industries</h3>
            <p>Provide technology, funding, mentorship and deployment.</p>
          </div>

          <div className="stakeholder-card">
            <div className="icon">🏛️</div>
            <h3>Government</h3>
            <p>Monitor societal problems and solution progress.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Have a Problem in Your Community?</h2>
        <p>Share it with us and help create a better society.</p>

        <Link to="/citizen/report" className="primary-btn">
          Report Problem
        </Link>
      </section>
    </div>
  );
}

export default Home;