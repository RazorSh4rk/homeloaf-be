exports.handler = async (event) => {
    const { httpMethod, path } = event;
  
    if (httpMethod == 'GET' && path == '/ping') {
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
            'Content-Type': 'text/html'
          },
          body: '<h1>test</h1>'
        };
        
        return response
    }
  };
  