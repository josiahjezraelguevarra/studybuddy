import Default from './templates/Default'
import FormChat from '@/app/components/forms/FormChat'

export default function Home() {
  return (
    <Default className="flex items-center justify-center">
      <div className="flex flex-col gap-10">
        {/** Welcome message */}
        <div className="max-w-md w-full mx-auto text-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Hello, Guest!</h1>
            <p>
              Welcome to Study Buddy!{' '}
              <a className="underline" href="/signup">
                Create your free account
              </a>{' '}
              and upload your notes to get instant AI-powered study help.
            </p>
          </div>
        </div>

        {/** Form */}
        <FormChat />
      </div>
    </Default>
  )
}