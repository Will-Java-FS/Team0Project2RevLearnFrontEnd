import Card from "../components/Card";

// Show all info about the project (what it is, who made it, ect)
export default function About() {
    return (


        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <Card
          title="Tailwind Card"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula."
          link="https://example.com"
        />
      </div>

    )
};


