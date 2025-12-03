import FormSignup from '../components/forms/FormSignup'
import Logo from '../components/Logo'
import Default from '../templates/Default'

export default function Signup() {
  return (
    <Default>
      <div className="flex flex-col gap-10 text-center">
        <div>
          {/* <h1 className="text-2xl font-semibold text-center">Signup</h1> */}
          {/** Form */}
          <FormSignup />
        </div>
      </div>
    </Default>
  )
}