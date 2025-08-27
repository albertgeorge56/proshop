import { NavLink } from '@mantine/core'
import apiClient from '@renderer/utils/api-client'
import { showToast } from '@renderer/utils/common'
import {
  IconBrand4chan,
  IconBrandProducthunt,
  IconLogout,
  IconSettings,
  IconUsersGroup
} from '@tabler/icons-react'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

interface SidebarProps {
  showSidebar: boolean
  setShowSidebar: (boolean) => void
}
export default function Sidebar({ showSidebar, setShowSidebar }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    setShowSidebar(false)
  }, [location.pathname])
  const handleLogout = async () => {
    await apiClient.post('auth/logout')
    localStorage.removeItem('token')
    showToast('Logout Successful')
    navigate('/login', { replace: true })
  }
  return (
    <div
      className={`w-1/6 sidebar ${showSidebar && 'left-0!'} transition-all duration-400 ease-in-out bg-primary-200 px-2 pt-16`}
    >
      <NavLink
        classNames={{
          root: 'hover:bg-primary-500! font-bold hover:text-white! transition-all! rounded-2xl'
        }}
        component={Link}
        to="/admin"
        label="Dashboard"
        leftSection={<IconBrand4chan size={16} stroke={1.5} />}
      />
      <NavLink
        classNames={{
          root: 'hover:bg-primary-500! font-bold hover:text-white! transition-all! rounded-2xl'
        }}
        component={Link}
        to="/admin/company"
        label="Company"
        leftSection={<IconBrand4chan size={16} stroke={1.5} />}
      />
      <NavLink
        classNames={{
          root: 'hover:bg-primary-500! font-bold hover:text-white! transition-all!  rounded-2xl'
        }}
        component={Link}
        to="/admin/group"
        label="Group"
        leftSection={<IconUsersGroup size={16} stroke={1.5} />}
      />
      <NavLink
        classNames={{
          root: 'hover:bg-primary-500! font-bold hover:text-white! transition-all!  rounded-2xl'
        }}
        component={Link}
        to="/admin/product"
        label="Product"
        leftSection={<IconBrandProducthunt size={16} stroke={1.5} />}
      />
      <NavLink
        classNames={{
          root: 'hover:bg-primary-500! font-bold hover:text-white! transition-all!  rounded-2xl'
        }}
        component={Link}
        to="/admin/setting"
        label="Setting"
        leftSection={<IconSettings size={16} stroke={1.5} />}
      />
      <NavLink
        classNames={{
          root: 'hover:bg-primary-500! font-bold! hover:text-white! transition-all! rounded-2xl'
        }}
        component="button"
        onClick={() => {
          handleLogout()
        }}
        label="Logout"
        leftSection={<IconLogout size={16} stroke={2} />}
      />
    </div>
  )
}
