import { useMemo, useState } from 'react'
import { Table, Badge, Pagination, TextInput, ActionIcon } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconSearch, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react'
import { openCompanyModal } from '@renderer/components/CompanyModalContent'
import { ICompany } from '@renderer/utils/types'
import { useFetch } from '@renderer/hooks/custom-hooks'
import axios from 'axios'
import { showToast } from '@renderer/utils/common'

export default function Company() {
  const { data: companies } = useFetch<ICompany[]>('company')
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
        await axios.delete('/company', { params: { id: company._id } })
        showToast('Company Deleted Successfully')
      }
    })
  }

  return (
    <div className="w-full max-w-3xl bg-primary-50 p-8 rounded-xl shadow-lg flex flex-col gap-4">
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
              onSuccess: () => {
                console.log('Added')
              }
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
            <Table.Th>Short name</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {pageData.map((c, i) => (
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
                        onSuccess: () => {}
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
      {totalPages > 1 && (
        <Pagination total={totalPages} value={activePage} onChange={setActivePage} mt="md" />
      )}
    </div>
  )
}
