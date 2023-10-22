import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FilterSidebarProps {
  title: string;
  filters: string[];
  onFilterChange: (selectedFilters: string[]) => void;
}

interface FilterProps {
  isSelected: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  title,
  filters,
  onFilterChange,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { handleSubmit } = useForm<FilterProps>();
  const [show, setShow] = useState(true);

  console.log(handleSubmit);

  const handleFilterChange = (filter: string) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((item) => item !== filter)
      : [...selectedFilters, filter];

    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;
    handleFilterChange(filter);
  };

  return (
    <div className="p-4 rounded-md font-mulish">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <button onClick={() => setShow((prev) => !prev)}>
          {show ? (
            <ChevronUpIcon className="w-10 h-10" />
          ) : (
            <ChevronDownIcon className="w-10 h-10" />
          )}
        </button>
      </div>

      <div>
        {show &&
          filters.map((filter) => (
            <div key={filter} className="flex gap-2">
              <input
                type="checkbox"
                value={filter}
                checked={selectedFilters.includes(filter)}
                onChange={handleCheckboxChange}
              />

              <p
                className={`cursor-pointer ${
                  selectedFilters.includes(filter) ? "font-semibold" : ""
                }`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
