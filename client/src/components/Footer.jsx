import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsLinkedin,BsInstagram,BsGithub,BsTwitterX} from 'react-icons/bs'

const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full grid justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to={"/"}
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="py-1 px-2 bg-gradient-to-r from-indigo-500 to via-purple-500 to-pink-500 rounded-lg text-white">
                Rahul's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/imRkofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Us
                </Footer.Link>
                <Footer.Link href="#">
                  Connect
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/imRkofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link href="#">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="flex  flex-col justify-start items-center sm:items-center  sm:flex-row sm:justify-between ">
        <div className="w-full flex sm:items-center sm:justify-between">
            <Footer.Copyright by="Rahul's Blog" year={new Date().getFullYear()} />
        </div>
        <div className="w-full flex gap-6 sm:mt-0 mt-4 sm:justify-end">
            <Footer.Icon href="https://www.github.com/imRkofficial" icon={BsGithub} />
            <Footer.Icon href="https://www.linkedin.com/in/rahul-sharma-482bba26a/" icon={BsLinkedin} />
            <Footer.Icon href="#" icon={BsTwitterX} />
            <Footer.Icon href="#" icon={BsInstagram} />
        </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
