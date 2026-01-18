import { AlertCircleIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/admin_site/ui/alert"

export type FormErrorAlertProps = {
  title: string
  errorMessages?: string[] | undefined
}

export default function FormErrorAlert({
  title,
  errorMessages,
}: FormErrorAlertProps) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      {errorMessages && errorMessages.length > 0 && (
        <AlertDescription>
          <ul className="list-inside list-disc text-sm">
            {errorMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </AlertDescription>
      )}
    </Alert>
  )
}
