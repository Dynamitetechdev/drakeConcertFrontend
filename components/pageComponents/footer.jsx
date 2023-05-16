import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-color-100 md:py-4 w-full absolute bottom-0 right-0 left-0">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center">
          © {new Date().getFullYear()}
          <Link href="https://flowbite.com/" className="hover:underline ml-2">
            Concert
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
