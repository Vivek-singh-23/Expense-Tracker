"use client"
import React, { useState } from 'react'
import CreateBudget from './CreateBudget'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets } from '@/utils/schema'
import { Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { db } from '@/utils/dbConfig'
import BudgetItem from './BudgetItem'
import { desc } from 'drizzle-orm'

function BudgetList() {
    
    const {user} = useUser();
    
    useEffect(() => {
      user&&getBudgetList();
    }, [user])
    

    const [BudgetList, setBudgetList] = useState([])


    const getBudgetList = async () => {
        try {
          const result = await db
            .select({
              ...getTableColumns(Budgets),
              totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number), // Sum of expenses
              totalItem: sql`count(${Expenses.id})`.mapWith(Number), // Count of expense items
            })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id))
            setBudgetList(result)
        } catch (error) {
          console.error("Error fetching budget list:", error);
        }
      };
      
    return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 gap-5  md:grid-cols-2 lg:grid-cols-3'>
        <CreateBudget 
        refreshData={()=>getBudgetList()}/>
        {BudgetList?.length > 0? BudgetList.map((budget, index)=>(
            <BudgetItem budget={budget} key={index}/>
        ))
        :[1,2,3,4,5,6].map((item, index)=>(
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>

            </div>
        ))
        }
        </div>
    </div>
  )
}

export default BudgetList