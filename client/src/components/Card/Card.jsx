import { Link } from "react-router-dom";

export default function Card({ id, title, img, price }) {
  return (
    <Link key={id} to={`/detail/${id}`} className="group">
      <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-900">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
    </Link>
  );
}
