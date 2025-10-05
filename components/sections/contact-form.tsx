"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  practice: z.enum(["tech", "food", "both"]),
  message: z.string().min(10, "Tell us a bit more about your needs")
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { practice: "tech" }
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        form.reset({ practice: "tech" });
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Unable to submit message");
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="rounded-3xl border border-[hsl(var(--brand-100))] bg-white/90 p-8 shadow-[0_18px_60px_-32px_hsl(var(--brand-900)/0.4)] backdrop-blur dark:border-[hsl(var(--neutral-800))] dark:bg-[hsl(var(--neutral-900))/0.7]"
      noValidate
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...form.register("name")}
            className="h-12 rounded-xl border border-[hsl(var(--brand-200))] bg-white px-4 text-sm text-[hsl(var(--neutral-900))] shadow-sm focus:border-[hsl(var(--brand-400))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-200))] dark:bg-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]"
          />
          {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...form.register("email")}
            className="h-12 rounded-xl border border-[hsl(var(--brand-200))] bg-white px-4 text-sm text-[hsl(var(--neutral-900))] shadow-sm focus:border-[hsl(var(--brand-400))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-200))] dark:bg-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]"
          />
          {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company (optional)
          </label>
          <input
            id="company"
            type="text"
            {...form.register("company")}
            className="h-12 rounded-xl border border-[hsl(var(--brand-200))] bg-white px-4 text-sm text-[hsl(var(--neutral-900))] shadow-sm focus:border-[hsl(var(--brand-400))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-200))] dark:bg-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]"
          />
        </div>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Which practice do you need?</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { label: "360ace-Tech", value: "tech" },
              { label: "360ace-Food", value: "food" },
              { label: "Both", value: "both" }
            ].map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-[hsl(var(--brand-200))] bg-white/70 px-4 py-3 text-sm font-medium text-[hsl(var(--neutral-700))] shadow-sm hover:border-[hsl(var(--brand-400))] focus-within:ring-2 focus-within:ring-[hsl(var(--brand-200))] dark:bg-[hsl(var(--neutral-900))/0.6] dark:text-[hsl(var(--neutral-200))]"
              >
                <input type="radio" value={option.value} {...form.register("practice")} className="sr-only" />
                {option.label}
              </label>
            ))}
          </div>
          {form.formState.errors.practice && (
            <p className="text-sm text-red-500">{form.formState.errors.practice.message}</p>
          )}
        </fieldset>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium">
            How can we help?
          </label>
          <textarea
            id="message"
            rows={5}
            {...form.register("message")}
            className="rounded-xl border border-[hsl(var(--brand-200))] bg-white px-4 py-3 text-sm text-[hsl(var(--neutral-900))] shadow-sm focus:border-[hsl(var(--brand-400))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-200))] dark:bg-[hsl(var(--neutral-900))] dark:text-[hsl(var(--neutral-50))]"
          />
          {form.formState.errors.message && (
            <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[hsl(var(--neutral-600))] dark:text-[hsl(var(--neutral-300))]">
            We respond within two business days. By submitting, you agree to our privacy policy.
          </p>
          <Button type="submit" variant="primary" size="lg" disabled={isPending}>
            {isPending ? "Sending…" : "Send message"}
          </Button>
        </div>
        {status === "success" && (
          <p className="rounded-xl bg-green-100 px-4 py-3 text-sm text-green-900">
            Thanks! We’ll get back to you shortly.
          </p>
        )}
        {status === "error" && error && (
          <p className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-800">{error}</p>
        )}
      </div>
    </form>
  );
}
