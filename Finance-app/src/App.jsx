import "./App.css";
import BudgetTracker from "./components/BudgetTracker";
import Category from "./components/Category";
import ExpenseList from "./components/ExpenseList";
import ExpensesAndIncome from "./components/ExpensesAndIncome";
import ExpenseVisualization from "./components/ExpenseVisualization";
import SearchExpenses from "./components/SearchExpenses";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div className="content">
          <BudgetTracker />
          <ExpensesAndIncome />
          <Category />
          <ExpenseVisualization />
          <SearchExpenses />
          <ExpenseList />
        </div>
      </div>
    </>
  );
}

export default App;
