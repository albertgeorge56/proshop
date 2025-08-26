import { useMemo, useState } from 'react'
import { Table, Badge, Pagination, TextInput, ActionIcon } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconSearch, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react'
import { IGroup } from '@renderer/utils/types'
import { useFetch } from '@renderer/hooks/custom-hooks'
import { showToast } from '@renderer/utils/common'
import apiClient from '@renderer/utils/api-client'
import { openGroupModal } from '@renderer/components/GroupModalContent'

export default function Group() {
  const { data: groups, refetch } = useFetch<IGroup[]>('group')
  const [search, setSearch] = useState('')
  const [activePage, setActivePage] = useState(1)
  const pageSize = 5

  const filteredGroups = useMemo(() => {
    return groups.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, groups])

  // ---------------- Pagination ----------------
  const totalPages = Math.ceil(filteredGroups.length / pageSize)
  const pageData = filteredGroups.slice((activePage - 1) * pageSize, activePage * pageSize)

  // ---------------- Handlers ----------------
  const openDeleteModal = (group: IGroup) => {
    modals.openConfirmModal({
      title: 'Delete Group',
      children: 'Are you sure you want to delete this group?',
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await apiClient.delete(`group/${group._id}`)
        showToast('Group Deleted Successfully')
        refetch()
      }
    })
  }

  return (
    <div className="w-full max-w-2xl bg-primary-50 p-8 rounded-xl shadow-lg flex flex-col gap-4">
      <div className="flex justify-between">
        <TextInput
          placeholder="Search groups..."
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value)
            setActivePage(1)
          }}
          leftSection={<IconSearch size={16} />}
        />
        <ActionIcon
          className="rounded-full!"
          size={30}
          onClick={() =>
            openGroupModal({
              group: null,
              onSuccess: refetch
            })
          }
        >
          <IconPlus size={16} />
        </ActionIcon>
      </div>
      <Table highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Sr.</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {pageData.map((g, i) => (
            <Table.Tr key={i}>
              <Table.Td>{i + 1}.</Table.Td>
              <Table.Td>{g.name}</Table.Td>
              <Table.Td>
                <Badge color={g.active ? 'green' : 'red'} variant="filled">
                  {g.active ? 'Active' : 'Inactive'}
                </Badge>
              </Table.Td>
              <Table.Td>
                <div className="flex gap-2">
                  <ActionIcon
                    variant="filled"
                    aria-label="Settings"
                    onClick={() =>
                      openGroupModal({
                        group: g,
                        onSuccess: refetch
                      })
                    }
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                  <ActionIcon
                    variant="filled"
                    color="red"
                    aria-label="Settings"
                    onClick={() => openDeleteModal(g)}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {totalPages > 1 && (
        <Pagination total={totalPages} value={activePage} onChange={setActivePage} mt="md" />
      )}
    </div>
  )
}
