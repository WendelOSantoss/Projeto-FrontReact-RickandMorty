import './card.css';

export function Card({ name, imageUrl }) {
  return (
    <div className="card-component">
      <h2>{name}</h2>
      <section className="card-infos">
        <span></span>
        <img src={imageUrl} alt="personagem" height="100" width="100"></img>
      </section>
    </div>
  );
}