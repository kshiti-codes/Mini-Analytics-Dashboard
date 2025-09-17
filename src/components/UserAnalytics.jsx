import { useGetUserQuery, useGetPostsByUserQuery } from '../store/api'

const UserAnalytics = ({ users, selectedUserId, onSelectUser, loading }) => {
  // Conditional queries - only run when user selected
  const { 
    data: selectedUser, 
    isFetching: userFetching,
    error: userError 
  } = useGetUserQuery(selectedUserId, {
    skip: !selectedUserId, // Skip if no user selected
    pollingInterval: 30000, // Poll every 30 seconds
  })
  
  const { 
    data: userPosts, 
    isFetching: postsFetching 
  } = useGetPostsByUserQuery(selectedUserId, {
    skip: !selectedUserId,
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* User List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Users ({users?.length || 0})</h2>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            users?.map(user => (
              <div 
                key={user.id}
                onClick={() => onSelectUser(user.id)}
                className={`p-4 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                  selectedUserId === user.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-xs text-gray-500 mt-1">{user.company?.name}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* User Details */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">User Details</h2>
          {userFetching && (
            <div className="text-sm text-blue-600 mt-1">🔄 Refreshing...</div>
          )}
        </div>
        <div className="p-4">
          {!selectedUserId ? (
            <p className="text-gray-500 italic">Select a user to view details</p>
          ) : userError ? (
            <p className="text-red-500">Error loading user details</p>
          ) : userFetching && !selectedUser ? (
            <div className="space-y-3">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ) : selectedUser && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Username</label>
                <p className="text-gray-900">@{selectedUser.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Company</label>
                <p className="text-gray-900">{selectedUser.company?.name}</p>
                <p className="text-sm text-gray-600">{selectedUser.company?.catchPhrase}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-900">
                  {selectedUser.address?.city}, {selectedUser.address?.zipcode}
                </p>
              </div>
              {selectedUser.website && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Website</label>
                  <a 
                    href={`http://${selectedUser.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {selectedUser.website}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User Posts */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            Posts {userPosts && `(${userPosts.length})`}
          </h2>
          {postsFetching && (
            <div className="text-sm text-blue-600 mt-1">🔄 Loading posts...</div>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {!selectedUserId ? (
            <p className="p-4 text-gray-500 italic">Select a user to view their posts</p>
          ) : postsFetching ? (
            <div className="p-4 space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : userPosts?.length === 0 ? (
            <p className="p-4 text-gray-500">No posts found</p>
          ) : (
            userPosts?.map(post => (
              <div key={post.id} className="p-4 border-b last:border-b-0">
                <h3 className="font-medium text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{post.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default UserAnalytics