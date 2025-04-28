"use client";
import { useState, useEffect } from "react";
import TimeLockAnimation from "@/components/TimeLockAnimation";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      title: "Create",
      description: "Tokenize your future content and set it free",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Lock",
      description: "Secure your content with time-based releases",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Earn",
      description: "Start monetizing before your content is ready",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-gray-900/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              ZoraTimeLock
            </div>
            <div className="flex items-center space-x-4">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => {
                    document
                      .getElementById(`section-${index}`)
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                    setActiveSection(index);
                  }}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === index
                      ? "bg-white text-gray-900"
                      : "hover:bg-white/10"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Monetize Your Future Content
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl">
              Tokenize your upcoming content. Set release dates. Start earning
              before creation.
            </p>
            <div className="w-full max-w-4xl mb-12">
              <TimeLockAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sections */}
      {sections.map((section, index) => (
        <section
          key={index}
          id={`section-${index}`}
          className={`min-h-screen flex items-center justify-center bg-gradient-to-b ${section.color}`}
        >
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">{section.title}</h2>
              <p className="text-xl text-white/90">{section.description}</p>
              <div className="mt-12">
                <div className="inline-block p-1 bg-white/10 rounded-full">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-2xl">{index + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the future of content creation and start monetizing your work
            before it&apos;s even created.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-white font-bold text-lg hover:opacity-90 transition-opacity">
            Get Early Access
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ZoraTimeLock. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
