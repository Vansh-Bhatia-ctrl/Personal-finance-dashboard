import React, { useContext, useState } from "react";
import { UserContext } from "../store/UserDataContext";

const SearchExpenses = () => {
  const { expenses } = useContext(UserContext);
  const [userInput, setUserInput] = useState("");
  const [searchedExpense, setSearchedExpense] = useState([]);

  const handleUserInput = (event) => {
    setUserInput(event.target.value.toLowerCase());
  };

  const handleSearch = () => {
    const searchExpense = expenses.filter((expense) =>
      expense.category?.toLowerCase().includes(userInput)
    );
    setSearchedExpense(searchExpense);
  };

  return (
    <div>
      <div className="search-expenses">
        <h3>Search Expenses</h3>
        <input
          type="text"
          placeholder="Search expenses"
          value={userInput}
          onChange={handleUserInput}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="searched-expenses">
        <h4>Searched Expenses</h4>

        {searchedExpense.length > 0 ? (
          <ul>
            {searchedExpense.map((expense) => (
              <li key={expense.id}>
                ₹ {expense.amount} - {expense.category} -{" "}
                {expense.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses found for this search</p>
        )}
      </div>
    </div>
  );
};

export default SearchExpenses;
