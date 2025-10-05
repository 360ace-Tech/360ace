"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const focusOptions = ["tech", "food", "both"] as const;
const focusLabels: Record<(typeof focusOptions)[number], string> = {
  tech: "Technology",
  food: "Food systems",
  both: "Both practices",
};

const ContactSchema = z.object({
  name: z.string().min(2, "Please provide your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Company is required"),
  focus: z.enum(focusOptions),
  message: z.string().min(20, "Share a little more context so we can help"),
});

export type ContactValues = z.infer<typeof ContactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      focus: "both",
    },
  });

  const onSubmit = async (values: ContactValues) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Unable to submit");
      }

      setStatus("success");
      reset({
        name: "",
        email: "",
        company: "",
        focus: "both",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <Input id="name" autoComplete="name" {...register("name")} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="company">
            Company / Organisation
          </label>
          <Input id="company" autoComplete="organization" {...register("company")} />
          {errors.company && <p className="text-xs text-red-500">{errors.company.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="focus">
            Practice interest
          </label>
          <select
            id="focus"
            className="w-full rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-2 text-sm text-[color:var(--color-foreground)] shadow-sm focus:border-[color:var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)]"
            {...register("focus")}
          >
            {focusOptions.map((option) => (
              <option key={option} value={option}>
                {focusLabels[option]}
              </option>
            ))}
          </select>
          {errors.focus && <p className="text-xs text-red-500">{errors.focus.message}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="message">
          How can we help?
        </label>
        <Textarea id="message" rows={6} {...register("message")} />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <div className="flex flex-col gap-2 text-xs text-[color:var(--color-muted-foreground)]">
        <p>
          We handle your information according to our <a className="underline" href="/legal/privacy">privacy policy</a>.
        </p>
        {status === "success" && <p className="text-green-600">Thank you! We will respond within two business days.</p>}
        {status === "error" && <p className="text-red-500">Something went wrong. Please try again.</p>}
      </div>
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
