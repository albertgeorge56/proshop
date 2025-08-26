import { useMemo, useState } from 'react'
import { Table, Pagination, TextInput, ActionIcon } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconSearch, IconEdit, IconTrash, IconPlus, IconView360 } from '@tabler/icons-react'
import { openProductModal, openViewProductModal } from '@renderer/components/ProductModalContent'
import { IProduct } from '@renderer/utils/types'
import { useFetch } from '@renderer/hooks/custom-hooks'
import { showToast } from '@renderer/utils/common'
import apiClient from '@renderer/utils/api-client'

export default function Product() {
  const { data: products, refetch } = useFetch<IProduct[]>('product')
  const [search, setSearch] = useState('')
  const [activePage, setActivePage] = useState(1)
  const pageSize = 5

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, products])

  const totalPages = Math.ceil(filteredProducts.length / pageSize)
  const pageData = filteredProducts.slice((activePage - 1) * pageSize, activePage * pageSize)

  const openDeleteModal = (product: IProduct) => {
    modals.openConfirmModal({
      title: 'Delete product',
      children: 'Are you sure you want to delete this product?',
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await apiClient.delete(`product/${product._id}`)
        showToast('Product Deleted Successfully')
        refetch()
      }
    })
  }

  return (
    <div className="w-full max-w-4xl bg-primary-50 p-8 rounded-xl shadow-lg flex flex-col gap-4">
      <div className="flex justify-between">
        <TextInput
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value)
            setActivePage(1)
          }}
          leftSection={<IconSearch size={16} />}
        />
        <ActionIcon
          size={30}
          onClick={() =>
            openProductModal({
              product: null,
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
            <Table.Th>Description</Table.Th>
            <Table.Th>Sale Rate</Table.Th>
            <Table.Th>MRP</Table.Th>
            <Table.Th>Company</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {pageData.map((p, i) => (
            <Table.Tr key={p._id}>
              <Table.Td>{i + 1}.</Table.Td>
              <Table.Td>{p.name}</Table.Td>
              <Table.Td>{p.description ?? '-'}</Table.Td>
              <Table.Td>{p.saleRate}</Table.Td>
              <Table.Td>{p.mrp}</Table.Td>
              <Table.Td>{p.company?.name ?? '-'}</Table.Td>
              <Table.Td>
                <div className="flex gap-2">
                  <ActionIcon
                    variant="filled"
                    aria-label="edit"
                    onClick={() =>
                      openProductModal({
                        product: p,
                        onSuccess: refetch
                      })
                    }
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                  <ActionIcon
                    variant="filled"
                    aria-label="view"
                    onClick={() => openViewProductModal({ product: p })}
                  >
                    <IconView360 size={14} />
                  </ActionIcon>
                  <ActionIcon
                    variant="filled"
                    color="red"
                    aria-label="delete"
                    onClick={() => openDeleteModal(p)}
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
