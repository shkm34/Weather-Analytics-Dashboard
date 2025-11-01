import { useState, useCallback, useEffect, useRef } from "react";
import { searchCities } from "../../services/weatherApi";

function SearchBar({ onCitySelect }) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const searchRef = useRef(null);

    const performSearch = useCallback(async (searchQuery) => {
        // api will be called only if user types
        // more than 2 char
        if (searchQuery.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        setIsSearching(true);
        setError(null);
        try {
            const cities = await searchCities(searchQuery);
            setResults(cities);
            setIsOpen(cities.length > 0);
        } catch (error) {
            setError(error.message);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    // Debounce input search- api will be called
    // when user stops typing for t time
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            performSearch(query);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [performSearch, query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // handle city selection
    const handleCityClick = (city) => {
        onCitySelect(city);
        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md">
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                </div>

                {/* Loading Spinner */}
                {isSearching && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    {results.length > 0 ? (
                        <ul>
                            {results.map((city) => (
                                <li
                                    key={`${city.id}-${city.name}`}
                                    onClick={() => handleCityClick(city)}
                                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition"
                                >
                                    <div className="font-semibold text-gray-800">{city.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {city.region}, {city.country}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-3 text-gray-500 text-center">
                            No cities found
                        </div>
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        </div>
    );
}

export default SearchBar;
