import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Mail } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="bg-navy pt-24 lg:pt-32 pb-0 section-padding-x">
      <div className="container-narrow">
        <SectionHeader
          label="GET IN TOUCH"
          heading="Let's Connect"
          subtext="Whether it's a collaboration, speaking opportunity, or just to say hello - I'd love to hear from you."
          centered
        />

        <div className="flex flex-col lg:grid lg:grid-cols-[45%_55%] gap-6 lg:gap-x-20 lg:items-start">
          {/* Contact Info + Quote */}
          <RevealOnScroll direction="left" className="order-1 lg:col-start-1 lg:row-start-1 self-start">
            <div>
              <h3
                className="font-display text-white mb-8"
                style={{ fontSize: '28px', lineHeight: 1.1 }}
              >
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-gold flex-shrink-0 mt-1" />
                  <div>
                    <span className="caption-label block mb-1">Email</span>
                    <span className="font-body text-base text-cream">
                      lakshya@example.com
                    </span>
                  </div>
                </div>
              </div>

              <p
                className="font-body font-light text-cream-muted mt-10 mb-0"
                style={{ fontSize: '16px', lineHeight: 1.7 }}
              >
                Follow my journey of innovation and discovery.
              </p>
            </div>
          </RevealOnScroll>

          {/* Quote - full width, centered */}
          <RevealOnScroll delay="0.4s" className="order-2 w-full lg:col-span-2 lg:col-start-1 lg:row-start-2">
            <blockquote className="text-center m-0">
              <p
                className="font-display italic text-gold px-2"
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  lineHeight: 1.3,
                }}
              >
                "I believe age is never a barrier to innovation."
              </p>
              <cite className="font-body text-sm text-cream-muted mt-3 block not-italic">
                - Lakshya Chelawat
              </cite>
            </blockquote>
          </RevealOnScroll>

          {/* Contact Form */}
          <RevealOnScroll direction="right" className="order-3 lg:col-start-2 lg:row-start-1 lg:row-span-2 self-start">
            <div>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="reveal" style={{ transitionDelay: '0s' }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-cream-dim text-cream font-body text-base py-4 px-0 placeholder:text-cream-muted focus:border-gold focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  <div
                    className="reveal"
                    style={{ transitionDelay: '0.1s' }}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-cream-dim text-cream font-body text-base py-4 px-0 placeholder:text-cream-muted focus:border-gold focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  <div
                    className="reveal"
                    style={{ transitionDelay: '0.2s' }}
                  >
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-cream-dim text-cream font-body text-base py-4 px-0 placeholder:text-cream-muted focus:border-gold focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  <div
                    className="reveal"
                    style={{ transitionDelay: '0.3s' }}
                  >
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-cream-dim text-cream font-body text-base py-4 px-0 placeholder:text-cream-muted focus:border-gold focus:outline-none transition-colors duration-300 resize-y"
                    />
                  </div>

                  <div
                    className="reveal pt-2"
                    style={{ transitionDelay: '0.4s' }}
                  >
                    <button type="submit" className="btn-primary w-full">
                      Send Message
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <p
                    className="font-display text-gold text-center"
                    style={{ fontSize: '24px', lineHeight: 1.4 }}
                  >
                    Thank you for reaching out!
                    <br />
                    <span className="text-cream-muted text-lg">
                      I'll get back to you soon.
                    </span>
                  </p>
                </div>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
