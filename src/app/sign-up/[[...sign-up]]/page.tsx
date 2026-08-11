import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#F97316",
            colorText: "#3D2C1E",
            fontFamily: "var(--font-body)",
          },
        }}
      />
    </main>
  );
}
