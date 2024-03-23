
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, useToast, Select } from "@chakra-ui/react";

export default function SendMoney() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [bankUsers, setBankusers] = useState(JSON.parse(localStorage.getItem("users") || "[]"))
  const toast = useToast();
  const [senderId, setSenderId] = useState('')
  const [recipientId, setRecipientId] = useState('')



  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let sender = users.find(user =>
      user.userId === senderId);
    console.log(sender)
    let recipient = users.find(user =>
      user.userId === recipientId);


    // Convert amount to a number using parseFloat
    let amountToSend = parseFloat(data.amount);

    if (sender && recipient && parseFloat(sender.balance) >= amountToSend) {
      // Update balances as numbers
      sender.balance = parseFloat(sender.balance) - amountToSend;
      recipient.balance = parseFloat(recipient.balance) + amountToSend;

      localStorage.setItem("users", JSON.stringify(users));

      toast({
        title: "Transaction successful",
        description: `Money sent from ${sender.firstName} to ${recipient.firstName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
    } else {
      toast({
        title: "Transaction failed",
        description: "Please check the user names and balances",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Send From (User Name): </label>
        <Select onChange={(event) => setSenderId(event.target.value)}>
          {bankUsers.map(user => (
            <option key={user.userId} value={user.userId}>{user.firstName} {user.lastName}</option>))}
        </Select>
        <label>Send To (User Name): </label>
        <Select onChange={(event) => setRecipientId(event.target.value)}>
          {bankUsers.map(user => (
            <option key={user.userId} value={user.userId}>{user.firstName} {user.lastName}</option>))}
        </Select>


        <label>Amount: </label>
        <Input
          type="number"
          {...register("amount", { required: true, min: 1 })}
          placeholder="Amount to Send"
        />

        <Button
          type="submit"
          size="md"
          variant="outline"
        >
          Send Money
        </Button>
      </form>
    </div>
  );
}
