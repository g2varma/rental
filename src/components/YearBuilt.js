"use client";

const YearBuilt = ({ filterFunctions }) => {
  return (
    <div className="space-area">
      <div className="d-flex align-items-center justify-content-between">
        <div className="form-style1">
          <input
            type="number"
            onChange={(e) =>
              filterFunctions?.handleYearBuild(
                [
                  e.target.value || 1800,
                  document.getElementById("maxYearBuilt").value / 1,
                ] || 2050
              )
            }
            onBlur={(e) => {
              let value = e.target.value;
              if (value < 1800 && value !== "") e.target.value = 1800;
              else if (value > 2050 && value !== "") e.target.value = 2050;
            }}
            min={1800}
            max={2050}
            className="form-control filterInput"
            placeholder={2019}
            id="minYearBuilt"
          />
        </div>
        <span className="dark-color">-</span>
        <div className="form-style1">
          <input
            type="number"
            onChange={(e) =>
              filterFunctions?.handleYearBuild([
                document.getElementById("minYearBuilt").value / 1 || 1800,
                e.target.value || 2050,
              ])
            }
            onBlur={(e) => {
              let value = e.target.value;
              if (value < 1800 && value !== "") e.target.value = 1800;
              else if (value > 2050 && value !== "") e.target.value = 2050;
            }}
            min={1800}
            max={2050}
            className="form-control filterInput"
            placeholder={2050}
            id="maxYearBuilt"
          />
        </div>
      </div>
    </div>
  );
};

export default YearBuilt;
