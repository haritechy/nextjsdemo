"use client";
import React, { useState } from 'react';

const Page = () => {
  const [details, setDetails] = useState({
    Name: "",
    Email: "",
    Phno: "",
    Address: "",
  });

  const [message, serMessage] = useState("")
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const PostContact = async (e) => {
    e.preventDefault();
    const postDetail = {
      Name: details.Name,
      Email: details.Email,
      Phno: details.Phno,
      Address: details.Address,
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postDetail),
      });

      if (response.ok) {
        console.log("Post successful");
        const data = await response.json();
        console.log(data);

        setDetails({

          Name: "",
          Email: "",
          Address: "",
          Phno: "",
        })
        serMessage("conatct Post Succefull")

      } else {
        console.log("Post failed");

      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-4xl text-black mb-6 font-extrabold">Contact Us</h1>
      <form className="w-full max-w-lg" onSubmit={PostContact}>
        <div className="flex items-center mb-4">
          <label htmlFor="Name" className="w-1/4">Name</label>
          <input
            type="text"
            name="Name"
            value={details.Name}
            onChange={handleInputChange}
            className="border rounded w-2/4"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="Email" className="w-1/4">Email</label>
          <input
            type="email"
            name="Email"
            value={details.Email}
            onChange={handleInputChange}
            className="border rounded w-2/4"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="Phno" className="w-1/4">Phone no</label>
          <input
            type="text"
            name="Phno"
            value={details.Phno}
            onChange={handleInputChange}
            className="border rounded w-2/4"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="Address" className="w-1/4">Address</label>
          <textarea
            name="Address"
            value={details.Address}
            onChange={handleInputChange}
            className="border rounded w-2/4"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-3 text-sm border rounded-lg" onClick={PostContact}>
          Submit
        </button>
       {message && <p className="text-center text-red-500"> {message}</p>}
      </form>
    </main>
  );
};

export default Page;
