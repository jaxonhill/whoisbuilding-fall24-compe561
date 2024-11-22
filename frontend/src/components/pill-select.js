export default function Pill({ option }) {
  return (
    <button className={`${option.isSelected ? "border-blue-700 bg-blue-700 text-white" : "border-slate-300 text-slate-500"} text-sm px-4 py-1`}>{option.label}</button>
  )
}
