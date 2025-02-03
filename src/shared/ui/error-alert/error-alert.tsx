import { Alert, AlertProps } from '@mantine/core'

interface ErrorAlertProps extends AlertProps {
  message?: string
}

export const ErrorAlert = (props: ErrorAlertProps) => {
  const { message, ...otherProps } = props

  return (
    <Alert title="Ошибка" color="red" {...otherProps}>
      {message ?? 'Unknown error'}
    </Alert>
  )
}
