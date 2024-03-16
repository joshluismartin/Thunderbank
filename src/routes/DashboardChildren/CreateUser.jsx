import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // set initial structure and values of userInfo
  // const [userInfo, setUserInfo] = useState({
  //   user: "",
  //   balance: "",
  //   userId: "",
  // });
  const userDatabase = useRef([]);

  let uuid = self.crypto.randomUUID();

  console.log(uuid);

  // func to capture user name and balance from the input elements
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
  // };

  //   func to store the current userInfo in the array upon clicking submit
  const onSubmit = (data) => {
    console.log(data);
    userDatabase.current.push(data);
    localStorage.setItem("users", JSON.stringify(userDatabase.current));

    reset();
    // e.preventDefault();
    // // stores current userInfo inside the useRef
    // userDatabase.current.push(userInfo);

    // // stores current userInfo inside localstorage
    // localStorage.setItem("userInfo", JSON.stringify(userDatabase.current));
    // // console.log(userInfo);
    // const userDB = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userDB);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name: </label>
        <input
          {...register("First Name", { required: true })}
          title="Use upper or lower case letters only"
          pattern="[A-Za-z\s\-']+"
        />

        <label>Last Name: </label>
        <input
          {...register("Last Name")}
          title="Use upper or lower case letters only"
          pattern="[A-Za-z\s\-']+"
          required
        />

        <label htmlFor="">Birthday: </label>
        <input type="date" {...register("Birth Date")} />

        <label htmlFor="">Input Initial Balance</label>
        <input
          type="number"
          name="balance"
          {...register("Balance", { required: true })}
          min="0"
          required
        />

        <label htmlFor="">User ID</label>
        <input type="text" defaultValue={uuid} {...register("User ID")} />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
