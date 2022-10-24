export interface MonthProps {
  name: string;
  children: React.ReactNode;
}

export default function Month({ name, children }: MonthProps) {
  return (
    <section key={name} className="text-center">
      <h2 className="font-semibold text-gray-900">{name}</h2>
      <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {children}
      </div>
    </section>
  );
}
