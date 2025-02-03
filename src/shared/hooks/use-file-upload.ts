import { useState } from 'react'
import { http } from '../config/http'
import { notifications } from '@mantine/notifications'

export const useFileUpload = () => {
  const [isloading, setIsloading] = useState(false)

  const fileUpload = async (file: File | null) => {
    const formData = new FormData()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    formData.set('file', file)

    setIsloading(true)
    try {
      const { data } = await http.post<{ fileName: string; path: string }>(
        'upload',
        formData
      )
      return data.path
    } catch (error) {
      console.log(error)

      notifications.show({
        title: 'Error',
        message: 'Error',
        color: 'red',
      })
    } finally {
      setIsloading(false)
    }
  }

  return { fileUpload, isloading }
}
