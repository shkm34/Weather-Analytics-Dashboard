import { useSelector, useDispatch } from 'react-redux';
import { removeFavorites, clearFavorites } from '../../store/slices/favoritesSlice';

function FavoritesManager() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.cities);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-2">No favorite cities yet</p>
        <p className="text-sm text-gray-400">
          Add cities from the dashboard to manage them here
        </p>
      </div>
    );
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorite cities?')) {
      dispatch(clearFavorites());
    }
  };

  return (
    <div>
      <div className="space-y-3 mb-4">
        {favorites.map((city) => (
          <div 
            key={city.name}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div>
              <p className="font-semibold text-gray-800">{city.name}</p>
              <p className="text-sm text-gray-500">
                {city.region && `${city.region}, `}{city.country}
              </p>
            </div>
            <button
              onClick={() => dispatch(removeFavorites(city.name))}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleClearAll}
        className="w-full px-4 py-2 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition font-semibold"
      >
        Clear All Favorites
      </button>
    </div>
  );
}

export default FavoritesManager;
