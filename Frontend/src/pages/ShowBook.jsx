import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <BackButton />
      <h1 className="text-3xl my-4 text-center text-blue-600">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col border-2 border-blue-400 rounded-xl w-full p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            {book.thumbnail && (
              <img
                src={`data:image/jpeg;base64,${book.thumbnail}`} // Display the Base64 image
                alt={`${book.title} thumbnail`}
                className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                onClick={openModal}
              />
            )}
            <div className="my-4">
              <span className="text-xl font-semibold mr-4 text-gray-700">
                Title:
              </span>
              <span className="text-lg text-gray-900">{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl font-semibold mr-4 text-gray-700">
                Author:
              </span>
              <span className="text-lg text-gray-900">{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl font-semibold mr-4 text-gray-700">
                Publish Year:
              </span>
              <span className="text-lg text-gray-900">{book.publishYear}</span>
            </div>
            <div className="my-4">
              <span className="text-xl font-semibold mr-4 text-gray-700">
                Create Time:
              </span>
              <span className="text-lg text-gray-900">
                {new Date(book.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="my-4">
              <span className="text-xl font-semibold mr-4 text-gray-700">
                Last Update Time:
              </span>
              <span className="text-lg text-gray-900">
                {new Date(book.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  &times;
                </button>
                <img
                  src={`data:image/jpeg;base64,${book.thumbnail}`}
                  alt={`${book.title} full`}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowBook;
