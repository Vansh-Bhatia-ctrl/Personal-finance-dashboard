import React, { useContext, useEffect, useMemo, useRef } from "react";
import { UserContext } from "../store/UserDataContext";
import Chart from "chart.js/auto";

const ExpenseVisualization = () => {
  const { expenses } = useContext(UserContext);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const categoryTotals = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const category = expense.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + Number(expense.amount);
      return acc;
    }, {});
  }, [expenses]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: Object.keys(categoryTotals),
          datasets: [
            {
              label: "Amount Spent",
              data: Object.values(categoryTotals),
              backgroundColor: [
                "#FF6384", // Red
                "#36A2EB", // Blue
                "#FFCE56", // Yellow
                "#4BC0C0", // Teal
                "#9966FF", // Purple
                "#FF9F40", // Orange
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || "";
                  const value = context.parsed || 0;
                  return `${label}: ₹${value}`;
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [categoryTotals]);

  return (
    <div>
      <div className="expense-visualization">
        <h3>Expense Visualization</h3>
        <div style={{ position: "relative", height: "400px", width: "100%" }}>
          <canvas ref={chartRef} id="expenseChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default ExpenseVisualization;
