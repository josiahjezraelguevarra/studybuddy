import Link from "next/link";


export default function Home() {
  return (
    
      <div>
        <h1>Hello Jez!</h1>

        <div>
          <Link href="/login"> Go to Login </Link>
        </div>
      </div>
   
  );
}
