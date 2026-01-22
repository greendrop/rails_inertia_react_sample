import { AlertCircleIcon, InfoIcon } from "lucide-react"
import { Alert, AlertTitle } from "@/components/admin_site/ui/alert"
import usePage from "@/hooks/admin_site/usePage"

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
