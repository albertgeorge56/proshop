import { notifications } from '@mantine/notifications'

export const showToast = (message: string, success: boolean = true) => {
  if (success) {
    notifications.show({
      message,
      classNames: {
        root: 'w-[250px]! max-w-[400px]! fixed! right-[20px]! bottom-[20px]! bg-primary-800! text-primary-50! before:bg-primary-50!',
        description: 'text-primary-50! font-semibold',
        closeButton: 'text-primary-50!'
      }
    })
  } else {
    notifications.show({
      message,
      classNames: {
        root: 'w-[250px]! max-w-[400px]! fixed! right-[20px]! bottom-[20px]! bg-zinc-800! text-zinc-50! before:bg-zinc-50!',
        description: 'text-zinc-50! font-semibold',
        closeButton: 'text-zinc-50!'
      }
    })
  }
}
