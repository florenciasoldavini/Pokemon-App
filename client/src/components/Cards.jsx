import Card from "./Card";

const Cards = ({ pokemons }) => {
    return (
        <div id="cards">
            {
                pokemons.map(({ id, name, image, attack, types}) => {
                    return <Card key={id}
                        id={id}
                        name={name}
                        image={image}
                        attack={attack}
                        types={types}
                    />
                })
            }
        </div>
    )
};

export default Cards;