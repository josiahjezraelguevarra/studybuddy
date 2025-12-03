import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { Toaster } from 'react-hot-toast'

export default function ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header />
      <main className={`mx-auto w-full max-w-dvh m-3 flex-1 ${className}`}>
        {children}
      </main>
      <Footer />

      <Toaster position="bottom-right"></Toaster>
    </div>
  )
}