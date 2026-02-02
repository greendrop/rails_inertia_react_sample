import { AlertCircleIcon, InfoIcon } from "lucide-react"
import {
  Alert,
  AlertTitle,
} from "@/features/user_site/shared/components/ui/alert"
import usePage from "@/features/user_site/shared/hooks/usePage"

function FlashAlertIcon({ flashType }: { flashType: string }) {
  switch (flashType) {
    case "alert":
      return <AlertCircleIcon />
    default:
      return <InfoIcon />
  }
}

export default function FlashAlert() {
  const { flash } = usePage().props

  return (
    <>
      {Object.entries(flash).map(([key, value]) => (
        <Alert key={key} className="mb-4">
          <FlashAlertIcon flashType={key} />
          <AlertTitle>{value}</AlertTitle>
        </Alert>
      ))}
    </>
  )
}
