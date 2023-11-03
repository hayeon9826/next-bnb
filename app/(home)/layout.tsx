export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mt-20 py-10 max-w-7xl mx-auto">{children}</div>
    </>
  )
}
