import Info from "./Info";

const Details = () => {
  return (
    <div className="w-full h-full  px-10 py-8 flex flex-col bg-white">
      <img src="https://m.media-amazon.com/images/I/8124jPI4bKL._SX679_.jpg" className="w-full rounded-xl"></img>
      <Info name="name">
        <h1 className="text-2xl font-medium text-dark2">Avocado</h1>
      </Info>
      <Info name="category">
        <h2 className="text-xl font-medium text-dark2">Fruits and vegitables</h2>
      </Info>
      <Info name="note">
        <p className="text-base font-medium text-dark2">
          The avocado is a medium-sized, evergreen tree in the laurel family. It is native to the Americas and was first
          domesticated by Mesoamerican tribes more than 5,000 years ago. Then as now it was prized for its large and
          unusually oily fruit
        </p>
      </Info>
    </div>
  );
};

export default Details;
