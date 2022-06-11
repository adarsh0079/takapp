import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = ({ setMessage }) => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType == "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    profilePic: "",
    password: "",
    countryCode: "+91",
    phoneNumber: "",
    gender: "",
    language: "english",
    maritalStatus: "married",
    dateOfBirth: null,
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
    profilePic: "",
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let errorObject = {},
      validated = true;

    if (form.userName.length == 0) {
      errorObject.userName = "*Field is mandatory";
      validated = false;
    } else {
      errorObject.userName = "";
    }
    if (form.profilePic === "") {
      errorObject.profilePic = "*Image is mandatory";
      validated = false;
    } else {
      errorObject.profilePic = "";
    }
    if (form.email == "") {
      errorObject.email = "*Field is mandatory";
      validated = false;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
    ) {
      errorObject.email = "*Please enter a valid E-mail id i.e abcd@gmail.com";
      validated = false;
    } else {
      errorObject.email = "";
    }
    if (form.password === "") {
      errorObject.password = "*Field is mandatory";
      validated = false;
    } else if (form.password.length < 8) {
      errorObject.password = "Should be minimum 8 characters";
      validated = false;
    } else {
      errorObject.password = "";
    }
    if (form.phoneNumber === "") {
      errorObject.phoneNumber = "*Field is mandatory";
      validated = false;
    } else if (
      form.phoneNumber.match(/^[0-9]{10}$/) === null
    ) {
      errorObject.phoneNumber = "Invalid Phone number";
      validated = false;
    } else {
      console.log(form.phoneNumber.match(/^[0-9]{9}$/));
      errorObject.phoneNumber = "";
    }
    if (form.dateOfBirth === "") {
      
      errorObject.dateOfBirth = "*Field is mandatory";
      validated = false;
    } else {
      errorObject.dateOfBirth = "";
    }
    if (form.timeOfBirth === "") {
      errorObject.timeOfBirth = "*Field is mandatory";
      validated = false;
    } else {
      errorObject.timeOfBirth = "";
    }
    if (form.gender == "") {
      errorObject.gender = "*Field is mandatory";
      validated = false;
    } else {
      errorObject.gender = "";
    }
    if (form.language == "") {
      errorObject.language = "*Field is mandatory";
      validated = false;
    } else {
      errorObject.language = "";
    }
    if (!date.day || !date.month || !date.year) {
      errorObject.dateOfBirth = "*Field is mandatory";
      validated = false;
    } else {
      errorObject.dateOfBirth = "";
    }
    if (form.timeOfBirth === "") {
      errorObject.timeOfBirth = "*Field is mandatory";
      validated = false;
    } else {
      errorObject.timeOfBirth = "";
    }
    setError(errorObject);
    return validated;
  };
  const handleChangeDate = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
    setForm({
      ...form,
      dateOfBirth: new Date(date.year, date.month, date.day),
    });
  };
  const handleFileUpload = (e) => {
    setForm({ ...form, profilePic: URL.createObjectURL(e.target.files[0]) });
    setProfilePicFile(e.target.files[0]);
  };
  const onSubmit = async () => {
    try {
      if (!tnc) return;
      let formValidated = validateForm();
      if (!formValidated) return;
      const data = new FormData();
      data.append("file", profilePicFile);
      data.append("upload_preset", "ml_default");
      let response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnag1wvx8/upload",
        data
      );
      let object = { ...form, profilePic: response.data.url };
      if (process.env.NODE_ENV == "production") {
        response = await axios.post(
          "https://takappbackend.herokuapp.com/user",
          object
        );
      } else {
        response = await axios.post("user", object);
      }
      setMessage({ statusCode: 200, text: response.data.message });
      navigate("/");
    } catch (err) {
      setMessage({
        statusCode: err.response.status,
        text: err.response.data.message,
      });
    }
  };
  return (
    <div className="w-[375px]  h-[800px] mx-auto border-2 relative">
      <div className="bg-gray-100 p-3 h-[50px]">
        <div className="w-[60%] flex justify-between  ">
          <p className="text-xs my-auto">
            <Link to="/">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 6.00019H3.41002L6.71002 2.71019C6.89832 2.52188 7.00411 2.26649 7.00411 2.00019C7.00411 1.73388 6.89832 1.47849 6.71002 1.29019C6.52172 1.10188 6.26632 0.996094 6.00002 0.996094C5.73372 0.996094 5.47832 1.10188 5.29002 1.29019L0.290018 6.29019C0.198978 6.38529 0.127613 6.49743 0.0800184 6.62019C-0.0199996 6.86365 -0.0199996 7.13672 0.0800184 7.38019C0.127613 7.50294 0.198978 7.61508 0.290018 7.71019L5.29002 12.7102C5.38298 12.8039 5.49358 12.8783 5.61544 12.9291C5.7373 12.9798 5.86801 13.006 6.00002 13.006C6.13203 13.006 6.26274 12.9798 6.3846 12.9291C6.50645 12.8783 6.61706 12.8039 6.71002 12.7102C6.80375 12.6172 6.87814 12.5066 6.92891 12.3848C6.97968 12.2629 7.00582 12.1322 7.00582 12.0002C7.00582 11.8682 6.97968 11.7375 6.92891 11.6156C6.87814 11.4937 6.80375 11.3831 6.71002 11.2902L3.41002 8.00019H11C11.2652 8.00019 11.5196 7.89483 11.7071 7.70729C11.8947 7.51976 12 7.2654 12 7.00019C12 6.73497 11.8947 6.48062 11.7071 6.29308C11.5196 6.10554 11.2652 6.00019 11 6.00019Z"
                  fill="black"
                />
              </svg>
            </Link>
          </p>
          <p className="text-2xl">User profile</p>
        </div>
      </div>
      <div className="h-[750px] overflow-auto">
        <div className="flex w-[90%] justify-between mx-auto">
          <div className="py-1 w-[70%]">
            <p>Username</p>
            <input
              type="text"
              name="userName"
              placeholder="Enter name here"
              onChange={handleChange}
              className={`border-2 p-2 rounded-2xl   ${
                error.userName ? "border-red-500" : "border-gray-500"
              } `}
            />
            <p className="text-red-500">{error.userName}</p>
            <p className="text-red-500">{error.profilePic}</p>
          </div>

          <div className=" w-[40%] flex justify-center items-center ">
            <input
              type="file"
              id="profilePic"
              className="hidden"
              name="profilePic"
              onChange={handleFileUpload}
            />
            <label htmlFor="profilePic" className="relative mt-5">
              <div className="relative">
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.1724 10.2414C30.1724 4.71851 25.6952 0.241364 20.1724 0.241364H9.99995C4.4771 0.241364 -4.3869e-05 4.71852 -4.3869e-05 10.2414V20.4138C-4.3869e-05 25.9366 4.47711 30.4138 9.99996 30.4138H25.1724C27.9338 30.4138 30.1724 28.1752 30.1724 25.4138V10.2414Z"
                    fill="#525298"
                  />
                </svg>

                <svg
                  className=" top-[7.24px] left-[6px] absolute"
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.6523 7.07157C2.86846 7.07157 3.07577 7.15835 3.22862 7.3128C3.38147 7.46726 3.46734 7.67674 3.46734 7.89518V13.6604C3.46734 13.8788 3.55321 14.0883 3.70606 14.2428C3.85891 14.3972 4.06623 14.484 4.28239 14.484H15.693C15.9092 14.484 16.1165 14.3972 16.2694 14.2428C16.4222 14.0883 16.5081 13.8788 16.5081 13.6604V7.07157C16.5081 6.85314 16.4222 6.64365 16.2694 6.4892C16.1165 6.33474 15.9092 6.24797 15.693 6.24797H14.063C13.8852 6.25734 13.7093 6.20767 13.5622 6.10654C13.415 6.00542 13.3046 5.85839 13.2479 5.68792L12.8078 4.33721C12.7531 4.17362 12.6489 4.03154 12.51 3.93104C12.371 3.83054 12.2044 3.77671 12.0335 3.77716H7.54258C7.32641 3.77716 7.1191 3.69039 6.96625 3.53593C6.8134 3.38147 6.72753 3.17199 6.72753 2.95355C6.72753 2.73512 6.8134 2.52563 6.96625 2.37118C7.1191 2.21672 7.32641 2.12995 7.54258 2.12995H12.0742C12.5865 2.13092 13.0854 2.29441 13.5008 2.59735C13.9161 2.90029 14.2268 3.32738 14.389 3.81834L14.6498 4.64194H15.693C16.3415 4.64194 16.9635 4.90226 17.422 5.36563C17.8806 5.82899 18.1382 6.45745 18.1382 7.11275V13.7016C18.1382 14.3569 17.8806 14.9853 17.422 15.4487C16.9635 15.9121 16.3415 16.1724 15.693 16.1724H4.28239C3.6339 16.1724 3.01197 15.9121 2.55341 15.4487C2.09486 14.9853 1.83725 14.3569 1.83725 13.7016V7.93636C1.83172 7.82479 1.84871 7.71324 1.88719 7.60852C1.92567 7.50379 1.98483 7.40807 2.06107 7.32717C2.13731 7.24628 2.22904 7.1819 2.33068 7.13796C2.43232 7.09402 2.54175 7.07143 2.6523 7.07157ZM9.98772 6.24797C10.6325 6.24797 11.2628 6.44118 11.799 6.80318C12.3351 7.16517 12.753 7.67969 12.9997 8.28167C13.2465 8.88364 13.3111 9.54604 13.1853 10.1851C13.0595 10.8241 12.749 11.4112 12.293 11.8719C11.8371 12.3326 11.2562 12.6464 10.6237 12.7735C9.99133 12.9006 9.33582 12.8354 8.7401 12.586C8.14437 12.3367 7.6352 11.9144 7.27697 11.3727C6.91874 10.8309 6.72753 10.194 6.72753 9.54238C6.72753 8.66865 7.07101 7.8307 7.68242 7.21288C8.29382 6.59506 9.12306 6.24797 9.98772 6.24797ZM9.98772 11.1896C10.3101 11.1896 10.6253 11.093 10.8933 10.912C11.1614 10.731 11.3703 10.4737 11.4937 10.1727C11.6171 9.87176 11.6494 9.54056 11.5865 9.22103C11.5236 8.9015 11.3683 8.608 11.1404 8.37763C10.9124 8.14727 10.6219 7.99039 10.3057 7.92683C9.98952 7.86327 9.66177 7.89589 9.36391 8.02056C9.06605 8.14524 8.81146 8.35636 8.63234 8.62724C8.45323 8.89813 8.35762 9.2166 8.35762 9.54238C8.35762 9.97925 8.52936 10.3982 8.83507 10.7071C9.14077 11.016 9.55539 11.1896 9.98772 11.1896ZM1.0222 2.12995H1.83725V1.30635C1.83725 1.08791 1.92312 0.878426 2.07597 0.72397C2.22882 0.569515 2.43613 0.482742 2.6523 0.482742C2.86846 0.482742 3.07577 0.569515 3.22862 0.72397C3.38147 0.878426 3.46734 1.08791 3.46734 1.30635V2.12995H4.28239C4.49855 2.12995 4.70586 2.21672 4.85872 2.37118C5.01157 2.52563 5.09744 2.73512 5.09744 2.95355C5.09744 3.17199 5.01157 3.38147 4.85872 3.53593C4.70586 3.69039 4.49855 3.77716 4.28239 3.77716H3.46734V4.60076C3.46734 4.81919 3.38147 5.02868 3.22862 5.18314C3.07577 5.33759 2.86846 5.42437 2.6523 5.42437C2.43613 5.42437 2.22882 5.33759 2.07597 5.18314C1.92312 5.02868 1.83725 4.81919 1.83725 4.60076V3.77716H1.0222C0.806038 3.77716 0.598728 3.69039 0.445877 3.53593C0.293026 3.38147 0.207155 3.17199 0.207155 2.95355C0.207155 2.73512 0.293026 2.52563 0.445877 2.37118C0.598728 2.21672 0.806038 2.12995 1.0222 2.12995Z"
                    fill="white"
                  />
                </svg>
              </div>
            </label>

            <img
              className=" w-[50%] bg-[#525298] rounded-tl-lg rounded-tr-lg rounded-br-lg"
              src={form.profilePic}
            />
          </div>
        </div>
        <div className="w-[90%] py-1 mx-auto">
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Your email ID"
            onChange={handleChange}
            className={`border-2 rounded-2xl  p-2 w-[100%] ${
              error.email ? "border-red-500" : "border-gray-500"
            } `}
          />
          <p className="text-red-500">{error.email}</p>
        </div>
        <div className="py-1 mx-auto w-[90%]">
          <p>Password</p>
          <div className="password-field">
            <input
              type={passwordType}
              minLength="8"
              name="password"
              placeholder="Min 8 char"
              onChange={handleChange}
              className={`border-2 rounded-2xl p-2 w-[100%]  ${
                error.password ? "border-red-500" : "border-gray-500"
              } `}
            />
            <svg
              className={`${
                passwordType === "password" ? "visible" : "hidden"
              }`}
              onClick={togglePassword}
              width="19"
              height="14"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7L0.105573 6.55279C-0.0351909 6.83431 -0.0351909 7.16569 0.105573 7.44721L1 7ZM17.5 7L18.3944 7.44721C18.5352 7.16569 18.5352 6.83431 18.3944 6.55279L17.5 7ZM1 7C1.89443 7.44721 1.89429 7.4475 1.89416 7.44776C1.89413 7.44781 1.89401 7.44805 1.89395 7.44817C1.89384 7.44839 1.89377 7.44853 1.89374 7.44858C1.89369 7.44868 1.89382 7.44842 1.89413 7.44781C1.89475 7.4466 1.89608 7.44398 1.89812 7.44001C1.9022 7.43208 1.90912 7.41873 1.91885 7.40034C1.93832 7.36354 1.96902 7.30661 2.01074 7.23245C2.09425 7.08398 2.22148 6.86723 2.39082 6.60503C2.73075 6.07869 3.23379 5.3794 3.88579 4.68394C5.20802 3.27356 7.02451 2 9.25 2V0C6.22549 0 3.91698 1.72644 2.42671 3.31606C1.67246 4.1206 1.09738 4.92131 0.710742 5.51997C0.516803 5.82027 0.368643 6.07227 0.267585 6.25193C0.217018 6.34182 0.178131 6.41381 0.151096 6.4649C0.137575 6.49045 0.127008 6.5108 0.119416 6.52556C0.11562 6.53295 0.112566 6.53894 0.110259 6.54349C0.109105 6.54577 0.108137 6.54768 0.107356 6.54923C0.106965 6.55001 0.106622 6.55069 0.106324 6.55129C0.106176 6.55158 0.105988 6.55196 0.105914 6.55211C0.105737 6.55246 0.105573 6.55279 1 7ZM9.25 2C11.4755 2 13.292 3.27356 14.6142 4.68394C15.2662 5.3794 15.7693 6.07869 16.1092 6.60503C16.2785 6.86723 16.4058 7.08398 16.4893 7.23245C16.531 7.30661 16.5617 7.36354 16.5811 7.40034C16.5909 7.41873 16.5978 7.43208 16.6019 7.44001C16.6039 7.44398 16.6053 7.4466 16.6059 7.44781C16.6062 7.44842 16.6063 7.44868 16.6063 7.44858C16.6062 7.44853 16.6062 7.44839 16.606 7.44817C16.606 7.44805 16.6059 7.44781 16.6058 7.44776C16.6057 7.4475 16.6056 7.44721 17.5 7C18.3944 6.55279 18.3943 6.55246 18.3941 6.55211C18.394 6.55196 18.3938 6.55158 18.3937 6.55129C18.3934 6.55069 18.393 6.55001 18.3926 6.54923C18.3919 6.54768 18.3909 6.54577 18.3897 6.54349C18.3874 6.53894 18.3844 6.53295 18.3806 6.52556C18.373 6.5108 18.3624 6.49045 18.3489 6.4649C18.3219 6.41381 18.283 6.34182 18.2324 6.25193C18.1314 6.07227 17.9832 5.82027 17.7893 5.51997C17.4026 4.92131 16.8275 4.1206 16.0733 3.31606C14.583 1.72644 12.2745 0 9.25 0V2ZM17.5 7C16.6056 6.55279 16.6057 6.5525 16.6058 6.55224C16.6059 6.55219 16.606 6.55195 16.606 6.55183C16.6062 6.55161 16.6062 6.55147 16.6063 6.55142C16.6063 6.55132 16.6062 6.55158 16.6059 6.55219C16.6053 6.5534 16.6039 6.55602 16.6019 6.55999C16.5978 6.56792 16.5909 6.58127 16.5811 6.59966C16.5617 6.63646 16.531 6.69339 16.4893 6.76755C16.4058 6.91602 16.2785 7.13277 16.1092 7.39497C15.7693 7.92131 15.2662 8.6206 14.6142 9.31606C13.292 10.7264 11.4755 12 9.25 12V14C12.2745 14 14.583 12.2736 16.0733 10.6839C16.8275 9.8794 17.4026 9.07869 17.7893 8.48003C17.9832 8.17973 18.1314 7.92773 18.2324 7.74807C18.283 7.65818 18.3219 7.58619 18.3489 7.5351C18.3624 7.50955 18.373 7.4892 18.3806 7.47444C18.3844 7.46705 18.3874 7.46106 18.3897 7.45651C18.3909 7.45423 18.3919 7.45232 18.3926 7.45077C18.393 7.44999 18.3934 7.44931 18.3937 7.44871C18.3938 7.44842 18.394 7.44804 18.3941 7.44789C18.3943 7.44754 18.3944 7.44721 17.5 7ZM9.25 12C7.02451 12 5.20802 10.7264 3.88579 9.31606C3.23379 8.6206 2.73075 7.92131 2.39082 7.39497C2.22148 7.13277 2.09425 6.91602 2.01074 6.76755C1.96902 6.69339 1.93832 6.63646 1.91885 6.59966C1.90912 6.58127 1.9022 6.56792 1.89812 6.55999C1.89608 6.55602 1.89475 6.5534 1.89413 6.55219C1.89382 6.55158 1.89369 6.55132 1.89374 6.55142C1.89377 6.55147 1.89384 6.55161 1.89395 6.55183C1.89401 6.55195 1.89413 6.55219 1.89416 6.55224C1.89429 6.5525 1.89443 6.55279 1 7C0.105573 7.44721 0.105737 7.44754 0.105914 7.44789C0.105988 7.44804 0.106176 7.44842 0.106324 7.44871C0.106622 7.44931 0.106965 7.44999 0.107356 7.45077C0.108137 7.45232 0.109105 7.45423 0.110259 7.45651C0.112566 7.46106 0.11562 7.46705 0.119416 7.47444C0.127008 7.4892 0.137575 7.50955 0.151096 7.5351C0.178131 7.58619 0.217018 7.65818 0.267585 7.74807C0.368643 7.92773 0.516803 8.17973 0.710742 8.48003C1.09738 9.07869 1.67246 9.8794 2.42671 10.6839C3.91698 12.2736 6.22549 14 9.25 14V12ZM10.5 7C10.5 7.69036 9.94036 8.25 9.25 8.25V10.25C11.0449 10.25 12.5 8.79493 12.5 7H10.5ZM9.25 8.25C8.55964 8.25 8 7.69036 8 7H6C6 8.79493 7.45507 10.25 9.25 10.25V8.25ZM8 7C8 6.30964 8.55964 5.75 9.25 5.75V3.75C7.45507 3.75 6 5.20507 6 7H8ZM9.25 5.75C9.94036 5.75 10.5 6.30964 10.5 7H12.5C12.5 5.20507 11.0449 3.75 9.25 3.75V5.75Z"
                fill="#525298"
              />
            </svg>
            <svg
              className={`${passwordType === "text" ? "visible" : "hidden"}`}
              onClick={togglePassword}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.04602 4.672C9.36173 4.62361 9.68069 4.59954 10.0001 4.6C12.8623 4.6 15.5534 6.66112 17.1195 10.0003C16.88 10.5085 16.6095 11.0014 16.3095 11.4764C16.2142 11.6239 16.1642 11.7959 16.1655 11.9714C16.1675 12.1679 16.2337 12.3582 16.354 12.5135C16.4743 12.6688 16.6421 12.7805 16.8318 12.8315C17.0215 12.8825 17.2227 12.87 17.4046 12.796C17.5866 12.7219 17.7393 12.5904 17.8396 12.4215C18.2589 11.7626 18.6232 11.0702 18.9286 10.3513C18.9769 10.239 19.0018 10.1181 19.0018 9.99582C19.0018 9.87358 18.9769 9.75261 18.9286 9.6403C17.1105 5.41905 13.6903 2.79989 10.0001 2.79989C9.57766 2.79776 9.15591 2.83391 8.74 2.90789C8.62181 2.92799 8.50873 2.97116 8.40722 3.03496C8.30571 3.09876 8.21775 3.18192 8.14839 3.27971C8.07902 3.37749 8.02959 3.48799 8.00292 3.60487C7.97625 3.72176 7.97287 3.84276 7.99296 3.96096C8.01305 4.07915 8.05623 4.19224 8.12003 4.29375C8.18382 4.39526 8.26699 4.48321 8.36477 4.55258C8.46256 4.62195 8.57305 4.67138 8.68994 4.69804C8.80683 4.72471 8.92783 4.7281 9.04602 4.708V4.672ZM2.53863 1.26079C2.45471 1.17687 2.35508 1.1103 2.24543 1.06489C2.13579 1.01947 2.01827 0.996094 1.89959 0.996094C1.78091 0.996094 1.66339 1.01947 1.55374 1.06489C1.4441 1.1103 1.34447 1.17687 1.26055 1.26079C1.09106 1.43028 0.99585 1.66015 0.99585 1.89983C0.99585 2.13952 1.09106 2.36939 1.26055 2.53887L4.05072 5.32004C2.77766 6.54549 1.76445 8.01479 1.07154 9.6403C1.02198 9.75386 0.996396 9.87643 0.996396 10.0003C0.996396 10.1242 1.02198 10.2468 1.07154 10.3603C2.88965 14.5816 6.30986 17.2008 10.0001 17.2008C11.6176 17.1896 13.1969 16.708 14.5454 15.8147L17.4615 18.7399C17.5452 18.8242 17.6448 18.8912 17.7544 18.9369C17.8641 18.9826 17.9818 19.0061 18.1006 19.0061C18.2194 19.0061 18.337 18.9826 18.4467 18.9369C18.5564 18.8912 18.6559 18.8242 18.7396 18.7399C18.824 18.6562 18.8909 18.5566 18.9366 18.447C18.9823 18.3373 19.0058 18.2196 19.0058 18.1008C19.0058 17.982 18.9823 17.8644 18.9366 17.7547C18.8909 17.645 18.824 17.5455 18.7396 17.4618L2.53863 1.26079ZM8.26298 9.5323L10.4681 11.7374C10.316 11.7811 10.1583 11.8023 10.0001 11.8004C9.52266 11.8004 9.0648 11.6108 8.72721 11.2732C8.38963 10.9356 8.19997 10.4777 8.19997 10.0003C8.19813 9.84208 8.21935 9.68442 8.26298 9.5323ZM10.0001 15.4007C7.13791 15.4007 4.44674 13.3395 2.88965 10.0003C3.47116 8.71662 4.2965 7.5581 5.3198 6.58912L6.91289 8.20022C6.53869 8.88317 6.39603 9.66905 6.5063 10.44C6.61657 11.2109 6.97384 11.9252 7.5245 12.4759C8.07517 13.0266 8.78954 13.3838 9.56044 13.4941C10.3314 13.6044 11.1172 13.4617 11.8002 13.0875L13.2313 14.5006C12.2512 15.0774 11.1372 15.3877 10.0001 15.4007Z"
                fill="#525298"
              />
            </svg>
          </div>
          <p className="text-red-500">{error.password}</p>
        </div>
        <div className="py-1 mx-auto w-[90%] ">
          <p>Phone Number</p>
          <select
            name="countryCode"
            value={form.countryCode}
            className="w-[20%] rounded-2xl bg-gray-100 py-2"
            onChange={handleChange}
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
          </select>
          <input
            type="text"
            placeholder="Enter mobile no"
            name="phoneNumber"
            onChange={handleChange}
            className={`border-2 rounded-2xl p-2  w-[80%] ${
              error.phoneNumber ? "border-red-500" : "border-gray-500"
            } `}
          />
          <p className="text-red-500">{error.phoneNumber}</p>
        </div>
        <div className="py-1 flex w-[90%] mx-auto">
          <p className="w-[30%] my-auto">Gender</p>
          <div
            className={`flex rounded-2xl p-2 w-[70%] justify-around  ${
              error.gender ? "border-2 border-red-500" : "border-gray-500"
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
            className={` w-[70%] rounded-2xl flex justify-center   ${
              error.language ? "border-2 border-red-500" : "border-gray-500"
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
            <label
              htmlFor="english"
              className={`${
                form.language === "english"
                  ? "bg-[#525298] text-white rounded-tl-lg rounded-tr-lg rounded-br-lg"
                  : ""
              } w-[40%] text-center cursor-pointer`}
            >
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
            <label
              htmlFor="hindi"
              className={`${
                form.language === "hindi"
                  ? "bg-[#525298] text-white rounded-tl-lg rounded-tr-lg rounded-br-lg"
                  : ""
              } w-[40%] text-center cursor-pointer`}
            >
              Hindi
            </label>
          </div>
          <p className="text-red-500">{error.language}</p>
        </div>
        <div className=" w-[90%] mx-auto py-1">
          <p className="w-[30%]">Marital Status</p>
          <select
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            className="w-[100%] rounded-2xl p-3 border-2"
          >
            <option value="married">Married</option>
            <option value="unmarried">Unmarried</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="w-[90%] mx-auto">
          <p>Date Of Birth</p>
          <div
            className={` flex justify-around   
            } `}
          >
            <input
              type="number"
              max="31"
              min="1"
              name="day"
              placeholder="DD"
              className="border-2 p-1 rounded-2xl"
              onChange={handleChangeDate}
            />
            <input
              type="number"
              max="12"
              min="1"
              name="month"
              placeholder="MM"
              className="border-2 p-1 rounded-2xl"
              onChange={handleChangeDate}
            />
            <input
              type="number"
              max={new Date().getFullYear()}
              name="year"
              onChange={handleChangeDate}
              placeholder="YYYY"
              className="border-2 p-1 rounded-2xl"
              min="1900"
            />
          </div>
          <p className="text-red-500">{error.dateOfBirth}</p>
        </div>
        <div className="w-[90%] mx-auto">
          <p>Time of birth</p>
          <input
            className={`border-2 w-[100%]  rounded-2xl ${
              error.timeOfBirth ? "border-red-500" : "border-gray-500"
            } `}
            type="time"
            name="timeOfBirth"
            onChange={handleChange}
          />
          <p className="text-red-500">{error.timeOfBirth}</p>
        </div>
        <div className="w-[90%] mx-auto flex mt-5">
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
          className={`w-[90%] block mt-5 mx-auto h-[50px] bg-violet-500 rounded-tl-lg rounded-tr-lg rounded-br-lg text-white ${
            tnc ? "" : "!bg-gray-400 "
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
