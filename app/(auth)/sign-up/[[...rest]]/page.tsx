import { SignUp } from "@clerk/nextjs";

export default function SignUP() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <SignUp
        appearance={{
          elements: {
            card: "bg-[var(--card)] border border-[var(--border)] shadow-md",
            headerTitle: "text-xl font-semibold",
            formFieldInput: "input",
            footerActionLink: "text-[var(--accent)] hover:underline",
            socialButtonsBlockButton:
              "btn btn-secondary text-[var(--foreground)]",
          },
        }}
      />
    </main>
  );
}
