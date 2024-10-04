"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({budgetId, user, refreshData}) {
    const [name, setName] = useState()
    const [amount, setAmount] = useState()

    const addNewExpense=async()=>{
        const result=await db.insert(Expenses).values({
            name:name,
            amount:amount,
            budgetId:budgetId,
            createdAt: user?.primaryEmailAddress?.emailAddress
        }).returning({insertedId:Budgets.id})


        if(result){
            refreshData();
            toast('New Expense Added')
        }
    }

    return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-bold my-1">Expense name</h2>
        <Input
          placeholder="e.g Home Decor"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-bold my-1">Expense Budget</h2>
        <Input
          placeholder="e.g $1000"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button className='mt-3 w-full' disabled={!(name&&amount)} onClick={ ()=>addNewExpense()}>Add new Expense</Button>

    </div>
  );
}

export default AddExpense;
