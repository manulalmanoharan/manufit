export default function NewFooter() {
  return (
    <footer
      className="py-8 px-4 sm:px-6 lg:px-8 text-center"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #F1E4D8'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-sm"
          style={{ color: '#93837A' }}
        >
          © {new Date().getFullYear()} ManuFit. All rights reserved. Keep results, not regrets.
        </p>
      </div>
    </footer>
  )
}
