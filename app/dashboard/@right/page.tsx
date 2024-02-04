export default async function DashboardRightPage() {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random()
      if (randomNumber < 0.5) {
        // 50% 확률로 에러 발생
        reject(new Error('Random Error Occurred'))
      } else {
        resolve('No Error')
      }
    }, 2000)
  })

  return (
    <div className="text-center bg-rose-300 text-black font-semibold flex flex-col justify-center">
      Dashboard Right Page
    </div>
  )
}
