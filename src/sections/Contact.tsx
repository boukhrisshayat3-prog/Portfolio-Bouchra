import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import Button from "../components/Button";
import { useContactInfo } from "../hooks/useContactInfo";
import { useSendMessage } from "../hooks/useSendMessage";

const iconMap: Record<string, LucideIcon> = {
  mail: Mail,
  email: Mail,
  phone: Phone,
  map: MapPin,
  mappin: MapPin,
  location: MapPin,
};

export const Contact = () => {
  const {
    contactInfo: apiContactInfo,
    loading: contactLoading,
    error: contactError,
  } = useContactInfo();

  const { sendMessage, loading: sending } = useSendMessage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

 
  const contactInfo = apiContactInfo;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitStatus({ type: null, message: "" });

    try {
      await sendMessage(formData);

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Failed to send message. Try again later.",
      });
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Get In Touch
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-5 sm:mb-6 text-secondary-foreground leading-tight">
            Let's build{" "}
            <span className="font-serif italic font-normal text-white">
              something great.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Send me a message and let's talk.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-start">
          {/* FORM */}
          <div className="glass p-5 sm:p-8 rounded-3xl border border-primary/30">
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <input
                className="w-full px-4 py-3 bg-surface rounded-xl border text-sm sm:text-base"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                className="w-full px-4 py-3 bg-surface rounded-xl border text-sm sm:text-base"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <textarea
                className="w-full px-4 py-3 bg-surface rounded-xl border resize-none text-sm sm:text-base"
                rows={5}
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />

              <Button className="w-full" type="submit" size="lg" disabled={sending}>
                {sending ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              {submitStatus.type && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle />
                  ) : (
                    <AlertCircle />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-4 sm:space-y-6">
            <div className="glass rounded-3xl p-5 sm:p-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Contact Information
              </h3>

              {contactLoading && (
                <p className="text-sm text-muted-foreground mb-4">
                  Loading...
                </p>
              )}

              {contactError && (
                <p className="text-sm text-red-400 mb-4">
                  Failed to load contact info
                </p>
              )}

              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((item, i) => {
                  const Icon = iconMap[item.icon?.toLowerCase()] ?? Mail;

                  return (
                    <a
                      key={item._id || i}
                      href={item.href || "#"}
                      className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-surface transition-colors"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>

                      <div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="font-medium text-sm sm:text-base break-words">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-3xl p-5 sm:p-8 border border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Currently Available</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Open to new opportunities and projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;