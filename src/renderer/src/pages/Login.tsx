import { Button, TextInput } from '@mantine/core'
import { z } from 'zod/v4'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useForm } from '@mantine/form'
import axios, { AxiosError } from 'axios'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router'

const schema = z.object({
  email: z.email({ error: 'Enter valid Email' }),
  password: z.string().min(2, { error: 'Enter Password' })
})

export default function Login() {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: zod4Resolver(schema)
  })

  const handleSubmit = async (values: typeof form.values) => {
    const baseUrl = await window.api.getBaseUrl()
    try {
      await axios.post(`${baseUrl}/api/auth/login`, values)
      notifications.show({
        title: 'Login Successful',
        message: ''
      })
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof AxiosError) {
        notifications.show({
          color: 'red',
          styles: {
            root: { backgroundColor: 'var(--color-red-500)' },
            title: { color: 'var(--color-red-50)' },
            closeButton: { color: 'var(--color-red-50)' }
          },
          title: error.response?.data,
          message: ''
        })
      }
    }
  }

  return (
    <>
      {/* <TopBar /> */}
      <div className="h-full w-full flex justify-center items-center">
        <form
          className="w-md p-6 rounded-xl bg-primary-100 space-y-3"
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
        >
          <div className="text-md font-bold text-center p-2">PROSHOP | LOGIN</div>
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
