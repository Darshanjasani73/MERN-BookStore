import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import PropTypes from 'prop-types';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border border-gray-300 rounded-lg p-4 m-4 shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl bg-white'>
      <div className='relative mb-4'>
        {book.thumbnail && (
          <img
            src={`data:image/jpeg;base64,${book.thumbnail}`} // Display the Base64 image
            alt={`${book.title} thumbnail`}
            className='w-full h-48 object-cover rounded-t-lg'
          />
        )}
        <h2 className='absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded-md'>
          {book.publishYear}
        </h2>
      </div>
      <div className='flex items-center gap-x-2 my-2'>
        <PiBookOpenTextLight className='text-red-600 text-xl' />
        <h2 className='text-lg font-semibold text-gray-800'>{book.title}</h2>
      </div>
      <div className='flex items-center gap-x-2 mb-4'>
        <BiUserCircle className='text-red-600 text-xl' />
        <h2 className='text-md text-gray-700'>{book.author}</h2>
      </div>
      <div className='flex justify-around items-center gap-x-2 p-4'>
        {/* <BiShow
          className='text-2xl text-blue-600 hover:text-blue-800 cursor-pointer transition-colors'
          onClick={() => setShowModal(true)}
        /> */}
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className='text-xl text-green-600 hover:text-green-800 transition-colors' />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-xl text-yellow-600 hover:text-yellow-800 transition-colors' />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-xl text-red-600 hover:text-red-800 transition-colors' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

BookSingleCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publishYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    thumbnail: PropTypes.string, // Ensure thumbnail is provided
  }).isRequired
};

export default BookSingleCard;
