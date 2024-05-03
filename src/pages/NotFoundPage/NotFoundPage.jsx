import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <h1>Oops, page not found</h1>
      <p>
        Visit our <Link to="/">Home Page</Link>
      </p>
    </>
  );
}
