"use client";

import Link from "next/link";
import { useState, type ChangeEvent } from "react";
import { ArrowUpRight, FileAudio, FileImage, FileText } from "lucide-react";

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function SharePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedFile(event.target.files?.[0] ?? null);
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
            Paintings, photographs, music, writing, ideas, code, and
            experiences: share the original, tell us how it came to be, and
            keep your authorship attached.
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
            Submissions will be reviewed for authorship and provenance by
            people. No automated score can prove who made a work.
          </p>
          <Link href="/about" className="mt-5 inline-flex items-center gap-1 text-[10px] text-[#783e42] underline underline-offset-2">
            Read the review principles <ArrowUpRight size={12} />
          </Link>
        </aside>
      </div>

      <section className="mt-12 max-w-[760px] bg-[#fbf8f1] p-5 sm:mt-16 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-[10px] text-[#51493f]">
            Title
            <input
              type="text"
              placeholder="A name for your work"
              className="mt-2 h-11 w-full border-b border-[#cfc4b5] bg-transparent px-1 text-[12px] placeholder:text-[#a99d8d] disabled:opacity-70"
            />
          </label>
          <label className="text-[10px] text-[#51493f]">
            Kind of work
            <select
              defaultValue=""
              className="mt-2 h-11 w-full border-b border-[#cfc4b5] bg-transparent px-1 text-[12px] text-[#756d63] disabled:opacity-70"
            >
              <option value="" disabled>Choose a category</option>
              <option>Art & photography</option>
              <option>Music & sound</option>
              <option>Writing & ideas</option>
              <option>Code & tools</option>
              <option>First-hand experience</option>
              <option>Other original work</option>
            </select>
          </label>
        </div>

        <label className="mt-6 block text-[10px] text-[#51493f]">
          Tell us about its making
          <textarea
            rows={4}
            placeholder="Your process, materials, influences, or the experience behind it…"
            className="mt-2 w-full resize-y border-b border-[#cfc4b5] bg-transparent px-1 py-3 text-[12px] leading-5 placeholder:text-[#a99d8d] disabled:opacity-70"
          />
        </label>

        <label className="mt-7 block cursor-pointer text-[10px] text-[#51493f]">
          Add an original file
          <input
            type="file"
            accept="image/*,audio/*,video/*,.pdf,.txt,.md,.zip"
            onChange={handleFileChange}
            className="sr-only"
          />
          <span className="mt-2 flex min-h-28 items-center justify-center gap-3 bg-[#eee7db] px-5 py-6 text-center text-[11px] text-[#756d63]">
            {selectedFile ? (
              <>
                <FileIcon size={18} />
                <span>{selectedFile.name} · {formatFileSize(selectedFile.size)}</span>
              </>
            ) : (
              "Images, audio, video, documents, and code"
            )}
          </span>
        </label>

        <p className="mt-5 text-[10px] leading-5 text-[#817669]">
          Submission tools are being prepared. No work is uploaded or stored
          from this page yet.
        </p>
        <button
          type="button"
          disabled
          className="mt-5 bg-[#a99d8d] px-5 py-3 text-[10px] font-medium text-[#f5f0e7] disabled:cursor-not-allowed"
        >
          Submissions open soon
        </button>
      </section>
    </main>
  );
}
