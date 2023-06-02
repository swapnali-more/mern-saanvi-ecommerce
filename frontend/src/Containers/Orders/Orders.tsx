import React from 'react'
import Layout from '../../Components/Layout/Layout'

const Orders = () => {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 35,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      age: 28,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      age: 42,
    },
  ];
  return (
    <Layout title={""}>
    <table className="table-auto mx-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Order ID</th>
          <th className="px-4 py-2">Product Name</th>
          <th className="px-4 py-2">Product Price</th>
          <th className="px-4 py-2">View Details</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td className="border px-4 py-2">{row.id}</td>
            <td className="border px-4 py-2">{row.name}</td>
            <td className="border px-4 py-2">{row.email}</td>
            <td className="border px-4 py-2">{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </Layout>
  )
}

export default Orders