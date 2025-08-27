import { Button, Group, TextInput, NumberInput, FileInput, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { z } from 'zod/v4'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import apiClient, { baseUrl } from '@renderer/utils/api-client'
import { showToast } from '@renderer/utils/common'
import { ICompany, IGroup, IProduct } from '@renderer/utils/types'
import { useFetch } from '@renderer/hooks/custom-hooks'

interface ProductModalProps {
  product: IProduct | null
  onSuccess: () => void
}

const productSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  description: z.string().optional(),
  purchaseRate: z.number().gt(5),
  saleRate: z.number().gt(5),
  mrp: z.number().gt(5),
  spRate: z.number().optional(),
  company: z.string().min(4, 'Choose Company'),
  group: z.string().min(4, 'Choose Company'),
  imagePath: z.any().optional()
})

type Product = z.infer<typeof productSchema>

export const openViewProductModal = ({ product }: { product: IProduct }) => {
  modals.open({
    classNames: {
      title: 'font-semibold! text-xl!'
    },
    size: 'xl',
    title: `Product Details`,
    children: <ViewProductModalContent product={product} />
  })
}

function ViewProductModalContent({ product }: { product: IProduct }) {
  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      <div className="space-y-2">
        <p>
          <span className="font-medium">Name:</span> {product.name}
        </p>
        <p>
          <span className="font-medium">Description:</span> {product.description || '—'}
        </p>
        <p>
          <span className="font-medium">Company:</span>{' '}
          {typeof product.company === 'object'
            ? (product.company as ICompany).name
            : product.company}
        </p>
        <p>
          <span className="font-medium">Group:</span>{' '}
          {typeof product?.group === 'object' ? (product?.group as IGroup)?.name : product?.group}
        </p>
      </div>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Purchase Rate:</span> {product.purchaseRate}
        </p>
        <p>
          <span className="font-medium">Sale Rate:</span> {product.saleRate}
        </p>
        <p>
          <span className="font-medium">MRP:</span> {product.mrp}
        </p>
        <p>
          <span className="font-medium">Special Rate:</span> {product.spRate || '—'}
        </p>
      </div>

      {/* Column 3 - Image */}
      <div className="border rounded-lg shadow p-2 flex flex-col items-center justify-center">
        {product.imagePath ? (
          <img
            src={`${baseUrl}/${product.imagePath}`}
            alt={product.name}
            className="rounded-md max-h-60 object-contain"
          />
        ) : (
          <p className="text-gray-500">No image available</p>
        )}
      </div>
    </div>
  )
}

export const openProductModal = (props: ProductModalProps) => {
  modals.open({
    size: 'lg',
    title: props.product ? 'Edit product' : 'Add product',
    children: <ProductModalContent {...props} />
  })
}

export default function ProductModalContent({ product, onSuccess }: ProductModalProps) {
  const { data: companies = [] } = useFetch<ICompany[]>('company')
  const { data: groups = [] } = useFetch<IGroup[]>('group')
  const form = useForm<Product>({
    initialValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      purchaseRate: product?.purchaseRate ?? 0,
      saleRate: product?.saleRate ?? 0,
      mrp: product?.mrp ?? 0,
      spRate: product?.spRate ?? 0,
      company: product?.company ? (product.company as ICompany)._id! : '',
      group: product?.group ? (product.group as IGroup)._id! : '',
      imagePath: null
    },
    validate: zod4Resolver(productSchema)
  })

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        const formData = new FormData()
        Object.entries(values).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value as any)
          }
        })
        if (product) {
          await apiClient.put(`product/${product._id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          showToast('Product Updated Successfully')
        } else {
          await apiClient.post('product', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          showToast('Product Added Successfully')
        }
        // form.setValues({
        //   name: '',
        //   description: '',
        //   purchaseRate: 0,
        //   saleRate: 0,
        //   mrp: 0,
        //   spRate: 0,
        //   company: null,
        //   group: null,
        //   imagePath: null
        // })
        onSuccess()
        modals.closeAll()
      })}
      className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-2"
    >
      <TextInput label="Name" {...form.getInputProps('name')} />
      <TextInput label="Description" {...form.getInputProps('description')} />
      <NumberInput
        label="Purchase Rate"
        {...form.getInputProps('purchaseRate', { type: 'input' })}
      />
      <NumberInput label="Sale Rate" {...form.getInputProps('saleRate', { type: 'input' })} />
      <NumberInput label="MRP" {...form.getInputProps('mrp', { type: 'input' })} />
      <NumberInput label="Special Rate" {...form.getInputProps('spRate', { type: 'input' })} />
      <Select
        label="Company"
        data={companies
          .filter((c) => c._id) // only keep items with valid _id
          .map((c) => ({ value: c._id as string, label: c.name }))}
        {...form.getInputProps('company')}
      />
      <Select
        label="Group"
        data={groups.filter((g) => g._id).map((g) => ({ value: g._id as string, label: g.name }))}
        {...form.getInputProps('group')}
      />
      <FileInput label="Image" {...form.getInputProps('image')} />
      <Group justify="flex-end" mt="lg">
        <Button type="submit">{product ? 'Save' : 'Add'}</Button>
      </Group>
    </form>
  )
}
