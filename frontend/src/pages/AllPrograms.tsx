// Show a list of all available programs
// If user has a program highlight it and have link to all courses aswell a option to leave it
// If user has no program show buttons on each program to set it as the user's current program
// If user is a teacher and has no program show a form to create a new one
// Use authService to get logged in user's info, use the axios services for http requests
export default function AllPrograms() {
  const items = [
    { id: 1, title: "Item 1", description: "Description for Item 1" },
    { id: 2, title: "Item 2", description: "Description for Item 2" },
    { id: 3, title: "Item 3", description: "Description for Item 3" },
    { id: 4, title: "Item 4", description: "Description for Item 4" },
  ];

  return (
    <div className="bg-base-100 p-5">
      <h1 className="text-2xl font-bold mb-4">List of Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.description}</p>
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
