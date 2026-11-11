"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, FileAudio, FileImage, FileText } from "lucide-react";

interface SubmissionDraft {
  creatorName: string;
  email: string;
  title: string;
  category: string;
  dateCreated: string;
  description: string;
  creatorUrl: string;
  workUrl: string;
  aiUse: string;
  aiUseDetails: string;
  displayPermission: boolean;
  promotionPermission: boolean;
  commercialPermission: boolean;
  rightsConfirmed: boolean;
  fileName: string | null;
  savedAt: string;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function SharePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedDraft, setSavedDraft] = useState(false);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (file && file.size > 100 * 1024 * 1024) {
      setErrorMessage("Files must be 100 MB or smaller.");
      event.target.value = "";
      setSelectedFile(null);
      return;
    }
    setErrorMessage("");
    setSelectedFile(file);
  }

  function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSavedDraft(false);

    const formData = new FormData(event.currentTarget);
    const draft: SubmissionDraft = {
      creatorName: String(formData.get("creatorName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      title: String(formData.get("title") ?? "").trim(),
      category: String(formData.get("category") ?? ""),
      dateCreated: String(formData.get("dateCreated") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      creatorUrl: String(formData.get("creatorUrl") ?? "").trim(),
      workUrl: String(formData.get("workUrl") ?? "").trim(),
      aiUse: String(formData.get("aiUse") ?? ""),
      aiUseDetails: String(formData.get("aiUseDetails") ?? "").trim(),
      displayPermission: formData.get("displayPermission") === "on",
      promotionPermission: formData.get("promotionPermission") === "on",
      commercialPermission: formData.get("commercialPermission") === "on",
      rightsConfirmed: formData.get("rightsConfirmed") === "on",
      fileName: selectedFile?.name ?? null,
      savedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem("lived:submission-draft", JSON.stringify(draft));
      setSavedDraft(true);
    } catch {
      setErrorMessage(
        "Your browser could not save this draft. Check local storage settings and try again.",
      );
    }
  }

  function downloadDraft() {
    try {
      const storedDraft = window.localStorage.getItem("lived:submission-draft");
      if (!storedDraft) {
        setErrorMessage("Save a draft before downloading it.");
        return;
      }

      const fileUrl = URL.createObjectURL(
        new Blob([storedDraft], { type: "application/json" }),
      );
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "lived-submission-draft.json";
      link.click();
      URL.revokeObjectURL(fileUrl);
    } catch {
      setErrorMessage("The saved draft could not be downloaded.");
    }
  }

  const FileIcon =
    selectedFile?.type.startsWith("audio/") ? FileAudio :
    selectedFile?.type.startsWith("image/") ? FileImage :
    FileText;

  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-9 sm:py-16">
      <div className="grid gap-8 md:grid-cols-[1fr_0.72fr] md:gap-16">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.15em] text-[#783e42] uppercase">
            Share your work
          </p>
          <h1 className="display-font mt-4 max-w-[640px] text-[44px] leading-[1.02] tracking-[-0.06em] sm:text-[58px]">
            The work is yours. The story is yours.
          </h1>
          <p className="mt-5 max-w-[600px] text-[12px] leading-6 text-[#756d63]">
            Share original art, photography, music, writing, ideas, code, or a
            first-hand experience. Tell us how it came to be and keep your
            authorship attached.
          </p>
        </div>

        <aside className="bg-[#eee7db] p-6 sm:p-8">
          <p className="text-[9px] font-semibold tracking-[0.14em] text-[#68735b] uppercase">
            A considered review
          </p>
          <h2 className="display-font mt-3 text-[26px] leading-tight tracking-[-0.04em]">
            People before badges.
          </h2>
          <p className="mt-3 text-[11px] leading-5 text-[#756d63]">
            A future Lived review will consider identity, authorship, and
            provenance. Disclosing creative tools does not automatically
            disqualify a work.
          </p>
          <Link
            href="/about"
            className="mt-5 inline-flex items-center gap-1 text-[10px] text-[#783e42] underline underline-offset-2"
          >
            Read the review principles <ArrowUpRight size={12} />
          </Link>
        </aside>
      </div>

      <form
        onSubmit={saveDraft}
        className="mt-12 max-w-[800px] space-y-8 bg-[#fbf8f1] p-5 sm:mt-16 sm:p-8"
      >
        <section>
          <p className="text-[9px] font-semibold tracking-[0.13em] text-[#783e42] uppercase">
            01 · The maker
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <label className="text-[10px] text-[#51493f]">
              Your name or public identity <span aria-hidden="true">*</span>
              <input
                type="text"
                name="creatorName"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="How should we credit you?"
                className="mt-2 h-11 w-full border-b border-[#cfc4b5] bg-transparent px-1 text-[12px] placeholder:text-[#a99d8d]"
              />
            </label>
            <label className="text-[10px] text-[#51493f]">
              Email for review <span aria-hidden="true">*</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                className="mt-2 h-11 w-full border-b border-[#cfc4b5] bg-transparent px-1 text-[12px] placeholder:text-[#a99d8d]"
              />
            </label>
            <label className="text-[10px] text-[#51493f]">
              Your website or creator profile
              <input
                type="url"
                name="creatorUrl"
                maxLength={2048}
                placeholder="https://"
                className="mt-2 h-11 w-full border-b border-[#cfc4b5] bg-transparent px-1 text-[12px] placeholder:text-[#a99d8d]"
              />
            </label>
            <p className="self-end pb-2 text-[9px] leading-4 text-[#817669]">
              Your contact details stay private in this local draft.
            </p>
          </div>
        </section>

        <section>
          <p className="text-[9px] font-semibold tracking-[0.13em] text-[#783e42] uppercase">
            02 · The work
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <label className="text-[10px] text-[#51493f]">
              Work title <span aria-hidden="true">*</span>
              <input
                type="text"
                name="title"
                required
                maxLength={160}
                placeholder="A name for your work"
                className="mt-2 h-11 w-full border-b border-[#cfc4b5] bg-transparent px-1 text-[12px] placeholder:text-[#a99d8d]"
              />
            </label>
            <label className="text-[10px] text-[#51493f]">
              Medium or category <span aria-hidden="true">*</span>
              <select
                name="category"
                defaultValue=""
                required
                className="mt-2 h-11 w-full border-b border-[#cfc4b5] bg-transparent px-1 text-[12px] text-[#51493f]"
              >
                <option value="" disabled>Choose a category</option>
                <option>Art & photography</option>
                <option>Music & sound</option>
                <option>Writing & books</option>
                <option>Film & moving image</option>
                <option>Craft & design</option>
                <option>Code & tools</option>
                <option>First-hand experience</option>
                <option>Other original work</option>
              </select>
            </label>
            <label className="text-[10px] text-[#51493f]">
              Date created, if known
              <input
                type="text"
                name="dateCreated"
                maxLength={80}
                placeholder="Year or date"
                className="mt-2 h-11 w-full border-b border-[#cfc4b5] bg-transparent px-1 text-[12px] placeholder:text-[#a99d8d]"
              />
            </label>
            <label className="text-[10px] text-[#51493f]">
              Link to the work, if hosted elsewhere
              <input
                type="url"
                name="workUrl"
                maxLength={2048}
                placeholder="https://"
                className="mt-2 h-11 w-full border-b border-[#cfc4b5] bg-transparent px-1 text-[12px] placeholder:text-[#a99d8d]"
              />
            </label>
          </div>
          <label className="mt-5 block text-[10px] text-[#51493f]">
            About the work and how it came to be <span aria-hidden="true">*</span>
            <textarea
              name="description"
              required
              minLength={20}
              maxLength={4000}
              rows={5}
              placeholder="Your process, materials, influences, or the experience behind it…"
              className="mt-2 w-full resize-y border-b border-[#cfc4b5] bg-transparent px-1 py-3 text-[12px] leading-5 placeholder:text-[#a99d8d]"
            />
          </label>
          <label className="mt-6 block text-[10px] text-[#51493f]">
            Add an original file for your draft
            <input
              type="file"
              accept="image/*,audio/*,video/*,.pdf,.txt,.md,.zip"
              onChange={handleFileChange}
              className="sr-only"
            />
            <span className="mt-2 flex min-h-24 items-center justify-center gap-3 bg-[#eee7db] px-5 py-6 text-center text-[11px] text-[#756d63]">
              {selectedFile ? (
                <>
                  <FileIcon size={18} />
                  <span>{selectedFile.name} · {formatFileSize(selectedFile.size)}</span>
                </>
              ) : (
                "Choose an image, audio, video, document, or code file · 100 MB max"
              )}
            </span>
          </label>
          <p className="mt-2 text-[9px] leading-4 text-[#817669]">
            Selecting a file does not upload it. The saved draft includes its
            name only; the file itself is not retained.
          </p>
        </section>

        <section>
          <p className="text-[9px] font-semibold tracking-[0.13em] text-[#783e42] uppercase">
            03 · Creative tools and permissions
          </p>
          <label className="mt-4 block text-[10px] text-[#51493f]">
            Were generative AI tools part of making this work?
            <select
              name="aiUse"
              defaultValue="not-used"
              className="mt-2 h-11 w-full border-b border-[#cfc4b5] bg-transparent px-1 text-[12px] sm:max-w-[460px]"
            >
              <option value="not-used">No generative AI tools used</option>
              <option value="assistance">Used for assistance; the work is mine</option>
              <option value="generated-elements">Generated elements are part of the work</option>
              <option value="prefer-not-to-say">I’d like to discuss this with a reviewer</option>
            </select>
          </label>
          <label className="mt-4 block text-[10px] text-[#51493f]">
            Anything else about the tools or process?
            <textarea
              name="aiUseDetails"
              maxLength={1000}
              rows={3}
              placeholder="Optional context for the reviewer"
              className="mt-2 w-full resize-y border-b border-[#cfc4b5] bg-transparent px-1 py-3 text-[12px] leading-5 placeholder:text-[#a99d8d]"
            />
          </label>

          <div className="mt-5 space-y-3 text-[10px] leading-5 text-[#625b52]">
            <label className="flex items-start gap-2.5">
              <input type="checkbox" name="displayPermission" required className="mt-1 accent-[#783e42]" />
              <span>
                If accepted, I grant Lived a non-exclusive permission to display
                this work in the Lived collection. I keep ownership and may
                withdraw permission.
              </span>
            </label>
            <label className="flex items-start gap-2.5">
              <input type="checkbox" name="promotionPermission" className="mt-1 accent-[#783e42]" />
              <span>
                I also permit Lived to feature the work in editorial
                announcements and promotion. Optional.
              </span>
            </label>
            <label className="flex items-start gap-2.5">
              <input type="checkbox" name="commercialPermission" className="mt-1 accent-[#783e42]" />
              <span>
                I’m open to discussing future commercial use separately.
                Optional; this is not a commercial-use license.
              </span>
            </label>
            <label className="flex items-start gap-2.5">
              <input type="checkbox" name="rightsConfirmed" required className="mt-1 accent-[#783e42]" />
              <span>
                I created this work or have authority to submit it, and the
                information I’ve provided is accurate.
              </span>
            </label>
          </div>
        </section>

        {errorMessage && (
          <p role="alert" className="bg-[#f0e2dc] p-3 text-[10px] text-[#783e42]">
            {errorMessage}
          </p>
        )}
        {savedDraft && (
          <div role="status" className="bg-[#e3e7d8] p-4">
            <p className="text-[11px] font-medium text-[#44513d]">
              Draft saved on this device.
            </p>
            <p className="mt-1 text-[10px] leading-5 text-[#56614a]">
              It has not been submitted to Lived. Your selected media file is
              not included. Membership and review tools are still in
              development.
            </p>
            <button
              type="button"
              onClick={downloadDraft}
              className="mt-3 text-[10px] text-[#44513d] underline underline-offset-2"
            >
              Download draft details
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="bg-[#783e42] px-5 py-3 text-[10px] font-medium text-[#fffaf2] hover:bg-[#5e3034]"
          >
            Save draft on this device
          </button>
          <p className="max-w-[360px] text-[9px] leading-4 text-[#817669]">
            Nothing is sent to a server. We’ll open submissions after accounts
            and human review are ready.
          </p>
        </div>
      </form>
    </main>
  );
}
