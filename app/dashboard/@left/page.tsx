export default async function DashboardLeftPage() {
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random()
      if (randomNumber < 0.5) {
        // 50% 확률로 에러 발생
        reject(new Error('Random Error Occurred'))
      } else {
        resolve('No Error')
      }
    }, 1000)
  })

  return (
    <div className="text-center bg-rose-700 text-white font-semibold flex flex-col justify-center">
      Dashboard Left Page
    </div>
  )
}
