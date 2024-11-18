import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center gap-10 bg-black pb-20">
      <div className="flex justify-center items-center py-20 text-white">
        <h1 className="text-center font-bold text-6xl md:text-8xl lg:text-9xl leading-tight">
          Yet Another Useless Website
        </h1>
      </div>
      <div className=" text-white flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-screen-xl">
          {Navs.map((nav, index) => (
            <Link
              key={index}
              href={nav.href}
              className="group p-6 rounded-lg shadow-md border hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400">
                {nav.name}
              </h2>
              <p className="text-sm text-gray-400 group-hover:text-gray-200">
                Click to explore.
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Link
        href="https://github.com/KaiAlan"
        className="fixed bottom-12 px-8 py-4 bg-slate-700/20 rounded-lg backdrop-blur-lg"
      >
        <span>Made with 💙 by kaialan</span>
      </Link>
    </div>
  );
};

export default HomePage;

const Navs = [
  {
    name: "Wavy Text Effects",
    href: "/wavy-words",
  },
  {
    name: "Ouiiiiiiiii cats popup",
    href: "/oui-cat",
  },
  {
    name: "Ouiiiii cursor sprinkel",
    href: "/oui-cursor-effect",
  },
  {
    name: "Reaveal Paragraph",
    href: "/reveal-texts",
  },
];
