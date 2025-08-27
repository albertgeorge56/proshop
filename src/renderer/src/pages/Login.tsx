import { Button, TextInput } from '@mantine/core'
import { z } from 'zod/v4'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router'
import apiClient from '@renderer/utils/api-client'
import { showToast } from '@renderer/utils/common'
import { useEffect } from 'react'

const schema = z.object({
  email: z.email({ error: 'Enter valid Email' }),
  password: z.string().min(2, { error: 'Enter Password' })
})

export default function Login() {
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: 'georgeynr@gmail.com',
      password: 'abc123'
    },
    validate: zod4Resolver(schema)
  })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/admin', { replace: true })
    }
  }, [localStorage, navigate])

  const handleSubmit = async (values: typeof form.values) => {
    const res = await apiClient.post('auth/login', values)
    if (res.data.token) localStorage.setItem('token', res.data.token)
    showToast('Successful', true)
    navigate('/admin', { replace: true })
  }

  return (
    <>
      <div className="h-full w-full flex justify-center items-center p-6">
        <form
          className="w-full max-w-md rounded-xl bg-primary-100 p-6 space-y-3"
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
