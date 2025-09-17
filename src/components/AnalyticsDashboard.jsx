// src/components/AnalyticsDashboard.jsx
import { useState, useMemo } from 'react'
import { 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, ResponsiveContainer, Tooltip, Legend 
} from 'recharts'
import { 
  useGetUsersQuery, 
  useGetPostsQuery, 
  useGetCommentsQuery,
  useSearchPostsQuery 
} from '../store/api'
import {
  DashboardContainer,
  DashboardGrid,
  MetricsRow,
  ChartsRow,
  DataRow,
  MetricCard,
  ChartContainer,
  LiveDataCard,
  SearchInput,
  RefreshButton
} from './StyledComponents'

const AnalyticsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  // RTK Query hooks
  const { data: users, isLoading: usersLoading, refetch: refetchUsers } = useGetUsersQuery()
  const { data: posts, isLoading: postsLoading, refetch: refetchPosts } = useGetPostsQuery()
  const { data: comments, isLoading: commentsLoading } = useGetCommentsQuery()
  const { data: searchResults, isFetching: searching } = useSearchPostsQuery(searchTerm, {
    skip: searchTerm.length < 2
  })

  // Computed data for charts
  const chartData = useMemo(() => {
    if (!users || !posts || !comments) return null

    // Posts per user distribution
    const postsPerUser = users.map(user => ({
      name: user.name.split(' ')[0],
      posts: posts.filter(p => p.userId === user.id).length,
      comments: comments.filter(c => posts.some(p => p.id === c.postId && p.userId === user.id)).length
    })).slice(0, 8)

    // Activity by user (pie chart)
    const userActivity = users.slice(0, 5).map(user => ({
      name: user.name.split(' ')[0],
      value: posts.filter(p => p.userId === user.id).length,
    }))

    // Engagement trend (line chart) - simulated daily data
    const engagementTrend = Array.from({length: 7}, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      posts: Math.floor(Math.random() * 20) + 10,
      comments: Math.floor(Math.random() * 50) + 20,
    }))

    return { postsPerUser, userActivity, engagementTrend }
  }, [users, posts, comments])

  const handleRefreshAll = () => {
    refetchUsers()
    refetchPosts()
  }

  const metrics = {
    totalUsers: users?.length || 0,
    totalPosts: posts?.length || 0,
    totalComments: comments?.length || 0,
    avgEngagement: posts && comments ? (comments.length / posts.length).toFixed(1) : 0
  }

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

  return (
    <DashboardContainer>
      <DashboardGrid>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Real-time Analytics Dashboard</h1>
          <RefreshButton onClick={handleRefreshAll}>
            Refresh Data
          </RefreshButton>
        </div>

        {/* Metrics Row */}
        <MetricsRow>
          <MetricCard gradient="linear-gradient(135deg, #936efaff, #751eafff)" textColor="white">
            <span className="metric-icon">👥</span>
            <div className="metric-value">
              {usersLoading ? '...' : metrics.totalUsers}
            </div>
            <div className="metric-title">Active Users</div>
          </MetricCard>
          
          <MetricCard gradient="linear-gradient(135deg, #10b981, #047857)" textColor="white">
            <span className="metric-icon">📝</span>
            <div className="metric-value">
              {postsLoading ? '...' : metrics.totalPosts}
            </div>
            <div className="metric-title">Total Posts</div>
          </MetricCard>
          
          <MetricCard gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)" textColor="white">
            <span className="metric-icon">💬</span>
            <div className="metric-value">
              {commentsLoading ? '...' : metrics.totalComments}
            </div>
            <div className="metric-title">Comments</div>
          </MetricCard>
          
          <MetricCard gradient="linear-gradient(135deg, #f59e0b, #d97706)" textColor="white">
            <span className="metric-icon">📊</span>
            <div className="metric-value">
              {metrics.avgEngagement}
            </div>
            <div className="metric-title">Avg Engagement</div>
          </MetricCard>
        </MetricsRow>

        {/* Charts Row */}
        <ChartsRow>
          {/* User Activity Pie Chart */}
          <ChartContainer>
            <div className="chart-title">Top Contributors</div>
            <div className="chart-wrapper">
              {chartData?.userActivity && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.userActivity}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.userActivity.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </ChartContainer>

          {/* Posts per User Bar Chart */}
          <ChartContainer>
            <div className="chart-title">Posts & Comments by User</div>
            <div className="chart-wrapper">
              {chartData?.postsPerUser && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.postsPerUser} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis 
                      dataKey="name" 
                      tick={{fontSize: 12}}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{fontSize: 12}} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="posts" fill="#3b82f6" name="Posts" />
                    <Bar dataKey="comments" fill="#10b981" name="Comments" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </ChartContainer>

          {/* Engagement Trend Line Chart */}
          <ChartContainer>
            <div className="chart-title">Weekly Engagement Trend</div>
            <div className="chart-wrapper">
              {chartData?.engagementTrend && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.engagementTrend} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="day" tick={{fontSize: 12}} />
                    <YAxis tick={{fontSize: 12}} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="posts" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{r: 4}}
                      name="Posts"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="comments" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{r: 4}}
                      name="Comments"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </ChartContainer>
        </ChartsRow>

        {/* Data Tables Row */}
        <DataRow>
          {/* Real-time Search */}
          <LiveDataCard>
            <div className="data-header">
              <h3>🔍 Live Search</h3>
            </div>
            <SearchInput
              type="text"
              placeholder="Search posts in real-time..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="data-content mt-4">
              {searching && <div className="text-blue-600 text-sm mb-2">🔄 Searching...</div>}
              {searchTerm.length < 2 ? (
                <div className="text-gray-500 text-center py-8">Type 2+ characters to search</div>
              ) : searchResults?.length === 0 ? (
                <div className="text-gray-500 text-center py-8">No results found</div>
              ) : (
                <div className="space-y-3">
                  {searchResults?.map(post => (
                    <div key={post.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-600 flex items-center justify-between">
                        <span>By User {post.userId}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">ID: {post.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </LiveDataCard>

          {/* Live Activity Feed */}
          <LiveDataCard>
            <div className="data-header">
              <h3>⚡ Recent Activity</h3>
              <div className="text-sm text-gray-600">
                {posts ? `${posts.length} total posts` : 'Loading...'}
              </div>
            </div>
            <div className="data-content">
              {postsLoading ? (
                <div className="space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {posts?.slice(0, 10).map(post => (
                    <div key={post.id} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-400">
                      <div className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-600 flex items-center justify-between">
                        <span>{users?.find(u => u.id === post.userId)?.name || `User ${post.userId}`}</span>
                        <span className="text-blue-600 font-medium">
                          {comments?.filter(c => posts?.find(p => p.id === c.postId)?.userId === post.userId)?.length || 0} comments
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </LiveDataCard>
        </DataRow>
      </DashboardGrid>
    </DashboardContainer>
  )
}

export default AnalyticsDashboard