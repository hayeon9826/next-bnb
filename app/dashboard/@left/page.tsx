export default async function DashboardLeftPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return (
    <div className="text-center bg-rose-500 text-white font-semibold flex flex-col justify-center">
      Dashboard Left Page
    </div>
  )
}
