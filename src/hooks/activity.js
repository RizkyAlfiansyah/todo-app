import { useEffect, useState } from 'react';
import { getActivity, getActivityById } from '../services/activity';

export const useActivity = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  let mounted = false;

  useEffect(() => {
    if (!mounted) {
      _fetchData();
      mounted = true;
    }

    return () => (mounted = true);
  }, [mounted]);

  const _fetchData = async () => {
    setLoading(true);
    getActivity('rizkkyaf@gmail.com')
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
    if (!mounted) {
      _fetchData(id);
      mounted = true;
    }

    return () => (mounted = true);
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
