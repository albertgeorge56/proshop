import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { ICompany, IGroup, IProduct } from '@renderer/utils/types'
import { useEffect, useState } from 'react'
import apiClient from '@renderer/utils/api-client'

export default function Dashboard() {
  const [companies, setCompanies] = useState<ICompany[]>([])
  const [groups, setGroups] = useState<IGroup[]>([])
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, groupRes, productRes] = await Promise.all([
          apiClient.get('company'),
          apiClient.get('group'),
          apiClient.get('product')
        ])

        setCompanies(companyRes.data.data)
        setGroups(groupRes.data.data)
        setProducts(productRes.data.data)
      } catch (err) {
        console.error('Error fetching dashboard data', err)
      }
    }

    fetchData()
  }, [])

  // prepare chart data
  const companyData = companies.map((c) => ({
    name: c.name,
    products: products.filter((p) => p.company._id === c._id).length
  }))

  const groupData = groups.map((g) => ({
    name: g.name,
    products: products.filter((p) => p.group._id === g._id).length
  }))

  return (
    <div className="w-full max-w-3xl grid grid-cols-2 gap-2">
      {/* Company Chart */}
      <div className="bg-primary-50 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Products by Company</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={companyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="products" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Group Chart */}
      <div className="bg-primary-50 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Products by Group</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="products" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
