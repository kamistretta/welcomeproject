export default function Footer() {
  return (
    <footer className="relative bg-purple-950 py-8 text-center text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-gold-400 to-purple-500" />
      <p className="text-lg font-semibold tracking-wide">Jones County High School Cross Country</p>
      <p className="mt-1 text-gold-400 font-medium">Go Greyhounds!</p>
      <p className="mt-4 text-xs text-purple-400">&copy; {new Date().getFullYear()} Jones County XC</p>
    </footer>
  )
}
