import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button, useToast } from "@chakra-ui/react";

export default function SendMoney() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const toast = useToast();


  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let sender = users.find(user =>
      user.firstName === data.sendFromFirstName && user.lastName === data.sendFromLastName
    );
    let recipient = users.find(user =>
      user.firstName === data.sendToFirstName && user.lastName === data.sendToLastName
    );

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
        <label>Send From (First Name): </label>
        <Input
          {...register("sendFromFirstName", { required: true })}
          placeholder="Sender's First Name"
        />

        <label>Send From (Last Name): </label>
        <Input
          {...register("sendFromLastName", { required: true })}
          placeholder="Sender's Last Name"
        />

        <label>Send To (First Name): </label>
        <Input
          {...register("sendToFirstName", { required: true })}
          placeholder="Recipient's First Name"
        />

        <label>Send To (Last Name): </label>
        <Input
          {...register("sendToLastName", { required: true })}
          placeholder="Recipient's Last Name"
        />
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
