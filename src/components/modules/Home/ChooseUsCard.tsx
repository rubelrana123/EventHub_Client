import {  type LucideIcon } from "lucide-react"

 
interface ChooseUsCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: 'blue' | 'orange' | 'green'
}
export function ChooseUsCard({
  title,
  description,
  icon: Icon,
  color,
}: ChooseUsCardProps) {
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'hover:border-blue-200',
      iconBg: 'bg-blue-100',
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'hover:border-orange-200',
      iconBg: 'bg-orange-100',
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'hover:border-green-200',
      iconBg: 'bg-green-100',
    },
  }
  const style = colorStyles[color]
  return (
    <div
      className={`p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${style.border}`}
    >
      <div
        className={`w-14 h-14 rounded-xl ${style.iconBg} flex items-center justify-center mb-6`}
      >
        <Icon className={`h-7 w-7 ${style.text}`} />
      </div>
      <h3 className="text-xl font-bold text-[#444444] mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}
 