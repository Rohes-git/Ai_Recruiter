/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { UploadCloud, FileSpreadsheet, Trash2, CheckCircle2, FileUp, ShieldCheck } from 'lucide-react';
import { UploadedFile } from '../types';
import API from "../services/api";

interface CandidateResumesUploadProps {
  files: UploadedFile[];
  onAddFiles: (newFiles: UploadedFile[]) => void;
  onRemoveFile: (id: string) => void;
}

export const CandidateResumesUpload: React.FC<CandidateResumesUploadProps> = ({
  files,
  onAddFiles,
  onRemoveFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // List of pre-filled simulated resume files for easy "one-click demo seeding"
  const demoResumes = [
    { name: 'Alex_Rivera_Resume_Google.pdf', size: '1.2 MB' },
    { name: 'Sarah_Chen_Fintech_Lead.pdf', size: '940 KB' },
    { name: 'Jordan_Smith_UX_Engineer.pdf', size: '1.1 MB' },
    { name: 'Elena_Rostova_WebDev.pdf', size: '820 KB' },
    { name: 'Marcus_Brody_DataSystems.pdf', size: '1.4 MB' },
  ];

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
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      processFileList(droppedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFileList(selectedFiles);
    }
  };

  const processFileList = async (list: FileList) => {
  const parsedFiles: UploadedFile[] = [];

  for (let i = 0; i < list.length; i++) {
    const file = list[i];

    parsedFiles.push({
      id: "res-" + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      status: "success",
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/upload-resume", formData);
      console.log(`${file.name} uploaded`);
    } catch (err) {
      console.error(err);
    }
  }

  onAddFiles(parsedFiles);
};

  const seedDemoResumes = () => {
    const mapped: UploadedFile[] = demoResumes.map((res, index) => ({
      id: `demo-${index}-${Date.now()}`,
      name: res.name,
      size: res.size,
      status: 'success',
    }));
    onAddFiles(mapped);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-sans font-semibold text-base text-[#0F172A]">Candidate Resumes</h2>
            <p className="text-xs text-[#64748B]">Drag and drop or browse multiple files (PDF, DOCX)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {files.length === 0 && (
            <button
              type="button"
              onClick={seedDemoResumes}
              className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] bg-[#2563EB]/10 hover:bg-[#2563EB]/20 px-3 py-1.5 rounded-lg transition-all"
            >
              ⚡ Load 5 Demo Resumes
            </button>
          )}
          <div className="px-2.5 py-1 bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-md">
            <span className="text-[#14B8A6] font-bold text-[10px] uppercase tracking-wide">
              Bulk Upload Active
            </span>
          </div>
        </div>
      </div>

      {/* Drag & Drop Main Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#2563EB] bg-[#2563EB]/5 scale-[0.99]'
            : 'border-[#E2E8F0] bg-[#F8FAFC]/50 hover:border-[#2563EB] hover:bg-[#2563EB]/5'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept=".pdf,.docx,.doc"
          className="hidden"
        />

        <div className="w-10 h-10 bg-white border border-[#E2E8F0] rounded-full shadow-sm flex items-center justify-center text-[#2563EB] mx-auto mb-3">
          <UploadCloud className="w-5 h-5" />
        </div>

        <h3 className="font-sans font-semibold text-sm text-[#0F172A] mb-1">
          Drop files here
        </h3>
        <p className="text-xs text-[#64748B] mb-4">or <span className="text-[#2563EB] underline font-medium">click to browse</span></p>
      </div>

      {/* Uploaded Resumes List Section */}
      <div className="mt-6 border-t border-[#E2E8F0] pt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Uploaded Files ({files.length})
          </h4>
          {files.length > 0 && (
            <button
              onClick={() => files.forEach((f) => onRemoveFile(f.id))}
              className="text-[11px] font-bold text-red-500 hover:text-red-700 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {files.length === 0 ? (
          <div className="py-12 text-center rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC]/30">
            <div className="text-[#94A3B8] mb-3 flex justify-center">
              <UploadCloud className="w-10 h-10 opacity-40" />
            </div>
            <p className="text-xs text-[#64748B] italic">No resumes uploaded yet. Candidates will appear here once added.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 bg-white border border-[#E2E8F0] rounded flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0F172A] text-xs leading-snug truncate pr-2">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-[#64748B] font-medium">
                        {file.size}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="text-[10px] text-[#22C55E] font-semibold">
                        Uploaded
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveFile(file.id)}
                  className="p-1 text-[#94A3B8] hover:text-red-500 transition-colors"
                  title="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
