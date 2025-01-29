"use client";

const SquareFeet = ({ filterFunctions }) => {
  return (
    <div className="space-area">
      <div className="d-flex align-items-center justify-content-between">
        <div className="form-style1">
          <input
            type="number"
            onChange={(e) =>
              filterFunctions?.handleSquareFeet([
                e.target.value,
                document.getElementById("maxFeet").value / 1,
              ])
            }
            onBlur={(e) => {
              if (e.target.value < 0 && e.target.value !== "") e.target.value = 0;
              else if (e.target.value > 100000 && e.target.value !== "") e.target.value = 100000;
            }}
            className="form-control filterInput"
            placeholder="Min."
            min={0}
            max={100000}
            id="minFeet"
          />
        </div>
        <span className="dark-color">-</span>
        <div className="form-style1">
          <input
            type="number"
            id="maxFeet"
            onChange={(e) => filterFunctions?.handleSquareFeet([
              document.getElementById("minFeet").value / 1,
              e.target.value,
            ])}
            onBlur={(e) => {
              if (e.target.value < 0 && e.target.value !== "") e.target.value = 0;
              else if (e.target.value > 100000 && e.target.value !== "") e.target.value = 100000;
            }}
            className="form-control filterInput"
            placeholder="Max"
            min={1}
            max={100000}
          />
        </div>
      </div>
    </div>
  );
};

export default SquareFeet;
