"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{8,20}$/;

type FormValues = {
  companyName: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  companyName: "",
  email: "",
  phone: "",
  message: ""
};

function normalizePhone(value: string) {
  const digits = value.replace(/[\s\-()]/g, "").replace(/\+/g, "");
  if (!digits) {
    return "";
  }
  return `+${digits}`;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.companyName.trim().length < 2) {
    errors.companyName = "Company name must be at least 2 characters.";
  }

  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  } else {
    const digitsOnly = values.phone.replace(/[^\d]/g, "");
    if (digitsOnly.length < 8 || digitsOnly.length > 20) {
      errors.phone = "Phone number must be between 8 and 20 digits.";
    }
  }

  if (values.message.trim().length < 5) {
    errors.message = "Message must be at least 5 characters.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    const fieldName = name as keyof FormValues;
    setValues((prev) => ({ ...prev, [fieldName]: value }));
    setErrors((prev) => {
      if (!(fieldName in prev)) {
        return prev;
      }
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setServerError(null);

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      return;
    }

    const normalizedPhone = normalizePhone(values.phone);
    if (!normalizedPhone) {
      setErrors((prev) => ({ ...prev, phone: "Enter a valid phone number." }));
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: values.companyName.trim(),
          email: values.email.trim(),
          phone: normalizedPhone,
          message: values.message.trim()
        })
      });

      const result: { ok?: boolean; error?: string } | null = await response.json().catch(() => null);

      if (response.ok && result?.ok) {
        setStatus("success");
        setServerError(null);
        setValues(INITIAL_VALUES);
        setErrors({});
      } else {
        setStatus("error");
        setServerError(result?.error ?? "Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerError("Something went wrong. Please try again later.");
    }
  }

  return (
    <section id="contact" className="container-grid py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Let's build something great</h2>
          <p className="text-white/70">
            Share a project idea, partnership opportunity, or consultation request and I will respond within one business
            day.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span>COMPANY NAME</span>
              <input
                required
                name="companyName"
                value={values.companyName}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-invalid={errors.companyName ? "true" : "false"}
              />
              {errors.companyName ? <p className="text-xs text-red-400">{errors.companyName}</p> : null}
            </label>
            <label className="space-y-1 text-sm">
              <span>Email</span>
              <input
                required
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email ? <p className="text-xs text-red-400">{errors.email}</p> : null}
            </label>
          </div>
          <label className="space-y-1 text-sm">
            <span>Phone</span>
            <input
              required
              type="tel"
              name="phone"
              placeholder="+972 50 123 4567"
              value={values.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone ? <p className="text-xs text-red-400">{errors.phone}</p> : null}
          </label>
          <label className="space-y-1 text-sm">
            <span>Message</span>
            <textarea
              required
              name="message"
              rows={4}
              value={values.message}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-invalid={errors.message ? "true" : "false"}
            />
            {errors.message ? <p className="text-xs text-red-400">{errors.message}</p> : null}
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>
          {status === "success" ? (
            <p className="text-sm text-emerald-400">Message delivered! I will get back to you shortly.</p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-red-400">{serverError ?? "Something went wrong. Please try again later."}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
