'use client';

type Operacion = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  documentos: Array<{
    category: string;
    items: Array<{
      doc: string;
      obligatorio: boolean;
    }>;
  }>;
};

type Props = {
  operaciones: Operacion[];
};

export default function ChecklistDownloader({ operaciones }: Props) {
  const downloadChecklist = (opId: string) => {
    const op = operaciones.find(o => o.id === opId);
    if (!op) return;

    const texto = op.documentos
      .flatMap(cat => 
        cat.items.map(item => 
          `[ ] ${item.doc} ${item.obligatorio ? '(OBLIGATORIO)' : '(OPCIONAL)'}`
        )
      )
      .join('\n');
    
    const contenido = `CHECKLIST DE DOCUMENTOS - ${op.title.toUpperCase()}\n\n${op.subtitle}\n\n${texto}\n\n---\nGenerado desde oginmuebles.com\nFecha: ${new Date().toLocaleDateString('es-MX')}`;
    
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `checklist-documentos-${op.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {operaciones.map((op) => (
        <button
          key={op.id}
          onClick={() => downloadChecklist(op.id)}
          className="p-4 bg-[#0a0a0a] border border-white/10 hover:border-[#22AADE] rounded-sm transition-all text-left group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${op.color}20` }}>
              <svg className="w-5 h-5" style={{ color: op.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={op.icon} />
              </svg>
            </div>
            <span className="text-white font-bold text-sm group-hover:text-[#22AADE] transition-colors">{op.title}</span>
          </div>
          <p className="text-gray-500 text-xs font-light">Descargar checklist</p>
        </button>
      ))}
    </div>
  );
}
