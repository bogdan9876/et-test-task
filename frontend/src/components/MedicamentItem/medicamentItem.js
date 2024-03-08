function MedicamentItem({ item }) {
  return (
    <div className="medicament-section-column">
      <img className="medicament-section-image" src={item.image} alt={item.title} width="400" height="300" />
      <h3 className="medicament-section-text-title">{item.title}</h3>
      <p className="medicament-section-text-paragraph">{item.description}</p>
    </div>
  );
}

export default MedicamentItem;