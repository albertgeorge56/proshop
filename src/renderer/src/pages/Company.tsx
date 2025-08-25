import { useEffect, useMemo, useState } from 'react'
import { Table, Button, Badge, Pagination, Group, TextInput, Stack } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { z } from 'zod/v4'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { IconSearch, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react'
import { openCompanyModal } from '@renderer/components/CompanyModalContent'

// ---------------- Schema ----------------

const companySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  shortname: z.string().min(1, 'Short name is required'),
  active: z.boolean()
})

type Company = z.infer<typeof companySchema>
const mockCompanies: Company[] = [
  { name: 'OpenAI', shortname: 'OAI', active: true },
  { name: 'SpaceX', shortname: 'SPX', active: false },
  { name: 'Tesla', shortname: 'TSLA', active: true },
  { name: 'Google', shortname: 'GOOGL', active: true },
  { name: 'Amazon', shortname: 'AMZN', active: false },
  { name: 'Meta', shortname: 'META', active: true }
]

export default function Company() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [search, setSearch] = useState('')
  const [activePage, setActivePage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    setCompanies(mockCompanies)
  }, [])

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

  const openDeleteModal = (index: number) => {
    modals.openConfirmModal({
      title: 'Delete company',
      children: 'Are you sure you want to delete this company?',
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        setCompanies((prev) => prev.filter((_, i) => i !== index))
      }
    })
  }

  return (
    <Stack>
      <Group justify="space-between">
        <TextInput
          placeholder="Search companies..."
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value)
            setActivePage(1)
          }}
          leftSection={<IconSearch size={16} />}
        />
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => openCompanyModal({ company: null, onSubmit: () => {} })}
        >
          Add Company
        </Button>
      </Group>

      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Short name</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {pageData.map((c, i) => (
            <Table.Tr key={i}>
              <Table.Td>{c.name}</Table.Td>
              <Table.Td>{c.shortname}</Table.Td>
              <Table.Td>
                <Badge color={c.active ? 'green' : 'red'} variant="filled">
                  {c.active ? 'Active' : 'Inactive'}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button
                    size="xs"
                    variant="light"
                    leftSection={<IconEdit size={14} />}
                    onClick={() =>
                      openCompanyModal({
                        company: c,
                        index: companies.indexOf(c),
                        onSubmit: () => {}
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    variant="light"
                    leftSection={<IconTrash size={14} />}
                    onClick={() => openDeleteModal(companies.indexOf(c))}
                  >
                    Delete
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination total={totalPages} value={activePage} onChange={setActivePage} mt="md" />
      )}
    </Stack>
  )
}
