"use client";

import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  BookOpen,
  Target,
  Calendar,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";

type DocCategory =
  | "mission-vision"
  | "course-objectives"
  | "exam-structure"
  | "calendar"
  | "guidelines";

type DocumentItem = {
  id: number;
  name: string;
  category: DocCategory;
  uploaded: string;
  size: string;
  status: "processed" | "processing";
};

const CATEGORIES: {
  key: DocCategory;
  label: string;
  icon: React.ElementType;
  color: string;
  desc: string;
}[] = [
  {
    key: "mission-vision",
    label: "Mission & Vision",
    icon: Target,
    color: "teal",
    desc: "Institute goals and overall philosophy — aligned to NEP 2020",
  },
  {
    key: "course-objectives",
    label: "Course Objectives (CO)",
    icon: BookOpen,
    color: "green",
    desc: "Subject-wise course outcomes and program objectives",
  },
  {
    key: "exam-structure",
    label: "Exam Structure",
    icon: FileText,
    color: "blue",
    desc: "Paper patterns, mark distribution, question types",
  },
  {
    key: "calendar",
    label: "Academic Calendar",
    icon: Calendar,
    color: "amber",
    desc: "Schedule, exam dates, events, deadlines",
  },
  {
    key: "guidelines",
    label: "General Guidelines",
    icon: CheckCircle2,
    color: "coral",
    desc: "Institute policies, rubrics, evaluation norms",
  },
];

const INITIAL_DOCS: DocumentItem[] = [
  {
    id: 1,
    name: "Institute Mission & Vision 2024.pdf",
    category: "mission-vision",
    uploaded: "Aug 15, 2024",
    size: "245 KB",
    status: "processed",
  },
  {
    id: 2,
    name: "B.Tech CSE Course Objectives Sem 3.pdf",
    category: "course-objectives",
    uploaded: "Aug 10, 2024",
    size: "1.2 MB",
    status: "processed",
  },
  {
    id: 3,
    name: "SPPU Exam Pattern 2024-25.pdf",
    category: "exam-structure",
    uploaded: "Aug 8, 2024",
    size: "380 KB",
    status: "processed",
  },
  {
    id: 4,
    name: "Academic Calendar AY 2024-25.pdf",
    category: "calendar",
    uploaded: "Jul 30, 2024",
    size: "520 KB",
    status: "processing",
  },
  {
    id: 5,
    name: "Evaluation Guidelines and Rubrics.docx",
    category: "guidelines",
    uploaded: "Aug 1, 2024",
    size: "92 KB",
    status: "processed",
  },
];

const COLOR_MAP: Record<string, string> = {
  teal: "bg-[#DBEAFE] text-[#2563EB] border-[#93C5FD]",
  green: "bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]",
  blue: "bg-[#DFEDF7] text-[#3C6F91] border-[#9CBFD7]",
  amber: "bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]",
  coral: "bg-[#EFF6FF] text-[#1D4ED8] border-[#93C5FD]",
};

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<DocCategory | "all">("all");

  const [docs, setDocs] = useState<DocumentItem[]>(INITIAL_DOCS);

  const [uploadCategory, setUploadCategory] =
    useState<DocCategory>("course-objectives");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered =
    selectedCategory === "all"
      ? docs
      : docs.filter((doc) => doc.category === selectedCategory);

  const openFilePicker = (category: DocCategory) => {
    setUploadCategory(category);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const newDocs: DocumentItem[] = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      category: uploadCategory,
      uploaded: "Just now",
      size:
        file.size >= 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.max(1, Math.round(file.size / 1024))} KB`,
      status: "processing",
    }));

    setDocs((current) => [...current, ...newDocs]);

    event.target.value = "";
  };

  const removeDoc = (id: number) => {
    setDocs((current) =>
      current.filter((doc) => doc.id !== id)
    );
  };

  const selectedLabel =
    selectedCategory === "all"
      ? "All Documents"
      : CATEGORIES.find(
          (category) => category.key === selectedCategory
        )?.label;

  return (
    <div className="space-y-5 text-[#172033]">

      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2563EB] mb-1">
          Institute Resources
        </p>

        <h2 className="text-3xl font-serif font-bold text-[#172033]">
          Context Documents
        </h2>

        <p className="text-sm text-[#64748B] mt-1">
          Upload institute context — all documents are OCR-processed and fed
          into the exam generation engine
        </p>
      </div>

      {/* NEP Banner */}
      <div className="bg-[#DBEAFE] border-2 border-[#102A43] shadow-[4px_4px_0_#102A43] p-4 flex items-start gap-3">
        <div className="w-9 h-9 shrink-0 flex items-center justify-center bg-white border border-[#93C5FD]">
          <BookOpen className="w-4 h-4 text-[#2563EB]" />
        </div>

        <p className="text-sm text-[#334155] leading-6">
          <strong className="text-[#2563EB]">
            NEP 2020 Aligned:
          </strong>{" "}
          ExaGo uses Course Outcomes (COs), Program Outcomes (POs), and
          Bloom&apos;s Taxonomy levels from your uploaded documents to
          generate contextually relevant, competency-mapped examinations.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {CATEGORIES.map(
          ({ key, label, icon: Icon, color, desc }) => {
            const count = docs.filter(
              (doc) => doc.category === key
            ).length;

            const selected = selectedCategory === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() =>
                  setSelectedCategory(
                    selected ? "all" : key
                  )
                }
                className={`text-left border-2 p-4 transition-all ${
                  selected
                    ? "bg-[#DBEAFE] border-[#2563EB] shadow-[4px_4px_0_#102A43]"
                    : "bg-white border-[#102A43] shadow-[3px_3px_0_#102A43] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#102A43]"
                }`}
              >
                <div
                  className={`w-9 h-9 flex items-center justify-center border ${COLOR_MAP[color]} mb-3`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="text-xs font-bold text-[#172033] mb-1">
                  {label}
                </div>

                <div className="text-[10px] text-[#718096] leading-tight min-h-[30px]">
                  {desc}
                </div>

                <div className="text-xl font-bold text-[#172033] mt-3">
                  {count}
                </div>

                <div className="text-[10px] text-[#718096]">
                  documents
                </div>
              </button>
            );
          }
        )}
      </div>

      {/* Upload + Document List */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Left */}
        <div className="lg:col-span-2 space-y-4">

          {/* Upload Zone */}
          <button
            type="button"
            onClick={() =>
              openFilePicker(
                selectedCategory === "all"
                  ? "course-objectives"
                  : selectedCategory
              )
            }
            className="w-full bg-[#F8FBFF] border-2 border-dashed border-[#2563EB] shadow-[4px_4px_0_#102A43] hover:bg-[#EFF6FF] transition-all p-8 flex flex-col items-center justify-center gap-3 text-center"
          >
            <div className="w-12 h-12 bg-[#DBEAFE] border-2 border-[#2563EB] flex items-center justify-center">
              <Upload className="w-5 h-5 text-[#2563EB]" />
            </div>

            <div>
              <p className="text-sm font-bold text-[#172033]">
                Upload Document
              </p>

              <p className="text-xs text-[#718096] mt-1">
                PDF, DOCX, XLSX, JPG, PNG
              </p>

              <p className="text-xs text-[#2563EB] font-medium mt-1">
                Select files to upload
              </p>
            </div>
          </button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Quick Upload */}
          <div className="bg-white border-2 border-[#102A43] shadow-[4px_4px_0_#102A43]">

            <div className="px-4 py-3 border-b-2 border-[#102A43]">
              <p className="text-[10px] font-bold text-[#2563EB] uppercase tracking-[0.15em]">
                Quick Upload By Category
              </p>
            </div>

            <div className="p-2">
              {CATEGORIES.map(
                ({ key, label, icon: Icon, color }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => openFilePicker(key)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-[#334155] font-medium hover:bg-[#EFF6FF] transition-colors"
                  >
                    <div
                      className={`w-7 h-7 flex items-center justify-center border ${COLOR_MAP[color]}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <span>{label}</span>

                    <Plus className="w-4 h-4 ml-auto text-[#2563EB]" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Document List */}
        <div className="lg:col-span-3 bg-white border-2 border-[#102A43] shadow-[4px_4px_0_#102A43] overflow-hidden">

          <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[#102A43]">

            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#2563EB] font-bold mb-1">
                Document Library
              </p>

              <span className="text-base font-serif font-bold text-[#172033]">
                {selectedLabel}
              </span>
            </div>

            <span className="text-xs font-bold text-[#2563EB] border border-[#93C5FD] bg-[#DBEAFE] px-3 py-1">
              {filtered.length} files
            </span>
          </div>

          <div>
            {filtered.length === 0 && (
              <div className="py-14 text-center text-[#718096]">
                <FileText className="w-9 h-9 mx-auto mb-3 opacity-40" />

                <p className="text-sm font-medium">
                  No documents in this category
                </p>
              </div>
            )}

            {filtered.map(
              ({
                id,
                name,
                category,
                uploaded,
                size,
                status,
              }) => {
                const cat = CATEGORIES.find(
                  (item) => item.key === category
                );

                return (
                  <div
                    key={id}
                    className="flex items-center gap-3 px-5 py-4 border-b border-[#CBD5E1] hover:bg-[#F8FBFF] transition-colors"
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center border shrink-0 ${
                        cat
                          ? COLOR_MAP[cat.color]
                          : "bg-gray-50 text-gray-500 border-gray-300"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#334155] truncate">
                        {name}
                      </p>

                      <p className="text-xs text-[#718096] mt-0.5">
                        {uploaded} · {size}
                      </p>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 border flex items-center gap-1 shrink-0 ${
                        status === "processed"
                          ? "bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]"
                          : "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]"
                      }`}
                    >
                      {status === "processed" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}

                      {status}
                    </span>

                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="w-8 h-8 border border-[#CBD5E1] bg-white flex items-center justify-center hover:bg-[#DBEAFE] hover:border-[#2563EB]"
                        title="View document"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => removeDoc(id)}
                        className="w-8 h-8 border border-[#CBD5E1] bg-white flex items-center justify-center hover:bg-[#FEE2E2] hover:border-[#B91C1C]"
                        title="Delete document"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-[#B91C1C]" />
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}