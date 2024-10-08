"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";
import { db } from "@/utils/dbConfig";
import { eq } from "drizzle-orm";

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setName(budgetInfo.name);
      setAmount(budgetInfo.amount);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast("Budget updated Successfully");
    }
  };

  return (
    <div>
      <Dialog>
        {/* Use asChild to avoid creating a nested button */}
        <DialogTrigger asChild>
          <Button className="flex gap-2 cursor-pointer">
            <PenBox />
            <span>Edit</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="relative">
                  {openEmojiPicker && (
                    <EmojiPicker
                      className="absolute z-10"
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  )}
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-bold my-1">Budget name</h2>
                  <Input
                    placeholder="e.g Home Decor"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <h2 className="text-black font-bold my-1">Budget Amount</h2>
                  <Input
                    placeholder="e.g 5000$"
                    type="number"
                    value={amount || ""}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="mt-5 w-full"
                disabled={!(name && amount)}
                onClick={() => onUpdateBudget()}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
