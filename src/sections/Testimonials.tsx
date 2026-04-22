import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useEffect, useState } from "react"
import { useTestimonials } from "../hooks/useTestimonials"

const Testimonials = () => {
  const { testimonials, loading, error } = useTestimonials()
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    if (activeIdx >= testimonials.length) {
      setActiveIdx(0)
    }
  }, [activeIdx, testimonials.length])

  const hasTestimonials = testimonials.length > 0

  const previous = () => {
    if (!hasTestimonials) return

    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    if (!hasTestimonials) return

    setActiveIdx((prev) => (prev + 1) % testimonials.length)
  }

  const activeTestimonial = hasTestimonials ? testimonials[activeIdx] : null

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            What People Say
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Kind words from <span className="font-serif italic font-normal text-white">amazing people.</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="glass p-8 rounded-3xl md:p-12 glow-border animate-fade-in animation-delay-200 relative">
              <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>

              {loading && <p className="text-muted-foreground pt-4">Loading testimonials...</p>}

              {!loading && error && (
                <p className="text-destructive pt-4">Could not load testimonials. Showing available content only.</p>
              )}

              {!loading && activeTestimonial && (
                <>
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pt-4">
                    "{activeTestimonial.quote}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <img
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.author}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <div className="font-semibold">{activeTestimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{activeTestimonial.role}</div>
                    </div>
                  </div>
                </>
              )}

              {!loading && !activeTestimonial && !error && (
                <p className="text-muted-foreground pt-4">No testimonials available yet.</p>
              )}
            </div>

            {hasTestimonials && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
                  onClick={previous}
                  type="button"
                >
                  <ChevronLeft />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === activeIdx
                          ? "w-8 bg-primary"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
                  type="button"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
