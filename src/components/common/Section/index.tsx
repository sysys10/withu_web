export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className='text-lg pl-2 font-semibold'>{title}</h2>
      {children}
    </div>
  )
}
