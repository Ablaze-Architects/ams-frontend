import React, { useState, useMemo, useEffect } from 'react';
import { Search, Grid3x3, List, Filter, X, ChevronLeft, ChevronRight, User } from 'lucide-react';

function YearRangePicker({ onRangeChange, startYear, endYear }) {
    const [displayYear, setDisplayYear] = useState(new Date().getFullYear());
    const [selectedStart, setSelectedStart] = useState(startYear);
    const [selectedEnd, setSelectedEnd] = useState(endYear);
    const [inputYear, setInputYear] = useState('');
  
    const years = [];
    const startDisplayYear = Math.floor(displayYear / 12) * 12;
    for (let i = 0; i < 12; i++) {
      years.push(startDisplayYear + i);
    }
  
    const handleYearClick = (year) => {
      if (!selectedStart || (selectedStart && selectedEnd)) {
        setSelectedStart(year);
        setSelectedEnd(null);
        onRangeChange(year, null);
      } else {
        if (year < selectedStart) {
          setSelectedEnd(selectedStart);
          setSelectedStart(year);
          onRangeChange(year, selectedStart);
        } else {
          setSelectedEnd(year);
          onRangeChange(selectedStart, year);
        }
      }
    };
  
    const isInRange = (year) => {
      if (!selectedStart) return false;
      if (!selectedEnd) return year === selectedStart;
      return year >= selectedStart && year <= selectedEnd;
    };
  
    const isRangeStart = (year) => year === selectedStart;
    const isRangeEnd = (year) => year === selectedEnd;
  
    const handleInputSubmit = (e) => {
      e.preventDefault();
      const year = parseInt(inputYear);
      if (year && year >= 1900 && year <= 2100) {
        setDisplayYear(year);
        handleYearClick(year);
        setInputYear('');
      }
    };
  
    return (
      <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md w-80">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setDisplayYear(displayYear - 12)}
            className="p-2 rounded hover:bg-muted"
          >
            <ChevronLeft size={20} />
          </button>
          <form onSubmit={handleInputSubmit} className="flex-1 mx-2">
            <input
              type="text"
              value={inputYear}
              onChange={(e) => setInputYear(e.target.value)}
              placeholder={`${startDisplayYear}-${startDisplayYear + 11}`}
              className="w-full bg-primary text-primary-foreground text-center py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </form>
          <button
            onClick={() => setDisplayYear(displayYear + 12)}
            className="p-2 rounded hover:bg-muted"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {years.map((year) => {
            const inRange = isInRange(year);
            const isStart = isRangeStart(year);
            const isEnd = isRangeEnd(year);
  
            return (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`
                  p-3 rounded text-sm font-medium transition-colors
                  ${inRange ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'}
                  ${isStart || isEnd ? 'bg-accent text-accent-foreground' : ''}
                `}
              >
                {year}
              </button>
            );
          })}
        </div>
        {(selectedStart || selectedEnd) && (
          <div className="mt-4 text-sm text-center">
            <span className="text-muted-foreground">
              {selectedStart && !selectedEnd && `Year: ${selectedStart}`}
              {selectedStart && selectedEnd && `Range: ${selectedStart} - ${selectedEnd}`}
            </span>
          </div>
        )}
      </div>
    );
}
  

export default function AlumniDirectory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [filters, setFilters] = useState({
    course: '',
    stream: '',
    occupation: '',
    yearStart: null,
    yearEnd: null
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  useEffect(() => {
    fetch("https://ams-backend-dxh2.onrender.com/api/alumni")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network Error");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const uniqueValues = useMemo(() => {
    if (!data) return { courses: [], streams: [], occupations: [] };
    
    return {
      courses: [...new Set(data.map(a => a.alumni_course))].filter(Boolean).sort(),
      streams: [...new Set(data.map(a => a.alumni_stream))].filter(Boolean).sort(),
      occupations: [...new Set(data.map(a => a.alumni_occupation))].filter(Boolean).sort()
    };
  }, [data]);

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter(alumni => {
      const matchesSearch = searchTerm === '' || 
        alumni.alumni_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.alumni_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.alumni_course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.alumni_stream?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.alumni_occupation?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCourse = filters.course === '' || alumni.alumni_course === filters.course;
      const matchesStream = filters.stream === '' || alumni.alumni_stream === filters.stream;
      const matchesOccupation = filters.occupation === '' || alumni.alumni_occupation === filters.occupation;
      
      let matchesYear = true;
      if (filters.yearStart && !filters.yearEnd) {
        matchesYear = parseInt(alumni.alumni_year_of_graduation) === filters.yearStart;
      } else if (filters.yearStart && filters.yearEnd) {
        const gradYear = parseInt(alumni.alumni_year_of_graduation);
        matchesYear = gradYear >= filters.yearStart && gradYear <= filters.yearEnd;
      }

      return matchesSearch && matchesCourse && matchesStream && matchesOccupation && matchesYear;
    });
  }, [data, searchTerm, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleYearRangeChange = (start, end) => {
    setFilters(prev => ({ ...prev, yearStart: start, yearEnd: end }));
  };

  const clearFilters = () => {
    setFilters({
      course: '',
      stream: '',
      occupation: '',
      yearStart: null,
      yearEnd: null
    });
  };

  const activeFilterCount = [
    filters.course,
    filters.stream,
    filters.occupation,
    filters.yearStart
  ].filter(v => v !== '' && v !== null).length;

  if (loading) return <div className="text-4xl p-6">Loading...</div>;
  if (error) return <div className="text-4xl p-6">Error loading data</div>;

  return (
    <div className="w-full">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Alumni Directory</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              <Grid3x3 size={20} />
            </button>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${showFilters ? 'bg-blue-50 border-blue-500' : 'bg-white'}`}
            >
              <Filter size={20} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filter Options</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear all
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Course</label>
                  <select
                    value={filters.course}
                    onChange={(e) => handleFilterChange('course', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Courses</option>
                    {uniqueValues.courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stream</label>
                  <select
                    value={filters.stream}
                    onChange={(e) => handleFilterChange('stream', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Streams</option>
                    {uniqueValues.streams.map(stream => (
                      <option key={stream} value={stream}>{stream}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Occupation</label>
                  <select
                    value={filters.occupation}
                    onChange={(e) => handleFilterChange('occupation', e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Occupations</option>
                    {uniqueValues.occupations.map(occupation => (
                      <option key={occupation} value={occupation}>{occupation}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">Graduation Year</label>
                  <button
                    onClick={() => setShowYearPicker(!showYearPicker)}
                    className="w-full p-2 border rounded text-left focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {filters.yearStart && !filters.yearEnd && `${filters.yearStart}`}
                    {filters.yearStart && filters.yearEnd && `${filters.yearStart} - ${filters.yearEnd}`}
                    {!filters.yearStart && 'Select Year/Range'}
                  </button>
                  {showYearPicker && (
                    <div className="absolute z-10 mt-2">
                      <YearRangePicker
                        onRangeChange={handleYearRangeChange}
                        startYear={filters.yearStart}
                        endYear={filters.yearEnd}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredData.length} of {data.length} alumni
        </div>

        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-3 text-left font-semibold">Profile</th>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Course</th>
                  <th className="p-3 text-left font-semibold">Stream</th>
                  <th className="p-3 text-left font-semibold">Occupation</th>
                  <th className="p-3 text-left font-semibold">Year</th>
                  <th className="p-3 text-left font-semibold">Email</th>
                  <th className="p-3 text-left font-semibold">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((alumni) => (
                  <tr key={alumni.alumni_id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <User size={20} className="text-gray-600" />
                      </div>
                    </td>
                    <td className="p-3 font-medium">{alumni.alumni_name}</td>
                    <td className="p-3">{alumni.alumni_course}</td>
                    <td className="p-3">{alumni.alumni_stream}</td>
                    <td className="p-3">{alumni.alumni_occupation}</td>
                    <td className="p-3">{alumni.alumni_year_of_graduation}</td>
                    <td className="p-3 text-sm text-blue-600">{alumni.alumni_email}</td>
                    <td className="p-3">{alumni.alumni_phone_no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((alumni) => (
              <div key={alumni.alumni_id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <User size={28} className="text-gray-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">{alumni.alumni_name}</h2>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium">{alumni.alumni_course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stream:</span>
                    <span className="font-medium">{alumni.alumni_stream}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Occupation:</span>
                    <span className="font-medium">{alumni.alumni_occupation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-medium">{alumni.alumni_year_of_graduation}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-blue-600 text-xs">{alumni.alumni_email}</p>
                    <p className="text-gray-700 text-xs mt-1">{alumni.alumni_phone_no}</p>
                  </div>
                  {alumni.social_links && alumni.social_links.length > 0 && (
                    <div className="pt-2 flex gap-2 flex-wrap">
                      {alumni.social_links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.alumni_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          {link.alumni_link_name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No alumni found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}