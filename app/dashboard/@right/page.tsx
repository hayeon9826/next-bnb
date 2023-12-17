export default async function DashboardRightPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return (
    <div className="text-center bg-rose-300 text-black font-semibold flex flex-col justify-center">
      Dashboard Right Page
    </div>
  )
}
