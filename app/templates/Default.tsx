import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export default function ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-dvh overflow-hidden border">
      <Header />
      <main className={`mx-auto w-full max-w-dvh m-3 flex-1 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}