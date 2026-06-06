import { Reveal } from '@components/Reveal'

type Props = {
  index: string
  label: string
  title: string
}

/** Shared section header: mono index + label, then a large display title. */
export function SectionHeading({ index, label, title }: Props) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-faint">{index}</span>
        <span className="label">{label}</span>
      </div>
      <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
    </Reveal>
  )
}
