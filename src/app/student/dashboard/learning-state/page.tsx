"use client";
import { useState } from "react";
import {
  Brain, CheckCircle2, Clock, TrendingUp, AlertCircle,
  Star, BookOpen, Code2, Award, Globe, Zap, BarChart3,
  FileText, Link2
} from "lucide-react";

const KNOWLEDGE_AREAS = [
  { name: "Data Structures & Algorithms", level: 82, status: "verified" },
  { name: "Object Oriented Programming", level: 75, status: "verified" },
  { name: "Database Management (SQL)", level: 68, status: "claimed" },
  { name: "Operating Systems", level: 60, status: "claimed" },
  { name: "Web Development", level: 88, status: "verified" },
  { name: "Machine Learning Basics", level: 45, status: "claimed" },
  { name: "Computer Networks", level: 55, status: "claimed" },
  { name: "Mathematics & Probability", level: 70, status: "verified" },
];

const TIMELINE = [
  { date: "Aug 2024", event: "GitHub connector synced — 320 contributions", type: "connector" },
  { date: "Jul 2024", event: "NPTEL Python Certificate uploaded & verified", type: "verified" },
  { date: "Jun 2024", event: "SY Semester 3 results added (CGPA 8.7)", type: "academic" },
  { date: "May 2024", event: "Hackathon finalist — MITAOE TechFest", type: "achievement" },
  { date: "Mar 2024", event: "Learning State initialised", type: "milestone" },
];

const FACTS = [
  { label: "Verified Facts", value: 12, color: "green" },
  { label: "Claimed Facts", value: 8, color: "orange" },
  { label: "Pending Review", value: 3, color: "blue" },
];

export default function LearningStatePage() {
  const [tab, setTab] = useState<"overview" | "knowledge" | "timeline" | "export">("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#172033]">Your Learning State</h2>
          <p className="text-sm text-[#4B5A73] mt-0.5">
            A living AI model of your academic profile — updated in real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-[#DCFCE7] text-[#15803D] font-bold px-3 py-1.5  border border-[#172033] flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-[#DCFCE7]0  animate-pulse" />
            Live
          </span>
          <button className="flex items-center gap-2 text-sm font-bold text-[#172033] border-2 border-[#172033] hover:bg-[#DBEAFE] shadow-[3px_3px_0_#172033] hover:text-[#2563EB] px-4 py-2  transition-all">
            <FileText className="w-4 h-4" /> Export State
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-[#EFF6FF] border-2 border-[#172033] p-1 shadow-[3px_3px_0_#172033] w-fit max-w-full">
        {(["overview", "knowledge", "timeline", "export"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2  text-sm font-bold transition-all duration-200 capitalize ${
              tab === t ? "bg-[#2563EB] text-[#172033] border-2 border-[#172033] shadow-[2px_2px_0_#172033]" : "text-[#4B5A73] hover:text-[#172033]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === "overview" && (
        <div className="space-y-5">
          {/* Score + Brain viz placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="col-span-1 lg:col-span-2 bg-white border-2 border-[#172033] shadow-[5px_5px_0_#172033] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-[#172033]">State Score</h3>
                <span className="text-xs text-[#718096]">Updated 2h ago</span>
              </div>
              {/* 3D Brain Visualisation */}
              <div className="h-48 bg-[#EFF6FF] border-2 border-[#172033] relative overflow-hidden flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-28 h-28 rounded-full border-2 border-[#BFDBFE]" />
                    <Brain
                      className="relative z-10 w-28 h-28 text-[#2563EB]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="text-3xl font-black text-[#2563EB] leading-none mt-1">
                    84
                  </div>

                  <div className="text-xs text-[#4B5A73] mt-0.5">
                    out of 100
                  </div>

                  <div className="mt-2 text-[9px] font-semibold text-[#2563EB] bg-[#DBEAFE] px-2 py-0.5">
                    🧠 3D Brain Visualisation coming soon
                  </div>
                </div>

                <div className="absolute left-4 top-3 text-[10px] font-bold text-[#2563EB] border-2 border-[#172033] bg-white px-2 py-1">
                  LIVE MODEL
                </div>

                <div className="absolute right-4 top-3 flex items-center gap-1 text-[10px] font-bold text-[#2563EB]">
                  <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-pulse" />
                  3D
                </div>
              </div>

              
            </div>

            <div className="space-y-3">
              {FACTS.map(({ label, value, color }) => (
                <div key={label} className="bg-white border-2 border-[#172033] shadow-[3px_3px_0_#172033] p-4">
                  <div className={`text-2xl font-black ${color === "green" ? "text-[#15803D]" : color === "orange" ? "text-[#2563EB]" : "text-[#2563EB]"}`}>
                    {value}
                  </div>
                  <div className="text-sm text-[#4B5A73] mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white border-2 border-[#172033] shadow-[5px_5px_0_#172033] p-6">
            <h3 className="font-black text-[#172033] mb-4">Profile Dimensions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, label: "Academic", score: 84, color: "indigo" },
                { icon: Code2, label: "Technical", score: 72, color: "blue" },
                { icon: Award, label: "Extra-curricular", score: 68, color: "violet" },
                { icon: Globe, label: "Language", score: 90, color: "green" },
              ].map(({ icon: Icon, label, score, color }) => (
                <div key={label} className="text-center">
                  <div className={`w-12 h-12  mx-auto flex items-center justify-center mb-2 ${
                    color === "indigo" ? "bg-[#DBEAFE] text-[#2563EB]" :
                    color === "blue" ? "bg-[#DBEAFE] text-[#2563EB]" :
                    color === "violet" ? "bg-[#DBEAFE] text-[#2563EB]" :
                    "bg-[#DCFCE7] text-[#15803D]"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-black text-[#172033]">{score}</div>
                  <div className="text-xs text-[#4B5A73]">{label}</div>
                  <div className="mt-2 h-1.5 bg-[#E5E7EB] overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${score}%`,
                        backgroundColor:
                          color === "green" ? "#22C55E" : "#60A5FA",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Tab */}
      {tab === "knowledge" && (
        <div className="bg-white border-2 border-[#172033] shadow-[5px_5px_0_#172033] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-[#172033]">Knowledge Base</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-[#15803D] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
              <span className="flex items-center gap-1.5 text-[#2563EB] font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> Claimed
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {KNOWLEDGE_AREAS.map(({ name, level, status }) => (
              <div key={name} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-[#172033] truncate pr-2">{name}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs font-bold px-2 py-0.5  ${
                        status === "verified"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#DBEAFE] text-[#2563EB]"
                      }`}>
                        {status}
                      </span>
                      <span className="text-sm font-black text-[#172033] w-8 text-right">{level}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#E5E7EB] overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${level}%`,
                        backgroundColor:
                          status === "verified" ? "#60A5FA" : "#60A5FA",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {tab === "timeline" && (
        <div className="bg-white border-2 border-[#172033] shadow-[5px_5px_0_#172033] p-6">
          <h3 className="font-black text-[#172033] mb-5">Learning State Timeline</h3>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[#E5E7EB]" />
            <div className="space-y-5">
              {TIMELINE.map(({ date, event, type }) => (
                <div key={event} className="flex gap-4 relative">
                  <div className={`w-10 h-10  flex items-center justify-center flex-shrink-0 z-10 ${
                    type === "verified" ? "bg-[#DCFCE7] text-[#15803D]" :
                    type === "connector" ? "bg-[#DBEAFE] text-[#2563EB]" :
                    type === "academic" ? "bg-[#DBEAFE] text-[#2563EB]" :
                    type === "achievement" ? "bg-[#DBEAFE] text-[#2563EB]" :
                    "bg-[#E5E7EB] text-[#4B5A73]"
                  }`}>
                    {type === "verified" ? <CheckCircle2 className="w-4 h-4" /> :
                     type === "connector" ? <Link2 className="w-4 h-4" /> :
                     type === "achievement" ? <Star className="w-4 h-4" /> :
                     type === "academic" ? <BookOpen className="w-4 h-4" /> :
                     <Zap className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <p className="text-sm font-medium text-[#172033]">{event}</p>
                    <p className="text-xs text-[#718096] mt-0.5">{date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export Tab */}
      {tab === "export" && (
        <div className="bg-white border-2 border-[#172033] shadow-[5px_5px_0_#172033] p-6">
          <h3 className="font-black text-[#172033] mb-2">Export Your Learning State</h3>
          <p className="text-sm text-[#4B5A73] mb-6">
            Your full Learning State (raw data) is ~400–500 MB. A compressed, human-readable export is available immediately.
            The full export will be emailed to you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Compressed Summary", desc: "JSON — shareable, AI-readable format", icon: BarChart3, btn: "Download Now" },
              { label: "Full Raw Export", desc: "Complete data — email delivery (~10 min)", icon: FileText, btn: "Request Export" },
            ].map(({ label, desc, icon: Icon, btn }) => (
              <div key={label} className="border-2 border-[#172033] shadow-[4px_4px_0_#172033] p-5">
                <div className="w-10 h-10 bg-[#DBEAFE]  flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h4 className="font-bold text-[#172033] text-sm mb-1">{label}</h4>
                <p className="text-xs text-[#718096] mb-4">{desc}</p>
                <button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold py-2.5  transition-colors">
                  {btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
