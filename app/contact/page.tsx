'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.email('Provide a valid email'),
  company: z.string().min(2, 'Who should we collaborate with?'),
  practice: z.enum(['tech', 'food', 'both']),
  message: z.string().min(10, 'Share a little more context'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { practice: 'both' },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset({ practice: 'both' });
        setShowSuccess(true);
        return;
      }

      const payload: unknown = await response.json().catch(() => null);
      const message =
        typeof payload === 'object' && payload && 'error' in payload && typeof payload.error === 'string'
          ? payload.error
          : 'Something went wrong. Try again.';
      setShowSuccess(false);
      alert(message);
    } catch (error) {
      console.error('Contact submission failed', error);
      setShowSuccess(false);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="bg-[hsl(var(--brand-surface))] py-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[hsl(var(--brand-muted))]">
            Start a conversation
          </p>
          <h1 className="text-4xl font-semibold text-[hsl(var(--brand-foreground))] sm:text-5xl">
            Tell us about the outcomes you need
          </h1>
          <p className="max-w-2xl text-base text-[hsl(var(--brand-muted))]">
            Share a short brief and we will assemble the right combination of 360ace.Tech and 360ace.Food leads for a discovery
            session.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 rounded-3xl border border-white/15 bg-white/80 p-8 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"
          noValidate
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium text-[hsl(var(--brand-foreground))]">
              Name
            </label>
            <input
              id="name"
              {...register('name')}
              className="rounded-full border border-white/30 bg-white/70 px-4 py-3 text-sm text-[hsl(var(--brand-foreground))] focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-primary))] dark:bg-white/10"
              autoComplete="name"
            />
            {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium text-[hsl(var(--brand-foreground))]">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="rounded-full border border-white/30 bg-white/70 px-4 py-3 text-sm text-[hsl(var(--brand-foreground))] focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-primary))] dark:bg-white/10"
              autoComplete="email"
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <label htmlFor="company" className="text-sm font-medium text-[hsl(var(--brand-foreground))]">
              Organisation
            </label>
            <input
              id="company"
              {...register('company')}
              className="rounded-full border border-white/30 bg-white/70 px-4 py-3 text-sm text-[hsl(var(--brand-foreground))] focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-primary))] dark:bg-white/10"
              autoComplete="organization"
            />
            {errors.company && <p className="text-xs text-red-600">{errors.company.message}</p>}
          </div>
          <div className="grid gap-2">
            <span className="text-sm font-medium text-[hsl(var(--brand-foreground))]">Which practice should lead?</span>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { label: '360ace.Tech', value: 'tech' },
                { label: '360ace.Food', value: 'food' },
                { label: 'Both practices', value: 'both' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/20 bg-white/70 px-4 py-3 text-sm text-[hsl(var(--brand-foreground))] hover:border-[hsl(var(--brand-primary))] dark:bg-white/5"
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register('practice')}
                    className="h-4 w-4 border-white/40 text-[hsl(var(--brand-primary))] focus:ring-[hsl(var(--brand-primary))]"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {errors.practice && <p className="text-xs text-red-600">{errors.practice.message}</p>}
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-medium text-[hsl(var(--brand-foreground))]">
              Project context
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message')}
              className="rounded-3xl border border-white/30 bg-white/70 px-4 py-3 text-sm text-[hsl(var(--brand-foreground))] focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-primary))] dark:bg-white/10"
            />
            {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[hsl(var(--brand-muted))]">
              By submitting, you agree to our
              <a className="ml-1 underline" href="/legal/privacy">
                privacy policy
              </a>
              .
            </p>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send message'}
            </Button>
          </div>
          <p
            role="status"
            aria-live="polite"
            className={`min-h-[1.5rem] text-sm font-medium text-[hsl(var(--brand-foreground))] transition-opacity duration-200 ${
              showSuccess ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {showSuccess ? 'Thank you! Our team will contact you within one business day.' : ''}
          </p>
        </form>
      </div>
    </div>
  );
}
