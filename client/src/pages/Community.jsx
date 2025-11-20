import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { getToken } = useAuth();

  // Fetch all published creations
  const fetchCreations = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) setCreations(data.creations);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Like/unlike a creation
  const imageLikeToggle = async (id) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        '/api/user/toggle-like-creation',
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchCreations(); // Refresh creations
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchCreations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <span className="w-10 h-10 rounded-full border-3 border-[#7b61ff] border-t-transparent animate-spin"></span>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-[#222] mb-4">Community Creations</h2>

      <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl p-4">
        {creations.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No creations yet 😅</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creations.map((c, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden group bg-white shadow-sm border border-gray-100">
                <img
                  src={c.content}
                  alt={c.prompt || 'Creation'}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/65 to-transparent text-white flex justify-between items-center">
                  <p className="text-sm truncate max-w-[68%]">{c.prompt}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{c.likes.length}</p>
                    <Heart
                      className={`w-5 h-5 cursor-pointer transition ${
                        c.likes.includes(user?.id) ? 'fill-red-500 text-red-600' : 'text-white'
                      }`}
                      onClick={() => imageLikeToggle(c.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
