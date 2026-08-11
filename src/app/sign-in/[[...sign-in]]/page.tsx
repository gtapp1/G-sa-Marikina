import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <SignIn
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
