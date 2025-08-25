import { Button, TextInput } from '@mantine/core'
import { z } from 'zod/v4'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router'
import apiClient from '@renderer/utils/api-client'

const schema = z.object({
  name: z.string().min(2, { error: 'Enter Name' }),
  email: z.email({ error: 'Enter valid Email' }),
  password: z.string().min(2, { error: 'Enter Password' })
})

export default function Register() {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validate: zod4Resolver(schema)
  })

  const handleSubmit = (values: typeof form.values) => {
    apiClient.post('auth/register', values).then(() => navigate('/admin', { replace: true }))
  }

  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <form
          className="w-md p-6 rounded-xl bg-primary-100 space-y-3"
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
        >
          <div className="text-md font-bold text-center p-2">PROSHOP | REGISTER</div>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Enter Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <TextInput
            withAsterisk
            label="Password"
            placeholder="Enter your password"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  )
}
