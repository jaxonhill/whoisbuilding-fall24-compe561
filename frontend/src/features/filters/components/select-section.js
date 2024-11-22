import Pill from "@/components/pill-select"

export default function SelectSection({ headingText, options }) {
  return (
    <section className="flex flex-col gap-3 w-full">
        <div className="flex justify-between items-center">
            <h2 className="font-medium">{headingText}</h2>
            <p className="text-blue-700 text-sm">Show All</p>
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-3">{options.map((option) => {
            return <Pill key={option.label} option={option} />
        })}</div>
    </section>
  )
}
