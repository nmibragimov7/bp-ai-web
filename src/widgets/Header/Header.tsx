import Logo from "@/shared/ui/Logo/Logo.tsx";

const Header = () => {
  return (
    <>
      <div className={"z-10 fixed top-0 left-0 w-full bg-red shadow-gray-500 py-4 px-4 md:px-8"}>
        <div className={"container mx-auto flex items-center gap-14"}>
          <Logo/>
          <div className={"flex items-center gap-8"}>
            <a
              href={"/processing"}
              className={"block transition-all duration-300 text-white border-b border-red hover:border-white"}
            >
              Обработка
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;