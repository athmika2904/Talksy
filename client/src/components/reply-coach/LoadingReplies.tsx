function LoadingReplies() {

  return (
    <section className="mt-16 border-t border-white/10 pt-10">

      <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/30">
        AI IS THINKING...
      </p>

      <div className="mt-6 space-y-3">

        {[1, 2, 3].map((item) => (

          <div
            key={item}
            className="h-24 animate-pulse border border-white/10 bg-[#191917]"
          />

        ))}

      </div>

    </section>
  )
}

export default LoadingReplies