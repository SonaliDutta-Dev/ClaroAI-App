import React, { useEffect, useState } from 'react';
import { Gem, Sparkles } from 'lucide-react';
import { Protect, useAuth } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-1 flex flex-wrap gap-4">
          {/* Total Creations Card */}
          <div className="w-full sm:w-72 p-4 rounded-xl bg-white/80 border border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-[#333]">
                <p className="text-sm">Total Creations</p>
                <h2 className="text-xl font-semibold">{creations.length}</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
                <Sparkles className="w-5" />
              </div>
            </div>
          </div>

          {/* Active Plan Card */}
          <div className="w-full sm:w-72 p-4 rounded-xl bg-white/80 border border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-[#333]">
                <p className="text-sm">Active Plan</p>
                <h2 className="text-xl font-semibold">
                  <Protect plan="premium" fallback="Free">Premium</Protect>
                </h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
                <Gem className="w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: recent creations list */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-11 w-11 border-3 border-[#7b61ff] border-t-transparent"></div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="mt-2 mb-2 text-[#333] font-medium">Recent Creations</p>
              {creations.length === 0 ? (
                <p className="text-gray-500">No creations yet.</p>
              ) : (
                creations.map((item) => <CreationItem key={item.id} item={item} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
