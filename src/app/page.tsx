import TimeLockAnimation from "@/components/TimeLockAnimation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ZoraTimeLock
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Coming Soon
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Monetize Your Future Content
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
            Tokenize your upcoming content. Set release dates. Start earning
            before creation.
          </p>

          {/* 3D Animation */}
          <div className="w-full max-w-2xl mb-12">
            <TimeLockAnimation />
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            {[
              {
                title: "Create",
                description: "Tokenize your future content",
              },
              {
                title: "Lock",
                description: "Set your release date",
              },
              {
                title: "Earn",
                description: "Start monetizing today",
              },
            ].map((point, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ZoraTimeLock. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
