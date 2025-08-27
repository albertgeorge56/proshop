import { useMemo, useState } from 'react'
import {
  Table,
  Badge,
  Pagination,
  TextInput,
  ActionIcon,
  ScrollArea,
  Skeleton
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconSearch, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react'
import { openCompanyModal } from '@renderer/components/CompanyModalContent'
import { ICompany } from '@renderer/utils/types'
import { useFetch } from '@renderer/hooks/custom-hooks'
import { showToast } from '@renderer/utils/common'
import apiClient from '@renderer/utils/api-client'

export default function Company() {
  const { data: companies, refetch, loading } = useFetch<ICompany[]>('company')
  const [search, setSearch] = useState('')
  const [activePage, setActivePage] = useState(1)
  const pageSize = 5

  const filteredCompanies = useMemo(() => {
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.shortname.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, companies])

  // ---------------- Pagination ----------------
  const totalPages = Math.ceil(filteredCompanies.length / pageSize)
  const pageData = filteredCompanies.slice((activePage - 1) * pageSize, activePage * pageSize)

  // ---------------- Handlers ----------------
  const openDeleteModal = (company: ICompany) => {
    modals.openConfirmModal({
      title: 'Delete company',
      children: 'Are you sure you want to delete this company?',
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await apiClient.delete(`company/${company._id}`)
        showToast('Company Deleted Successfully')
        refetch()
      }
    })
  }

  return (
    <div className="w-full lg:max-w-4xl bg-primary-50 p-4 rounded-xl shadow-lg flex flex-col gap-4">
      <div className="flex justify-between">
        <TextInput
          placeholder="Search companies..."
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
            openCompanyModal({
              company: null,
              onSuccess: refetch
            })
          }
        >
          <IconPlus size={16} />
        </ActionIcon>
      </div>
      <ScrollArea className="w-full max-md:max-w-[400px]">
        <Table highlightOnHover withTableBorder classNames={{ table: 'w-full min-w-[400px]' }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Sr.</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Short name</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading
              ? [...Array(7)].map((_, i) => (
                  <Table.Tr key={i}>
                    {[...Array(5)].map((_, i) => (
                      <Table.Td key={`td-${i}`}>
                        <Skeleton height={15} mt={6} width="100%" radius="xl" />
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))
              : pageData.map((c, i) => (
                  <Table.Tr key={i}>
                    <Table.Td>{i + 1}.</Table.Td>
                    <Table.Td>{c.name}</Table.Td>
                    <Table.Td>{c.shortname}</Table.Td>
                    <Table.Td>
                      <Badge color={c.active ? 'green' : 'red'} variant="filled">
                        {c.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <div className="flex gap-2">
                        <ActionIcon
                          variant="filled"
                          aria-label="Settings"
                          onClick={() =>
                            openCompanyModal({
                              company: c,
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
                          onClick={() => openDeleteModal(c)}
                        >
                          <IconTrash size={14} />
                        </ActionIcon>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
      {totalPages > 1 && (
        <Pagination total={totalPages} value={activePage} onChange={setActivePage} mt="md" />
      )}
    </div>
  )
}
