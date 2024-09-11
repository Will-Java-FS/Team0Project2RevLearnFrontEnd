// Show all info about the project (what it is, who made it, ect)
export default function About() {
  return (
    <div className="min-h-screen w-full justify-center items-center text-center flex">
        {/* Match home page background */}
        <section
            className="glass min-h-screen w-full bg-gradient-to-r from-amber-200 via-orange-400 to-red-600 dark:from-yellow-500 dark:via-orange-500 dark:to-red-500
            sm:bg-gradient-to-r sm:from-amber-200 sm:via-orange-400 sm:to-red-600
            dark:sm:from-yellow-500 dark:sm:via-orange-500 dark:sm:to-red-500
            md:bg-gradient-to-r md:from-amber-200 md:via-orange-400 md:to-red-600
            dark:md:from-yellow-500 dark:md:via-orange-500 dark:md:to-red-500
            lg:bg-gradient-to-r lg:from-amber-200 lg:via-orange-400 lg:to-red-600
            dark:lg:from-yellow-500 dark:lg:via-orange-500 dark:lg:to-red-500"
        >
            <div className="w-full text-base-100">
                <div className="max-w-xl mx-auto">
                  <br/>
                    <h1 className="drop-shadow-xl py-4 text-4xl font-bold">
                      Revature Training Capstone Project - RevLearn
                    </h1>
                    <h2 className="drop-shadow-xl text-3xl py-2 font-bold">Team Two:</h2>
                    <div className="drop-shadow-xl text-lg">
                      <p className="font-bold">Team Lead:</p>
                      <p>Emmett Duffy</p>
                      <p className="font-bold">Frontend Lead:</p>
                      <p>Gunnar Fettig</p>
                      <p className="font-bold">Backend Lead:</p>
                      <p>Ryan Schwartz</p>
                      <p className="font-bold">Team Members:</p>
                      <p>Andrew Tran Shi</p>
                      <p>Anthony Zhou</p>
                      <p>Anup Jacob</p>
                      <p>Egan Okumu</p>
                      <p>Matthew Darrow</p>
                      <p>Oscar Ramirez</p>
                      <p>Radhika Godhasara</p>
                      <p>Ruar Podushkin</p>
                      <p>Sarah Anatoli</p>
                      <p>Stephen Becker</p>
                    </div>
                    <br/>
                    <h2 className="drop-shadow-xl text-3xl py-2 font-bold">About This Project:</h2>
                    <div className="drop-shadow-xl text-lg font-light">
                      <p>This project was started on the 26th of August 2024</p>
                      <p>and was completed on the 10th of September 2024.</p>
                      <p>
                          The project consists of a learning platform where students can
                          enroll in programs and complete courses in various subjects. It
                          also has functionality to allow teachers to create and manage
                          programs, courses and lessons. Additionally there are forums for
                          each course that students can post in and teachers can 
                          moderate.
                      </p>
                    </div>
                    <br/>
                    <h2 className="drop-shadow-xl text-3xl py-2 font-bold">Technologies Used:</h2>
                    <div className="drop-shadow-xl text-lg font-light">
                      <p>Backend - Java, Spring, Kafka, Postgresql</p>
                      <p>Frontend - React, HTML, Typescript, Vite, TailwindCSS, DaisyUI</p>
                      <p>DevOps - AWS (EC2, S3, RDS), Jenkins</p>
                      <p>Version Control - Git, GitHub</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
