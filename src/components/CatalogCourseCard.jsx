import { Link } from "react-router-dom";

export default function CatalogCourseCard({ id, title, img, category }) {
  return (
    <Link
      to={`/course/${id}`}
      className="block bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300"
    >
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600 mt-1">{category}</p>
      </div>
    </Link>
  );
}


