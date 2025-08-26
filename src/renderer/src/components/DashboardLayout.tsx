import { NavLink } from '@mantine/core'
import apiClient from '@renderer/utils/api-client'
import { showToast } from '@renderer/utils/common'
import {
  IconBrand4chan,
  IconBrandProducthunt,
  IconLogout,
  IconUsersGroup
} from '@tabler/icons-react'
import { Link, Outlet, useNavigate } from 'react-router'

export default function DashboardLayout() {
  const navigate = useNavigate()
  const handleLogout = async () => {
    await apiClient.post('auth/logout')
    localStorage.removeItem('token')
    showToast('Logout Successful')
    navigate('/login', { replace: true })
  }

  return (
    <>
      <div className="h-full w-full flex justify-between">
        <div className="w-1/4 bg-primary-200 px-2 pt-16">
          <NavLink
            classNames={{
              root: 'hover:bg-primary-500! hover:text-white! transition-all! rounded-2xl'
            }}
            component={Link}
            to="/admin"
            label="Dashboard"
            leftSection={<IconBrand4chan size={16} stroke={1.5} />}
          />
          <NavLink
            classNames={{
              root: 'hover:bg-primary-500! hover:text-white! transition-all! rounded-2xl'
            }}
            component={Link}
            to="/admin/company"
            label="Company"
            leftSection={<IconBrand4chan size={16} stroke={1.5} />}
          />
          <NavLink
            classNames={{
              root: 'hover:bg-primary-500! hover:text-white! transition-all!  rounded-2xl'
            }}
            component={Link}
            to="/admin/group"
            label="Group"
            leftSection={<IconUsersGroup size={16} stroke={1.5} />}
          />
          <NavLink
            classNames={{
              root: 'hover:bg-primary-500! hover:text-white! transition-all!  rounded-2xl'
            }}
            component={Link}
            to="/admin/product"
            label="Product"
            leftSection={<IconBrandProducthunt size={16} stroke={1.5} />}
          />
          <NavLink
            classNames={{
              root: 'hover:bg-primary-500! hover:text-white! transition-all!  rounded-2xl'
            }}
            component="button"
            onClick={() => {
              handleLogout()
            }}
            label="Logout"
            leftSection={<IconLogout size={16} stroke={1.5} />}
          />
        </div>
        <div className="flex-1 bg-primary-100 flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </>
  )
}
