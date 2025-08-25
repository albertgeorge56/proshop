import { Button, Checkbox, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { z } from 'zod/v4'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import apiClient from '@renderer/utils/api-client'
import { showToast } from '@renderer/utils/common'

interface CompanyModalContentProps {
  company: Company | null
  onSuccess: () => void
}

const companySchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  shortname: z.string().min(1, 'Short name is required'),
  active: z.boolean()
})

type Company = z.infer<typeof companySchema>

export const openCompanyModal = (props: CompanyModalContentProps) => {
  modals.open({
    title: props.company ? 'Edit company' : 'Add company',
    children: <CompanyModalContent {...props} />
  })
}

export default function CompanyModalContent({ company, onSuccess }: CompanyModalContentProps) {
  const form = useForm<Company>({
    initialValues: company ?? { name: '', shortname: '', active: true },
    validate: zod4Resolver(companySchema)
  })
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await apiClient.post('company', values)
        showToast('Company Added Successfully')
        onSuccess()
      })}
    >
      <TextInput label="Name" {...form.getInputProps('name')} />
      <TextInput label="Short name" {...form.getInputProps('shortname')} />
      <Checkbox mt="md" label="Active" {...form.getInputProps('active', { type: 'checkbox' })} />

      <Group justify="flex-end" mt="lg">
        <Button type="submit">{company ? 'Save' : 'Add'}</Button>
      </Group>
    </form>
  )
}
