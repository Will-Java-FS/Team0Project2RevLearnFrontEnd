
// Show a list of all available programs
// If user has a program highlight it and have link to all courses as well as an option to leave it
// If user has no program show buttons on each program to set it as the user's current program
// If user is a teacher and has no program show a form to create a new one
// Use authService to get logged in user's info, use the axios services for http requests
export default function AllPrograms() {
  const items = [
    {
      programId: 1,
      programName: "Computer Science"
    },
    {
      programId: 2,
      programName: "Mathematics"
    },
    {
      programId: 3,
      programName: "History"
    }
  ];

  return (
    <div className="bg-base-100 p-5">
      <h1 className="text-2xl font-bold mb-4">List of Programs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.programId} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.programName}</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
