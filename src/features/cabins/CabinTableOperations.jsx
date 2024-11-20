import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (Low)" },
          { value: "regularPrice-desc", label: "Sort by price (High)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (Low)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (High)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;