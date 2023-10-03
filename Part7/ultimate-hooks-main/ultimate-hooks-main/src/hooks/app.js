import { useState, useEffect } from "react"
import axios from "axios"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);
    
    
    useEffect(() => {
        //Moved into the useEffect hook to avoid missing dependency warning. Alternatively useCallback
        const getAll = async () => {
          const response = await axios.get(baseUrl);
          setResources(response.data);
        };
        getAll();
    }, [baseUrl]);

    
  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      setResources(resources.concat(response.data));
    } catch (err) {
      console.log("err.response.data", err.response.data);
    }
  };

  const service = {
    create,
  };

  return [resources, service];
} 

