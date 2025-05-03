// import { response } from 'express';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';



export default function App() {
  const [users, setUsers] = useState([]);
  const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });

  function fetchData() {
    axios.get("http://localhost:5000/user/get-data").then(
      (response) => {
        setUsers(response.data.users)
        // console.log("error");
      }
    ).catch(
      (error) => {
        setUsers([])

      })
  }

  useEffect(
    () => {
      fetchData();
    }, [])

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.contact.value,
    }


    axios.post("http://localhost:5000/user/create", data).then(
      (res) => {
        notify(res.data.msg, res.data.flag)
        if (res.data.flag === 1) {
          console.log(res.data);
          fetchData();

        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
    // console.log(data);
  }

  const deleteHandler = (id) => {
    axios.delete("http://localhost:5000/user/delete/" + id).then(
      (response) => {
        notify(response.data.msg, response.data.flag)
        if (response.data.flag) {
          fetchData()
        }
      }
    ).catch(
      (error) => {
        console.log(error)

      })

  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6 text-center">User Management</h1>

      {/* 4-column grid layout */}
      <div className="grid grid-cols-4 gap-6">

        {/* Form - col-span-1 */}
        <form onSubmit={submitHandler} className="col-span-1 bg-white p-4 rounded-lg shadow space-y-4 h-fit">
          <h2 className="text-xl font-semibold text-gray-700">Add User</h2>
          <div className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="contact"
              type="text"
              placeholder="Contact"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </form>

        {/* Table - col-span-3 */}
        <div className="col-span-3 bg-white p-4 rounded-lg shadow overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">User List</h2>
          <table className="min-w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((data, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{data.name}</td>
                  <td className="py-2 px-4">{data.email}</td>
                  <td className="py-2 px-4">{data.contact}</td>
                  <td className="py-2 px-4">
                    <button className="text-blue-600 border bg-yellow-300 py-2 px-4 rounded-2xl hover:underline">
                      Status
                    </button>
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button className="text-blue-600 border bg-blue-300 py-2 px-4 rounded-2xl hover:underline">
                      Edit
                    </button>
                    <button onClick={() => deleteHandler(data._id)} className="text-white border bg-red-500 py-2 px-3 rounded-2xl hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>

  );
}






