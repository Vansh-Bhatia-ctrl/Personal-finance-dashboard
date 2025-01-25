import React, { useContext } from "react";
import { UserContext } from "../store/UserDataContext";

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(UserContext);

  const handleDelete = (id) => {
    const deletedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(deletedExpenses);
  };

  return (
    <div>
      <div className="expense-list">
        <h3>Expense List</h3>
        {expenses.length === 0
          ? null
          : expenses.map((expense) => (
              <li key={expense.id}>
                ₹ {expense.amount} - {expense.category} :{" "}
                {expense.description}
                <button
                  className="x-button"
                  onClick={() => handleDelete(expense.id)}
                >
                  X
                </button>
              </li>
            ))}
      </div>
    </div>
  );
};

export default ExpenseList;
