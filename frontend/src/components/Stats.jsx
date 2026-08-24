const stats = [
  {
    number: "38+",
    title: "Crop Diseases",
    description: "AI detectable diseases",
  },
  {
    number: "<3s",
    title: "Fast Analysis",
    description: "Quick diagnosis",
  },
  {
    number: "24×7",
    title: "Available",
    description: "Anytime crop assistance",
  },
  {
    number: "100%",
    title: "Farmer Focused",
    description: "Simple & accessible",
  },
];

function Stats() {
  return (
    <section className="stats">
      {stats.map((item, index) => (
        <div className="stat-card" key={index}>
          <h3>{item.number}</h3>
          <strong>{item.title}</strong>
          <span>{item.description}</span>
        </div>
      ))}
    </section>
  );
}

export default Stats;