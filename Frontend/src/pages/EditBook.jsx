import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import '../App.css';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [thumbnail, setThumbnail] = useState(null); 
  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [yearError, setYearError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [authorError, setAuthorError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    setLoading(true);
    axios.get(`${backendUrl}/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setExistingThumbnail(response.data.thumbnail);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    if (!/^\d{4}$/.test(year) || parseInt(year, 10) >= currentYear || parseInt(year, 10) < 1800) {
      return `Year must be a four-digit number between 1800 and ${currentYear - 1}`;
    }
    return '';
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setPublishYear(value);
    const validationError = validateYear(value);
    setYearError(validationError);
  };

  const validateText = (text, field) => {
    const containsNumber = /\d/;
    const containsSpecialCharacter = /[^a-zA-Z\s]/;
    if (containsNumber.test(text)) {
      return `${field} must not contain numbers`;
    }
    if (containsSpecialCharacter.test(text)) {
      return `${field} must not contain special characters`;
    }
    if (text.length <= 5) {
      return `${field} must be more than 5 characters long`;
    }
    return '';
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    const validationError = validateText(value, 'Title');
    setTitleError(validationError);
  };

  const handleAuthorChange = (e) => {
    const value = e.target.value;
    setAuthor(value);
    const validationError = validateText(value, 'Author');
    setAuthorError(validationError);
  };

  const handleEditBook = () => {
    const validationError = validateYear(publishYear) || validateText(title, 'Title') || validateText(author, 'Author');
    if (validationError) {
      enqueueSnackbar(validationError, { variant: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publishYear', publishYear);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-purple-200 p-6'>
      <BackButton />
      <h1 className='text-4xl my-6 text-purple-700 font-bold animate-pulse'>Edit Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-purple-400 rounded-xl w-full max-w-lg p-6 bg-white shadow-lg transition-transform transform hover:scale-105'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Title</label>
          <input
            type='text'
            value={title}
            onChange={handleTitleChange}
            className='border-2 border-purple-400 px-4 py-2 w-full rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors'
          />
          {titleError && <p className='text-red-600'>{titleError}</p>}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Author</label>
          <input
            type='text'
            value={author}
            onChange={handleAuthorChange}
            className='border-2 border-purple-400 px-4 py-2 w-full rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors'
          />
          {authorError && <p className='text-red-600'>{authorError}</p>}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={handleYearChange}
            className='border-2 border-purple-400 px-4 py-2 w-full rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors'
          />
          {yearError && <p className='text-red-600'>{yearError}</p>}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Thumbnail</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='border-2 border-purple-400 px-4 py-2 w-full rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors'
          />
          {existingThumbnail && !thumbnail && (
            <img
              src={`data:image/jpeg;base64,${existingThumbnail}`}
              alt='Thumbnail Preview'
              className='mt-4 w-full h-48 object-cover rounded-lg'
            />
          )}
          {thumbnail && (
            <img
              src={URL.createObjectURL(thumbnail)}
              alt='Thumbnail Preview'
              className='mt-4 w-full h-48 object-cover rounded-lg'
            />
          )}
        </div>
        <button
          className='p-2 bg-purple-500 text-white rounded mt-6 transform hover:scale-105 transition-transform'
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
