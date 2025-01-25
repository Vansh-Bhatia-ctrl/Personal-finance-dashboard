import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userInput, setUserInput] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [monthlyAndRemainingIncome, setMonthlyAndRemainingIncome] = useState(
    () => {
      const savedMonthlyBudget = localStorage.getItem(
        "monthlyBudget"
      );
      return savedMonthlyBudget
        ? JSON.parse(savedMonthlyBudget)
        : { monthly: "" };
    }
  );

  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    const totalExpenes = expenses.reduce(
      (acc, expense) => acc + Number(expense.amount),
      0
    );

    const monthly = Number(monthlyAndRemainingIncome.monthly) || 0;
    const remaining = monthly - totalExpenes;
    setRemainingAmount(remaining);
  }, [expenses, monthlyAndRemainingIncome.monthly]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(
      "monthlyBudget",
      JSON.stringify(monthlyAndRemainingIncome)
    );
  }, [monthlyAndRemainingIncome]);

  return (
    <UserContext.Provider
      value={{
        userInput,
        setUserInput,
        expenses,
        setExpenses,
        monthlyAndRemainingIncome,
        setMonthlyAndRemainingIncome,
        remainingAmount,
        setRemainingAmount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
