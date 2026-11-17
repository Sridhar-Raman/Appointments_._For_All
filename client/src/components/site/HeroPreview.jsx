/**
 * Decorative dashboard preview for the home hero: greeting, three stat tiles and a weekly bar chart.
 * Pure markup with sample numbers (it is an illustration, not live data).
 */
const DAYS = [
    { d: 'Mon', v: 3 }, { d: 'Tue', v: 5 }, { d: 'Wed', v: 4 }, { d: 'Thu', v: 8 }, { d: 'Fri', v: 4 }, { d: 'Sat', v: 6 }, { d: 'Sun', v: 2 },
];
const TILES = [
    { n: 4, label: 'Today', tone: 'hot' },
    { n: 12, label: 'Upcoming', tone: 'soft' },
    { n: 6, label: 'Services', tone: 'navy' },
];

const greeting = (date) => {
    const hour = date.getHours();
    return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
};

const HeroPreview = () => {
    const now = new Date();
    const max = Math.max(...DAYS.map((x) => x.v));
    return (
      <div className="preview-card" role="img" aria-label="Preview of the SRI.CR dashboard">
        <h2 className="pv-hello">{greeting(now)}, Alex</h2>
        <p className="pv-date">{now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        <div className="pv-tiles">
          {TILES.map((tile) => (
            <div key={tile.label} className="pv-tile">
              <span className={`pv-dot ${tile.tone}`} />
              <b>{tile.n}</b>
              <small>{tile.label}</small>
            </div>
          ))}
        </div>
        <div className="pv-chart">
          <h3>Appointments this week</h3>
          <div className="pv-bars">
            {DAYS.map((x) => (
              <div key={x.d} className="pv-col">
                <span className={`pv-bar${x.v === max ? ' peak' : ''}`} style={{ height: `${(x.v / max) * 100}%` }} />
                <small>{x.d}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default HeroPreview;
