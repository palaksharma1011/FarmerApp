"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push('signup');
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-16 items-center justify-center rounded-md">
                <Image
                  src="/assets/logo.png"
                  alt="farmBazaar Logo"
                  width={64}
                  height={64}
                  className="rounded-md"
                />
              </div>
              <span className="sr-only">farmBazaar</span>
            </a>
            <h1 className="text-2xl font-bold text-green-600">Welcome to farmBazaar</h1>
            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <button 
                onClick={handleSignUpClick}
                className="underline underline-offset-4 text-green-600 hover:text-green-700 cursor-pointer"
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <label htmlFor="aadhaar" className="text-sm font-medium text-gray-700">
                Aadhaar Number
              </label>
              <input
                id="aadhaar"
                type="text"
                placeholder="1234 5678 9012"
                pattern="[0-9]{4} [0-9]{4} [0-9]{4}"
                maxLength={14}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                onChange={(e) => {
                  // Format Aadhaar number with spaces
                  let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                  if (value.length > 0) {
                    value = value.match(/.{1,4}/g)?.join(' ') || value;
                    if (value.length > 14) value = value.substring(0, 14);
                  }
                  e.target.value = value;
                }}
              />
              <p className="text-xs text-gray-500">
                Enter your 12-digit Aadhaar number
              </p>
            </div>
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium"
            >
              Login to farmBazaar
            </button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-green-600 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By logging in, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a> for farmBazaar.
      </div>
    </div>
  )
}
