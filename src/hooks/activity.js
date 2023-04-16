import { useEffect, useState } from 'react';
import { getActivity, getActivityById } from '../services/activity';

export const useActivity = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  let mounted = false;

  useEffect(() => {
    mounted = true;
    _fetchData();

    return () => {
      mounted = false;
    };
  }, [mounted]);

  const _fetchData = async () => {
    setLoading(true);
    getActivity({
      email: 'rizkkyaf@gmail.com',
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return { data, loading, refetch: _fetchData };
};

export const useDetailActivity = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  let mounted = false;

  useEffect(() => {
    mounted = true;
    _fetchData(id);

    return () => {
      mounted = false;
    };
  }, [mounted]);

  const _fetchData = async (id) => {
    setLoading(true);
    getActivityById(id)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return { data, loading, refetch: _fetchData };
};
