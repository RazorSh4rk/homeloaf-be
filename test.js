exports.handler = async (event) => {
    if (event.requestContext.http.method == 'GET' && event.requestContext.http.path == '/ping') {
       const response = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: 'pong' })
        };
        
        return response
    }
    
    else {
      const response = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        };
        
        return response
    }
  };
  