import { useState, useRef } from "react";

// export function generateRandomId() {
//   return Math.floor(Math.random() * 1000000000);
// }

// crypto.randomUUID

// Each user needs to have a unique ID

export function CreateUser() {
  // set initial structure and values of userInfo
  const [userInfo, setUserInfo] = useState({
    user: "",
    balance: "",
    userId: "",
  });
  const userDatabase = useRef([]);

  // func to capture user name and balance from the input elements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
  };

  //   func to store the current userInfo in the array upon clicking submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // stores current userInfo inside the useRef
    userDatabase.current.push(userInfo);

    // stores current userInfo inside localstorage
    localStorage.setItem("userInfo", JSON.stringify(userDatabase.current));
    // console.log(userInfo);
    const userDB = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userDB);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Input New User's Name</label>
        <input
          type="text"
          name="user"
          value={userInfo.user}
          onChange={handleChange}
          required
        />

        <label htmlFor="">Input Initial Balance</label>
        <input
          type="number"
          name="balance"
          value={userInfo.balance}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
