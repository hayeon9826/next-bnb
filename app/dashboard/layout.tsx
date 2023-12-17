export default function Layout(props: {
  children: React.ReactNode
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-3 gap-4 min-h-screen">
      {props.children}
      {props.left}
      {props.right}
    </div>
  )
}
