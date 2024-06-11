import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import PropTypes from 'prop-types';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[90%] max-w-lg h-auto bg-white rounded-xl p-6 flex flex-col relative shadow-lg animate-slide-up"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer hover:text-red-800 transition duration-200"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-blue-200 text-blue-800 rounded-lg mb-2">
          {book.publishYear}
        </h2>
        <div className="flex items-center gap-x-2 mb-3">
          <PiBookOpenTextLight className="text-blue-500 text-2xl" />
          <h2 className="text-xl font-semibold">{book.title}</h2>
        </div>
        <div className="flex items-center gap-x-2 mb-3">
          <BiUserCircle className="text-blue-500 text-2xl" />
          <h2 className="text-xl font-semibold">{book.author}</h2>
        </div>
        <p className="mt-4 text-gray-700">Additional Information</p>
        <p className="my-2 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
          voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
          necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
          nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
          dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
          vitae voluptate sequi repellat!
        </p>
      </div>
    </div>
  );
};

BookModal.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publishYear: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookModal;
