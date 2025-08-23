import { Button, NavLink } from '@mantine/core'
import { IconHome2 } from '@tabler/icons-react'
import { Link } from 'react-router'

export default function Dashboard() {
  return (
    <>
      <div className="h-full w-full flex justify-between">
        <div className="w-1/4 bg-primary-200 px-2 pt-16">
          <NavLink
            classNames={{
              root: 'hover:bg-primary-500! hover:text-white! transition-all! rounded-2xl'
            }}
            component={Link}
            to="/"
            label="Company"
            leftSection={<IconHome2 size={16} stroke={1.5} />}
          />
          <NavLink
            classNames={{
              root: 'hover:bg-primary-500! hover:text-white! transition-all!  rounded-2xl'
            }}
            component={Link}
            to="/"
            label="Group"
            leftSection={<IconHome2 size={16} stroke={1.5} />}
          />
          <NavLink
            classNames={{
              root: 'hover:bg-primary-500! hover:text-white! transition-all!  rounded-2xl'
            }}
            component={Link}
            to="/"
            label="Product"
            leftSection={<IconHome2 size={16} stroke={1.5} />}
          />
          <NavLink
            classNames={{
              root: 'hover:bg-primary-500! hover:text-white! transition-all!  rounded-2xl'
            }}
            component={Link}
            to="/login"
            label="Logout"
            leftSection={<IconHome2 size={16} stroke={1.5} />}
          />
        </div>
        <div className="flex-1 bg-primary-100 flex justify-center items-center">
          Here is our main area
        </div>
      </div>
    </>
  )
}
