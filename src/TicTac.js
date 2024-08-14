const TicTac = ({ type, location, selectTicTac, win }) => {
  return (
    <div
      className={`tic-tac ${win ? `win` : ""}`}
      onClick={(e) => selectTicTac(location)}
    >
      {type}
    </div>
  );
};

export default TicTac;
