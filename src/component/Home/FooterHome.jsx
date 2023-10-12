import Logo from "../../assets/Logo.png";

const FooterHome = () => {
  return (
    <div>
      <footer className="footer items-center p-5 h-[6rem] bg-neutral text-neutral-content">
        <aside className="items-center grid-flow-col">
          <img className="w-[3rem]" src={Logo} alt="" />
          <p className="text-[20px] font-semibold">
            Copyright © 2023 - Rocket Fit All Rights Reserverd
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a className="font-bold hover:cursor-pointer hidden lg:flex md:flex sm:flex">
            Term & Policy
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default FooterHome;
