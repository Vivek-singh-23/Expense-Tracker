"use client";
import React,{ useEffect, useState } from "react";
import { PiggyBank, ReceiptText, Wallet } from "lucide-react";


function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    if (budgetList && budgetList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    budgetList.forEach((element) => {
      if (element.amount && element.totalSpend) {  // Ensure valid numbers
        totalBudget_ += Number(element.amount);
        totalSpend_ += Number(element.totalSpend);
      }
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm">Total Budget</h2>
          <h2 className="font-bold text-2xl">{totalBudget}</h2>
        </div>
        <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
      </div>

      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm">Total Spend</h2>
          <h2 className="font-bold text-2xl">{totalSpend}</h2>
        </div>
        <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
      </div>

      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm">No. of Budgets</h2>
          <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
        </div>
        <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
      </div>
    </div>
  );
}

export default CardInfo;
