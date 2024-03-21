import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input, Button, ButtonGroup, useToast } from "@chakra-ui/react";

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm();

  // const userDatabase = useRef([]);

  const dateToday = new Date().toISOString().split("T")[0];

  let uuid = self.crypto.randomUUID();
  let truncatedUUID = uuid.slice(0, 13);

  const toast = useToast();

  //   func to store the current userInfo in the array upon clicking submit
  const onSubmit = (data) => {
    // console.log(data);
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // userDatabase.current.push(data);

    const updatedUsers = [...existingUsers, data];

    console.log(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    reset();
  };

  return (
    <div className="create-user">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name: </label>
        <Input
          size="md"
          {...register("firstName", { required: true })}
          title="Use upper or lower case letters only"
          pattern="[A-Za-z\s\-']+"
          placeholder="First Name"
        />

        <label>Last Name: </label>
        <Input
          {...register("lastName")}
          title="Use upper or lower case letters only"
          pattern="[A-Za-z\s\-']+"
          required
          placeholder="Last Name"
        />

        <label htmlFor="">Email Address: </label>
        <Input
          type="email"
          {...register("emailAddress")}
          title="Use a valid email address with @"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          placeholder="Email Address"
          required
        />

        <label htmlFor="">Birthday: </label>
        <Input
          type="date"
          {...register("birthDate")}
          max={dateToday}
          required
        />

        <label htmlFor="">Input Initial Balance</label>
        <Input
          type="number"
          name="balance"
          {...register("balance", { required: true })}
          min="0"
          required
          placeholder="Account Balance"
        />

        <label htmlFor="">User ID</label>
        <Input
          type="text"
          defaultValue={truncatedUUID}
          {...register("userId")}
        />

        <Button
          type="submit"
          value="Submit"
          size="md"
          variant="outline"
          onClick={() =>
            toast({
              title: "New User Added",
              description: "New account was successfully created",
              status: "success",
              duration: 3000,
              isClosable: true,
            })
          }
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
