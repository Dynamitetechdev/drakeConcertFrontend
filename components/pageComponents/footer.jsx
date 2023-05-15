import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-color-200 py-4 w-full absolute bottom-0 right-0 left-0">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}
          <Link href="https://flowbite.com/" className="hover:underline ml-2">
            Secure Chain Docs
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link
              href="https://twitter.com/TechDynamite235"
              className="hover:underline"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
