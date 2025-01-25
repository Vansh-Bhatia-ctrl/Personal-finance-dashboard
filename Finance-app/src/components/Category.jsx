import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserDataContext";

const Category = () => {
  const { expenses } = useContext(UserContext);
  const [userInput, setUserInput] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    setFilteredExpenses([]);
  }, [expenses]);

  const handleUserInput = (event) => {
    setUserInput(event.target.value.toLowerCase());
  };

  const handleSearch = () => {
    const newExpenses = expenses.filter((expense) =>
      expense.category?.toLowerCase().includes(userInput)
    );
    setFilteredExpenses(newExpenses);
  };

  return (
    <div>
      <div className="category-filter">
        <h3>Filter by Category</h3>
        <input
          type="text"
          placeholder="Search by category"
          value={userInput}
          onChange={handleUserInput}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="filtered-expenses">
        <h4>Filtered Expenses</h4>
        {filteredExpenses.length > 0 ? (
          <ul>
            {filteredExpenses.map((expense) => (
              <li key={expense.id}>
                ₹ {expense.amount} - {expense.category} -{" "}
                {expense.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses found for this category</p>
        )}
      </div>
    </div>
  );
};

export default Category;
