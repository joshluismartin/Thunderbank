import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, ButtonGroup } from "@chakra-ui/react";

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const userDatabase = useRef([]);

  let uuid = self.crypto.randomUUID();

  //   func to store the current userInfo in the array upon clicking submit
  const onSubmit = (data) => {
    console.log(data);
    userDatabase.current.push(data);
    localStorage.setItem("users", JSON.stringify(userDatabase.current));

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name: </label>
        <Input
          size="md"
          {...register("First Name", { required: true })}
          title="Use upper or lower case letters only"
          pattern="[A-Za-z\s\-']+"
          placeholder="First Name"
        />

        <label>Last Name: </label>
        <Input
          {...register("Last Name")}
          title="Use upper or lower case letters only"
          pattern="[A-Za-z\s\-']+"
          required
          placeholder="Last Name"
        />

        <label htmlFor="">Birthday: </label>
        <Input type="date" {...register("Birth Date")} />

        <label htmlFor="">Input Initial Balance</label>
        <Input
          type="number"
          name="balance"
          {...register("Balance", { required: true })}
          min="0"
          required
          placeholder="Account Balance"
        />

        <label htmlFor="">User ID</label>
        <Input type="text" defaultValue={uuid} {...register("User ID")} />

        <Button type="submit" value="Submit" size="md" variant="outline">
          Submit
        </Button>
      </form>
    </div>
  );
}
