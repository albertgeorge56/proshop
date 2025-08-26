import { Button, Checkbox, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { z } from 'zod/v4'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import apiClient from '@renderer/utils/api-client'
import { showToast } from '@renderer/utils/common'
import { IGroup } from '@renderer/utils/types'

interface GroupModalContentProps {
  group: IGroup | null
  onSuccess: () => void
}

const groupSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  active: z.boolean()
})

type Group = z.infer<typeof groupSchema>

export const openGroupModal = (props: GroupModalContentProps) => {
  modals.open({
    title: props.group ? 'Edit Group' : 'Add Group',
    children: <CompanyModalContent {...props} />
  })
}

export default function CompanyModalContent({ group, onSuccess }: GroupModalContentProps) {
  const form = useForm<Group>({
    initialValues: group ?? { name: '', active: true },
    validate: zod4Resolver(groupSchema)
  })
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        if (group) {
          await apiClient.put(`group/${group._id}`, values)
          showToast('Group Updated Successfully')
        } else {
          await apiClient.post('group', values)
          showToast('Group Added Successfully')
          form.reset()
        }
        onSuccess()
        modals.closeAll()
      })}
    >
      <TextInput label="Name" {...form.getInputProps('name')} />
      <Checkbox mt="md" label="Active" {...form.getInputProps('active', { type: 'checkbox' })} />
      <Group justify="flex-end" mt="lg">
        <Button type="submit">{group ? 'Save' : 'Add'}</Button>
      </Group>
    </form>
  )
}
