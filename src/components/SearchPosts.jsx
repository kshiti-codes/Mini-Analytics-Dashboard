import { useState, useEffect } from 'react'
import { useSearchPostsQuery } from '../store/api'

const SearchPosts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const { 
    data: searchResults,
    isLoading: searchLoading,
    isFetching: searchFetching,
    error: searchError 
  } = useSearchPostsQuery(debouncedTerm, {
    skip: debouncedTerm.length < 3, // Only search with 3+ characters
  })

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Search Posts</h2>
        <div className="relative">
          <input 
            type="text"
            placeholder="Search posts by title (min 3 characters)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchFetching && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
        {searchTerm.length > 0 && searchTerm.length < 3 && (
          <p className="text-sm text-gray-500 mt-2">Type at least 3 characters to search</p>
        )}
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {searchError ? (
          <div className="p-4 text-red-500">Error occurred while searching</div>
        ) : searchLoading ? (
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : !debouncedTerm || debouncedTerm.length < 3 ? (
          <div className="p-4 text-center text-gray-500">
            🔍 Search for posts by entering keywords above
          </div>
        ) : searchResults?.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No posts found matching "{debouncedTerm}"
          </div>
        ) : (
          <div className="divide-y">
            {searchResults?.map(post => (
              <div key={post.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 flex-1 mr-2">{post.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    User {post.userId}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {searchResults?.length > 0 && (
        <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
          Found {searchResults.length} post{searchResults.length !== 1 ? 's' : ''} 
          matching "{debouncedTerm}"
        </div>
      )}
    </div>
  )
}

export default SearchPosts