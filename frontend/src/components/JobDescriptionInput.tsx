/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { FileText, Upload, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import API from "../services/api";
interface JobDescriptionInputProps {
  value: string;
  onChange: (val: string) => void;
  uploadedFile: { name: string; size: string } | null;
  onUploadFile: (file: { name: string; size: string } | null) => void;
  activeTab: 'paste' | 'upload';
  setActiveTab: (tab: 'paste' | 'upload') => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  uploadedFile,
  onUploadFile,
  activeTab,
  setActiveTab,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
  const name = file.name;
  const size = (file.size / 1024).toFixed(1) + " KB";

  onUploadFile({ name, size });

  const formData = new FormData();
  formData.append("file", file);

 try {
  await API.post("/upload-job", formData);

  const response = await API.get("/read-job");

  onChange(response.data.text);

  console.log("Job uploaded successfully");
} catch (err) {
  console.error(err);
}
};
  
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm relative overflow-hidden transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-sans font-semibold text-base text-[#0F172A]">Job Description</h2>
            <p className="text-xs text-[#64748B]">Specify requirements to evaluate candidates against</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-[#F1F5F9] p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'paste'
                ? 'bg-white text-[#2563EB] shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Paste Text
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-[#2563EB] shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Upload File
          </button>
        </div>
      </div>

      {activeTab === 'paste' ? (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste the job requirements, responsibilities, and qualifications here..."
              className="w-full min-h-[180px] p-4 bg-[#F8FAFC]/50 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all resize-none text-sm text-[#0F172A] leading-relaxed placeholder:text-[#94A3B8]"
            />
            {value && (
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <span className="text-[11px] font-semibold text-[#64748B] bg-white border border-[#E2E8F0] px-2 py-1 rounded">
                  {value.length} chars
                </span>
                <button
                  onClick={handleClear}
                  className="text-[11px] font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                >
                  CLEAR
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-[#64748B] leading-tight">
            Tip: Be thorough. AI understands complex requirements better when detailed expectations are outlined.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {uploadedFile ? (
            <div className="border-2 border-dashed border-[#14B8A6]/30 bg-[#14B8A6]/5 rounded-xl p-6 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-[#14B8A6]/10 rounded-lg flex items-center justify-center text-[#14B8A6]">
                    <CheckCircle2 className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#0F172A] line-clamp-1">{uploadedFile.name}</h4>
                    <p className="text-xs text-[#64748B]">{uploadedFile.size} • Uploaded successfully</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#F1F5F9] rounded-md border border-[#E2E8F0] bg-white transition-all shadow-sm"
                    title="Replace file"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onUploadFile(null)}
                    className="px-3 py-1.5 text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-all border border-red-100 bg-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#2563EB] bg-[#2563EB]/5'
                  : 'border-[#E2E8F0] bg-[#F8FAFC]/50 hover:border-[#2563EB] hover:bg-[#2563EB]/5'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt,.pdf,.docx,.doc"
                className="hidden"
              />
              <div className="w-10 h-10 bg-white border border-[#E2E8F0] shadow-sm rounded-full flex items-center justify-center text-[#2563EB] mx-auto mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-semibold text-sm text-[#0F172A] mb-1">
                Drop your job description file here
              </h3>
              <p className="text-xs text-[#64748B] mb-4">PDF, DOCX, TXT up to 10MB</p>
              <button
                type="button"
                className="px-4 py-2 bg-white border border-[#E2E8F0] text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] rounded-lg text-xs font-bold shadow-sm transition-all inline-flex items-center gap-1.5"
              >
                Choose File
              </button>
            </div>
          )}
          <p className="text-xs text-[#64748B] mt-4 flex items-center gap-1.5 leading-tight">
            <AlertCircle className="w-3.5 h-3.5 text-[#64748B]" />
            Only one input method is active. Uploading a file will automatically parse and load text into the system.
          </p>
        </div>
      )}
    </div>
  );
};
