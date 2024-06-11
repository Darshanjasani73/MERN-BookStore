import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border border-gray-300'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>No</th>
            <th className='border border-gray-300 px-4 py-2'>Title</th>
            <th className='border border-gray-300 px-4 py-2 hidden md:table-cell'>Author</th>
            <th className='border border-gray-300 px-4 py-2 hidden md:table-cell'>Publish Year</th>
            <th className='border border-gray-300 px-4 py-2'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className='odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors'>
              <td className='border border-gray-300 px-4 py-2 text-center'>{index + 1}</td>
              <td className='border border-gray-300 px-4 py-2 text-center'>{book.title}</td>
              <td className='border border-gray-300 px-4 py-2 text-center hidden md:table-cell'>{book.author}</td>
              <td className='border border-gray-300 px-4 py-2 text-center hidden md:table-cell'>{book.publishYear}</td>
              <td className='border border-gray-300 px-4 py-2 text-center'>
                <div className='flex justify-center space-x-4'>
                  <Link to={`/books/details/${book._id}`} className='text-green-600 hover:text-green-800'>
                    <BsInfoCircle className='text-xl' />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className='text-yellow-600 hover:text-yellow-800'>
                    <AiOutlineEdit className='text-xl' />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} className='text-red-600 hover:text-red-800'>
                    <MdOutlineDelete className='text-xl' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

BooksTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      publishYear: PropTypes.number,
    })
  ).isRequired,
};

export default BooksTable;
