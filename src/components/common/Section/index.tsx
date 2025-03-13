export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='space-y-4'>
      <h2 className='text-2xl pl-2 font-semibold'>{title}</h2>
      {children}
    </div>
  )
}
