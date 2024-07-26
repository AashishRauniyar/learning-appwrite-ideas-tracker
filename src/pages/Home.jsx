import { useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";

export function Home() {
  const user = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="container mx-auto p-4">
      {/* Show the submit form to logged in users. */}
      {user.current ? (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Submit Idea</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() =>
                ideas.add({ userId: user.current.$id, title, description })
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </section>
      ) : (
        <section className="mb-8">
          <p className="text-gray-700">Please login to submit an idea.</p>
        </section>
      )}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Ideas</h2>
        <ul className="space-y-4">
          {ideas.current.map((idea) => (
            <li key={idea.$id} className="p-4 border border-gray-300 rounded-lg">
              <strong className="text-lg">{idea.title}</strong>
              <p className="text-gray-700">{idea.description}</p>
              {/* Show the remove button to idea owner. */}
              {user.current && user.current.$id === idea.userId && (
                <button
                  type="button"
                  onClick={() => ideas.remove(idea.$id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
