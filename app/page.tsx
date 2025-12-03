import Default from './templates/Default'
import FormChat from '@/app/components/forms/FormChat'

export default function Home() {
  return (
    <Default className="flex items-center justify-center h-screen overflow-hidden">
      <div className="flex flex-col gap-5 h-full pt-18">
        <FormChat />
      </div>
    </Default>
  )
}