import React, { useContext } from "react";
import { UserContext } from "../store/UserDataContext.jsx";
import Input from "./Input.jsx";

const ExpensesAndIncome = () => {
  const { userInput, setUserInput, setExpenses } = useContext(UserContext);

  //Getting the user input and using it for validation
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Calculating the monthly budget with the expenses entered
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userInput.amount || !userInput.category || !userInput.description) {
      alert("Empty fields are not allowed");
      return;
    }

    setExpenses((prev) => [...prev, { id: Date.now(), ...userInput }]);
    setUserInput({
      amount: "",
      category: "",
      description: "",
    });
  };

  return (
    <div>
      <div className="expense-tracker">
        <h3>Add Expense</h3>
        <form className="expense-form" onSubmit={handleSubmit}>
          <Input
            name="amount"
            type="number"
            placeholder="Amount"
            inputValue={userInput.amount}
            onChange={handleUserInput}
            required
          />
          <Input
            name="category"
            placeholder="Category"
            inputValue={userInput.category}
            onChange={handleUserInput}
            required
          />
          <Input
            name="description"
            placeholder="Description"
            inputValue={userInput.description}
            onChange={handleUserInput}
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default ExpensesAndIncome;
