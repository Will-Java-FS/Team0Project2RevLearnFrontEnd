import logo from "../assets/Icon512.png";
export default function Footer() {
  return (
    <div>
      <footer className="footer bg-base-300/80 text-base-content p-6 md:p-10 flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-center items-start w-full">
          <div className="flex flex-col items-center mb-6 md:mb-0 w-full md:w-1/4">
            <img
              src={logo}
              alt="logo"
              className="text-primary h-16 w-auto md:h-20 lg:h-24"
            />
            <p className="text-center text-sm mt-4">
              <span className="font-semibold text-xl text-primary">
                RevLearn
              </span>
              <br />
              Providing Cutting-Edge Learning Solutions Since{" "}
              <span className="font-bold">2024</span>
            </p>
          </div>

          <div className="flex md:text-sm flex-col md:flex-row md:space-x-12 w-full md:w-3/4 justify-center">
            <nav className="mb-6 md:mb-0 w-full md:w-1/3 text-center">
              <h6 className="footer-title">Services</h6>
              <a className="link link-hover block">Learning</a>
              <a className="link link-hover block">Teaching</a>
              <a className="link link-hover block">Advertisement</a>
            </nav>
            <nav className="mb-6 md:mb-0 w-full md:w-1/3 text-center">
              <h6 className="footer-title">Company</h6>
              <a className="link link-hover block">About us</a>
              <a className="link link-hover block">Contact</a>
              <a className="link link-hover block">Jobs</a>
              <a className="link link-hover block">Press kit</a>
            </nav>
            <nav className="w-full md:w-1/3 text-center ">
              <h6 className="footer-title">Legal</h6>
              <a className="link link-hover block">Terms of use</a>
              <a className="link link-hover block">Privacy policy</a>
              <a className="link link-hover block">Cookie policy</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
