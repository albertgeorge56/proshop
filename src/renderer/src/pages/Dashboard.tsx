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
import { Skeleton } from '@mantine/core'
export default function Dashboard() {
  const [companies, setCompanies] = useState<ICompany[]>([])
  const [groups, setGroups] = useState<IGroup[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [companyData, setCompanyData] = useState<
    {
      name: string
      products: number
    }[]
  >([])
  const [groupData, setGroupData] = useState<
    {
      name: string
      products: number
    }[]
  >([])

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

  useEffect(() => {
    if (companies.length > 0 && groups.length > 0) {
      const newCompanyData = companies.map((c) => ({
        name: c.name,
        products: products.filter((p) => p?.company._id === c._id).length
      }))
      setCompanyData(newCompanyData)
      const newgroupData = groups.map((g) => ({
        name: g.name,
        products: products.filter((p) => p?.group?._id === g._id).length
      }))
      setGroupData(newgroupData)
    }
  }, [companies, groups])

  return (
    <div className="w-full p-4 max-w-3xl grid md:grid-cols-2 gap-2">
      {/* Company Chart */}
      <div className="bg-primary-50 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Products by Company</h2>
        <Skeleton visible={companyData.length < 1}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={companyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="products" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Skeleton>
      </div>

      {/* Group Chart */}
      <div className="bg-primary-50 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Products by Group</h2>
        <Skeleton visible={groupData.length < 1}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={groupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="products" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Skeleton>
      </div>
    </div>
  )
}
