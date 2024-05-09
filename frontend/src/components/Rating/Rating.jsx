import React from 'react'

const Rating = ({ data }) => {
  return (
    <section className="flex ">
      <span>
        {data >= 1 ? (
          <svg
            fill="currentColor"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        ) : (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        )}
      </span>
      <span>
        {data >= 2 ? (
          <svg
            fill="currentColor"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        ) : (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        )}
      </span>
      <span>
        {data >= 3 ? (
          <svg
            fill="currentColor"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        ) : (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        )}
      </span>
      <span>
        {data >= 4 ? (
          <svg
            fill="currentColor"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        ) : (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        )}
      </span>
      <span>
        {data === 5 ? (
          <svg
            fill="currentColor"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        ) : (
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        )}
      </span>
    </section>
  )
}

export default Rating
