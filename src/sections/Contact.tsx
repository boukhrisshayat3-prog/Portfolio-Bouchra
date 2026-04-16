export const Contact = () => {
  return (
    <section id="contact" className="bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white">Contact</h2>
          <p className="mt-4 text-slate-300">
            Si quieres trabajar conmigo, escribeme y hablamos de tu proyecto.
          </p>
          <a
            href="mailto:pedro@example.com"
            className="inline-block mt-8 rounded-lg bg-primary px-6 py-3 font-semibold text-black hover:opacity-90"
          >
            Enviar mensaje
          </a>
        </div>
      </div>
    </section>
  )
}
