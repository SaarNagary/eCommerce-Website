import React from 'react'
import Button from '../Forms/Button'

const LoadMore = ({
  onLoadMoreEvent = () => {
    
  }
}) => {
  return (
    <div>
      <Button onClick={() => onLoadMoreEvent()}>
        Load More
      </Button>
    </div>
  )
}

export default LoadMore