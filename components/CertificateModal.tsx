"use client";

import { useState } from "react";
import Brote from "./Brote";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CertificateModal({ isOpen, onClose }: Props) {
  const [studentName, setStudentName] = useState("Estudiante Estrella");
  const [date, setDate] = useState(() => new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" }));

  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm print:static print:p-0 print:bg-transparent">
      {/* Container */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl print:max-w-none print:shadow-none print:p-0">
        {/* Controls - Hidden in Print */}
        <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-trunk/30 pb-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-ink/70">Nombre:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="rounded-xl border border-trunk px-3 py-1 text-sm font-bold focus:outline-teal"
              placeholder="Nombre del estudiante"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="btn btn-orange !min-h-[40px] !px-5 !text-base shadow"
            >
              🖨️ Print Diploma
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-ink/10 px-3 py-1.5 text-sm font-bold text-ink hover:bg-ink/20"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="relative rounded-3xl border-8 border-double border-[#FFB319] bg-[#FFFDF7] p-8 text-center shadow-inner print:border-8 print:m-0">
          {/* Corner Decors */}
          <span className="absolute left-3 top-3 text-2xl" aria-hidden="true">⭐</span>
          <span className="absolute right-3 top-3 text-2xl" aria-hidden="true">⭐</span>
          <span className="absolute bottom-3 left-3 text-2xl" aria-hidden="true">⭐</span>
          <span className="absolute bottom-3 right-3 text-2xl" aria-hidden="true">⭐</span>

          <div className="flex justify-center">
            <Brote size={64} />
          </div>

          <p className="mt-2 font-heading text-xs font-bold uppercase tracking-widest text-teal-dark">
            Early Spanish Reading • Certificado Oficial
          </p>

          <h2 className="mt-1 font-heading text-4xl font-extrabold text-[#C2410C]">
            ¡DIPLOMA DE LECTURA!
          </h2>

          <p className="mt-3 text-sm font-semibold text-ink/80">
            Se otorga con orgullo y gran felicitación a:
          </p>

          <p className="mt-2 font-heading text-3xl font-extrabold text-teal-dark underline decoration-[#FFB319] decoration-wavy underline-offset-8">
            {studentName || "________________________"}
          </p>

          <p className="mx-auto mt-4 max-w-md text-base font-semibold leading-relaxed text-ink/90">
            Por su dedicación, entusiasmo y gran éxito aprendiendo a leer en español con las historias, sílabas y canciones de <strong>Brote</strong>.
          </p>

          <div className="mt-8 flex items-end justify-between px-6 text-sm">
            <div className="text-left">
              <p className="font-semibold text-xs text-ink/60">Fecha:</p>
              <p className="font-bold border-b border-ink/40 pb-1 min-w-[120px]">{date}</p>
            </div>

            <div className="flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFB319] text-white shadow-md text-xl">
                🏅
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/60 mt-1">Sello de Excelencia</span>
            </div>

            <div className="text-right">
              <p className="font-semibold text-xs text-ink/60">Firma del Maestro / Padre:</p>
              <div className="border-b border-ink/40 pb-1 min-w-[140px] h-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

