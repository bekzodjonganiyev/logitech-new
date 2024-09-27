import "@/styles/globals.css"

export default function StaticPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="bg-darkgray py-10 sticky top-0"></header>
      <main className="flex-1 bg-gray">{children}</main>
      <footer className="bg-lightgray py-5"></footer>
    </>
  )
}
