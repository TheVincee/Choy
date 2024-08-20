export async function fetchData(url, method = 'GET', body = null) {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong");
      }
  
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return {}; // Return an empty object or handle it accordingly
    }
  }
  