import { IconCategory2, IconCategoryFilled } from '@tabler/icons-react'
import { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <div className="h-full md:flex justify-between">
        <div className="fixed top-4 right-4 lg:hidden">
          {showSidebar ? (
            <IconCategoryFilled
              className="text-primary-900! cursor-pointer"
              size={34}
              onClick={() => setShowSidebar(false)}
            />
          ) : (
            <IconCategory2
              className="text-primary-900! cursor-pointer"
              size={34}
              onClick={() => setShowSidebar(true)}
            />
          )}
        </div>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="h-full bg-primary-100 flex-1 flex p-2 justify-center items-center">
          <Outlet />
        </div>
      </div>
    </>
  )
}
