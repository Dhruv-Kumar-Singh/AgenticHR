import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

export default function DocumentUploadModal({ isOpen, onClose, onAttachDocument }) {
  const [selectedCategory, setSelectedCategory] = useState('resume');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: '1', name: 'Alex_Morgan_Resume_2026.pdf', size: '240 KB', type: 'resume', date: 'Uploaded today' },
    { id: '2', name: 'Stripe_Staff_Engineer_JD.pdf', size: '180 KB', type: 'job_desc', date: 'Uploaded yesterday' },
  ]);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const newDoc = {
        id: Date.now().toString(),
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        type: selectedCategory,
        date: 'Just now',
      };
      setUploadedFiles((prev) => [newDoc, ...prev]);
      onAttachDocument(newDoc);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newDoc = {
        id: Date.now().toString(),
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        type: selectedCategory,
        date: 'Just now',
      };
      setUploadedFiles((prev) => [newDoc, ...prev]);
      onAttachDocument(newDoc);
    }
  };

  const sampleDocs = [
    { name: 'Google_SWE_L5_Job_Spec.pdf', type: 'job_desc', size: '195 KB' },
    { name: 'System_Design_Distributed_Systems.md', type: 'notes', size: '64 KB' },
    { name: 'Amazon_Leadership_Principles_Prep.pdf', type: 'notes', size: '120 KB' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#0e0e11] border border-white/10 shadow-2xl p-6 overflow-hidden flex flex-col gap-5 text-neutral-200"
        style={{
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(52, 211, 153, 0.05)',
        }}
      >
        {/* Glow overlay */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
              <Icon icon="solar:document-add-bold-duotone" className="text-xl" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                Add Documents to Copilot
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                  AI Context
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Upload resumes, job descriptions, or prep notes for contextual interview simulation.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <Icon icon="solar:close-circle-linear" className="text-lg" />
          </button>
        </div>

        {/* Category Pill Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-mono mr-1">Document Type:</span>
          {[
            { id: 'resume', label: 'Resume / CV', icon: 'solar:user-id-bold-duotone' },
            { id: 'job_desc', label: 'Job Description', icon: 'solar:case-round-bold-duotone' },
            { id: 'notes', label: 'Notes / Prep', icon: 'solar:notes-bold-duotone' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <Icon icon={cat.icon} className="text-xs" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-emerald-400 bg-emerald-500/5'
              : 'border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.md"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-neutral-300">
            <Icon icon="solar:cloud-upload-bold-duotone" className="text-2xl text-emerald-400 animate-pulse" />
          </div>
          <p className="text-sm font-medium text-white mb-1">
            Click to upload or drag & drop files here
          </p>
          <p className="text-xs text-neutral-500">
            Supports PDF, DOCX, TXT, MD (Max 25MB). Auto-parsed by Praxis Copilot.
          </p>
        </div>

        {/* Quick Sample Attachable Files */}
        <div>
          <span className="text-xs font-mono text-neutral-400 block mb-2">Or select from preloaded docs:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleDocs.map((doc, idx) => (
              <div
                key={idx}
                onClick={() => {
                  const newDoc = {
                    id: `sample-${idx}`,
                    name: doc.name,
                    size: doc.size,
                    type: doc.type,
                    date: 'Sample',
                  };
                  onAttachDocument(newDoc);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-emerald-400/40 hover:bg-white/[0.06] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Icon icon="solar:document-text-bold-duotone" className="text-emerald-400 shrink-0 text-sm" />
                  <span className="text-xs text-neutral-300 truncate group-hover:text-white">{doc.name}</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 shrink-0 ml-2 group-hover:text-emerald-400">+ Attach</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-1">
          <span className="text-[11px] font-mono text-neutral-500">
            {uploadedFiles.length} documents saved in profile
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (uploadedFiles[0]) {
                  onAttachDocument(uploadedFiles[0]);
                }
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <Icon icon="solar:check-circle-bold" className="text-xs" />
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
