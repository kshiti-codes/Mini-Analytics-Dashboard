// src/components/StyledComponents.js
import styled from '@emotion/styled'

export const DashboardContainer = styled.div`
  color: #1f2937;
  min-height: 100vh;
  padding: 1rem;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 1rem;
  height: calc(100vh - 2rem);
  max-width: 1400px;
  margin: 0 auto;
`

export const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`

export const DataRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  min-height: 0; /* Important for scroll within grid items */
`

export const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`

export const MetricCard = styled(GlassCard)`
  text-align: center;
  background: ${props => props.gradient || 'rgba(255, 255, 255, 0.95)'};
  color: ${props => props.textColor || '#1f2937'};
  
  .metric-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .metric-value {
    font-size: 2rem;
    font-weight: 700;
    margin: 0.5rem 0;
  }
  
  .metric-title {
    font-size: 0.875rem;
    opacity: 0.8;
    font-weight: 500;
  }
`

export const ChartContainer = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  height: 300px;
  
  .chart-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #374151;
    text-align: center;
  }
  
  .chart-wrapper {
    flex: 1;
    min-height: 0;
  }
`

export const LiveDataCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  height: 350px;
  
  .data-header {
    display: flex;
    justify-content: between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #374151;
      margin: 0;
    }
  }
  
  .data-content {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid transparent;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

export const RefreshButton = styled.button`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`