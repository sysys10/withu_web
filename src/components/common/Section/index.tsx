export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='px-2'>
      <h2 className='text-2xl font-semibold'>{title}</h2>
      {children}
    </div>
  )
}
