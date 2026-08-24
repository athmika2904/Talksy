import { Link } from "react-router-dom"

interface FeatureCardProps {
  emoji: string
  title: string
  description: string
  link: string
  large?: boolean
}

function FeatureCard({
  emoji,
  title,
  description,
  link,
  large = false,
}: FeatureCardProps) {

  return (
    <Link
      to={link}
      className={`
        group relative block bg-[#151513] p-8
        transition-all duration-300
        hover:bg-[#1b1b18]
        ${large ? "md:row-span-2" : ""}
      `}
    >

      <div className="flex h-full flex-col justify-between">

        <div>

          <div className="flex items-center justify-between">

            <span className="text-3xl text-[#c7ff3d]">
              {emoji}
            </span>

            <span className="text-xs text-white/20 transition group-hover:text-[#c7ff3d]">
              OPEN ↗
            </span>

          </div>

          <h3 className="mt-16 text-2xl font-black tracking-tight">
            {title}
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-7 text-white/40">
            {description}
          </p>

        </div>

        <div className="mt-12 h-px w-full bg-white/10 transition group-hover:bg-[#c7ff3d]" />

      </div>

    </Link>
  )
}

export default FeatureCard