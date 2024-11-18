import { cn } from "@/lib/utils";

const TextLift = ({ value, className }: { value: string; className?: string }) => {
  const characters = value.split("");
  return (
    <div className={cn("relative w-full px-2 py-1 flex text-center text-9xl font-semibold cursor-default  overflow-hidden", className)}>
      <span className=" inline-flex overflow-hidden">
        {characters.map((char, index) => {
          return (
            <span
              key={index}
              data-char={char}
              className={`relative transition-transform duration-500 before:content-[attr(data-char)] before:left-0 before:absolute before:-top-full hover:translate-y-full hover:transform-cpu`}
            >
              {char}
            </span>
          );
        })}
      </span>
    </div>
  );
};

export default TextLift;
