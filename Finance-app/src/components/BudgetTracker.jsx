import React, { useContext, useState } from "react";
import { UserContext } from "../store/UserDataContext";

const BudgetTracker = () => {
  const {
    monthlyAndRemainingIncome,
    setMonthlyAndRemainingIncome,
    remainingAmount,
  } = useContext(UserContext);
  const [isEditting, setisEditting] = useState(
    () => !monthlyAndRemainingIncome.monthly
  );
  const [error, setError] = useState(false);

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    if (name === "monthly" && value.trim() === "") {
      setError(true);
      return;
    } else {
      setError(false);
    }
    setMonthlyAndRemainingIncome((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSave = () => {
    const budget = Number(monthlyAndRemainingIncome.monthly);
    if (isNaN(budget) || budget <= 0) {
      setError(true);
      return;
    }

    setisEditting(false);
    setError(false);
  };

  const handleDelete = () => {
    setisEditting(true);
    setMonthlyAndRemainingIncome({
      monthly: "",
    });
  };

  return (
    <div>
      <div className="budget-tracker">
        <h3>Budget Tracker</h3>
        <div className="budget-info">
          <div className="monthly-budget">
            <label htmlFor="monthlyBudget">Monthly Budget :</label>
            {isEditting ? (
              <>
                {" "}
                <input
                  type="number"
                  id="budget"
                  name="monthly"
                  placeholder=" eg - ₹ 5000"
                  value={monthlyAndRemainingIncome.monthly}
                  onChange={handleUserInput}
                />
                {error ? (
                  <p
                    style={{
                      color: "#FF5E5E",
                      fontSize: "14px",
                      marginTop: "-1px",
                    }}
                  >
                    Required
                  </p>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                {isEditting ? (
                  <>
                    <input
                      type="number"
                      id="budget"
                      name="monthly"
                      placeholder=" eg - ₹ 5000"
                      value={monthlyAndRemainingIncome.monthly}
                      onChange={handleUserInput}
                    />
                    <button className="save-button" onClick={handleSave}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p>₹ {monthlyAndRemainingIncome.monthly}</p>
                    <button
                      style={{ color: "red", backgroundColor: "white" }}
                      onClick={handleDelete}
                    >
                      [Delete]
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          <div className="remaing-balance">
            <label htmlFor="remainingBudget">Remaining :</label>
            <p>₹ {remainingAmount}</p>
          </div>
          {isEditting && <button onClick={handleSave}>Save</button>}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
