import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Profile = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    image: "",
    password: "",
    countryCode: "",
    phoneNumber: "",
    gender: "",
    language: "",
    maritalStatus: "married",
    dateOfBirth: "",
    timeOfBirth: "",
  });
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [error, setError] = useState({
    userName: "",
    email: "",
    image: "",
    password: "",
    countryCode: "",
    phoneNumber: "",
    gender: "",
    language: "",
    maritalStatus: "",
    dateOfBirth: "",
    timeOfBirth: "",
  });
  const [tnc, setTnc] = useState(false);

  const handleChange = (e) => {
    console.log(error);
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log({ ...form, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let errorObject = {};
    if (form.userName.length == 0) {
      errorObject.userName = "*Field is mandatory";
    } else {
      errorObject.userName = "";
    }
    if (form.email == "") {
      errorObject.email = "*Field is mandatory";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
    ) {
      errorObject.email = "*Please enter a valid E-mail id i.e abcd@gmail.com";
    } else {
      errorObject.email = "";
    }
    if (form.password === "") {
      errorObject.password = "*Field is mandatory";
    } else if (form.password.length < 8) {
      errorObject.password = "Should be minimum 8 characters";
    } else {
      errorObject.password = "";
    }
    if (form.phoneNumber === "") {
      errorObject.phoneNumber = "*Field is mandatory";
    } else if (form.phoneNumber.length < 10) {
      errorObject.phoneNumber = "Invalid Phone number";
    } else {
      errorObject.phoneNumber = "";
    }
    if (form.dateOfBirth === "") {
      errorObject.dateOfBirth = "*Field is mandatory";
    } else {
      errorObject.dateOfBirth = "";
    }
    if (form.timeOfBirth === "") {
      errorObject.timeOfBirth = "*Field is mandatory";
    } else {
      errorObject.timeOfBirth = "";
    }
    if (form.gender == "") {
      errorObject.gender = "*Field is mandatory";
    } else {
      errorObject.gender = "";
    }
    if (form.language == "") {
      errorObject.language = "*Field is mandatory";
    } else {
      errorObject.language = "";
    }
    if (!date.day || !date.month || !date.year) {
      errorObject.dateOfBirth = "*Field is mandatory";
    } else {
      errorObject.dateOfBirth = "";
    }
    if (form.timeOfBirth === "") {
      errorObject.timeOfBirth = "*Field is mandatory";
    } else {
      errorObject.timeOfBirth = ""
    }
    setError(errorObject);
  };
  const handleChangeDate = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    if (!tnc) return;
    validateForm();
  };
  return (
    <div className="w-[375px]  h-[800px] mx-auto border-2 relative">
      <div className="bg-gray-100 p-3">
        <div className="w-[60%] flex justify-between  ">
          <p className="text-xs my-auto">
            <Link to="/">go to home</Link>
          </p>
          <p className="text-2xl">User profile</p>
        </div>
      </div>
      <div>
        {/* user name,email,password,countryCode,phoneNumber,gender,language,maritalStatus,dateOfBirth,timeOfBirth { hours,minutes,seconds} */}
        <div className="flex w-[90%] justify-between mx-auto">
          <div className="py-1">
            <p>Username</p>
            <input
              type="text"
              name="userName"
              placeholder="Enter name here"
              onChange={handleChange}
              className={`border-2 p-2   ${error.userName ? "border-red-500" : "border-gray-500"
                } `}
            />
            <p className="text-red-500">{error.userName}</p>
          </div>

          <div>
            {/* <UploadIcon/> */}
            <p>upload</p>
            <img src="" type="" />
          </div>
        </div>
        <div className="w-[90%] py-1 mx-auto">
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Your email ID"
            onChange={handleChange}
            className={`border-2  p-2 w-[100%] ${error.email ? "border-red-500" : "border-gray-500"
              } `}
          />
          <p className="text-red-500">{error.email}</p>
        </div>
        <div className="py-1 mx-auto w-[90%]">
          <p>Password</p>
          <input
            type="password"
            minLength="8"
            name="password"
            placeholder="Min 8 char"
            onChange={handleChange}
            className={`border-2 p-2 w-[100%]  ${error.password ? "border-red-500" : "border-gray-500"
              } `}
          />
          <p className="text-red-500">{error.password}</p>
        </div>
        <div className="py-1 mx-auto w-[90%] " >
          <p>Phone Number</p>
          <select name="countryCode" className="w-[20%] bg-gray-100 py-2" onChange={handleChange}>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
          </select>
          <input
            type="text"
            placeholder="Enter mobile no"
            name="phoneNumber"
            onChange={handleChange}
            className={`border-2 p-2  w-[80%] ${error.phoneNumber ? "border-red-500" : "border-gray-500"
              } `}
          />
          <p className="text-red-500">{error.password}</p>
        </div>
        <div className="py-1 flex w-[90%] mx-auto">
          <p className="w-[30%] my-auto">Gender</p>
          <div
            className={`flex p-2 w-[70%] justify-around  ${error.gender ? "border-2 border-red-500" : "border-gray-500"
              } `}
          >
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <p className="text-red-500">{error.gender}</p>
        </div>
        <div className="w-[90%] py-1 flex mx-auto">
          <p className="w-[30%] my-auto">Language</p>
          <div
            className={` w-[70%] flex justify-center   ${error.gender ? "border-2 border-red-500" : "border-gray-500"
              } `}
          >
            <input
              className="hidden"
              type="radio"
              id="english"
              name="language"
              value="english"
              onChange={handleChange}
            />
            <label htmlFor="english" className={`${form.language === "english" ? "bg-[#525298] text-white" : ""} w-[40%] text-center cursor-pointer`}>
              English
            </label>
            <input
              className="hidden"
              type="radio"
              id="hindi"
              name="language"
              value="hindi"
              onChange={handleChange}
            />
            <label htmlFor="hindi" className={`${form.language === "hindi" ? "bg-[#525298] text-white" : ""} w-[40%] text-center cursor-pointer`}>Hindi</label>
          </div>
          <p className="text-red-500">{error.language}</p>
        </div>
        <div className=" w-[90%] mx-auto py-1">
          <p className="w-[30%]">Marital Status</p>
          <select
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            className="w-[100%] p-3 border-2"
          >
            <option value="married">Married</option>
            <option value="unmarried">Unmarried</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="w-[90%] mx-auto">
          <p>Date Of Birth</p>
          <div className={` flex justify-around   
            } `}>
            <input
              type="number"
              max="31"
              min="1"
              name="day"
              placeholder="DD"
              className="border-2 p-1"
              onChange={handleChangeDate}
            />
            <input
              type="number"
              max="12"
              min="1"
              name="month"
              placeholder="MM"
              className="border-2 p-1"
              onChange={handleChangeDate}
            />
            <input
              type="number"
              max={new Date().getFullYear()}
              name="year"
              onChange={handleChangeDate}
              placeholder="YYYY"
              className="border-2 p-1"
              min="1900"
            />
          </div>
          <p className="text-red-500">{error.dateOfBirth}</p>
        </div>
        <div className="w-[90%] mx-auto">
          <p>Time of birth</p>
          <input className={`border-2 w-[100%]  ${error.timeOfBirth ? "border-red-500" : "border-gray-500"
            } `} type="time" name="timeOfBirth" onChange={handleChange} />
          <p className="text-red-500">{error.timeOfBirth}</p>
        </div>
        <div className="w-[90%] mx-auto flex">
          <input
            type="checkbox"
            name="tnc"
            className="my-auto mx-2"
            value={tnc}
            onChange={(e) => setTnc(e.target.checked)}
          />
          <p>I accept the terms and conditions</p>
        </div>
        <button
          className={`w-[90%] block my-5 mx-auto h-[50px] bg-violet-500 text-white ${tnc ? "" : "!bg-gray-400"
            }`}
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
