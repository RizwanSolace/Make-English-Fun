import Link from "next/link";
import Brote from "@/components/Brote";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <Brote size={110} />
      <h1 className="mt-4 text-4xl font-extrabold">¡Ay! Page not found</h1>
      <p className="mt-2 text-lg">We couldn't find that page.</p>
      <Link href="/" className="btn btn-teal mt-6">
        Back to home
      </Link>
    </div>
  );
}
